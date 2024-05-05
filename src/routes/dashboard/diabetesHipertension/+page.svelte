<script>
	//Libreria
	import { TabGroup, Tab, FileButton, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	//Formularios
	import Diabetes from '$lib/Diabetes/Diabetes.svelte';
	import Glucosa from '../../../lib/Diabetes/Glucosa.svelte';
	import Presion from '../../../lib/Diabetes/Presion.svelte';

	let value = 0;
	// Tabs
	let tabSet = 0;

	//Tabla Historia Glucosa
	let tableArr = [
		{ Fecha: 'dd/mm/yyyy', Glucosa: 0 },
		{ Fecha: 'dd/mm/yyyy', Glucosa: 0 },
		{ Fecha: 'dd/mm/yyyy', Glucosa: 2 }
	];
</script>

<!-- breadcrumb -->
<ol class="breadcrumb m-4">
	<li class="crumb"><a class="anchor" href="/dashboard">Inicio</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Diabetes / Hipertension</li>
</ol>

<!-- Contenedor -->
<div class="max-w-full mx-auto space-y-4 flex flex-col items-center justify-center">
	<TabGroup>
		<Tab bind:group={tabSet} name="tab1" value={0}>
			<svelte:fragment slot="lead">Diabetes / Hipertension</svelte:fragment>
		</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>Glucosa</Tab>
		<Tab bind:group={tabSet} name="tab3" value={2}>Presion</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<!-- FOrmulario de Diabetes / Hipertension-->
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
								<button class="btn space-x-4 variant-soft hover:variant-soft-primary">
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
									<!-- SECCION Fecha -->
									<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
										<p class="flex items-center space-x-2">
											<span class="label">Fecha</span>
										</p>
										<input class="input" type="date" />
									</div>
									<hr />

									<!-- SECCION Resultado -->
									<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
										<p class="flex items-center space-x-2">
											<span class="label">Paciente</span>
										</p>
										<RadioGroup>
											<RadioItem bind:group={value} name="justify" value={0}>Sano</RadioItem>
											<RadioItem bind:group={value} name="justify" value={1}>Hipertenso</RadioItem>
											<RadioItem bind:group={value} name="justify" value={2}>Diabetico</RadioItem>
										</RadioGroup>
									</div>
									<hr />

									<!-- Farmacos -->
									<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
										<p class="flex items-center space-x-2">
											<span class="label">Farmacos</span>
										</p>
										<input class="input" title="Detalles" type="text" placeholder="Farmacos" />
									</div>
									<hr />

									<!--Seccion Observaciones-->
									<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
										<p class="flex items-center space-x-2">
											<span class="label">Observaciones</span>
										</p>
										<input class="input" title="Detalles" type="text" placeholder="Observaciones" />
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
										<button type="button" class="btn variant-soft">Enviar</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{:else if tabSet === 1}
				<div id="panels" class="space-y-10 mb-10">
					<div
						class="previewer shadow-2xl shadow-surface-500/10 dark:shadow-black/10 rounded-container-token overflow-hidden"
					>
						<!-- Header -->
						<header
							class="previewer-header bg-surface-200-700-token p-4 flex justify-between items-center gap-4"
						>
							<div
								class="radio-group p-1 inline-flex flex-col gap-1 bg-surface-200-700-token border-surface-400-500-token rounded-token"
							>
								<h2 class="text-2xl">Diabetes / Hipertension</h2>
								<h3 class="text-lg">Glucosa</h3>
							</div>
							<div class="md:inline md:ml-4">
								<button class="btn space-x-4 variant-soft hover:variant-soft-primary">
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
									<!-- SECCION Fecha -->
									<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
										<p class="flex items-center space-x-2">
											<span class="label">Fecha</span>
										</p>
										<input class="input" type="date" />
									</div>
									<hr />

									<!-- Seccion Glucosa -->
									<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
										<p class="flex items-center space-x-2">
											<span class="label">Glucosa</span>
										</p>
										<input class="input" title="Resultado" type="text" placeholder="Resultado" />
									</div>

									<!-- Botones de Formularios -->
									<hr />
									<div class="flex flex-row w-full justify-between">
										<button type="button" class="btn variant-ringed">Borrar</button>
										<button type="button" class="btn variant-soft">Enviar</button>
									</div>
								</div>
							</div>
						</div>

						<hr />
						<!-- Tabla de Historial (recommended) -->
						<h2 class="flex flex-row justify-center items-center w-full text-2xl mt-2">
							Historial del Paciente
						</h2>
						<div
							class="table-container previewer-header p-4 flex justify-between items-center gap-4"
						>
							<!-- Native Table Element -->
							<table class="table table-hover scroll-m-0">
								<thead>
									<tr>
										<th>Fecha</th>
										<th>Glucosa</th>
									</tr>
								</thead>
								<tbody>
									{#each tableArr as row, i}
										<tr>
											<td>{row.Fecha}</td>
											<td>{row.Glucosa}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			{:else if tabSet === 2}
				<div id="panels" class="space-y-10 mb-10">
					<div
						class="previewer shadow-2xl shadow-surface-500/10 dark:shadow-black/10 rounded-container-token overflow-hidden"
					>
						<!-- Header -->
						<header
							class="previewer-header bg-surface-200-700-token p-4 flex justify-between items-center gap-4"
						>
							<div
								class="radio-group p-1 inline-flex flex-col gap-1 bg-surface-200-700-token border-surface-400-500-token rounded-token"
							>
								<h2 class="text-2xl">Diabetes / Hipertension</h2>
								<h3 class="text-lg">Presion</h3>
							</div>
							<div class="md:inline md:ml-4">
								<button class="btn space-x-4 variant-soft hover:variant-soft-primary">
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
									<!-- SECCION Fecha -->
									<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
										<p class="flex items-center space-x-2">
											<span class="label">Fecha</span>
										</p>
										<input class="input" type="date" />
									</div>
									<hr />

									<!-- Seccion Presion -->
									<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
										<p class="flex items-center space-x-2">
											<span class="label">Presion</span>
										</p>
										<input class="input" title="Resultado" type="text" placeholder="Resultado" />
									</div>

									<!-- Botones de Formularios -->
									<hr />
									<div class="flex flex-row w-full justify-between">
										<button type="button" class="btn variant-ringed">Borrar</button>
										<button type="button" class="btn variant-soft">Enviar</button>
									</div>
								</div>
							</div>
						</div>

						<hr />
						<!-- Tabla de Historial (recommended) -->
						<h2 class="flex flex-row justify-center items-center w-full text-2xl mt-2">
							Historial del Paciente
						</h2>
						<div
							class="table-container previewer-header p-4 flex justify-between items-center gap-4"
						>
							<!-- Native Table Element -->
							<table class="table table-hover scroll-m-0">
								<thead>
									<tr>
										<th>Fecha</th>
										<th>Glucosa</th>
									</tr>
								</thead>
								<tbody>
									{#each tableArr as row, i}
										<tr>
											<td>{row.Fecha}</td>
											<td>{row.Glucosa}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
