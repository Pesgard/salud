<script lang="ts">
	import { DataHandler } from '@vincjo/datatables';
	import Search from '../../../components/pacientes/dataTable/Search.svelte';
	import RowsPerPage from '../../../components/pacientes/dataTable/RowsPerPage.svelte';
	import RowCount from '../../../components/pacientes/dataTable/RowCount.svelte';
	import Pagination from '../../../components/pacientes/dataTable/Pagination.svelte';
	import ThFilter from '../../../components/pacientes/dataTable/ThFilter.svelte';
	import ThSort from '../../../components/pacientes/dataTable/ThSort.svelte';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import CrearBotiquin from './modals/CrearBotiquin.svelte';
	import EditarBotiquin from './modals/EditarBotiquin.svelte';
	import EliminarBotiquin from './modals/EliminarBotiquin.svelte';

	// Data
	export let data;

	let botiquines = data.botiquines;
	let medicamentos = data.medicamentos;
	console.log(botiquines);

	const handler = new DataHandler(botiquines, { rowsPerPage: 5 });
	const rows = handler.getRows();

	const modalStore = getModalStore();

	// Crear Botiquin Modal
	function crearBotiquinModal() {
		const modalComponent = {
			ref: CrearBotiquin,
			props: { medicamentos: medicamentos }
		};

		// modal Settings
		const modal: ModalSettings = {
			type: 'component',
			title: 'Crear Botiquin',
			body: 'Formulario para crear un nuevo botiquin.',
			component: modalComponent,
			response(r) {
				console.log('response:', r);
			}
		};
		modalStore.trigger(modal);
	}

	function editarBotiquinModal(botiquinData: any) {
		//  console.log(botiquinData);
		const modalComponent = {
			ref: EditarBotiquin,
			props: { botiquin: botiquinData, medicamentos: medicamentos }
		};

		const modalDetalles: ModalSettings = {
			type: 'component',
			title: 'Detalles Botiquin',
			body: 'Formulario para editar el botiquin.',
			component: modalComponent,
			response(r) {
				console.log('response:', r);
			}
		};
		modalStore.trigger(modalDetalles);
	}

	function deleteBotiquin(id: number) {
		const modalComponent = {
			ref: EliminarBotiquin,
			props: { idBotiquin: id }
		};

		const modalDetalles: ModalSettings = {
			type: 'component',
			title: 'Eliminar Botiquin',
			body: '¿Deseas eliminar el botiquin?',
			component: modalComponent,
			response(r) {
				console.log('response:', r);
			}
		};
		modalStore.trigger(modalDetalles);
	}
</script>

<!-- <Tabla/> -->
<div class="table-container p-4 w-full text-token space-y-4">
	<header class="flex justify-between gap-4">
		<Search {handler} />
		<div class="flex flex-row gap-8">
			<RowsPerPage {handler} />
			<button
				class="btn variant-filled-surface hover:variant-soft-primary"
				on:click={crearBotiquinModal}
			>
				<span>Crear Botiquin</span>
				<i class="fa-solid fa-plus" />
			</button>

			<a href='inventario/botiquines' class="btn variant-ringed-surface hover:variant-soft-primary">
				<span>Imprimir</span>
				<i class="fa-solid fa-print" />
			</a>
		</div>
	</header>
	<table class="table table-hover table-compact table-auto w-full">
		<thead>
			<tr>
				<ThSort {handler} orderBy="id">No.</ThSort>
				<ThSort {handler} orderBy="zona">Zona</ThSort>
				<th>Acciones</th>
				<th></th>
			</tr>
			<tr>
				<ThFilter {handler} filterBy="id" />
				<ThFilter {handler} filterBy="zona" />
				<th class="text-sm text-surface-400">Ver detalles</th>
				<th class="text-sm text-surface-400">Eliminar</th>
			</tr>
		</thead>
		<tbody>
			{#each $rows as row, index}
				<tr>
					<td>{row.id}</td>
					<td>{row.zona}</td>
					<td>
						<button
							class="btn variant-filled-surface hover:variant-soft-primary"
							on:click={() => editarBotiquinModal(botiquines[index])}
						>
							<i class="fa-solid fa-edit" />
						</button>
					</td>
					<!-- eliminar Botiquin -->
					<td>
						<button class="btn variant-filled-error" 
						on:click={() => deleteBotiquin(row.id)}>
							<i class="fa-solid fa-trash" />
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
