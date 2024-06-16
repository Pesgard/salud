<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import Reportes from '../../../../components/reportes/Reportes.svelte';

	const pacienteID = $page.params.paciente;
	let tabSet = 0;
</script>

<div class="max-w-full mx-auto space-y-4 flex flex-col items-center justify-center">
	<TabGroup>
		<Tab bind:group={tabSet} name="tab1" value={0}>
			<svelte:fragment slot="lead">Diabetes</svelte:fragment>
		</Tab>
		<Tab bind:group={tabSet} name="tab1" value={1}>Actividad Fisica</Tab>
		<Tab bind:group={tabSet} name="tab2" value={2}>Biologicos</Tab>
		<Tab bind:group={tabSet} name="tab3" value={3}>Deficencia Visual</Tab>
		<Tab bind:group={tabSet} name="tab4" value={4}>Drogas</Tab>
		<Tab bind:group={tabSet} name="tab5" value={5}>LIpidos</Tab>
		<Tab bind:group={tabSet} name="tab6" value={6}>Nutricional</Tab>
		<Tab bind:group={tabSet} name="tab7" value={7}>Salud Bucal</Tab>
		<Tab bind:group={tabSet} name="tab8" value={8}>Seguridad</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<Reportes {pacienteID} tableName="diabetes" />
				<!-- <Diabetes pacientes={api} /> -->
			{:else if tabSet === 1}
				<Reportes {pacienteID} tableName="actividadFisica" />
			{:else if tabSet === 2}
				<Reportes {pacienteID} tableName="biologicos" />
			{:else if tabSet === 3}
				<Reportes {pacienteID} tableName="deficienciaVisual" />
			{:else if tabSet === 4}
				<Reportes {pacienteID} tableName="drogas" />
			{:else if tabSet === 5}
				<Reportes {pacienteID} tableName="lipidos" />
			{:else if tabSet === 6}
				<Reportes {pacienteID} tableName="nutricional" />
			{:else if tabSet === 7}
				<Reportes {pacienteID} tableName="saludBucal" />
			{:else if tabSet === 8}
				<Reportes {pacienteID} tableName="seguridad" />
			{:else}
				<p>Loading...</p>
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
