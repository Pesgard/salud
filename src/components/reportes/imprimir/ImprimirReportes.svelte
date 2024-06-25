<script lang="ts">
	import { onMount } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';

	export let pacienteID: string;
	export let porcentajes: any;
	console.log(porcentajes)

	// Nombre de tablas en Base de datos
	let tablenames: string[] = [
		'actividadFisica',
		'biologicos',
		'deficienciaVisual',
		'diabetes',
		'drogas',
		'lipidos',
		'nutricional',
		'saludBucal',
		'seguridad'
	];

	// Tiutlos que se mostraran en las tablas
	let tableTitle: string[] = [
		'Actividad Fisica',
		'Biologicos',
		'Deficiencia Visual',
		'Diabetes',
		'Drogas',
		'Lipidos',
		'Nutricional',
		'Salud Bucal',
		'Seguridad'
	];

	let data: Record<string, any> = {};

	onMount(async () => {
		for (let tableName of tablenames) {
			const response = await fetch('/api/formularios/get', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ pacienteID, tableName })
			});
			data[tableName] = await response.json();
		}
	});

	const modalStore = getModalStore();

	const closeModal = () => {
		modalStore.close();
	};

	function printReport() {
		//funcion para imprimir todo el contenido de la tabla en varias hojas
		print.call(window);
	}
</script>

{#if $modalStore[0]}
	<div class="card h-screen w-5/6 overflow-auto">
		<div class="flex flex-col items-center justify-center">
			<header
				class="previewer-header bg-surface-200-700-token p-4 flex justify-between items-center gap-4 w-full"
			>
				<div
					class="radio-group p-1 inline-flex flex-row gap-1 bg-surface-200-700-token border-surface-400-500-token rounded-token"
				>
					<h2 class="text-2xl">Reportes</h2>
				</div>
				<div class="flex flex-row gap-4">
					<button
						class="btn space-x-4 variant-filled-surface hover:variant-soft-primary"
						on:click={printReport}
					>
						<i class="fa-solid fa-print"></i> Imprimir
					</button>
					<button
						class="btn space-x-4 bg-tranpsarent hover:variant-soft-primary"
						on:click={closeModal}
					>
						<i class="fa-solid fa-xmark" />
					</button>
				</div>
			</header>

			{#each tablenames as tableName, index}
				{#if data[tableName]?.error}
					<div class="table-container p-4 w-full text-token space-y-4">
						<h3 class="text-xl mt-4">{tableTitle[index] + " 0%"}</h3>
						<p>Informacion no registrada</p>
					</div>
				{:else if data[tableName]}
					<div class="table-container p-4 w-full text-token space-y-4">
						<h3 class="text-xl mt-4">{tableTitle[index] + " " + porcentajes[index]}%</h3>
						<table class="table table-hover table-compact table-auto w-full">
							<thead>
								<tr>
									{#each Object.keys(data[tableName]).filter((key) => !['documento', 'id', 'pacienteID'].includes(key)) as header}
										<th>
											{@html header.startsWith('Date') ? `Fecha ${header.slice(4)}` : header}
										</th>
									{/each}
								</tr>
							</thead>
							<tbody>
								<tr>
									{#each Object.entries(data[tableName]).filter(([key]) => !['documento', 'id', 'pacienteID'].includes(key)) as [key, value], index}
										<td class="overflow-x-auto">{value}</td>
									{/each}
								</tr>
							</tbody>
						</table>
					</div>
				{/if}
			{/each}
		</div>
	</div>
{/if}
