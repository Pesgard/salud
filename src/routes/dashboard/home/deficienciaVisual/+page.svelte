<script>
	import DeficienciaVisual from '../../../../components/formularios/deficienciaVisual/DeficienciaVisual.svelte';

	export let data;

	let api = data.pacientes;
</script>

<!-- breadcrumb -->
<ol class="breadcrumb m-4">
	<li class="crumb"><a class="anchor" href="/dashboard">Consultar</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Deficiencia Visual</li>
</ol>

<!-- Contenedor -->
<div class="max-w-full mx-auto space-y-4 flex flex-col items-center justify-center">
	<DeficienciaVisual pacientes={api} />	
</div>
