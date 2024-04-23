<script>
	// @ts-nocheck

	import { Autocomplete, ProgressRadial } from '@skeletonlabs/skeleton';

	let inputDemo = '';

	let popupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	let inputPopupDemo = '';

	function onPopupDemoSelect(event) {
		inputDemo = event.detail.label;
	}

	const flavorOptions = [
		{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
		{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
		{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
		{
			label: 'Neapolitan',
			value: 'neapolitan',
			keywords: 'mix, strawberry, chocolate, vanilla',
			meta: { healthy: false }
		},
		{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
		{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
	];

	let porcentaje = 30;
</script>

<!-- breadcrumb -->
<ol class="breadcrumb m-4">
	<li class="crumb"><a class="anchor" href="/dashboard">Inicio</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Biologicos</li>
</ol>

<!-- Contenedor -->
<div class="max-w-full mx-auto space-y-4 flex flex-col items-center justify-center">
	<div id="panels" class="space-y-10">
		<div
			class="previewer shadow-2xl shadow-surface-500/10 dark:shadow-black/10 rounded-container-token overflow-hidden"
		>
			<!-- Header -->
			<header
				class="previewer-header bg-surface-200-700-token p-4 flex justify-between items-center gap-4"
			>
				<div
					class="radio-group p-1 inline-flex flex-row gap-1 bg-surface-200-700-token border-surface-400-500-token rounded-token"
				>
					<h2 class="text-2xl">Biologicos</h2>
				</div>
				<div class="md:inline md:ml-4">
					<button class="btn space-x-4 variant-soft hover:variant-soft-primary">
						<i class="fa-solid fa-magnifying-glass text-sm"></i>
						<small class="hidden md:inline-block">Buscar Pacientes</small>
					</button>
				</div>
			</header>

			<!-- Formulario -->
			<div class="previewer-viewport p-4 md:p-10 space-y-4 bg-transparent">
				<div
					class="previewer-preview flex justify-center items-center mx-auto transition-[width] duration-200 w-full"
				>
					<div class="card p-4 w-full text-token space-y-4">
						<!-- SECCION TD -->
						<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
							<label class="flex items-center space-x-2">
								<span class="label">TD</span>
								<input class="checkbox" type="checkbox" checked />
							</label>
							<input class="input" title="Detalles" type="text" placeholder="Detalles" />
							<input class="input" type="date" />
						</div>
						<hr />

						<!-- SECCION SR -->
						<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
							<label class="flex items-center space-x-2">
								<span class="label">SR</span>
								<input class="checkbox" type="checkbox" checked />
							</label>
							<input class="input" title="Detalles" type="text" placeholder="Detalles" />
							<input class="input" type="date" />
						</div>
						<hr />

						<!-- Influenza Estacionaria -->
						<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
							<label class="flex items-center space-x-2">
								<span class="label">Influenza Estacionaria</span>
								<input class="checkbox" type="checkbox" checked />
							</label>
							<input class="input" title="Detalles" type="text" placeholder="Detalles" />
							<input class="input" type="date" />
						</div>
						<hr />

						<!-- Uso Cartilla -->
						<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
							<label class="flex items-center space-x-2">
								<span class="label">Uso Cartilla</span>
								<input class="checkbox" type="checkbox" checked />
							</label>
							<input class="input" title="Detalles" type="text" placeholder="Detalles" />
							<input class="input" type="date" />
						</div>
						<hr />

						<!-- Drogas -->
						<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
							<label class="flex items-center space-x-2">
								<span class="label">Drogas</span>
								<input class="checkbox" type="checkbox" checked />
							</label>
							<input class="input" title="Detalles" type="text" placeholder="Detalles" />
							<input class="input" type="date" />
						</div>
						<hr />

						<!-- Otros -->
						<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
							<label class="flex items-center space-x-2">
								<span class="label">Otros</span>
								<input class="checkbox" type="checkbox" checked />
							</label>
							<input class="input" title="Detalles" type="text" placeholder="Detalles" />
							<input class="input" type="date" />
						</div>
						<hr />
						<label class="label">
							<span>Observaciones Extra</span>
							<input class="input" type="text" placeholder="Observaciones" />
						</label>
						<div class="flex flex-row w-full justify-between">
							<button type="button" class="btn variant-ringed">Borrar</button>
							<button type="button" class="btn variant-soft">Enviar</button>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
