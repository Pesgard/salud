<script>
	// @ts-nocheck

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';
	const authorizedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
	let fileinput;
	let files;
	let avatar;

	// Preview image
	function getBase64(image) {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			if (e.target) {
				avatar = e.target.result;
				console.log(image);
			}
		};
	}

	// Props
	/** Exposes parent props to this component. */
	export let parent;

	const modalStore = getModalStore();

	// Base Classes
	const cBase = 'card p-4 w-fit shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<!-- Enable for debugging: -->
		<form method="POST" action="?/crear">
			<div class="{cForm} flex flex-row gap-4">

				<!-- Datos Personales -->
				<div class="space-y-4 w-fit">
					<h2 class="mb-2">Informacion Personal</h2>
					<label class="label">
						<span>Nombre</span>
						<input name="firstName" class="input" type="text" placeholder="Ingresa Nombre..." />
					</label>
					<label class="label">
						<span>Apellido</span>
						<input name="lastName" class="input" type="text" placeholder="Ingresa Apellido..." />
					</label>
					<label class="label">
						<span>Numero de Telefono</span>
						<input name="tel" class="input" type="tel" placeholder="Telefono..." />
					</label>
					<label class="label">
						<span>Email</span>
						<input name="email" class="input" type="email" placeholder="Direccion de correo..." />
					</label>

					<!-- RFC -->
					<label class="label">
						<span>RFC</span>
						<input name="rfc" class="input" type="text" placeholder="RFC..." />
					</label>

					<!-- CURP -->
					<label class="label">
						<span>CURP</span>
						<input name="curp" class="input" type="text" placeholder="CURP..." />
					</label>

					<!-- NSS -->
					<label class="label">
						<span>NSS</span>
						<input name="nss" class="input" type="text" placeholder="NSS..." />
					</label>

					<!-- Tipo de Sangre -->
					<label class="label">
						<span>Tipo de Sangre</span>
						<input name="tipoSangre" class="input" type="text" placeholder="Tipo de Sangre..." />
					</label>

					<!-- Escolaridad -->
					<label class="label">
						<span>Escolaridad</span>
						<input name="escolaridad" class="input" type="text" placeholder="Escolaridad..." />
					</label>
				</div>

				<span class="divider-vertical h-screen" />

				<!-- Datos Domicilarios -->
				<div class="space-y-4 w-fit">
					<h2 class="mb-2">Domicilio</h2>
					<label class="label">
						<span>Calle</span>
						<input name="calle" class="input" type="text" placeholder="Ingresa Calle..." />
					</label>
					<label class="label">
						<span>No. Exterior</span>
						<input name="noExt" class="input" type="text" placeholder="No. Exterior..." />
					</label>
					<label class="label">
						<span>No. Interior</span>
						<input name="noInt" class="input" type="text" placeholder="No. Interior..." />
					</label>

					<label class="label">
						<span>Codigo Postal</span>
						<input name="cp" class="input" type="text" placeholder="Codigo Postal..." />
					</label>

					<label class="label">
						<span>Colonia</span>
						<input name="colonia" class="input" type="text" placeholder="Colonia..." />
					</label>

					<label class="label">
						<span>Localidad</span>
						<input name="localidad" class="input" type="text" placeholder="Localidad..." />
					</label>

					<label class="label">
						<span>Municipio</span>
						<input name="municipio" class="input" type="text" placeholder="Municipio..." />
					</label>

					<label class="label">
						<span>Estado</span>
						<input name="estado" class="input" type="text" placeholder="Estado..." />
					</label>

					<label class="label">
						<span>Pais</span>
						<input name="pais" class="input" type="text" placeholder="Pais..." />
					</label>
				</div>

				<div class="space-y-4 w-fit flex flex-col items-center justify-center align-middle">
					<!-- Mostrar imagen del paciente -->
					{#if avatar}
						<img
							id="avatar"
							class="w-52 h-52 rounded-full object-cover"
							src={avatar}
							alt="Preview"
						/>
					{:else}
						<div class="placeholder-circle w-52" />
					{/if}

					<!-- Imagen del paciente -->
					<label class="label">
						<span>Imagen del paciente</span>
						<input
							name="imagen"
							class="input"
							type="file"
							placeholder="Imagen del paciente..."
							accept={authorizedExtensions.join(',')}
							bind:this={fileinput}
							on:change={() => {
								files = fileinput.files;
								getBase64(files[0]);
							}}
						/>
					</label>
				</div>
			</div>
			<footer class="modal-footer {parent.regionFooter}">
				<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
					>{parent.buttonTextCancel}</button
				>
				<button formaction="?/crear" class="btn {parent.buttonPositive}">Submit Form</button>
			</footer>
		</form>
	</div>
{/if}
