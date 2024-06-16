<script lang="ts">
	import { FileButton, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import Buscador from '../../buscador/Buscador.svelte';

	// parametro de componente
	export let pacientes: any;
	let pacienteID: number = 0;

	// check para habilitar y deshabilitar campos
	let check = false;

	//interface para los datos
	interface Data {
		id: number | null;
		pacienteID: number;
		date: Date | null;
		hdl: number;
		colesterol: number;
		trigliceridos: number;
		glucosa: number;
		otros: string;
		farmacos: string;
		extra: string;
	}

	let data: Data = {
		id: null,
		pacienteID: 0,
		date: null,
		hdl: 0,
		colesterol: 0,
		trigliceridos: 0,
		glucosa: 0,
		otros: '',
		farmacos: '',
		extra: ''
	};

	const modalStore = getModalStore();
	const modalComponent: ModalComponent = {
		ref: Buscador,
		props: { pacientes }
	};
	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		response: (r) => {
			pacienteID = r;
			getLipidos(pacienteID, 'lipidos');
		}
	};

	async function getLipidos(pacienteID: number, tableName: string) {
		try {
			const response = await fetch('/api/formularios/get', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ pacienteID, tableName })
			});
			if (!response.ok) {
				const errorData = await response.json();
				console.error('Error fetching data:', errorData.error);
				data = {
					id: null,
					pacienteID: pacienteID,
					date: null,
					hdl: 0,
					colesterol: 0,
					trigliceridos: 0,
					glucosa: 0,
					otros: '',
					farmacos: '',
					extra: ''
				};
				check = true;
				return null;
			}
			data = await response.json();
			check = true;
			return data;
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	}
	async function postLipidos(data: Data, tableName: string) {
		try {
			const response = await fetch('/api/formularios/post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ data, tableName })
			});
			if (!response.ok) {
				const errorData = await response.json();
				console.error('Error posting data:', errorData.error);
				return null;
			}
			const responseData = await response.json();
			return responseData;
		} catch (error) {
			console.error('Error:', error);
			return null;
		}
	}

	function openModal() {
		modalStore.trigger(modal);
	}
	//funcion para el envio de datos de formulario
	function handleSubmit(event: Event) {
		event.preventDefault();
		postLipidos(data, 'lipidos');
	}
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
				<h2 class="text-2xl">Lipidos</h2>
			</div>
			<div class="md:inline md:ml-4">
				<button on:click={openModal} class="btn space-x-4 variant-soft hover:variant-soft-primary">
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
						<span class="label flex items-center space-x-2">Fecha</span>
						<input class="input" type="date" disabled={!check} bind:value={data.date} />
					</div>
					<hr />

					<!-- SECCION HDL -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label">HDL</span>
						<input
							class="input"
							title="Detalles"
							type="number"
							placeholder="Detalles"
							disabled={!check}
							bind:value={data.hdl}
						/>
					</div>
					<hr />

					<!-- Colesterol -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label">Colesterol</span>
						<input
							class="input"
							title="Detalles"
							type="number"
							placeholder="Detalles"
							disabled={!check}
							bind:value={data.colesterol}
						/>
					</div>
					<hr />

					<!-- Trigliceridos -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label">Trigliceridos</span>
						<input
							class="input"
							title="Detalles"
							type="number"
							placeholder="Detalles"
							disabled={!check}
							bind:value={data.trigliceridos}
						/>
					</div>
					<hr />

					<!-- Glucosa -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label">Glucosa</span>
						<input
							class="input"
							title="Detalles"
							type="number"
							placeholder="Detalles"
							disabled={!check}
							bind:value={data.glucosa}
						/>
					</div>
					<hr />

					<!-- Otros -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label">Otros</span>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Detalles"
							disabled={!check}
							bind:value={data.otros}
						/>
					</div>
					<hr />

					<!-- Otros -->
					<div class="grid grid-cols-3 gap-4 pt-2 items-center justify-center">
						<span class="label">Farmacos</span>
						<input
							class="input"
							title="Detalles"
							type="text"
							placeholder="Detalles"
							disabled={!check}
							bind:value={data.farmacos}
						/>
					</div>
					<hr />

					<label class="label">
						<span>Observaciones Extra</span>
						<input
							class="input"
							type="text"
							placeholder="Observaciones"
							disabled={!check}
							bind:value={data.extra}
						/>
					</label>

					<!-- Botones de Formularios -->
					<hr />
					<div class="flex flex-row w-full justify-between">
						<button type="button" class="btn variant-ringed">Borrar</button>
						<button on:click={handleSubmit} type="button" class="btn variant-soft">Enviar</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
