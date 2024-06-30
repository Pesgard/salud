<script lang="ts">
	import { onMount } from 'svelte';
	import TablasPacientes from '../../../../components/tablas/TablasPacientes.svelte';

	let data: any = [];
	let transformedData: any = [];

	onMount(async () => {
		try {
			const response = await fetch('/api/inventario/botiquin/get', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ tableName: 'botiquines' })
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const rawData = await response.json();
			console.log(rawData);

			// Transform the data
			transformedData = Object.values(rawData).map(item => ({
				id: item.id,
				zona: item.zona,
				fechaCreacion: item.fechaCreacion,
				lastName: item.users.lastName,
				firstName: item.users.firstName
			}));
			
			console.log(transformedData);
			data = transformedData;

		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});
</script>

<ol class="breadcrumb m-4">
	<li class="crumb"><a class="anchor" href="/dashboard/inventario">Inventario</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
    
	<li class="crumb">Imprimir</li>
</ol>

<div class="max-w-full mx-auto space-y-4 flex flex-col items-center justify-center">
	<p>Tabla de Seguimientos</p>
	{#if data.length > 0}
		<TablasPacientes data={data} excludeKeys={['id']} tituloTabla={"Informacion de Botiquines"} />
	{:else}
		<p>Datos del botiquín no disponibles</p>
	{/if}
</div>
