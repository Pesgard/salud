<script>
	import '../../app.postcss';
	import { AppRail, AppRailAnchor, AppShell } from '@skeletonlabs/skeleton';
	import '@fortawesome/fontawesome-free/css/all.min.css'
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<AppRail width="w-36">
			<!-- Default -->
			<AppRailAnchor href="/dashboard">
				<svelte:fragment slot="lead"><i class="fa-solid fa-house text-4xl"></i></svelte:fragment>
				<span class="text-lg">Inicio</span>
			</AppRailAnchor>

			<AppRailAnchor href="/dashboard/pacientes">
				<svelte:fragment slot="lead"><i class="fa-solid fa-user-group text-4xl"></i></svelte:fragment>
				<span class="text-lg">Pacientes</span>
			</AppRailAnchor>

			<AppRailAnchor href="/dashboard/seguimiento">
				<svelte:fragment slot="lead"><i class="fa-solid fa-clipboard-list text-4xl"></i></svelte:fragment>
				<span class="text-lg">Seguimientos</span>
			</AppRailAnchor>

			<AppRailAnchor href="/dashboard/reportes">
				<svelte:fragment slot="lead"><i class="fa-solid fa-folder-open text-4xl"></i></svelte:fragment>
				<span class="text-lg">Reportes</span>
			</AppRailAnchor>

			<AppRailAnchor href="/dashboard/inventario">
				<svelte:fragment slot="lead"><i class="fa-solid fa-boxes-stacked text-4xl"></i></svelte:fragment>
				<span class="text-lg">Inventario</span>
			</AppRailAnchor>

			<!-- ---- Bottom ---- -->
			<svelte:fragment slot="trail">
				<hr class="!border-t-4" />
				<button type="button" class="btn btn-lg w-full bg-initial">
					<span>
						<i class="fa-solid fa-right-from-bracket"></i>
					</span>
					<span>Salir</span>
				</button>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>

	<slot />
</AppShell>
