<script lang="ts">
	import { FileButton, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import Buscador from '../../buscador/Buscador.svelte';

	export let pacientes: any; // Propiedad para recibir los pacientes
	let pacienteID: number = 0; // Valor inicial de idPaciente

	// Variables para el estado de los checkboxes
	let drogasChecked = false;
	let alcoholChecked = false;
	let otrosChecked = false;

	interface Data {
		id: number | null;
		pacienteID: number;
		alcohol: string;
		alcoholDate: Date | null;
		drogas: string;
		drogasDate: Date | null;
		otros: string;
		otrosDate: string;
		informo: boolean;
		extra: string;
		documento: null;
	}

	let data: Data = {
		id: null,
		pacienteID: 0,
		alcohol: '',
		alcoholDate: null,
		drogas: '',
		drogasDate: null,
		otros: '',
		otrosDate: '',
		extra: '',
		informo: false,
		documento: null
	};

	const modalStore = getModalStore();
	const modalComponent: ModalComponent = {
		ref: Buscador,
		props: { pacientes }
	};

	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		response: (r) => {
			// console.log('response:', r);
			pacienteID = r;
			console.log(pacienteID);
			// Actualizar idPaciente con la respuesta del modal
			getDrogas(pacienteID, 'drogas');
		}
	};

	//funcion para hacer el fetching de datos de manera asincrona
	async function getDrogas(pacienteID: number, tableName: string) {
		try {
			const response = await fetch('/api/formularios/get', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ pacienteID, tableName })
			});

			if (!response.ok) {
				// Manejar errores de la respuesta HTTP
				const errorData = await response.json();
				console.error('Error fetching data:', errorData.error);
				data = {
					id: null,
					pacienteID: pacienteID,
					alcohol: '',
					alcoholDate: null,
					drogas: '',
					drogasDate: null,
					otros: '',
					otrosDate: '',
					extra: '',
					documento: null,
					informo: false
				};
				return null;
			}

			data = await response.json();
			console.log(data);
			// si data es null, agregar a data el id del paciente de la variable idPaciente

			return data;
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	}

	// funcion para hacer el POST de los datos de manera asincrona
	async function postDrogas(data: Data, tableName: string) {
		try {
			const response = await fetch('/api/formularios/post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ data, tableName })
			});

			if (!response.ok) {
				// Manejar errores de la respuesta HTTP
				const errorData = await response.json();
				console.error('Error fetching data:', errorData.error);
				return null;
			}

			const result = await response.json();
			alert(result.info);
			//Redurecuibar a la pagina del formulario
			return result;
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	}

	function openModal() {
		modalStore.trigger(modal);
	}

	function handleSubmit(event: Event) {
		event.preventDefault();
		// console.log(data);
		postDrogas(data, 'drogas');
	}
</script>

<div id="panels" class="space-y-10">
	<div
		class="previewer shadow-2xl shadow-surface-500/10 dark:shadow-black/10 rounded-container-token overflow-hidden"
	>
		<!-- Header -->
		<header
			class="previewer-header bg-surface-200-700-token p-4 flex justify-between items-center gap-4"
		>
			<div
				class="radio-group p-1 inline-flex flex-row gap-1 bg-surface-200-700-token border-surface-400-500-token rounded-token"
			>
				<h2 class="text-2xl">Drogas / Alcohol</h2>
			</div>
			<div class="md:inline md:ml-4">
				<button on:click={openModal} class="btn space-x-4 variant-soft hover:variant-soft-primary">
					<i class="fa-solid fa-magnifying-glass text-sm"></i>
					<small class="hidden md:inline-block">Buscar Pacientes</small>
				</button>
			</div>
		</header>

		<!-- Formulario -->
		<div class="previewer-viewport p-4 md:p-10 space-y-4 bg-transparent">
			<div
				class="previewer-preview flex justify-center items-center mx-auto transition-[width] duration-200 w-full"
			>
				<div class="card p-4 w-full text-token space-y-4">
					<!-- SECCION Drogas -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<label class="flex items-center space-x-2">
							<span class="label">Drogas</span>
							<input class="checkbox" type="checkbox" bind:checked={drogasChecked} />
						</label>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Resultado"
							disabled={!drogasChecked}
							bind:value={data.drogas}
						/>
						<input
							class="input"
							type="date"
							disabled={!drogasChecked}
							bind:value={data.drogasDate}
						/>
					</div>
					<hr />

					<!-- SECCION Alcohol -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<label class="flex items-center space-x-2">
							<span class="label">Alcohol</span>
							<input class="checkbox" type="checkbox" bind:checked={alcoholChecked} />
						</label>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Resultado"
							disabled={!alcoholChecked}
							bind:value={data.alcohol}
						/>
						<input
							class="input"
							type="date"
							disabled={!alcoholChecked}
							bind:value={data.alcoholDate}
						/>
					</div>
					<hr />

					<!-- Otros -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<label class="flex items-center space-x-2">
							<span class="label">Otros</span>
							<input class="checkbox" type="checkbox" bind:checked={otrosChecked} />
						</label>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Detalles"
							disabled={!otrosChecked}
							bind:value={data.otros}
						/>
						<input class="input" type="date" disabled={!otrosChecked} bind:value={data.otrosDate} />
					</div>
					<hr />

					<label class="label">
						<span>Observaciones Extra</span>
						<input class="input" type="text" placeholder="Observaciones" bind:value={data.extra} />
					</label>

					<!--- Se informo -->
					<label class="flex w-full justify-center items-center space-x-2">
						<span class="label">Se informo</span>
						<input class="checkbox" type="checkbox" bind:checked={data.informo} />
					</label>

					<!-- Subir Archivos -->
					<hr />

					<p>Documentos</p>
					<div class="btn-group variant-ringed w-full">
						<FileButton name="files" button="" width="w-full"
							>Subir
							<i class="fa-solid fa-file-arrow-up ml-2"></i>
						</FileButton>
						<button class="w-full btn variant-soft"
							>Descargar
							<i class="fa-solid fa-file-arrow-down ml-2"></i>
						</button>
					</div>

					<!-- Botones de Formularios -->
					<hr />
					<div class="flex flex-row w-full justify-between">
						<button type="button" class="btn variant-ringed">Borrar</button>
						<button on:click={handleSubmit} type="button" class="btn variant-soft">Enviar</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
