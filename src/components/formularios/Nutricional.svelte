<script lang="ts">
	import { FileButton, getModalStore, ProgressRadial } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import Buscador from '../buscador/Buscador.svelte';
	import type { NutricionFormulario } from '../../interface/Formularios';

	export let pacientes: any; // Propiedad para recibir los pacientes
	let pacienteID: number = 0; // Valor inicial de pacienteID

	//Variable para mostrar nombre del paciente
	let nombrePaciente: string = '';

	//variable para activar y desactivar el formulario
	let formActive: boolean = false;

	$: {
		let totalFields = 0;
		let filledFields = 0;

		// Calcular totalFields y filledFields basado en la presencia de datos
		if (data.date) filledFields++;
		totalFields++;
		if (data.peso) filledFields++;
		totalFields++;
		if (data.imc) filledFields++;
		totalFields++;
		if (data.resultado) filledFields++;
		totalFields++;
		if (data.txNutricion) filledFields++;
		totalFields++;
		if (data.extra) filledFields++;
		totalFields++;

		// Calcular el porcentaje de completitud
		completionPercentage = totalFields === 0 ? 0 : Math.round((filledFields / totalFields) * 100);
	}

	function updateCompletionPercentage() {
		let totalFields = 0;
		let filledFields = 0;

		if (data.date) filledFields++;
		totalFields++;
		if (data.peso) filledFields++;
		totalFields++;
		if (data.imc) filledFields++;
		totalFields++;
		if (data.resultado) filledFields++;
		totalFields++;
		if (data.txNutricion) filledFields++;
		totalFields++;
		if (data.extra) filledFields++;
		totalFields++;

		completionPercentage = totalFields === 0 ? 0 : Math.round((filledFields / totalFields) * 100);
	}

	let data: NutricionFormulario = {
		id: null,
		pacienteID: 0,
		pacienteNombre: { firstName: '', lastName: '' },
		date: null,
		peso: 0,
		imc: 0,
		resultado: 0,
		txNutricion: '',
		extra: '',
		documento: ''
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
			if (pacienteID) {
				formActive = true;
			} else {
				formActive = false;
			}
			getNutricional(pacienteID, 'nutricional');
		}
	};

	//funcion para hacer el fetching de datos de manera asincrona
	async function getNutricional(pacienteID: number, tableName: string) {
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
				data = {
					id: null,
					pacienteNombre: { firstName: '', lastName: '' },
					pacienteID: pacienteID,
					date: null,
					peso: 0,
					imc: 0,
					resultado: 0,
					txNutricion: '',
					extra: '',
					documento: ''
				};
				// console.log(errorData.pacienteNombre);
				nombrePaciente = errorData.pacienteNombre;
				return null;
			}

			data = await response.json();

			// Actualizar el estado de los checkbox basado en la presencia de datos

			nombrePaciente = data.pacienteNombre.firstName + ' ' + data.pacienteNombre.lastName;
			return data;
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	}

	// funcion para hacer el POST de los datos de manera asincrona
	async function postNutricional(data: NutricionFormulario, tableName: string, porcentaje: number) {
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
				console.error('Error fetching data:', errorData.error);
				return null;
			}

			const result = await response.json();
			alert(result.info);
			window.location.href = '/dashboard/home/estadoNutricional';
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
		delete data.pacienteNombre;
		postNutricional(data, 'nutricional', completionPercentage);
	}

	let completionPercentage = 0;
</script>

<div class="space-y-10">
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
				<h2 class="text-2xl">Estado Nutricional</h2>
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
		<form class="previewer-viewport p-4 md:p-10 space-y-4 bg-transparent">
			<div
				class="previewer-preview flex justify-center items-center mx-auto transition-[width] duration-200 w-full"
			>
				<div class="card p-4 w-full text-token space-y-4">
					<!-- SECCION Fecha -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<p class="flex items-center space-x-2">
							<span class="label">Fecha</span>
						</p>
						<input
							class="input"
							type="date"
							bind:value={data.date}
							on:input={updateCompletionPercentage}
							disabled={!formActive}
						/>
					</div>
					<hr />

					<!-- SECCION KG -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<p class="flex items-center space-x-2">
							<span class="label">Peso</span>
						</p>
						<input
							class="input"
							type="number"
							placeholder="Kg"
							bind:value={data.peso}
							on:input={updateCompletionPercentage}
							disabled={!formActive}
						/>
					</div>
					<hr />

					<!-- IMC -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<p class="flex items-center space-x-2">
							<span class="label">IMC</span>
						</p>
						<input
							class="input"
							type="number"
							placeholder="IMC"
							bind:value={data.imc}
							on:input={updateCompletionPercentage}
							disabled={!formActive}
						/>
					</div>
					<hr />

					<!-- Resultado -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<p class="flex items-center space-x-2">
							<span class="label">Resultado</span>
						</p>
						<input
							class="input"
							type="text"
							placeholder="Resultado"
							bind:value={data.resultado}
							on:input={updateCompletionPercentage}
							disabled={!formActive}
						/>
					</div>
					<hr />

					<!-- Tx Nutricion -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<p class="flex items-center space-x-2">
							<span class="label">Tx Nutricion</span>
						</p>
						<input
							class="input"
							type="text"
							placeholder="Tx Nutricion"
							bind:value={data.txNutricion}
							on:input={updateCompletionPercentage}
							disabled={!formActive}
						/>
					</div>
					<hr />

					<!-- Extra -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<p class="flex items-center space-x-2">
							<span class="label">Extra</span>
						</p>
						<input
							class="input"
							type="text"
							placeholder="Extra"
							bind:value={data.extra}
							on:input={updateCompletionPercentage}
							disabled={!formActive}
						/>
					</div>
					<hr />

					<!-- Subir Archivos -->
					<p>Documentos</p>
					<div class="btn-group variant-ringed w-full">
						<FileButton name="files" button="" width="w-full">
							Subir
							<input
								class="hidden"
								type="file"
								accept="application/pdf"
								bind:value={data.documento}
								disabled={!formActive}
							/>
						</FileButton>
					</div>
				</div>
			</div>
			<!-- Botones de enviar y cancelar -->
			<div class="flex flex-row items-center justify-center space-x-4">
				<button
					class="btn space-x-4 variant-filled hover:variant-filled-secondary"
					on:click={handleSubmit}
				>
					<i class="fa-solid fa-check text-sm"></i>
					<small class="hidden md:inline-block">Enviar</small>
				</button>
				<button class="btn space-x-4 variant-filled hover:variant-filled-secondary">
					<i class="fa-solid fa-xmark text-sm"></i>
					<small class="hidden md:inline-block">Cancelar</small>
				</button>
			</div>
		</form>
	</div>
</div>
