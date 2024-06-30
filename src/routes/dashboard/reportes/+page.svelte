<script lang="ts">
	import { DataHandler } from '@vincjo/datatables';
	import Search from '../../../components/pacientes/dataTable/Search.svelte';
	import RowsPerPage from '../../../components/pacientes/dataTable/RowsPerPage.svelte';
	import RowCount from '../../../components/pacientes/dataTable/RowCount.svelte';
	import Pagination from '../../../components/pacientes/dataTable/Pagination.svelte';
	import ThFilter from '../../../components/pacientes/dataTable/ThFilter.svelte';
	import ThSort from '../../../components/pacientes/dataTable/ThSort.svelte';
	import {
		getModalStore,
		Modal,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import Tablas from '../../../components/tablas/Tablas.svelte';

	// Data
	export let data;
	$: ({ pacientes, seguimientos } = data);

	const modalStore = getModalStore();

	let api = data.pacientes;
	let porcentajes = data.seguimientos;

	let clavesAExcluir = ['id', 'pacienteID'];

	console.log(porcentajes);

	const handler = new DataHandler(api, { rowsPerPage: 5 });
	const rows = handler.getRows();

	// Función para abrir el modal
	function openModal(pacienteID: string, nombre: string) {
		// Filtrar por pacienteID y convertir valores null a 0 y decimales a enteros
		const porcentajesFiltrados = porcentajes
			.filter((item) => item.pacienteID === pacienteID)
			.map((item) => {
				const newItem = { ...item };
				Object.keys(newItem).forEach((key) => {
					if (newItem[key] === null) newItem[key] = 0;
					if (typeof newItem[key] === 'number') newItem[key] = Math.round(newItem[key]);
				});
				return newItem;
			});

		// console.log(porcentajesFiltrados[0]);

		// Modal
		const modalComponent: ModalComponent = {
			ref: Tablas,
			props: {
				data: porcentajesFiltrados[0],
				excludeKeys: clavesAExcluir,
				tituloTabla: 'Porcentajes de ' + nombre
			} // Usa porcentajesFiltrados aquí
		};

		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent
		};

		modalStore.trigger(modal);
	}
</script>

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
		<a href="reportes/imprimir" class="btn variant-ghost-surface hover:variant-soft-primary">
			<i class="fa-solid fa-print text-sm"></i>
			<small class="hidden md:inline-block">Imprimir</small>
		</a>
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
					<th>Acciones</th>
					<th>Imprimir</th>
				</tr>
				<tr>
					<ThFilter {handler} filterBy="pacienteID" />
					<ThFilter {handler} filterBy="firstName" />
					<th class="text-sm text-surface-400">Ver detalles</th>
					<th class="text-sm text-surface-400">Imprimir</th>
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td>{row.pacienteID}</td>
						<td>{row.firstName + ' ' + row.lastName}</td>
						<td>
							<a
								class="btn space-x-4 variant-filled-surface hover:variant-soft-primary"
								href="reportes/{row.pacienteID}"
							>
								<i class="fa-solid fa-rectangle-list"></i>
							</a>
						</td>
						<td>
							<!-- Botón para imprimir directamente, opcionalmente puede abrir el modal primero -->
							<button
								on:click={() => openModal(row.pacienteID, row.firstName + ' ' + row.lastName)}
								class="btn variant-filled-surface hover:variant-soft-primary"
							>
								<i class="fa-solid fa-print"></i>
							</button>
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
