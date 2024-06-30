<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	export let parent: any;
	export let idBotiquin: any;

	// console.log(idBotiquin);

	// Base Classes
	const cBase = 'card bg-initial p-4 w-fit shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold flex justify-between items-center gap-4';
	const cForm = 'p-4 flex flex-col'; // Ajustado para Flexbox vertical
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>
			<span class="h2">{$modalStore[0].title ?? '(title missing)'}</span>
			<button on:click={() => modalStore.close()} class="btn btn-primary">X</button>
		</header>
		<div class="card flex flex-col bg-initial p-4 w-fit shadow-xl space-y-4">
			<article class="h3">{$modalStore[0].body ?? '(body missing)'}</article>
			<p class="flex justify-center text-xl font-bold">No podras recuperar los datos eliminados</p>

			<form action="?/deleteBotiquin" method="POST">
				<input name="idBotiquin" value={idBotiquin} hidden/>

				<div class="flex justify-center gap-4">
					<button on:click={() => modalStore.close()} class="btn variant-ghost-surface"
						>Cancelar</button
					>
					<button formaction="?/deleteBotiquin" class="btn variant-filled-error"
						>Eliminar</button
					>
				</div>
			</form>
		</div>
	</div>
{/if}
