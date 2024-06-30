<script lang="ts">
	import { getModalStore, Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings, AutocompleteOption } from '@skeletonlabs/skeleton';

	// Props
	export let parent: any;
	export let medicamentos: any;
	// console.log(medicamentos);

	//pop Up
	let inputDemo = '';
	let medicamentoSeleccionado = '';
	let medicamentosBotiquin = '';
	let piezas = 0;

	// variable para habilitar el boton de agregar medicamento
	let checkMedicamento = false;

	// variable con lista de IDs de medicamentos en botiquin
	let medicamentosBotiquinIDs: any[] = [];
	$: medicamentosBotiquinIDsString = JSON.stringify(medicamentosBotiquinIDs);

	// autocomplete options
	const medicamentosOptions: AutocompleteOption<string>[] = medicamentos.map((medicamento: any) => {
		return {
			label: medicamento.nombre + ' ' + medicamento.gramaje + ' ' + medicamento.tipo,
			value: medicamento.id
		};
	});

	function onMedicamentoSelection(event: CustomEvent<AutocompleteOption<string>>): void {
		inputDemo = event.detail.label;
	}

	function onMedicamentoButton(datosMedicamento: any) {
		medicamentoSeleccionado = datosMedicamento;
		checkMedicamento = true;
	}

	// funcion para agregar medicamentos al botiquin
	function addMedicamentoButton(datosMedicamento: any, cantidad: any) {
		medicamentosBotiquin += datosMedicamento + ' / Piezas: ' + cantidad + '\n';
		// obtener el id del medicamento en base al nombre, gramaje y tipo
		let idMedicamento = medicamentos.find((medicamento: any) => {
			return (
				medicamento.nombre + ' ' + medicamento.gramaje + ' ' + medicamento.tipo === datosMedicamento
			);
		}).id;

		// agregar el id del medicamento a la lista de medicamentos en y la cantidad de piezas
		medicamentosBotiquinIDs = [...medicamentosBotiquinIDs, { id: idMedicamento, piezas: cantidad }];

		// limpiar campos
		inputDemo = '';
		medicamentoSeleccionado = '';
		piezas = 0;
		checkMedicamento = false;
	}

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	// Store
	const modalStore = getModalStore();

	function closeModal() {
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card bg-initial p-4 w-fit shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold flex justify-between items-center gap-4';
	const cForm = 'p-4 flex flex-col'; // Ajustado para Flexbox vertical
	const cColumnContainer = 'grid grid-cols-2 gap-4 mt-16'; // Contenedor de columnas
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

		<!-- Detalles de medicamentos y formulario -->
		<!-- Contenedor de Columnas -->
		<div>
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
					class="h-16 overflow-auto bg-surface-700"
					bind:input={inputDemo}
					options={medicamentosOptions}
					on:selection={onMedicamentoSelection}
				/>
			</div>
		</div>
		<form method="POST" class={cForm}>
			<div class={cColumnContainer}>
				<!-- Aumentar / Disminuir cantidad de piezas Unitarias -->
				<div class="flex flex-row gap-4 items-end justify-end w-full col-span-2">
					<div class="input-group input-group-divider grid grid-cols-[auto_1fr_auto]">
						<div class="flex-grow">
							{#if !checkMedicamento}
								<p class="text-surface-400">No. Piezas</p>
							{:else}
								<p>{medicamentoSeleccionado}</p>
							{/if}
						</div>
						<input
							type="number"
							placeholder="No. Piezas"
							bind:value={piezas}
							disabled={!checkMedicamento}
							required
						/>

						<button
							class={checkMedicamento ? "variant-filled-secondary": "variant-soft-secondary"}
							type="button"
							on:click={() => addMedicamentoButton(medicamentoSeleccionado, piezas)}
							disabled={!checkMedicamento}
						>
							<i class="fa-solid fa-plus"></i>
						</button>
					</div>
				</div>

				<!-- Lista de medicamentos en botiquin -->
				<label class="label col-span-2">
					<textarea
						class="textarea"
						rows="5"
						placeholder="Medicamentos"
						bind:value={medicamentosBotiquin}
						readonly
					></textarea>
				</label>

				<input
					class="input"
					type="text"
					name="medicinas"
					bind:value={medicamentosBotiquinIDsString}
					hidden
				/>

				<label class="label col-span-2">
					<span>Zona</span>
					<input class="input" type="text" name="zona" placeholder="Zona" required />
				</label>
				<hr class="col-span-2" />

				<!-- Footer debajo de las columnas -->
				<footer class="modal-footer {parent.regionFooter} w-full mt-4 col-span-2">
					<button class="btn {parent.buttonNeutral}" type="button" on:click={parent.onClose}
						>Cancelar</button
					>
					<button formaction="?/crearBotiquin" class="btn {parent.buttonPositive}" type="submit"
						>Crear Botiquin</button
					>
				</footer>
			</div>
		</form>
	</div>
{/if}
