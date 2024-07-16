<script lang="ts">
	import { getModalStore, Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings, AutocompleteOption } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();
	// Props
	export let parent: any;
	export let botiquin: any;
	export let medicamentos: any;

	console.log(medicamentos);
	console.log(botiquin);

	//pop Up
	let inputDemo = '';
	let inputValue = '';
	let medicamentoSeleccionado = '';
	let checkMedicamento = false;
	let checkDelete = false;
	let checkEdit = false;
	let piezas = 1; // Cambiado de 0 a 1 para establecer el mínimo en 1

	// Extrae los idMedicamento de los detalles del botiquín
	const idsEnBotiquin = new Set(botiquin.detalleBotiquin.map((detalle: { idMedicamento: any; }) => detalle.idMedicamento));

	// Filtra los medicamentos para incluir solo aquellos que no están en botiquin.detalles
	const medicamentosFiltrados = medicamentos.filter(
		(medicamento: { id: unknown }) => !idsEnBotiquin.has(medicamento.id)
	);

	// Genera las opciones de autocompletado solo con los medicamentos filtrados
	const medicamentosOptions: AutocompleteOption<string>[] = medicamentosFiltrados.map(
		(medicamento: { nombre: any; gramaje: any; tipo: any; id: any }) => {
			return {
				label: `${medicamento.nombre} ${medicamento.gramaje} ${medicamento.tipo}`,
				value: medicamento.id
			};
		}
	);

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	// console.log(medicamentos);
	// console.log(botiquin);

	function onMedicamentoSelection(event: CustomEvent<AutocompleteOption<string>>): void {
		inputDemo = event.detail.label;
		inputValue = event.detail.value;
	}

	function onMedicamentoButton(datosMedicamento: any) {
		medicamentoSeleccionado = datosMedicamento;
		console.log(medicamentoSeleccionado);
		checkMedicamento = true;
	}

	let selectedMedicamento: any = null;

	function editSelectedMedicamento(medicamento: any) {
		checkEdit = true;
		selectedMedicamento = medicamento;
		// console.log(selectedMedicamento);
		// console.log(botiquin);
	}

	function deleteMedicamento(medicamento: any) {
		checkDelete = true;
		selectedMedicamento = medicamento;

		// console.log(checkDelete);
	}

	function cancelEdit() {
		selectedMedicamento = null;
		checkEdit = false;
	}

	//pop Up

	// Base Classes
	const cBase = 'card bg-initial p-4 w-fit shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold flex justify-between items-center gap-4';
	const cForm = 'p-4 flex flex-col'; // Ajustado para Flexbox vertical
	const cColumnContainer = 'grid grid-cols-2 mt-2 gap-4 ms-2 overflow-auto'; // Contenedor de columnas
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<p><span class="font-bold">Zona: </span> {botiquin.zona}</p>
		<p><span class="font-bold">Fecha Creacion: </span> {botiquin.fechaCreacion}</p>

		<article>{$modalStore[0].body ?? '(body missing)'}</article>

		<div class="card flex flex-row bg-initial p-4 w-fit shadow-xl space-y-4">
			<!-- Lista Medicamentos -->
			<div>
				<h2 class={cHeader}>Medicamentos</h2>
				<div class={cColumnContainer}>
					{#each botiquin.detalleBotiquin as detalle, index}
						<div class="card">
							<h3>{detalle.medicamento.nombre}</h3>
							<p>{detalle.medicamento.gramaje + ' ' + detalle.medicamento.tipo}</p>
							<p>{detalle.cantidadUnitaria} Pzs</p>
							<button
								class="btn variant-soft-primary"
								on:click={() => editSelectedMedicamento(detalle)}>Editar</button
							>
							<button class="btn" on:click={() => deleteMedicamento(detalle)}>Eliminar</button>
						</div>
					{/each}
				</div>
			</div>

			<!-- Editar Medicamentos -->
			{#if checkEdit}
				<div>
					<h2 class={cHeader}>Editar Medicamento</h2>
					<form class={cForm} method="POST" action="?/updateBotiquin">
						<p><span class="font-bold">Nombre:</span> {selectedMedicamento.medicamento.nombre}</p>
						<label hidden
							>idMedicamento
							<input
								class="input"
								type="text"
								name="idMedicamento"
								bind:value={selectedMedicamento.idMedicamento}
								required
							/>
						</label>
						<label hidden
							>idBotiquin
							<input
								class="input"
								type="text"
								name="idBotiquin"
								bind:value={botiquin.id}
								required
							/>
						</label>
						<label
							>Piezas
							<input
								class="input"
								type="number"
								name="cantidadUnitaria"
								bind:value={selectedMedicamento.cantidadUnitaria}
								required
							/>
						</label>
						<button class="btn variant-filled-primary m-4" formaction="?/updateBotiquin"
							>Guardar</button
						>
						<button class="btn variant-soft ms-4 me-4" type="button" on:click={cancelEdit}
							>Cancelar</button
						>
					</form>
				</div>
			{/if}

			<!-- Eliminar Medicamento -->
			{#if checkDelete}
				<div>
					<h2 class={cHeader}>Eliminar Medicamento</h2>
					<form class={cForm} method="POST" action="?/eliminarMedicamento">
						<p><span class="font-bold">Nombre:</span> {selectedMedicamento.medicamento.nombre}</p>
						<label hidden
							>idMedicamento
							<input
								class="input"
								type="text"
								name="idMedicamento"
								bind:value={selectedMedicamento.idMedicamento}
								required
							/>
						</label>
						<label hidden
							>idBotiquin
							<input
								class="input"
								type="text"
								name="idBotiquin"
								bind:value={botiquin.id}
								required
							/>
						</label>
						<button class="btn variant-filled-primary m-4" formaction="?/eliminarMedicamento"
							>Eliminar</button
						>
						<button
							class="btn variant-soft ms-4 me-4"
							type="button"
							on:click={() => (checkDelete = false)}>Cancelar</button
						>
					</form>
				</div>
			{/if}

			<hr class=" ms-2 me-2" />

			<!-- Agregar Medicamento -->
			<div>
				<h2 class={cHeader}>Agregar Medicamento</h2>
				<!-- Buscador -->
				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="input-group-shim"><i class="fa-solid fa-magnifying-glass"></i></div>
					<input
						class="input autocomplete"
						type="search"
						bind:value={inputDemo}
						placeholder="Selecciona un medicamento"
						use:popup={popupSettings}
					/>
					<button class="variant-filled-surface" on:click={() => onMedicamentoButton(inputDemo)}>
						<i class="fa-solid fa-arrow-right"></i>
					</button>
				</div>

				<!-- Autocomplete -->
				<div data-popup="popupAutocomplete">
					<Autocomplete
						class="h-24 w-full overflow-auto bg-surface-700"
						bind:input={inputDemo}
						options={medicamentosOptions}
						on:selection={onMedicamentoSelection}
					/>
				</div>

				{#if checkMedicamento}
					<div class="card p-4">
						<p>{medicamentoSeleccionado}</p>

						<form action="?/agregarMedicamento" method="POST" class={cForm}>
							<label hidden
								>idMedicamento
								<input class="input" type="text" name="idMedicamento" value={inputValue} required />
							</label>
							<label hidden
								>idBotiquin
								<input class="input" type="text" name="idBotiquin" value={botiquin.id} required />
							</label>
							<label
								>Piezas
								<input
									class="input"
									type="number"
									name="cantidadUnitaria"
									value={piezas}
									min="1"
									required
								/>
							</label>

							<button class="btn variant-filled-primary m-4">Agregar</button>
						</form>
					</div>
				{/if}
			</div>
		</div>

		<div class="flex justify-end">
			<button class="btn variant-filled-primary" on:click={parent.onClose}>Cerrar</button>
		</div>
	</div>
{/if}
