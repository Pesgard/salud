<script lang="ts">
	import { onMount } from 'svelte';
	import TablasPacientes from '../../../../components/tablas/TablasPacientes.svelte';

	let data: any = [];
	let transformedData: any = [];

	onMount(async () => {
		try {
			const response = await fetch('/api/inventario/medicamento/get', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ tableName: 'detalleMedicamento' })
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const rawData = await response.json();
			console.log(rawData);

			// Transform the data
				transformedData = Object.values(rawData).map((item: any) => ({
					nombre: item.medicamento.nombre,
					ingredienteActivo: item.medicamento.ingredienteActivo,
					gramaje: item.medicamento.gramaje,
					tipo: item.medicamento.tipo,
					caja: item.caja,
					cantidad: item.cantidad,
					fechaCaducidad: item.fechaCaducidad,
					fechaEntrada: item.fechaEntrada,
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
	<p>Tabla de Medicamentos</p>
	{#if data.length > 0}
		<TablasPacientes data={data} excludeKeys={[]} tituloTabla={"Informacion de Medicamentos"} />
	{:else}
		<p>Datos de los medicamentos no disponibles</p>
	{/if}
</div>
