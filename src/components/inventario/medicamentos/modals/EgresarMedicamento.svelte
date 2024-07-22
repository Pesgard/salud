<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();

	export let parent: any;
	export let medicamento: any;
	// console.log(medicamento);

	function closeModal() {
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-fit shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold flex justify-between';
	const cForm = 'border border-surface-500 p-4 flex flex-col'; // Ajustado para Flexbox vertical
	const cColumnContainer = 'flex flex-row gap-4'; // Contenedor de columnas

	let cantidadEgreso = 0;

	async function submit(event: Event) {
		event.preventDefault();
		// console.log(event);
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());
		// console.log(medicamento);
		// console.log(data);

		const update = await egresarMedicamento(medicamento, data);
		if (!update.error) {
			alert(update.message);
			closeModal();
			window.location.reload();
		} else {
			alert(update.error);
		}
	}

	async function egresarMedicamento(medicamento: any, data: any) {
		const response = await fetch(`/api/inventario/medicamento/egresar`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ data, medicamento })
		});

		const responseData = await response.json();
		return responseData;
	}
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>
			{$modalStore[0].title ?? '(title missing)'}
			<button type="button" on:click={closeModal} aria-label="Close">
				<i class="fa-solid fa-xmark"></i>
			</button>
		</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>

		<!-- Detalles de Medicamento y formulario -->
		<form class={cForm} on:submit|preventDefault={submit}>
			<!-- Contenedor de Columnas -->
			<div class={cColumnContainer}>
				<!-- Columna de Datos Principales -->
				<div class="space-y-4 w-full">
					<input type="hidden" name="id" bind:value={medicamento.id} />

					<div class="space-y-2">
						<p><strong>Nombre del Medicamento:</strong> {medicamento.nombre}</p>
						<p><strong>Ingrediente Activo:</strong> {medicamento.ingredienteActivo}</p>
						<p><strong>Gramaje/Dosis:</strong> {medicamento.gramaje} {medicamento.tipo}</p>
						<p>
							<strong>Fecha de Caducidad:</strong>
							{medicamento.detalleMedicamento.fechaCaducidad}
						</p>
						<p><strong>Fecha de Entrada:</strong> {medicamento.detalleMedicamento.fechaEntrada}</p>
						<p><strong>Cajas:</strong> {medicamento.detalleMedicamento.caja}</p>
						<p>
							<strong>Contenido Unitario:</strong>
							{medicamento.detalleMedicamento.cantidad} piezas
						</p>
					</div>

					<label class="label mt-4">
						<span>Cantidad a Egresar </span>
						<input
							name="cantidadEgreso"
							class="input"
							type="number"
							bind:value={cantidadEgreso}
							placeholder="Cantidad a egresar..."
						/>
					</label>
				</div>
			</div>

			<!-- Footer debajo de las columnas -->
			<footer class="modal-footer {parent.regionFooter} w-full mt-4">
				<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Cancelar</button>
				<button type="submit" class="btn {parent.buttonPositive}">Realizar Egreso</button>
			</footer>
		</form>
	</div>
{/if}
