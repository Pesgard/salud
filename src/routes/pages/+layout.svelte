<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	import '../.././app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/">
					<strong class="text-xl uppercase">Salud en Movimiento</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="/pages/contactanos"
					target="_blank"
					rel="noreferrer"
				>
					Contactanos
				</a>

				<a
					class="btn btn-sm variant-ghost-surface"
					href="/dashboard"
					target="_blank"
					rel="noreferrer"
				>
					Dashboard
				</a>

				<a
					class="btn btn-sm variant-filled-surface"
					href="/iniciarSesion"
					target="_blank"
					rel="noreferrer"
				>
					Iniciar Sesion
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
    <slot/>
</AppShell>