<script>
	//Librerias
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';

	// Formularios
	import Lipidos from '../../../../components/formularios/Lipidos/Lipidos.svelte';
	import Historial from '../../../../components/formularios/Lipidos/Historial.svelte';
	// Tabs
	let tabSet = 0;
</script>

<!-- breadcrumb -->
<ol class="breadcrumb m-4">
	<li class="crumb"><a class="anchor" href="/dashboard">Inicio</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Lipidos</li>
</ol>

<!-- Contenedor -->
<div class="max-w-full mx-auto space-y-4 flex flex-col items-center justify-center">
	<TabGroup>
		<Tab bind:group={tabSet} name="tab1" value={0}>
			<svelte:fragment slot="lead">Lipidos</svelte:fragment>
		</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>Historial</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<Lipidos />
			{:else if tabSet === 1}
				<Historial />
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
