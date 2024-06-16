<script lang="ts">
	import { DataHandler } from '@vincjo/datatables';
	import Search from '../../../components/pacientes/dataTable/Search.svelte';
	import RowsPerPage from '../../../components/pacientes/dataTable/RowsPerPage.svelte';
	import RowCount from '../../../components/pacientes/dataTable/RowCount.svelte';
	import Pagination from '../../../components/pacientes/dataTable/Pagination.svelte';
	import ThFilter from '../../../components/pacientes/dataTable/ThFilter.svelte';
	import ThSort from '../../../components/pacientes/dataTable/ThSort.svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';

	// Data
	export let data;
	$: ({ pacientes } = data);

	let api = data.pacientes;
	console.log(api);

	const handler = new DataHandler(api, { rowsPerPage: 5 });
	const rows = handler.getRows();
</script>

<!-- breadcrumb -->
<ol class="breadcrumb m-4">
	<li class="crumb">Reportes</li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
</ol>

<!-- Contenedor -->
<div class="max-w-full mx-auto space-y-4 flex flex-col items-center justify-center">
	<!-- Header -->
	<header
		class="previewer-header bg-surface-200-700-token p-4 flex justify-between items-center gap-4 w-full"
	>
		<div
			class="radio-group p-1 inline-flex flex-row gap-1 bg-surface-200-700-token border-surface-400-500-token rounded-token"
		>
			<h2 class="text-2xl">Reportes</h2>
		</div>
	</header>

	<!-- <Tabla/> -->
	<div class="table-container p-4 w-full text-token space-y-4">
		<header class="flex justify-between gap-4">
			<Search {handler} />
			<RowsPerPage {handler} />
		</header>
		<table class="table table-hover table-compact table-auto w-full">
			<thead>
				<tr>
					<ThSort {handler} orderBy="pacienteID">No</ThSort>
					<ThSort {handler} orderBy="firstName">Nombre</ThSort>
					<ThSort {handler} orderBy="lastName">Apellido</ThSort>
					<ThSort {handler} orderBy="email">Email</ThSort>
					<th>Acciones</th>
				</tr>
				<tr>
					<ThFilter {handler} filterBy="pacienteID" />
					<ThFilter {handler} filterBy="firstName" />
					<ThFilter {handler} filterBy="lastName" />
					<ThFilter {handler} filterBy="email" />
					<th class="text-sm text-surface-400">Ver detalles</th>
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td>{row.pacienteID}</td>
						<td>{row.firstName}</td>
						<td>{row.lastName}</td>
						<td>{row.email}</td>
						<td>
							<a
								class="btn space-x-4 variant-filled-surface hover:variant-soft-primary"
								href="reportes/{row.pacienteID}"
							>
								<i class="fa-solid fa-rectangle-list"></i>
							</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<footer class="flex justify-between">
			<RowCount {handler} />
			<Pagination {handler} />
		</footer>
	</div>
</div>
