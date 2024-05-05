<script>
	import { FileButton } from '@skeletonlabs/skeleton';
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
				<h2 class="text-2xl">Actividad Fisica</h2>
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
					<!--Deportes -->
					<div class="grid grid-cols-5 gap-4 pt-2 items-center justify-center">
						<!-- SECCION Deportes -->
						<div class="col-span-2 grid grid-cols-1 gap-4">
							<label class="flex items-center justify-center space-x-2">
								<span class="label text-xl">Deportes</span>
								<input class="checkbox" type="checkbox" checked />
							</label>
							<label class="flex items-center space-x-2">
								<span class="label">Fecha</span>
								<input class="input" type="date" />
							</label>
						</div>

						<span class="divider-vertical h-full" />

						<!--Seccion Periodo-->
						<div class="col-span-2 grid grid-cols-1 gap-4">
							<!-- Input para el título de la sección -->
							<div class="flex flex-col items-center">
								<span class="label text-2xl">Periodo</span>
							</div>

							<!-- Primer input con label "Desde" -->
							<div class="flex flex-col items-center">
								<label for="desde" class="label">Desde</label>
								<input id="desde" class="input" type="date" />
							</div>
							<!-- Segundo input con label "Hasta" -->
							<div class="flex flex-col items-center">
								<label for="hasta" class="label">Hasta</label>
								<input id="hasta" class="input" type="date" />
							</div>
						</div>
					</div>

					<hr/>

					<!--- Extra  -->
					<div class="grid grid-cols-5 gap-4 pt-2 items-center justify-center">
						<!-- SECCION Deportes -->
						<div class="col-span-2 grid grid-cols-1 gap-4">
							<label class="flex items-center justify-center space-x-2">
								<span class="label text-xl">Otros</span>
								<input class="checkbox" type="checkbox" checked />
							</label>
							<label class="flex items-center space-x-2">
								<span class="label">Fecha</span>
								<input class="input" type="date" />
							</label>
						</div>

						<span class="divider-vertical h-full" />

						<!--Seccion Periodo-->
						<div class="col-span-2 grid grid-cols-1 gap-4">
							<!-- Input para el título de la sección -->
							<div class="flex flex-col items-center">
								<span class="label text-2xl">Periodo</span>
							</div>

							<!-- Primer input con label "Desde" -->
							<div class="flex flex-col items-center">
								<label for="desde" class="label">Desde</label>
								<input id="desde" class="input" type="date" />
							</div>
							<!-- Segundo input con label "Hasta" -->
							<div class="flex flex-col items-center">
								<label for="hasta" class="label">Hasta</label>
								<input id="hasta" class="input" type="date" />
							</div>
						</div>
					</div>
					<hr/>
					
					<!--Observaciones Extra-->
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
