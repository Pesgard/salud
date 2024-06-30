<script lang="ts">
	import { DataHandler } from '@vincjo/datatables';
	import Search from '../../../components/pacientes/dataTable/Search.svelte';
	import RowsPerPage from '../../../components/pacientes/dataTable/RowsPerPage.svelte';
	import RowCount from '../../../components/pacientes/dataTable/RowCount.svelte';
	import Pagination from '../../../components/pacientes/dataTable/Pagination.svelte';
	import ThFilter from '../../../components/pacientes/dataTable/ThFilter.svelte';
	import ThSort from '../../../components/pacientes/dataTable/ThSort.svelte';
	import AgregarPaciente from '../../../components/pacientes/modal/AgregarPaciente.svelte';
	import EditarPaciente from '../../../components/pacientes/modal/EditarPaciente.svelte';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	// Functions
	function modalComponentForm(): void {
		const c: ModalComponent = { ref: AgregarPaciente };
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			title: 'Agregar Paciente',
			body: 'Formulario para agregar un nuevo paciente.',
			response: (r) => {}
		};
		modalStore.trigger(modal);
	}

	// Editar un paciente en un modal
	function modalComponentEdit(info: any) {
		console.log(info);

		const c: ModalComponent = {
			ref: EditarPaciente,
			props: { info }
		};
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			title: 'Editar Paciente',
			body: 'Formulario para editar un paciente.',
			response: (r) => console.log('response:', r) // r is the form data
		};
		modalStore.trigger(modal);
	}

	// Data
	export let data;
	$: ({ pacientes } = data);

	let api = data.pacientes;
	// console.log(api);

	const handler = new DataHandler(api, { rowsPerPage: 5 });
	const rows = handler.getRows();
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
			<h2 class="text-2xl">Pacientes</h2>
		</div>
		<div class="md:inline md:ml-4">
			<button
				on:click={modalComponentForm}
				class="btn space-x-4 variant-filled-surface hover:variant-soft-primary"
			>
				<i class="fa-solid fa-plus text-sm"></i>
				<small class="hidden md:inline-block">Agregar Pacientes</small>
			</button>

			<a href="pacientes/imprimir" class="btn variant-ghost-surface hover:variant-soft-primary">
				<i class="fa-solid fa-print text-sm"></i>
				<small class="hidden md:inline-block">Imprimir</small>
			</a>
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
					<ThSort {handler} orderBy="firstName">Nombre</ThSort>
					<ThSort {handler} orderBy="email">Email</ThSort>
					<th>Acciones</th>
				</tr>
				<tr>
					<ThFilter {handler} filterBy="firstName" />
					<ThFilter {handler} filterBy="email" />
					<th class="text-sm text-surface-400">Ver detalles</th>
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td>{row.firstName + ' ' + row.lastName}</td>
						<td>{row.email}</td>
						<td>
							<button
								on:click={() => modalComponentEdit(row)}
								class="btn variant-filled-surface hover:variant-soft-primary"
							>
								<i class="fa-solid fa-edit text-sm"></i>
							</button></td
						>
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
