<script>
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	//Logo 
	import logo from '$lib/logo.png'
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
					href="/pages/iniciarSesion"
					target="_blank"
					rel="noreferrer"
				>
					Iniciar Sesion
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<div class="container h-full mx-auto flex justify-center items-center">
		<div class="space-y-10 text-center flex flex-col items-center">
			<h2 class="h2">GRUPO SALUD EN Movimiento</h2>
			<!-- Animated Logo -->
			<img src={logo} alt="Logo Grupo salud en movimiento" />
			<!-- / -->
			<div class="flex justify-center space-x-2">
				<a class="btn variant-filled" href="/pages/iniciarSesion" target="_blank" rel="noreferrer">
					Utiliza nuestra aplicacion
				</a>
			</div>
		</div>
	</div>

	<slot />
</AppShell>
