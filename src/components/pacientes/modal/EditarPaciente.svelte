<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';

	let input: HTMLInputElement;
	let showImage = false;
	let image: HTMLImageElement;
	let container: HTMLDivElement;
	let placeholder: HTMLSpanElement;

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;
	export let info: any;

	const modalStore = getModalStore();

	console.log(info);

	// Form Data
	const formData = {
		id: info.pacienteID,
		firstName: info.firstName,
		lastName: info.lastName,
		tel: info.tel,
		email: info.email,
		rfc: info.rfc,
		curp: info.curp,
		nss: info.nss,
		tipoSangre: info.tiposangre,
		escolaridad: info.escolaridad,
		calle: info.calle,
		noExt: info.noext,
		noInt: info.noint,
		cp: info.cp,
		colonia: info.colonia,
		localidad: info.localidad,
		municipio: info.municipio,
		estado: info.estado,
		pais: info.pais,
		imagen: info.imagen
	};

	function onChange() {
		const file = input.files ? input.files[0] : null;
		if (file) {
			showImage = true;
			const reader = new FileReader();
			reader.addEventListener('load', function () {
				image.setAttribute('src', reader.result as string);
			});
			reader.readAsDataURL(file);

			return;
		}
		showImage = false;
	}

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

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
		<form method="POST" action="?/update">
			<div class="{cForm} flex flex-row gap-4">
				<!-- Datos Personales -->
				<div class="space-y-4 w-fit">
					<h2 class="mb-2">Informacion Personal</h2>
					<label class="label">
						<span>Nombre</span>
						<input
							name="firstName"
							class="input"
							type="text"
							bind:value={formData.firstName}
							placeholder="Ingresa Nombre..."
						/>
					</label>
					<label class="label">
						<span>Apellido</span>
						<input
							name="lastName"
							class="input"
							type="text"
							bind:value={formData.lastName}
							placeholder="Ingresa Apellido..."
						/>
					</label>
					<label class="label">
						<span>Numero de Telefono</span>
						<input
							name="tel"
							class="input"
							type="tel"
							bind:value={formData.tel}
							placeholder="Telefono..."
						/>
					</label>
					<label class="label">
						<span>Email</span>
						<input
							name="email"
							class="input"
							type="email"
							bind:value={formData.email}
							placeholder="Direccion de correo..."
						/>
					</label>

					<!-- RFC -->
					<label class="label">
						<span>RFC</span>
						<input
							name="rfc"
							class="input"
							type="text"
							bind:value={formData.rfc}
							placeholder="RFC..."
						/>
					</label>

					<!-- CURP -->
					<label class="label">
						<span>CURP</span>
						<input
							name="curp"
							class="input"
							type="text"
							bind:value={formData.curp}
							placeholder="CURP..."
						/>
					</label>

					<!-- NSS -->
					<label class="label">
						<span>NSS</span>
						<input
							name="nss"
							class="input"
							type="text"
							bind:value={formData.nss}
							placeholder="NSS..."
						/>
					</label>

					<!-- Tipo de Sangre -->
					<label class="label">
						<span>Tipo de Sangre</span>
						<input
							name="tipoSangre"
							class="input"
							type="text"
							bind:value={formData.tipoSangre}
							placeholder="Tipo de Sangre..."
						/>
					</label>

					<!-- Escolaridad -->
					<label class="label">
						<span>Escolaridad</span>
						<input
							name="escolaridad"
							class="input"
							type="text"
							bind:value={formData.escolaridad}
							placeholder="Escolaridad..."
						/>
					</label>
				</div>

				<span class="divider-vertical h-screen" />

				<!-- Datos Domicilarios -->
				<div class="space-y-4 w-fit">
					<h2 class="mb-2">Domicilio</h2>
					<label class="label">
						<span>Calle</span>
						<input
							name="calle"
							class="input"
							type="text"
							bind:value={formData.calle}
							placeholder="Ingresa Calle..."
						/>
					</label>
					<label class="label">
						<span>No. Exterior</span>
						<input
							name="noExt"
							class="input"
							type="text"
							bind:value={formData.noExt}
							placeholder="No. Exterior..."
						/>
					</label>
					<label class="label">
						<span>No. Interior</span>
						<input
							name="noInt"
							class="input"
							type="text"
							bind:value={formData.noInt}
							placeholder="No. Interior..."
						/>
					</label>

					<label class="label">
						<span>Codigo Postal</span>
						<input
							name="cp"
							class="input"
							type="text"
							bind:value={formData.cp}
							placeholder="Codigo Postal..."
						/>
					</label>

					<label class="label">
						<span>Colonia</span>
						<input
							name="colonia"
							class="input"
							type="text"
							bind:value={formData.colonia}
							placeholder="Colonia..."
						/>
					</label>

					<label class="label">
						<span>Localidad</span>
						<input
							name="localidad"
							class="input"
							type="text"
							bind:value={formData.localidad}
							placeholder="Localidad..."
						/>
					</label>

					<label class="label">
						<span>Municipio</span>
						<input
							name="municipio"
							class="input"
							type="text"
							bind:value={formData.municipio}
							placeholder="Municipio..."
						/>
					</label>

					<label class="label">
						<span>Estado</span>
						<input
							name="estado"
							class="input"
							type="text"
							bind:value={formData.estado}
							placeholder="Estado..."
						/>
					</label>

					<label class="label">
						<span>Pais</span>
						<input
							name="pais"
							class="input"
							type="text"
							bind:value={formData.pais}
							placeholder="Pais..."
						/>
					</label>
				</div>

				<div class="space-y-4 w-fit flex flex-col items-center justify-center align-middle">
					
					<!-- ID -->
					<label class="label">
						<span>ID del paciente</span>
						<input name="id" class="input" type="text" value={formData.id} readonly />
					</label>

					<!-- Mostrar imagen del paciente -->
					<div class="h-full flex flex-col items-center justify-center" bind:this={container}>
						{#if showImage}
							<img
								class="w-52 h-52 rounded-full object-cover"
								bind:this={image}
								src=""
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
								accept="image/*"
								bind:this={input}
								on:change={onChange}
								bind:value={formData.imagen}
								placeholder="Imagen del paciente..."
							/>
						</label>
					</div>
				</div>
			</div>
			<footer class="modal-footer {parent.regionFooter}">
				<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>
					{parent.buttonTextCancel}
				</button>
				<button formaction="?/update" class="btn {parent.buttonPositive}">Submit Form</button>
			</footer>
		</form>
	</div>
{/if}
