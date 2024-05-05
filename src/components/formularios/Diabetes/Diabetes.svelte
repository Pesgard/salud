<script>
	import { FileButton, RadioGroup, RadioItem,} from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	// Al chile no me acuerdo
    let value = 0;
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
				<h2 class="text-2xl">Diabetes / Hipertension</h2>
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
						<p class="flex items-center space-x-2">
							<span class="label">Fecha</span>
						</p>
						<input class="input" type="date" />
					</div>
					<hr />

					<!-- SECCION Resultado -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<p class="flex items-center space-x-2">
							<span class="label">Paciente</span>
						</p>
                        <RadioGroup>
                            <RadioItem bind:group={value} name="justify" value={0}>Sano</RadioItem>
                            <RadioItem bind:group={value} name="justify" value={1}>Hipertenso</RadioItem>
                            <RadioItem bind:group={value} name="justify" value={2}>Diabetico</RadioItem>
                        </RadioGroup>
					</div>
					<hr />

					<!-- Farmacos -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<p class="flex items-center space-x-2">
							<span class="label">Farmacos</span>
						</p>
						<input class="input" title="Detalles" type="text" placeholder="Farmacos" />
					</div>
					<hr />

					<!--Seccion Observaciones-->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<p class="flex items-center space-x-2">
							<span class="label">Observaciones</span>
						</p>
						<input class="input" title="Detalles" type="text" placeholder="Observaciones" />
					</div>

					<!-- Subir Archivos -->
					<hr />

					<p>Documentos</p>
					<div class="btn-group variant-ringed w-full">
						<FileButton name="files" button="" width="w-full"
							>Subir
							<i class="fa-solid fa-file-arrow-up ml-2"></i>
						</FileButton>
						<button class="w-full btn variant-soft"
							>Descargar
							<i class="fa-solid fa-file-arrow-down ml-2"></i>
						</button>
					</div>

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
