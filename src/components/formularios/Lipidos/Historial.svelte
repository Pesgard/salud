<script>
	//Tabla
	let tableArr = [
		{ Fecha: 'dd/mm/yyyy', HDL: 0, Colesterol:0, Trigliceridos:0 , Glucosa:0, Otros: "Info", Farmacos: "Dato ejemplo", Observaciones:"Datos" },
		{ Fecha: 'dd/mm/yyyy', HDL: 0, Colesterol:0, Trigliceridos:0 , Glucosa:0, Otros: "Info", Farmacos: "Dato ejemplo", Observaciones:"Datos" },
		{ Fecha: 'dd/mm/yyyy', HDL: 0, Colesterol:0, Trigliceridos:0 , Glucosa:0, Otros: "Info", Farmacos: "Dato ejemplo", Observaciones:"Datos" },
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
				<h2 class="text-2xl">Lipidos</h2>
				<h3 class="text-lg">Historial</h3>
			</div>
			<div class="md:inline md:ml-4">
				<button class="btn space-x-4 variant-soft hover:variant-soft-primary">
					<i class="fa-solid fa-magnifying-glass text-sm"></i>
					<small class="hidden md:inline-block">Buscar Pacientes</small>
				</button>
			</div>
		</header>

		<hr />
		<div class="table-container previewer-header p-4 flex justify-between items-center gap-4">
			<!-- Native Table Element -->
			<table class="table table-hover scroll-m-0">
				<thead>
					<tr>
						<th>Fecha</th>
						<th>HDL</th>
						<th>Colesterol</th>
						<th>Trigliceridos</th>
						<th>Glucosa</th>
						<th>Otros</th>
						<th>Farmacos</th>
						<th>Observaciones</th>
					</tr>
				</thead>
				<tbody>
					{#each tableArr as row, i}
						<tr>
							<td>{row.Fecha}</td>
							<td>{row.HDL}</td>
							<td>{row.Colesterol}</td>
							<td>{row.Trigliceridos}</td>
							<td>{row.Glucosa}</td>
							<td>{row.Otros}</td>
							<td>{row.Farmacos}</td>
							<td>{row.Observaciones}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
