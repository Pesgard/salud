<script lang="ts">
	import { FileButton, RadioGroup, RadioItem, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import Buscador from '../../buscador/Buscador.svelte';
	export let pacientes: any; // Propiedad para recibir los pacientes
	let value = ''; // Valor inicial de value
	let pacienteID: number = 0; // Valor inicial de idPaciente

	// Checks de inputs
	let checkFecha = false;
	let checkPaciente = false;
	let checkFarmacos = false;
	let checkObservaciones = false;

	interface Data {
		id: number | null;
		pacienteID: number;
		date: Date | null;
		tipoPaciente: string;
		farmacos: string;
		observaciones: string;
		documento: null;
	}
	let data: Data = {
		id: null,
		pacienteID: 0,
		date: null,
		tipoPaciente: value,
		farmacos: '',
		observaciones: '',
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
			// si el paciente tiene un id hacer true los checks
			if (pacienteID) {
				checkPaciente = true;
				checkFarmacos = true;
				checkObservaciones = true;
				checkFecha = true;
			}

			getDiabetes(pacienteID, 'diabetes');
		}
	};
	async function getDiabetes(pacienteID: number, tableName: string) {
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
					date: null,
					tipoPaciente: '',
					farmacos: '',
					observaciones: '',
					documento: null
				};
				value = '';
				return null;
			}
			data = await response.json();
			value = data.tipoPaciente;
			return data;
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	}
	async function postDiabetes(data: Data, tableName: string) {
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
		data.tipoPaciente = value;
		postDiabetes(data, 'diabetes');
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
				<h2 class="text-2xl">Diabetes / Hipertension</h2>
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
					<!-- id del paciente -->
					<label class="label" hidden>
						<span>ID Paciente</span>
						<!-- Utilizar bind:value para que el valor del input se actualice reactivamente -->
						<input name="pacienteID" class="input" type="text" bind:value={pacienteID} readonly />
					</label>

					<!-- SECCION Fecha -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<p class="flex items-center space-x-2">
							<span class="label">Fecha</span>
						</p>
						<input class="input" type="date" disabled={!checkFarmacos} bind:value={data.date} />
					</div>
					<hr />

					<!-- SECCION Resultado -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<p class="flex items-center space-x-2">
							<span class="label">Paciente</span>
						</p>
						<!-- tipo Paciente -->
						<RadioGroup>
							<RadioItem bind:group={value} name="justify" value={'Sano'} disabled={!checkPaciente}
								>Sano</RadioItem
							>
							<RadioItem
								bind:group={value}
								name="justify"
								value={'Hipertenso'}
								disabled={!checkPaciente}>Hipertenso</RadioItem
							>
							<RadioItem
								bind:group={value}
								name="justify"
								value={'Diabetico'}
								disabled={!checkPaciente}>Diabetico</RadioItem
							>
						</RadioGroup>
					</div>
					<hr />

					<!-- Farmacos -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<p class="flex items-center space-x-2">
							<span class="label">Farmacos</span>
						</p>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Farmacos"
							disabled={!checkFarmacos}
							bind:value={data.farmacos}
						/>
					</div>
					<hr />

					<!--Seccion Observaciones-->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<p class="flex items-center space-x-2">
							<span class="label">Observaciones</span>
						</p>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Observaciones"
							disabled={!checkObservaciones}
							bind:value={data.observaciones}
						/>
					</div>

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
