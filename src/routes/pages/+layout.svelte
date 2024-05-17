<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	import '../.././app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
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
					href="iniciarSesion"
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