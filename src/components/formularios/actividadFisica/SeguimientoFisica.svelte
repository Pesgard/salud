<script lang="ts">
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import type { FisicaFormulario } from '../../../interface/Formularios';

	// recibir valores de pacientes
	export let data: FisicaFormulario;
	console.log(data);

	const nombrePaciente = data.pacienteNombre.firstName + ' ' + data.pacienteNombre.lastName;

	let completionPercentage: number = 0;

	// Variables para el estado de los checkboxes
	let deportesChecked = false;	
	let otrosChecked = false;

	// Actualizar el estado de los checkboxes basado en la presencia de datos
	deportesChecked =
		data.deporte !== null || data.deporteInicio !== null || data.deporteFinal !== null;
	otrosChecked = data.otros !== null || data.otrosInicio !== null || data.otrosFinal !== null;

	$: {
		let totalFields = 0;
		let filledFields = 0;

		// Calcular totalFields y filledFields basado en el estado de los checkboxes y la presencia de datos
		if (deportesChecked) {
			totalFields += 3;
			if (data.deporte) filledFields++;
			if (data.deporteInicio) filledFields++;
			if (data.deporteFinal) filledFields++;
		}

		if (otrosChecked) {
			totalFields += 3;
			if (data.otros) filledFields++;
			if (data.otrosInicio) filledFields++;
			if (data.otrosFinal) filledFields++;
		}

		// calcular el porcentaje
		completionPercentage = totalFields === 0 ? 0 : Math.round((filledFields / totalFields) * 100);
	}

	//Funcion para enviar la informacion del formulario
	async function sendFormulario(data: FisicaFormulario, tableName: string, porcentaje: number) {
		const response = await fetch('/api/formularios/post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ data, tableName, porcentaje })
		});

		// Si el fetching da error
		if (!response.ok) {
			const errorData = await response.json();
			console.error('Error', errorData);

			return null;
		}

		// Si el fetching es exitoso
		const result = await response.json();
		alert(result.info);
		// redireccionar a la pagina del formulario
		window.location.href = '/dashboard/seguimientos';
		return result;
	}

	// Funcion para enviar el formulario
	function handleSubmit(event: Event) {
		event.preventDefault();

		delete data.pacienteNombre;
		sendFormulario(data, 'actividadFisica', completionPercentage);
	}
</script>

<div class="space-y-10 m-20">
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
				<h2 class="text-2xl">Actividad Fisica</h2>
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
					<!-- id del paciente -->
					<label class="label" hidden>
						<span>ID del Paciente</span>
						<input class="input" type="number" bind:value={data.pacienteID} />
					</label>

					<!--Deportes -->
					<label class="flex items-center space-x-2 justify-center w-full">
						<span class="label h3">Deportes</span>
						<input class="checkbox" type="checkbox" bind:checked={deportesChecked} />
					</label>
					<div class="flex flex-cols-2 gap-4 items-center justify-between w-full">
						<!-- SECCION Deportes -->
						<div class="col-span-2 flex flex-col gap-4">
							<span class="label flex flex-row w-full justify-center text-xl font-bold">Fecha</span>
							<label class="flex items-center space-x-2">
								<input
									class="input"
									type="date"
									disabled={!deportesChecked}
									bind:value={data.deporte}
								/>
							</label>
						</div>

						<!--Seccion Periodo-->
						<div class="col-span-2 grid grid-cols-1 gap-4">
							<!-- Input para el título de la sección -->
							<div class="flex flex-col items-center">
								<span class="label text-xl font-bold">Periodo</span>
							</div>
							<!-- Primer input con label "Desde" -->
							<div class="flex flex-col items-center">
								<label for="desde" class="label">Desde</label>
								<input
									id="desde"
									class="input"
									type="date"
									disabled={!deportesChecked}
									bind:value={data.deporteInicio}
								/>
							</div>
							<!-- Segundo input con label "Hasta" -->
							<div class="flex flex-col items-center">
								<label for="hasta" class="label">Hasta</label>
								<input
									id="hasta"
									class="input"
									type="date"
									disabled={!deportesChecked}
									bind:value={data.deporteFinal}
								/>
							</div>
						</div>
					</div>

					<hr />

					<!--Deportes -->
					<label class="flex items-center space-x-2 justify-center w-full">
						<span class="label h3">Otros</span>
						<input class="checkbox" type="checkbox" bind:checked={otrosChecked} />
					</label>
					<div class="flex flex-cols-2 gap-4 items-center justify-between w-full">
						<!-- SECCION Otros -->
						<div class="col-span-2 flex flex-col gap-4">
							<span class="label w-full flex flex-row justify-center text-xl font-bold">Fecha</span>
							<label class="flex items-center space-x-2">
								<input class="input" type="date" disabled={!otrosChecked} bind:value={data.otros} />
							</label>
						</div>

						<!--Seccion Periodo-->
						<div class="col-span-2 grid grid-cols-1 gap-4">
							<!-- Input para el título de la sección -->
							<div class="flex flex-col items-center">
								<span class="label text-xl font-bold">Periodo</span>
							</div>
							<!-- Primer input con label "Desde" -->
							<div class="flex flex-col items-center">
								<label for="desde" class="label">Desde</label>
								<input
									id="desde"
									class="input"
									type="date"
									disabled={!otrosChecked}
									bind:value={data.otrosInicio}
								/>
							</div>
							<!-- Segundo input con label "Hasta" -->
							<div class="flex flex-col items-center">
								<label for="hasta" class="label">Hasta</label>
								<input
									id="hasta"
									class="input"
									type="date"
									disabled={!otrosChecked}
									bind:value={data.otrosFinal}
								/>
							</div>
						</div>
					</div>

					<hr />

					<!--Observaciones Extra-->
					<label class="label">
						<span>Observaciones Extra</span>
						<input class="input" type="text" placeholder="Observaciones" bind:value={data.extra} />
					</label>

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
