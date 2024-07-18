<script lang="ts">
	import { FileButton, ProgressRadial } from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import type { CursosSeguridadFormulario } from '../../../interface/Formularios';
	export let data: CursosSeguridadFormulario; // Propiedad para recibir los pacientes

	let nombrePaciente: string = '';
	let completionPercentage: number = 0;

	$: {
		let totalFields = 0;
		let filledFields = 0;

		// Calcular totalFields y filledFields basado en el estado de los checkboxes y la presencia de datos
		if (primerosAuxiliosChecked) {
			totalFields += 2;
			if (data.auxilios) filledFields++;
			if (data.auxilios_rfc) filledFields++;
		}
		if (rcpChecked) {
			totalFields += 2;
			if (data.rcp) filledFields++;
			if (data.rcp_rfc) filledFields++;
		}
		if (incendiosChecked) {
			totalFields += 2;
			if (data.incendios) filledFields++;
			if (data.incendios_rfc) filledFields++;
		}
		if (espaciosConfinadosChecked) {
			totalFields += 2;
			if (data.confinados) filledFields++;
			if (data.confinados_rfc) filledFields++;
		}
		if (otros1Checked) {
			totalFields += 2;
			if (data.otros1) filledFields++;
			if (data.otros1_rfc) filledFields++;
		}
		if (otros2Checked) {
			totalFields += 2;
			if (data.otros2) filledFields++;
			if (data.otros2_rfc) filledFields++;
		}
		if (otros3Checked) {
			totalFields += 2;
			if (data.otros3) filledFields++;
			if (data.otros3_rfc) filledFields++;
		}

		completionPercentage = totalFields === 0 ? 0 : Math.round((filledFields / totalFields) * 100);
	}

	// Variables para el estado de los checkboxes
	// actualizar el estado de los checks
	let primerosAuxiliosChecked = data.auxilios ? true : false;
	let rcpChecked = data.rcp ? true : false;
	let incendiosChecked = data.incendios ? true : false;
	let espaciosConfinadosChecked = data.confinados ? true : false;
	let otros1Checked = data.otros1 ? true : false;
	let otros2Checked = data.otros2 ? true : false;
	let otros3Checked = data.otros3 ? true : false;

	async function postSeguridad(
		data: CursosSeguridadFormulario,
		tableName: string,
		porcentaje: number
	) {
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

			// mostrar la noticion de cambios
			alert(responseData.info);
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
		postSeguridad(data, 'seguridad', completionPercentage);
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
				<h2 class="text-2xl">Cursos de Seguiridad</h2>
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
					<!-- SECCION Primeros Auxilios -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<label class="flex items-center space-x-2">
							<span class="label">Primeros Auxilios</span>
							<input class="checkbox" type="checkbox" bind:checked={primerosAuxiliosChecked} />
						</label>
						<input
							class="input"
							type="date"
							disabled={!primerosAuxiliosChecked}
							bind:value={data.auxilios}
						/>
						<label class="flex items-center space-x-2">
							<span class="label">DC3 RFC</span>
							<input
								class="input"
								type="text"
								disabled={!primerosAuxiliosChecked}
								bind:value={data.auxilios_rfc}
							/>
						</label>
					</div>
					<hr />

					<!-- SECCION RCP -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<label class="flex items-center space-x-2">
							<span class="label">RCP</span>
							<input class="checkbox" type="checkbox" bind:checked={rcpChecked} />
						</label>
						<input class="input" type="date" disabled={!rcpChecked} bind:value={data.rcp} />
						<label class="flex items-center space-x-2">
							<span class="label">DC3 RFC</span>
							<input class="input" type="text" disabled={!rcpChecked} bind:value={data.rcp_rfc} />
						</label>
					</div>
					<hr />

					<!--- Incendios -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<label class="flex items-center space-x-2">
							<span class="label">Incendios</span>
							<input class="checkbox" type="checkbox" bind:checked={incendiosChecked} />
						</label>
						<input
							class="input"
							type="date"
							disabled={!incendiosChecked}
							bind:value={data.incendios}
						/>
						<label class="flex items-center space-x-2">
							<span class="label">DC3 RFC</span>
							<input
								class="input"
								type="text"
								disabled={!incendiosChecked}
								bind:value={data.incendios_rfc}
							/>
						</label>
					</div>
					<hr />

					<!--- Espacios Confinados -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<label class="flex items-center space-x-2">
							<span class="label">Espacios Confinados</span>
							<input class="checkbox" type="checkbox" bind:checked={espaciosConfinadosChecked} />
						</label>
						<input
							class="input"
							type="date"
							disabled={!espaciosConfinadosChecked}
							bind:value={data.confinados}
						/>
						<label class="flex items-center space-x-2">
							<span class="label">DC3 RFC</span>
							<input
								class="input"
								type="text"
								disabled={!espaciosConfinadosChecked}
								bind:value={data.confinados_rfc}
							/>
						</label>
					</div>
					<hr />

					<!--- Otros -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<label class="flex items-center space-x-2">
							<span class="label">Otros</span>
							<input class="checkbox" type="checkbox" bind:checked={otros1Checked} />
						</label>
						<input class="input" type="date" disabled={!otros1Checked} bind:value={data.otros1} />
						<label class="flex items-center space-x-2">
							<span class="label">DC3 RFC</span>
							<input
								class="input"
								type="text"
								disabled={!otros1Checked}
								bind:value={data.otros1_rfc}
							/>
						</label>
					</div>
					<hr />

					<!--- Otros -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<label class="flex items-center space-x-2">
							<span class="label">Otros</span>
							<input class="checkbox" type="checkbox" bind:checked={otros2Checked} />
						</label>
						<input class="input" type="date" disabled={!otros2Checked} bind:value={data.otros2} />
						<label class="flex items-center space-x-2">
							<span class="label">DC3 RFC</span>
							<input
								class="input"
								type="text"
								disabled={!otros2Checked}
								bind:value={data.otros2_rfc}
							/>
						</label>
					</div>
					<hr />

					<!--- Otros -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<label class="flex items-center space-x-2">
							<span class="label">Otros</span>
							<input class="checkbox" type="checkbox" bind:checked={otros3Checked} />
						</label>
						<input class="input" type="date" disabled={!otros3Checked} bind:value={data.otros3} />
						<label class="flex items-center space-x-2">
							<span class="label">DC3 RFC</span>
							<input
								class="input"
								type="text"
								disabled={!otros3Checked}
								bind:value={data.otros3_rfc}
							/>
						</label>
					</div>
					<hr />

					<label class="label">
						<span>Observaciones Extra</span>
						<input class="input" type="text" placeholder="Observaciones" bind:value={data.extra} />
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
