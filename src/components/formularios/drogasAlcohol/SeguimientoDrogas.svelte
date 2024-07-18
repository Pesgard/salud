<script lang="ts">
	import type { DrogasFormularios } from '../../../interface/Formularios';

	import { FileButton, ProgressRadial } from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	export let data: DrogasFormularios; // Propiedad para recibir los pacientes
    console.log(data);

	let nombrePaciente: string = data.pacienteNombre.firstName + ' ' + data.pacienteNombre.lastName; // Valor inicial de nombrePaciente

	// Variables para el estado de los checkboxes
	//actualizar el estado de los checkboxes
	let drogasChecked = data.drogas ? true : false;
	let alcoholChecked = data.alcohol ? true : false;
	let otrosChecked = data.otros ? true : false;

	let completionPercentage: number = 0;

	$: {
		let totalFields = 0;
		let filledFields = 0;

		if (drogasChecked) {
			totalFields += 2;
			if (data.drogas) filledFields++;
			if (data.drogasDate) filledFields++;
		}

		if (alcoholChecked) {
			totalFields += 2;
			if (data.alcohol) filledFields++;
			if (data.alcoholDate) filledFields++;
		}

		if (otrosChecked) {
			totalFields += 2;
			if (data.otros) filledFields++;
			if (data.otrosDate) filledFields++;
		}

		if (!data.informo) totalFields++;

		// Calcular el porcentaje
		completionPercentage = totalFields === 0 ? 0 : Math.round((filledFields / totalFields) * 100);
	}

	// funcion para hacer el POST de los datos de manera asincrona
	async function postDrogas(data: DrogasFormularios, tableName: string, porcentaje: number) {
		try {
			const response = await fetch('/api/formularios/post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ data, tableName, porcentaje })
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
			window.location.reload();
			return result;
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	}
	function handleSubmit(event: Event) {
		event.preventDefault();
		// console.log(data);
		delete data.pacienteNombre;
		postDrogas(data, 'drogas', completionPercentage);
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
