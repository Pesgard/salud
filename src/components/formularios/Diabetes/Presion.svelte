<script>
	//Tabla
	let tableArr = [
		{ Fecha: 'dd/mm/yyyy', Glucosa: 0 },
		{ Fecha: 'dd/mm/yyyy', Glucosa: 0 },
		{ Fecha: 'dd/mm/yyyy', Glucosa: 2 }
	];
</script>

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
		<div class="table-container previewer-header p-4 flex justify-between items-center gap-4">
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
