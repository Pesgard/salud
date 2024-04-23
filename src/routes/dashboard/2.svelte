<script>
	import '../../app.postcss';
	import { AppShell, AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
</script>

<!-- App Shell -->
<AppShell>
	<!-- ---- Sidebar ---- -->
	<svelte:fragment slot="sidebarLeft">
		<!-- ---- LOGO ---- -->
		<AppRail width="w-42"> 
			<svelte:fragment slot="lead">
				<img class="mt-4" src="/logo.png" width="176" alt="Logotipo de la empresa"/>
			</svelte:fragment>
			
			<!-- ---- Sidebar ---- -->
			<AppRailAnchor href="/dashboard/home">(icon)</AppRailAnchor>
			<AppRailAnchor href="/dashboard/pacientes">(icon)</AppRailAnchor>
			<AppRailAnchor href="/dashboard/seguimientos">(icon)</AppRailAnchor>
			<AppRailAnchor href="/dashboard/reportes">(icon)</AppRailAnchor>
			<AppRailAnchor href="/dashboard/inventario">(icon)</AppRailAnchor>
			
			<!-- ---- Bottom ---- -->
			<svelte:fragment slot="trail">
				<hr />
				<div class="flex flex-col items-center align-baseline">
					<button class="btn bg-initial">
						<span>Cerrar Sesion</span>
						<span class="mt-1"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$props}>
							<path fill="currentColor" d="M4 12a1 1 0 0 0 1 1h7.59l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76a1 1 0 0 0-.21-.33l-4-4a1 1 0 1 0-1.42 1.42l2.3 2.29H5a1 1 0 0 0-1 1M17 2H7a3 3 0 0 0-3 3v3a1 1 0 0 0 2 0V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3a1 1 0 0 0-2 0v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3" />
						</svg></span>
					</button>
				</div>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>

	<!--- Contenido dentro del layout -->
	<slot />
</AppShell>
