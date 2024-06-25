<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import Botiquines from '../../../components/inventario/botiquines/Botiquines.svelte';
	import Medicamentos from '../../../components/inventario/medicamentos/Medicamentos.svelte';

	// Data
	export let data;
	$: ({ medicamentos } = data);
	let api = data.medicamentos;

	let tabSet: number = 0;
</script>

<!-- breadcrumb -->
<ol class="breadcrumb m-4">
	<li class="crumb">Inventario</li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
</ol>

<!-- Contenedor -->
<div class="max-w-full mx-auto space-y-4 flex flex-col items-center justify-center">
	<!-- Header -->
	<header
		class="previewer-header bg-surface-200-700-token p-4 flex justify-between items-center gap-4 w-full"
	>
		<div
			class="radio-group p-1 inline-flex flex-row gap-1 bg-surface-200-700-token border-surface-400-500-token rounded-token"
		>
			<h2 class="text-2xl">Inventario</h2>
		</div>
	</header>

	<TabGroup justify="justify-start" class="w-full">
		<!-- Tabs -->
		<Tab bind:group={tabSet} name="botiquines" value={0}>Botiquines</Tab>
		<Tab bind:group={tabSet} name="medicamentos" value={1}>Medicamentos</Tab>

		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<Botiquines {data} />
			{:else if tabSet === 1}
				<Medicamentos {data} />
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
