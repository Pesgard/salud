<script lang="ts">
	import { onMount } from 'svelte';
	import TablasPacientes from '../../../../components/tablas/TablasPacientes.svelte';

	let data: any = {};
	let dataPaciente: any = {};
	let combinedData: any = [];

	onMount(async () => {
		try {
			const response = await fetch('/api/pacientes/get', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ tableName: 'seguimientos' })
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			data = await response.json();

			const responsePaciente = await fetch('/api/pacientes/get', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ tableName: 'pacientes' })
			});
			if (!responsePaciente.ok) {
				throw new Error('Network response was not ok');
			}
			dataPaciente = await responsePaciente.json();

			// Combine data and dataPaciente
			combinedData = Object.values(data).map((item) => {
				const pacienteData = Object.values(dataPaciente).find(
					(p) => p.pacienteID === item.pacienteID
				);
				return {
					firstName: pacienteData ? pacienteData.firstName : '',
					lastName: pacienteData ? pacienteData.lastName : '',
					...item,
					...Object.fromEntries(
						Object.entries(item).map(([key, value]) => [key, value === null ? 0 : value])
					)
				};
			});

			console.log(combinedData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});
</script>

<ol class="breadcrumb m-4">
	<li class="crumb"><a class="anchor" href="/dashboard/reportes">Reportes</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Imprimir</li>
</ol>

<div class="max-w-full mx-auto space-y-4 flex flex-col items-center justify-center">
	<p>Tabla de Seguimientos</p>
	{#if combinedData.length > 0}
		<TablasPacientes
			data={combinedData}
			excludeKeys={['id', 'pacienteID']}
			tituloTabla={'Reporte de Pacientes'}
		/>
	{:else}
		<p>Datos del paciente no disponibles</p>
	{/if}
</div>
