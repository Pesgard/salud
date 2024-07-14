<script lang="ts">
	import { FileButton, getModalStore, ProgressRadial } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import Buscador from '../../buscador/Buscador.svelte';
	import type { SaludBucalFormulario } from '../../../interface/Formularios';
	export let pacientes: any; // Propiedad para recibir los pacientes
	let pacienteID: number = 0; // Valor inicial de pacienteID\

	let nombrePaciente: string = '';

	let checkBucal: boolean = false;
	let enableBucal: boolean = false;

	let completionPercentage: number = 0;

	$: {
		let totalFields = 0;
		let filledFields = 0;

		if (checkBucal) {
			totalFields += 2;
			if (data.revision) filledFields++;
			if (data.revisionDate) filledFields++;
		}

		completionPercentage = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
	}

	// Objeto para almacenar los datos del formulario
	let data: SaludBucalFormulario = {
		id: null,
		pacienteID: 0,
		pacienteNombre: { firstName: '', lastName: '' },
		revision: '',
		revisionDate: null,
		documento: '',
		observaciones: ''
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
			getBucal(pacienteID, 'saludBucal');
		}
	};
	async function getBucal(pacienteID: number, tableName: string) {
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
					pacienteNombre: { firstName: '', lastName: '' },
					revision: '',
					revisionDate: null,
					documento: '',
					observaciones: ''
				};
				nombrePaciente = errorData.pacienteNombre;
				enableBucal = true;
				return null;
			}
			data = await response.json();
			enableBucal = true;
			return data;
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	}
	async function postBucal(data: SaludBucalFormulario, tableName: string, porcentaje: number) {
		try {
			const response = await fetch('/api/formularios/post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ data, tableName, porcentaje })
			});
			if (!response.ok) {
				const errorData = await response.json();
				console.error('Error posting data:', errorData.error);
				return null;
			}
			const responseData = await response.json();

			// Mostrar mensaje de alerta
			alert(responseData.info);
			window.location.reload();

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

		delete data.pacienteNombre;
		postBucal(data, 'saludBucal', completionPercentage);
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
				<h2 class="text-2xl">Salud Bucal</h2>
			</div>
			<!-- Nombre del paciente seleccionado: {nombrePaciente} -->
			{#if nombrePaciente}
				<div>
					<h2 class="text-xl font-thin text-gray-500">{nombrePaciente}</h2>
				</div>
			{:else}
				<span class="text-gray-500">Seleccionar Paciente</span>
			{/if}

			<div class="w-fit flex flex-row items-center">
				<div class="mx-2 md:inline md:ml-4">
					<button
						on:click={openModal}
						class="btn space-x-4 variant-soft hover:variant-soft-primary"
					>
						<i class="fa-solid fa-magnifying-glass text-sm"></i>
						<small class="hidden md:inline-block">Buscar Pacientes</small>
					</button>
				</div>
				<!-- Barra de progreso -->
				<ProgressRadial value={completionPercentage} width="w-20" class="text-primary-500-token">
					{completionPercentage}%
				</ProgressRadial>
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
							<span class="label">Revision Bucal</span>
							<input
								class="checkbox"
								type="checkbox"
								disabled={!enableBucal}
								bind:checked={checkBucal}
							/>
						</label>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Resultado"
							disabled={!checkBucal}
							bind:value={data.revision}
						/>
						<input
							class="input"
							type="date"
							disabled={!checkBucal}
							bind:value={data.revisionDate}
						/>
					</div>

					<label class="label">
						<span>Observaciones</span>
						<input
							class="input"
							type="text"
							placeholder="Observaciones"
							disabled={!enableBucal}
							bind:value={data.observaciones}
						/>
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
