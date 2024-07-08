<script lang="ts">
	import { FileButton, getModalStore, ProgressRadial } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import Buscador from '../../buscador/Buscador.svelte';

	export let pacientes: any; // Propiedad para recibir los pacientes
	let pacienteID: number = 0; // Valor inicial de pacienteID

	//Variable para mostrar nombre del paciente
	let nombrePaciente: string = '';

	// Variables para el estado de los checkboxes
	let tdChecked = false;
	let srChecked = false;
	let influenzaChecked = false;
	let cartillaChecked = false;
	let drogasChecked = false;
	let otrosChecked = false;

	interface Data {
		id: number | null;
		pacienteNombre: string;
		pacienteID: any;
		td: string;
		dateTD: string;
		sr: string;
		dateSR: string;
		influenza: string;
		dateInfluenza: string;
		cartilla: string;
		dateCartilla: string;
		drogas: string;
		dateDrogas: string;
		otros: string;
		dateOtros: string;
		extras: string;
		documento: null;
	}

	let data: Data = {
		id: null,
		pacienteID: 0,
		pacienteNombre: '',
		td: '',
		dateTD: '',
		sr: '',
		dateSR: '',
		influenza: '',
		dateInfluenza: '',
		cartilla: '',
		dateCartilla: '',
		drogas: '',
		dateDrogas: '',
		otros: '',
		dateOtros: '',
		extras: '',
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
			// Actualizar pacienteID con la respuesta del modal
			getBiologicos(pacienteID, 'biologicos');
		}
	};

	//funcion para hacer el fetching de datos de manera asincrona
	async function getBiologicos(pacienteID: number, tableName: string) {
		try {
			const response = await fetch('/api/formularios/get', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ pacienteID: pacienteID, tableName })
			});

			if (!response.ok) {
				// Manejar errores de la respuesta HTTP
				const errorData = await response.json();
				// console.error('Error fetching data:', errorData.error);
				// console.log(errorData);
				// Si el error es que no se encontro el paciente, agregar a data el id del paciente de la variable pacienteID
				data = {
					id: null,
					pacienteNombre: '',
					pacienteID: pacienteID,
					td: '',
					dateTD: '',
					sr: '',
					dateSR: '',
					influenza: '',
					dateInfluenza: '',
					cartilla: '',
					dateCartilla: '',
					drogas: '',
					dateDrogas: '',
					otros: '',
					dateOtros: '',
					extras: '',
					documento: null
				};
				console.log(errorData.pacienteNombre);
				nombrePaciente = errorData.pacienteNombre;
				return null;
			}

			data = await response.json();
			console.log(data);
			// si data es null, agregar a data el id del paciente de la variable pacienteID
			nombrePaciente = data.pacienteNombre.firstName + ' ' + data.pacienteNombre.lastName;

			// console.log(nombrePaciente);

			return data;
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	}

	// funcion para hacer el POST de los datos de manera asincrona
	async function postBiologicos(data: Data, tableName: string) {
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
			window.location.href = '/dashboard/home/biologicos';
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
		postBiologicos(data, 'biologicos');
	}

	function updateCompletionPercentage() {
		let totalFields = 0;
		let filledFields = 0;

		if (tdChecked) {
			totalFields += 2; // TD and dateTD
			if (data.td) filledFields++;
			if (data.dateTD) filledFields++;
		}

		if (srChecked) {
			totalFields += 2; // SR and dateSR
			if (data.sr) filledFields++;
			if (data.dateSR) filledFields++;
		}

		if (influenzaChecked) {
			totalFields += 2; // Influenza and dateInfluenza
			if (data.influenza) filledFields++;
			if (data.dateInfluenza) filledFields++;
		}

		if (cartillaChecked) {
			totalFields += 2; // Cartilla and dateCartilla
			if (data.cartilla) filledFields++;
			if (data.dateCartilla) filledFields++;
		}

		if (drogasChecked) {
			totalFields += 2; // Drogas and dateDrogas
			if (data.drogas) filledFields++;
			if (data.dateDrogas) filledFields++;
		}

		if (otrosChecked) {
			totalFields += 2; // Otros and dateOtros
			if (data.otros) filledFields++;
			if (data.dateOtros) filledFields++;
		}

		if (totalFields === 0) {
			completionPercentage = 0;
		} else {
			completionPercentage = Math.round((filledFields / totalFields) * 100);
		}
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
				<h2 class="text-2xl">Biologicos</h2>
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
					<!-- id del paciente -->
					<label class="label" hidden>
						<span>ID Paciente</span>
						<!-- Utilizar bind:value para que el valor del input se actualice reactivamente -->
						<input
							name="pacienteID
						"
							class="input"
							type="text"
							bind:value={pacienteID}
							readonly
						/>
					</label>

					<!-- SECCION TD -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<label class="flex items-center space-x-2">
							<span class="label">TD</span>
							<input
								class="checkbox"
								type="checkbox"
								bind:checked={tdChecked}
								on:change={updateCompletionPercentage}
							/>
						</label>
						<input
							class="input"
							title="Detalles"
							type="text"
							bind:value={data.td}
							placeholder="Detalles"
							disabled={!tdChecked}
							on:input={updateCompletionPercentage}
						/>
						<input
							class="input"
							type="date"
							bind:value={data.dateTD}
							disabled={!tdChecked}
							on:input={updateCompletionPercentage}
						/>
					</div>
					<hr />

					<!-- SECCION SR -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<label class="flex items-center space-x-2">
							<span class="label">SR</span>
							<input
								class="checkbox"
								type="checkbox"
								bind:checked={srChecked}
								on:change={updateCompletionPercentage}
							/>
						</label>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Detalles"
							bind:value={data.sr}
							disabled={!srChecked}
							on:input={updateCompletionPercentage}
						/>
						<input
							class="input"
							type="date"
							bind:value={data.dateSR}
							disabled={!srChecked}
							on:input={updateCompletionPercentage}
						/>
					</div>
					<hr />

					<!-- Influenza Estacionaria -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<label class="flex items-center space-x-2">
							<span class="label">Influenza Estacionaria</span>
							<input
								class="checkbox"
								type="checkbox"
								bind:checked={influenzaChecked}
								on:change={updateCompletionPercentage}
							/>
						</label>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Detalles"
							bind:value={data.influenza}
							disabled={!influenzaChecked}
							on:input={updateCompletionPercentage}
						/>
						<input
							class="input"
							type="date"
							bind:value={data.dateInfluenza}
							disabled={!influenzaChecked}
							on:input={updateCompletionPercentage}
						/>
					</div>
					<hr />

					<!-- Uso Cartilla -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<label class="flex items-center space-x-2">
							<span class="label">Uso Cartilla</span>
							<input
								class="checkbox"
								type="checkbox"
								bind:checked={cartillaChecked}
								on:change={updateCompletionPercentage}
							/>
						</label>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Detalles"
							bind:value={data.cartilla}
							disabled={!cartillaChecked}
							on:input={updateCompletionPercentage}
						/>
						<input
							class="input"
							type="date"
							bind:value={data.dateCartilla}
							disabled={!cartillaChecked}
							on:input={updateCompletionPercentage}
						/>
					</div>
					<hr />

					<!-- Drogas -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<label class="flex items-center space-x-2">
							<span class="label">Drogas</span>
							<input
								class="checkbox"
								type="checkbox"
								bind:checked={drogasChecked}
								on:change={updateCompletionPercentage}
							/>
						</label>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Detalles"
							bind:value={data.drogas}
							disabled={!drogasChecked}
							on:input={updateCompletionPercentage}
						/>
						<input
							class="input"
							type="date"
							bind:value={data.dateDrogas}
							disabled={!drogasChecked}
							on:input={updateCompletionPercentage}
						/>
					</div>
					<hr />

					<!-- Otros -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<label class="flex items-center space-x-2">
							<span class="label">Otros</span>
							<input
								class="checkbox"
								type="checkbox"
								bind:checked={otrosChecked}
								on:change={updateCompletionPercentage}
							/>
						</label>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Detalles"
							bind:value={data.otros}
							disabled={!otrosChecked}
							on:input={updateCompletionPercentage}
						/>
						<input
							class="input"
							type="date"
							bind:value={data.dateOtros}
							disabled={!otrosChecked}
							on:input={updateCompletionPercentage}
						/>
					</div>
					<hr />
					<label class="label">
						<span>Observaciones Extra</span>
						<input
							class="input"
							type="text"
							placeholder="Observaciones"
							bind:value={data.extras}
							on:input={updateCompletionPercentage}
						/>
					</label>

					<!-- Subir Archivos -->
					<hr />

					<p>Documentos</p>
					<div class="btn-group variant-ringed w-full">
						<FileButton name="files" button="" width="w-full">
							Subir
							<i class="fa-solid fa-file-arrow-up ml-2"></i>
						</FileButton>
						<button type="button" class="w-full btn variant-soft">
							Descargar
							<i class="fa-solid fa-file-arrow-down ml-2"></i>
						</button>
					</div>

					<!-- Botones de Formularios -->
					<hr />
					<div class="flex flex-row w-full justify-between">
						<button type="button" class="btn variant-ringed">Borrar</button>
						<button type="button" on:click={handleSubmit} class="btn variant-soft">Enviar</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
