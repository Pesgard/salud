<script lang="ts">
	import type { BiologicosFormulario } from '../../../interface/Formularios';
    import { ProgressRadial, FileButton } from '@skeletonlabs/skeleton';

	export let data: BiologicosFormulario;

	// porcentaje de completado del formulario
	let completionPercentage: number = 0;

	// nombre del paciente
	const nombrePaciente = data.pacienteNombre.firstName + ' ' + data.pacienteNombre.lastName;

	// Variables para el estado de los checkboxes
	$: {
		let totalFields = 0;
		let filledFields = 0;

		// Calcular totalFields y filledFields basado en el estado de los checkboxes y la presencia de datos
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

		// Calcular el porcentaje de completitud
		completionPercentage = totalFields === 0 ? 0 : Math.round((filledFields / totalFields) * 100);
	}

	// Variables para el estado de los checkboxes
	let tdChecked = data.td ? true : false;
	let srChecked = data.sr ? true : false;
	let influenzaChecked = data.influenza ? true : false;
	let cartillaChecked = data.cartilla ? true : false;
	let drogasChecked = data.drogas ? true : false;
	let otrosChecked = data.otros ? true : false;

	// funcion para hacer el POST de los datos de manera asincrona
	async function postBiologicos(data: BiologicosFormulario, tableName: string, porcentaje: number) {
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
			window.location.href = '/dashboard/seguimientos';
			return result;
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	}

	function handleSubmit(event: Event) {
		event.preventDefault();
		// console.log(data);
		//eliminar la columna pacienteNombre de data
		delete data.pacienteNombre;
		postBiologicos(data, 'biologicos', completionPercentage);
	}
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
							bind:value={data.pacienteID}
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
							/>
						</label>
						<input
							class="input"
							title="Detalles"
							type="text"
							bind:value={data.td}
							placeholder="Detalles"
							disabled={!tdChecked}
						/>
						<input
							class="input"
							type="date"
							bind:value={data.dateTD}
							disabled={!tdChecked}
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
							/>
						</label>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Detalles"
							bind:value={data.sr}
							disabled={!srChecked}
						/>
						<input
							class="input"
							type="date"
							bind:value={data.dateSR}
							disabled={!srChecked}
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
							/>
						</label>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Detalles"
							bind:value={data.influenza}
							disabled={!influenzaChecked}
						/>
						<input
							class="input"
							type="date"
							bind:value={data.dateInfluenza}
							disabled={!influenzaChecked}
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
							/>
						</label>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Detalles"
							bind:value={data.cartilla}
							disabled={!cartillaChecked}
						/>
						<input
							class="input"
							type="date"
							bind:value={data.dateCartilla}
							disabled={!cartillaChecked}
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
							/>
						</label>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Detalles"
							bind:value={data.drogas}
							disabled={!drogasChecked}
						/>
						<input
							class="input"
							type="date"
							bind:value={data.dateDrogas}
							disabled={!drogasChecked}
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
							/>
						</label>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Detalles"
							bind:value={data.otros}
							disabled={!otrosChecked}
						/>
						<input
							class="input"
							type="date"
							bind:value={data.dateOtros}
							disabled={!otrosChecked}
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