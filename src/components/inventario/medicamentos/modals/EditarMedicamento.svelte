<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();

	export let parent: any;
	export let medicamento;
	console.log(medicamento);

	function closeModal() {
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-fit shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold flex justify-between';
	const cForm = 'border border-surface-500 p-4 flex flex-col'; // Ajustado para Flexbox vertical
	const cColumnContainer = 'flex flex-row gap-4'; // Contenedor de columnas
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
				<div class="space-y-4 w-1/2">
					<input type="hidden" name="id" bind:value={medicamento.id} />

					<label class="label">
						<span>Nombre del Medicamento </span>

						<input
							name="nombreMedicamento"
							class="input"
							type="text"
							placeholder="Medicamento..."
							bind:value={medicamento.nombre}
						/>
					</label>

					<label class="label">
						<span>Ingrediente Activo </span>
						<input
							name="ingrediente"
							class="input"
							type="text"
							placeholder="Ingrediente Activo..."
							bind:value={medicamento.ingredienteActivo}
						/>
					</label>

					<p>Gramaje/ Dosis</p>
					<div class="input-group input-group-divider grid-cols-[1fr_auto]">
						<input name="gramaje" type="number" bind:value={medicamento.gramaje} />
						<select name="tipo" bind:value={medicamento.tipo}>
							<option value="gr">gr</option>
							<option value="ml">ml</option>
						</select>
					</div>
				</div>

				<!-- Columna de Detalles -->
				<div class="space-y-4 w-1/2">
					<label class="label">
						<span>Fecha de Caducidad </span>
						<input
							name="fechaCaducidad"
							class="input"
							type="date"
							bind:value={medicamento.detalleMedicamento.fechaCaducidad}
						/>
					</label>

					<label class="label">
						<span>Fecha de Entrada </span>
						<input
							name="fechaEntrada"
							class="input"
							type="date"
							bind:value={medicamento.detalleMedicamento.fechaEntrada}
						/>
					</label>

					<label>
						<span>Caja </span>
						<input
							name="caja"
							class="input"
							type="number"
							step="0.01"
							placeholder="Caja..."
							bind:value={medicamento.detalleMedicamento.caja}
						/>
					</label>

					<label>
						<span>Contenido Unitario </span>
						<input
							name="cantidadUnitaria"
							class="input"
							type="number"
							step="0.01"
							placeholder="No.Piezas..."
							bind:value={medicamento.detalleMedicamento.cantidad}
						/>
						<!-- Agregar más campos de detalles según sea necesario -->
					</label>
				</div>
			</div>

			<!-- Footer debajo de las columnas -->
			<footer class="modal-footer {parent.regionFooter} w-full mt-4">
				<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Cancelar</button>
				<button formaction="?/updateMedicamento" class="btn {parent.buttonPositive}"
					>Editar Medicamento</button
				>
			</footer>
		</form>
	</div>
{/if}
