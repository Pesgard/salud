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
	import EditarMedicamento from './modals/EditarMedicamento.svelte';

	// Data
	export let data;

	let api = data.medicamentos;
	console.log(api);

	const handler = new DataHandler(api, { rowsPerPage: 5 });
	const rows = handler.getRows();

	// Modal
	const modalStore = getModalStore();

	// ---------------------------- Modal Crear Medicamenteo ----------------------------
	const modalComponent = {
		ref: CrearMedicamento,
		props: {}
	};

	// modal Settings
	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		
		response(r) {
			console.log('response:', r);
		}
	};

	// Open Modal
	function openModal() {
		modalStore.trigger(modal);
	}

	// ----------------------------------------------------------------

	// ---------------------------- Modal Detalles Medicmanto ----------------------------

	function openModalDetalles(medicamento: any) {

		const modalComponentDetalles = {
			ref: EditarMedicamento,
			props: { medicamento }
		};

		// modal Settings
		const modalDetalles: ModalSettings = {
			type: 'component',
			component: modalComponentDetalles,
			title: 'Detalles Medicamento',
			body: 'Formulario para editar un medicamento.',
			response(r) {
				console.log('response:', r);
			}
		};

		modalStore.trigger(modalDetalles);
		// console.log(medicamento);
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
				<ThSort {handler} orderBy="nombre">Nombre</ThSort>
				<ThSort {handler} orderBy="ingredienteActivo">Ingrediente</ThSort>
				<ThSort {handler} orderBy="gramaje">Gramaje</ThSort>
				<th>Acciones</th>
			</tr>
			<tr>
				<ThFilter {handler} filterBy="nombre" />
				<ThFilter {handler} filterBy="ingredienteActivo" />
				<ThFilter {handler} filterBy="gramaje" />
				<th class="text-sm text-surface-400">Ver detalles</th>
			</tr>
		</thead>
		<tbody>
			{#each $rows as row, index}
				<tr>
					<td>{row.nombre}</td>
					<td>{row.ingredienteActivo}</td>
					<td>{row.gramaje + ' ' + row.tipo}</td>
					<td>
						<button
							class="btn variant-filled-surface hover:variant-soft-primary"
							on:click={() => openModalDetalles(api[index])}
						>
							<i class="fa-solid fa-circle-info"></i>
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
