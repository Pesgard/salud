<script>
	//Formularios
	import Diabetes from '../../../../components/formularios/Diabetes/Diabetes.svelte';
	import Glucosa from '../../../../components/formularios/Diabetes/Glucosa.svelte';
	import Presion from '../../../../components/formularios/Diabetes/Presion.svelte';

	//Libreria
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	// Tabs
	let tabSet = 0;

	export let data;
	let api = data.pacientes;
</script>

<!-- breadcrumb -->
<ol class="breadcrumb m-4">
	<li class="crumb"><a class="anchor" href="/dashboard">Consultar</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Diabetes / Hipertension</li>
</ol>

<!-- Contenedor -->
<div class="max-w-full mx-auto space-y-4 flex flex-col items-center justify-center">
	<TabGroup>
		<Tab bind:group={tabSet} name="tab1" value={0}>
			<svelte:fragment slot="lead">Diabetes / Hipertension</svelte:fragment>
		</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>Glucosa</Tab>
		<Tab bind:group={tabSet} name="tab3" value={2}>Presion</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<Diabetes pacientes={api} />
			{:else if tabSet === 1}
				<Glucosa />
			{:else if tabSet === 2}
				<Presion />
			{/if}
		</svelte:fragment>	
	</TabGroup>
</div>
