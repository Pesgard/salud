<script>
	import Biologicos from '../../../../components/formularios/biologicos/Biologicos.svelte';
	// RTomar informacion del servidor
	export let data;

	let api = data.pacientes;
</script>

<!-- breadcrumb -->
<ol class="breadcrumb m-4">
	<li class="crumb"><a class="anchor" href="/dashboard">Inicio</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Biologicos</li>
</ol>

<!-- Contenedor -->
<div class="max-w-full mx-auto space-y-4 flex flex-col items-center justify-center">
	<Biologicos pacientes={api} />
</div>
