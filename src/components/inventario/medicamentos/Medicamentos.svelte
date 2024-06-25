<script lang="ts">
	import { DataHandler } from '@vincjo/datatables';
	import Search from '../../../components/pacientes/dataTable/Search.svelte';
	import RowsPerPage from '../../../components/pacientes/dataTable/RowsPerPage.svelte';
	import RowCount from '../../../components/pacientes/dataTable/RowCount.svelte';
	import Pagination from '../../../components/pacientes/dataTable/Pagination.svelte';
	import ThFilter from '../../../components/pacientes/dataTable/ThFilter.svelte';
	import ThSort from '../../../components/pacientes/dataTable/ThSort.svelte';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import CrearMedicamento from './modals/CrearMedicamento.svelte';

	// Data
	export let data;
	$: ({ medicamentos } = data);

	let api = data.medicamentos;
	// console.log(api);

	const handler = new DataHandler(api, { rowsPerPage: 5 });
	const rows = handler.getRows();

    // Modal
    const modalStore = getModalStore();
    const modalComponent = {
        ref: CrearMedicamento,
        props: {}
    };

    // modal Settings
    const modal: ModalSettings = {
        type:'component',
        component: modalComponent,
        response(r) {
            console.log('response:', r);
        },
    };

    // Open Modal
    function openModal() {
        modalStore.trigger(modal);
    }

</script>

<!-- <Tabla/> -->
<div class="table-container p-4 w-full text-token space-y-4">
	<header class="flex justify-between gap-4">
		<Search {handler} />
		<div class="flex flex-row gap-8">
			<RowsPerPage {handler} />
			<button class="btn variant-filled-surface hover:variant-soft-primary" on:click={openModal}>
				<i class="fa-solid fa-plus" />
			</button>
		</div>
	</header>
	<table class="table table-hover table-compact table-auto w-full">
		<thead>
			<tr>
				<ThSort {handler} orderBy="pacienteID">Nombre</ThSort>
				<ThSort {handler} orderBy="firstName">Ingrediente</ThSort>
				<ThSort {handler} orderBy="lastName">Gramaje</ThSort>
				<th>Acciones</th>
			</tr>
			<tr>
				<ThFilter {handler} filterBy="pacienteID" />
				<ThFilter {handler} filterBy="firstName" />
				<ThFilter {handler} filterBy="lastName" />
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
