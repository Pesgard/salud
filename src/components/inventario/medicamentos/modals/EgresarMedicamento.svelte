<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();

	export let parent: any;
	export let medicamento: any;
	console.log(medicamento);

	function closeModal() {
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-fit shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold flex justify-between';
	const cForm = 'border border-surface-500 p-4 flex flex-col'; // Ajustado para Flexbox vertical
	const cColumnContainer = 'flex flex-row gap-4'; // Contenedor de columnas

	let cantidadEgreso = 0;

	function realizarEgreso() {
		let piezasRestantes = medicamento.detalleMedicamento.cantidad - cantidadEgreso;
		if (piezasRestantes < 0) {
			// Si las piezas no son suficientes, disminuir una caja y ajustar las piezas unitarias
			if (medicamento.detalleMedicamento.caja > 0) {
				medicamento.detalleMedicamento.caja -= 1;
				piezasRestantes += 12; // Asumiendo que cada caja tiene 12 piezas
				medicamento.detalleMedicamento.cantidad = piezasRestantes;
			} else {
				// Si no hay cajas disponibles
				alert('No hay suficientes cajas para completar el egreso.');
				return;
			}
		} else {
			// Si hay suficientes piezas en la misma caja
			medicamento.detalleMedicamento.cantidad = piezasRestantes;
		}
        console.log(medicamento);
		closeModal();
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
		<form method="POST" action="?/updateMedicamento" class={cForm}>
			<!-- Contenedor de Columnas -->
			<div class={cColumnContainer}>
				<!-- Columna de Datos Principales -->
				<div class="space-y-4 w-full">
					<input type="hidden" name="id" bind:value={medicamento.id} />

					<div class="space-y-2">
						<p><strong>Nombre del Medicamento:</strong> {medicamento.nombre}</p>
						<p><strong>Ingrediente Activo:</strong> {medicamento.ingredienteActivo}</p>
						<p><strong>Gramaje/Dosis:</strong> {medicamento.gramaje} {medicamento.tipo}</p>
						<p><strong>Fecha de Caducidad:</strong> {medicamento.detalleMedicamento.fechaCaducidad}</p>
						<p><strong>Fecha de Entrada:</strong> {medicamento.detalleMedicamento.fechaEntrada}</p>
						<p><strong>Cajas:</strong> {medicamento.detalleMedicamento.caja}</p>
						<p><strong>Contenido Unitario:</strong> {medicamento.detalleMedicamento.cantidad} piezas</p>
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
				<button type="button" class="btn {parent.buttonPositive}" on:click={realizarEgreso}>Realizar Egreso</button>
			</footer>
		</form>
	</div>
{/if}
