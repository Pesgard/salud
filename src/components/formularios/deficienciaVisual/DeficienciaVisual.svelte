<script lang="ts">
	import { FileButton, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import Buscador from '../../buscador/Buscador.svelte';
	export let pacientes: any; // Propiedad para recibir los pacientes
	let pacienteID: number = 0; // Valor inicial de idPaciente

	//variables de los checks
	let examenVistaCheck = false;
	let examenAuditivoCheck = false;

	interface Data {
		id: number | null;
		pacienteID: number;
		vista: string;
		vistaDate: Date | null;
		auditivo: string;
		auditivoDate: Date | null;
		extra: string;
		documento: null;
	}
	let data: Data = {
		id: null,
		pacienteID: 0,
		vista: '',
		vistaDate: null,
		auditivo: '',
		auditivoDate: null,
		extra: '',
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
			pacienteID = r;
			getDeficienciaVisual(pacienteID, 'deficienciaVisual');
		}
	};
	async function getDeficienciaVisual(pacienteID: number, tableName: string) {
		try {
			const response = await fetch('/api/formularios/get', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ pacienteID, tableName })
			});
			if (!response.ok) {
				const errorData = await response.json();
				console.error('Error fetching data:', errorData.error);
				data = {
					id: null,
					pacienteID: pacienteID,
					vista: '',
					vistaDate: null,
					auditivo: '',
					auditivoDate: null,
					extra: '',
					documento: null
				};
				return null;
			}
			data = await response.json();
			return data;
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	}
	async function postDeficienciaVisual(data: Data, tableName: string) {
		try {
			const response = await fetch('/api/formularios/post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ data, tableName })
			});
			if (!response.ok) {
				const errorData = await response.json();
				console.error('Error posting data:', errorData.error);
				return null;
			}
			const responseData = await response.json();
			return responseData;
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	}
	function openModal() {
		modalStore.trigger(modal);
	}
	//funcion para el envio de datos de formulario
	function handleSubmit(event: Event) {
		event.preventDefault();
		postDeficienciaVisual(data, 'deficienciaVisual');
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
				<h2 class="text-2xl">Deficiencia Visual</h2>
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
							<span class="label">Examen Vista</span>
							<input class="checkbox" type="checkbox" bind:checked={examenVistaCheck} />
						</label>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Resultado"
							disabled={!examenVistaCheck}
							bind:value={data.vista}
						/>
						<input
							class="input"
							type="date"
							disabled={!examenVistaCheck}
							bind:value={data.vistaDate}
						/>
					</div>
					<hr />

					<!-- SECCION Alcohol -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<label class="flex items-center space-x-2">
							<span class="label">Examen Auditivo</span>
							<input class="checkbox" type="checkbox" bind:checked={examenAuditivoCheck} />
						</label>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Resultado"
							disabled={!examenAuditivoCheck}
							bind:value={data.auditivo}
						/>
						<input
							class="input"
							type="date"
							disabled={!examenAuditivoCheck}
							bind:value={data.auditivoDate}
						/>
					</div>
					<hr />

					<label class="label">
						<span>Observaciones Extra</span>
						<input class="input" type="text" placeholder="Observaciones" />
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
