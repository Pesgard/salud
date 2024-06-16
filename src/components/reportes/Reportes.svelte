<script lang="ts">
	import { onMount } from 'svelte';
	export let pacienteID: string;
	export let tableName: string;

	let data: any;

	onMount(async () => {
		try {
			const response = await fetch('/api/formularios/get', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ pacienteID, tableName })
			});
			if (!response.ok) {
				const errorData = await response.json();
				data = {
					error: errorData.error
				};
			}
			data = await response.json();
			console.log(data);
			return data;
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	});
</script>

{#if data}
	<div>
		<h2>Reporte Médico - {tableName}</h2>
		{#each Object.entries(data) as [key, value]}
			{#if key !== 'id' && key !== 'pacienteID'}
				<p><strong>{key}:</strong> {value}</p>
			{/if}
		{/each}
	</div>
{:else}
	<p>Loading...</p>
{/if}
