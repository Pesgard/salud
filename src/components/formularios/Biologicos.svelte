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

					<!-- Subir Archivos -->
					<hr />

					<p>Documentos</p>
					<div class="btn-group variant-ringed w-full">
						<FileButton name="files" button="" width="w-full"
							>Subir
                            <i class="fa-solid fa-file-arrow-up ml-2"></i>
                            </FileButton
						>
						<button class="w-full btn variant-soft">Descargar
                            <i class="fa-solid fa-file-arrow-down ml-2"></i>
                        </button>
					</div>

					<!-- Botones de Formularios -->
                    <hr/>
					<div class="flex flex-row w-full justify-between">
						<button type="button" class="btn variant-ringed">Borrar</button>
						<button type="button" class="btn variant-soft">Enviar</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
