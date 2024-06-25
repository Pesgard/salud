<script lang="ts">
	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent;

	// Store
	const modalStore = getModalStore();

	// Sumbit Form
	function submitForm() {
		alert('Botiquin Agregado!');
		parent.onClose();
	}

	// Base Classes
	const cBase = 'card p-4 w-fit shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4';
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>{$modalStore[0].title ?? 'Agregar Botiquin'}</header>
		<article>
			{$modalStore[0].body ?? 'Completa los siguientes campos para agregar un nuevo Botiquin.'}
		</article>
		<form method="POST" action="?/crearBotiquin">
			<div class="{cForm} flex flex-col gap-4">
				<!-- Datos del Botiquin -->
				<div class="space-y-4">
					<label class="label">
						<span>Zona</span>
						<input
							class="input"
							type="text"
							placeholder="Zona..."
						/>
					</label>

					<label class="label">
						<span>Medicamentos</span>
                        <p class="text-sm">Selecciona los Medicamenentos del botiquin con CTRL + Click</p>
						<select class="select" multiple value={['1']}>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                            <option value="4">Option 4</option>
                            <option value="5">Option 5</option>
                        </select>
					</label>
			</div>
			<footer class="modal-footer {parent.regionFooter}">
				<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Cancelar</button>
				<button type="button" class="btn {parent.buttonPositive}" on:click={submitForm}>Agregar Botiquin</button>
			</footer>
		</form>
	</div>
{/if}
