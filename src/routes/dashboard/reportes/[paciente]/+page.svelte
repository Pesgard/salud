<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Tablas from '../../../../components/tablas/Tablas.svelte';
	const pacienteID = $page.params.paciente;

	let data: any;
	let dataPaciente: any;
	onMount(async () => {
		try {
			const response = await fetch('/api/formularios/get', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ pacienteID, tableName: 'seguimientos' })
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			data = await response.json();
			// Recorrer todos los campos de data, convertir null a 0 y decimales a enteros
			data = Object.fromEntries(
				Object.entries(data).map(([key, value]) => {
					if (value === null) {
						return [key, 0];
					} else if (typeof value === 'number' && !Number.isInteger(value)) {
						return [key, Math.round(value)];
					}
					return [key, value];
				})
			);

			// consultar datos de paciente
			const paciente = await fetch('/api/formularios/get', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ pacienteID, tableName: 'pacientes' })	
			});
			if (!paciente.ok) {
				throw new Error('Network response was not ok');
			}
			dataPaciente = await paciente.json();
			console.log(dataPaciente);

			// console.log(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});
</script>

<ol class="breadcrumb m-4">
	<li class="crumb"><a class="anchor" href="/dashboard/reportes">Reportes</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Detalles</li>
</ol>

<div class="max-w-full mx-auto space-y-4 flex flex-col items-center justify-center">
	<p>Tabla de Seguimientos</p>
	{#if dataPaciente}
		<Tablas {data} excludeKeys={['id', 'pacienteID']} tituloTabla={"Seguimiento: " + dataPaciente.firstName + dataPaciente.lastName} />
	{:else}
		<Tablas {data} excludeKeys={['id', 'pacienteID']} tituloTabla="Datos del paciente no disponibles" />
	{/if}
</div>
