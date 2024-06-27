<script lang="ts">
	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	// Store
	const modalStore = getModalStore();

	// Base Classes
	const cBase = 'card p-4 w-fit shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4';
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>{$modalStore[0].title ?? 'Agregar Medicamento'}</header>
		<article>
			{$modalStore[0].body ?? 'Completa los siguientes campos para agregar un nuevo medicamento.'}
		</article>
		<form method="POST" action="?/medicamento">
			<div class="{cForm} flex flex-col gap-4">
				<!-- Datos del Medicamento -->
				<div class="space-y-4">
					<label class="label">
						<span>Nombre del Medicamento</span>
						<input
							name="nombreMedicamento"
							class="input"
							type="text"
							placeholder="Medicamento..."
						/>
					</label>

					<label class="label">
						<span>Ingrediente Activo</span>
						<input
							name="ingredienteActivo"
							class="input"
							type="text"
							placeholder="Ingrediente Activo..."
						/>
					</label>

					<p>Gramaje / Dosis</p>
					<div class="input-group input-group-divider grid-cols-[1fr_auto]">
						<input name="valor" type="number" />
						<select name="dosis">
							<option value="gr">gr</option>
							<option value="ml">ml</option>
						</select>
					</div>

					<label class="label">
						<span>Fecha de Caducidad</span>
						<input name="caducidad" class="input" type="date" />
					</label>

					<label class="label">
						<span>Caja</span>
						<input
							name="caja"
							class="input"
							type="number"
							step="0.01"
							placeholder="Caja..."
						/>
					</label>
					<label class="label">
						<span>Contenido Unitario</span>
						<input
							name="contenidoUnitario"
							class="input"
							type="number"
							step="0.01"
							placeholder="No.Piezas..."
						/>
					</label>
				</div>
			</div>
			<footer class="modal-footer {parent.regionFooter}">
				<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Cancelar</button>
				<button formaction="?/medicamento" class="btn {parent.buttonPositive}">Agregar Medicamento</button>
			</footer>
		</form>
	</div>
{/if}
