<script lang="ts">
	import { getModalStore, ProgressRadial } from '@skeletonlabs/skeleton';

	export let porcentajes: any[];
	export let firstName: string;
	export let lastName: string;   

	let campos: string[] = [
		'Actividad Fisica',
		'Biologicos',
		'Deficiencia Visual',
		'Diabetes',
		'Drogas',
		'Lipidos',
		'Nutricional',
		'SaludBucal',
		'Seguridad'
	];

	// Convertir los porcentajes a un array plano y los valores null a 0
	porcentajes = porcentajes.flat().map((porcentaje) => (porcentaje === null ? 0 : porcentaje));

	const modalStore = getModalStore();

	// Base Classes
	const cBase = 'card p-4 w-full shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4';
</script>

<!-- @component Componente para mostrar los porcentajes de el paciente -->

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>

		<div class="{cForm} flex flex-row gap-4">
			{#each campos as campo, i}
				<div class="flex flex-col gap-4 items-center justify-center mb-4">
					<button type="button" class="btn !bg-transparent btn-sm">
						<ProgressRadial value={porcentajes[i] ?? 0} font={80}>{porcentajes[i]}%</ProgressRadial>
					</button>
					<span class="h3 text-center h-10 font-bold">{campo}</span>
				</div>
			{/each}
		</div>
	</div>
{/if}
