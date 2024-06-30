<script lang="ts">
	import { onMount } from 'svelte';
	import TablasPacientes from '../../../../components/tablas/TablasPacientes.svelte';

	let data: any;
	let dataPaciente: any;
	onMount(async () => {
		try {
			const response = await fetch('/api/pacientes/get', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ tableName: 'pacientes' })
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			data = await response.json();
            console.log(data);


		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});
</script>

<ol class="breadcrumb m-4">
	<li class="crumb"><a class="anchor" href="/dashboard/pacientes">Pacientes</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Imprimir</li>
</ol>

<div class="max-w-full mx-auto space-y-4 flex flex-col items-center justify-center">
	<p>Tabla de Seguimientos</p>
	{#if data}
		<TablasPacientes {data} excludeKeys={['idHospital', 'pacienteID']} tituloTabla={"Informacion de Pacientes"} />
	{:else}
		<TablasPacientes {data} excludeKeys={['idHospital', 'pacienteID']} tituloTabla="Datos del paciente no disponibles" />
	{/if}
</div>
