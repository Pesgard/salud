<script lang="ts">
	import { DataHandler } from '@vincjo/datatables';
	import Search from '../../../components/pacientes/dataTable/Search.svelte';
	import RowsPerPage from '../../../components/pacientes/dataTable/RowsPerPage.svelte';
	import RowCount from '../../../components/pacientes/dataTable/RowCount.svelte';
	import Pagination from '../../../components/pacientes/dataTable/Pagination.svelte';
	import ThFilter from '../../../components/pacientes/dataTable/ThFilter.svelte';
	import ThSort from '../../../components/pacientes/dataTable/ThSort.svelte';
	import { ProgressRadial, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import VerPorcentajes from '../../../components/pacientes/modal/VerPorcentajes.svelte';

	export let data: { pacientes: any[]; seguimientos: any[] };

	let pacientes: any[] = data.pacientes;
	let seguimientos: any[] = data.seguimientos;

	// Calcular promedios
	pacientes = calcularPromedios(pacientes, seguimientos);
	// console.log(pacientes);

	// Función para calcular los promedios y asignarlos a los pacientes
	function calcularPromedios(pacientes: any[], seguimientos: any[]) {
		// Agrupar seguimientos por pacienteID
		const seguimientoPorPaciente: { [key: string]: number[][] } = {};
		seguimientos.forEach((s: any) => {
			if (!seguimientoPorPaciente[s.pacienteID]) {
				seguimientoPorPaciente[s.pacienteID] = [];
			}
			seguimientoPorPaciente[s.pacienteID].push([
				s.actividadFisica,
				s.biologicos,
				s.deficienciaVisual,
				s.diabetes,
				s.drogas,
				s.lipidos,
				s.nutricional,
				s.saludBucal,
				s.seguridad
			]);
		});

		// Calcular el promedio y asignarlo al grupo de pacientes
		return pacientes.map((paciente: any) => {
			const seguimientosDelPaciente = seguimientoPorPaciente[paciente.pacienteID] || [];
			const totalSeguimientos = seguimientosDelPaciente.length;
			const promedio =
				totalSeguimientos > 0
					? seguimientosDelPaciente
							.reduce((acc: number[], val: number[]) => {
								val.forEach((v, i) => (acc[i] = (acc[i] || 0) + v));
								return acc;
							}, [] as number[])
							.reduce((acc: number, val: number) => acc + val, 0) /
						(totalSeguimientos * 9)
					: 0;
			return {
				...paciente,
				porcentaje: promedio,
				detallePorcentaje: seguimientosDelPaciente
			};
		});
	}

	//modal
	const modalStore = getModalStore();

	// funcion para abrir el modal
	function modalComponentPorcentajes(info: any, firstName: string, lastName: string) {
		// console.log(info);
		const c: ModalComponent = {
			ref: VerPorcentajes,
			props: { porcentajes: info, firstName, lastName }
		};
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			title: 'Porcentajes de seguimientos',
			body: firstName + ' ' + lastName,
			response: (r) => console.log('response:', r) // r is the form data
		};
		modalStore.trigger(modal);
	}

	// Data Handler
	let api = pacientes;
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
			<h2 class="text-2xl">Seguimientos</h2>
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
					<ThSort {handler} orderBy="tipoPaciente">Enfermedad Concomitante</ThSort>
					<ThSort {handler} orderBy="porcentaje">Porcentaje</ThSort>
					<th>Acciones</th>
					<th></th>
				</tr>
				<tr>
					<ThFilter {handler} filterBy="firstName" />
					<ThFilter {handler} filterBy="tipoPaciente" />
					<ThFilter {handler} filterBy="porcentaje" />
					<th class="text-sm text-surface-400">Ver detalles</th>
					<th class="text-sm text-surface-400">Enviar Correo</th>
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td>{row.firstName + ' ' + row.lastName}</td>
						<td>
							{#if row.tipoPaciente == null}
								Sin registrar
							{:else}
								{row.tipoPaciente}
							{/if}
						</td>
						<td class="flex flex-row items-center justify-center">
							<ProgressRadial value={row.porcentaje.toFixed(0)} width="w-16" font={105}>
								{row.porcentaje.toFixed(0)}%
							</ProgressRadial>
						</td>
						<td>
							<div class="flex flex-row items-center justify-center">
								<button
									on:click={() =>
										modalComponentPorcentajes(row.detallePorcentaje, row.firstName, row.lastName)}
									class="btn variant-filled-surface hover:variant-soft-primary"
								>
									<i class="fa-solid fa-eye"></i>
								</button>
							</div>
						</td>
						<td>
							<div class="flex flex-row items-center justify-center">
								<button
									class="btn variant-filled-surface hover:variant-soft-primary"
								>
									<i class="fa-solid fa-envelope"></i>
								</button>
							</div>
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
