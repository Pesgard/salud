<script lang="ts">
	import { FileButton, getModalStore, ProgressRadial } from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import type { LipidosFormulario } from '../../../interface/Formularios';

	// parametro de componente
	export let data: LipidosFormulario;
	console.log(data);

	// check para habilitar y deshabilitar campos
	let check = true;

	let nombrePaciente: string = data.pacienteNombre.firstName + ' ' + data.pacienteNombre.lastName;

	let completionPercentage = 0;
	$: {
		let totalFields = 0;
		let filledFields = 0;

		// Calcular totalFields y filledFields basado en la presencia de datos
		if (data.date) filledFields++;
		totalFields++;
		if (data.hdl) filledFields++;
		totalFields++;
		if (data.colesterol) filledFields++;
		totalFields++;
		if (data.trigliceridos) filledFields++;
		totalFields++;
		if (data.glucosa) filledFields++;
		totalFields++;
		// if (data.otros) filledFields++;
		// totalFields++;
		if (data.farmacos) filledFields++;
		totalFields++;
		// if (data.extra) filledFields++;
		// totalFields++;

		// Calcular el porcentaje de completitud
		completionPercentage = totalFields === 0 ? 0 : Math.round((filledFields / totalFields) * 100);
	}

	async function postLipidos(data: LipidosFormulario, tableName: string, porcentaje: number) {
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
			alert(responseData.info);
			// redireccionar a la pagina del formulario
			window.location.href = '/dashboard/seguimientos';
			return responseData;
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	}

	//funcion para el envio de datos de formulario
	function handleSubmit(event: Event) {
		event.preventDefault();
		delete data.pacienteNombre;
		postLipidos(data, 'lipidos', completionPercentage);
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
				<h2 class="text-2xl">Lipidos</h2>
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
					<!-- SECCION Fecha -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label flex items-center space-x-2">Fecha</span>
						<input class="input" type="date" disabled={!check} bind:value={data.date} />
					</div>
					<hr />

					<!-- SECCION HDL -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label">HDL</span>
						<input
							class="input"
							title="Detalles"
							type="number"
							placeholder="Detalles"
							disabled={!check}
							bind:value={data.hdl}
						/>
					</div>
					<hr />

					<!-- Colesterol -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label">Colesterol</span>
						<input
							class="input"
							title="Detalles"
							type="number"
							placeholder="Detalles"
							disabled={!check}
							bind:value={data.colesterol}
						/>
					</div>
					<hr />

					<!-- Trigliceridos -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label">Trigliceridos</span>
						<input
							class="input"
							title="Detalles"
							type="number"
							placeholder="Detalles"
							disabled={!check}
							bind:value={data.trigliceridos}
						/>
					</div>
					<hr />

					<!-- Glucosa -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label">Glucosa</span>
						<input
							class="input"
							title="Detalles"
							type="number"
							placeholder="Detalles"
							disabled={!check}
							bind:value={data.glucosa}
						/>
					</div>
					<hr />

					<!-- Otros -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label">Otros</span>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Detalles"
							disabled={!check}
							bind:value={data.otros}
						/>
					</div>
					<hr />

					<!-- Otros -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label">Farmacos</span>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Detalles"
							disabled={!check}
							bind:value={data.farmacos}
						/>
					</div>
					<hr />

					<label class="label">
						<span>Observaciones Extra</span>
						<input
							class="input"
							type="text"
							placeholder="Observaciones"
							disabled={!check}
							bind:value={data.extra}
						/>
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
