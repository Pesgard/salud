<script>
	import '@fortawesome/fontawesome-free/css/all.min.css';
</script>

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
				<h2 class="text-2xl">Lipidos</h2>
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
					<!-- SECCION Fecha -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label flex items-center space-x-2">Fecha</span>
						<input class="input" type="date" />
					</div>
					<hr />

					<!-- SECCION HDL -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label">HDL</span>
						<input class="input" title="Detalles" type="text" placeholder="Detalles" />
					</div>
					<hr />

					<!-- Colesterol -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label">Colesterol</span>
						<input class="input" title="Detalles" type="text" placeholder="Detalles" />
					</div>
					<hr />

					<!-- Trigliceridos -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label">Trigliceridos</span>
						<input class="input" title="Detalles" type="text" placeholder="Detalles" />
					</div>
					<hr />

					<!-- Glucosa -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label">Glucosa</span>
						<input class="input" title="Detalles" type="text" placeholder="Detalles" />
					</div>
					<hr />

					<!-- Otros -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label">Otros</span>
						<input class="input" title="Detalles" type="text" placeholder="Detalles" />
					</div>
					<hr />

					<!-- Otros -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label">Farmacos</span>
						<input class="input" title="Detalles" type="text" placeholder="Detalles" />
					</div>
					<hr />


					<label class="label">
						<span>Observaciones Extra</span>
						<input class="input" type="text" placeholder="Observaciones" />
					</label>

					<!-- Botones de Formularios -->
					<hr />
					<div class="flex flex-row w-full justify-between">
						<button type="button" class="btn variant-ringed">Borrar</button>
						<button type="button" class="btn variant-soft">Enviar</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
