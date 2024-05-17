<script>
	import '../../app.postcss'; // Importa un archivo de estilos postcss
	import { AppRail, AppRailAnchor, AppShell } from '@skeletonlabs/skeleton'; // Importa componentes de la biblioteca @skeletonlabs/skeleton
	import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa estilos de FontAwesome

	import { goto, invalidate } from '$app/navigation'; // Importa funciones de navegación del framework SvelteKit
	import { onMount } from 'svelte'; // Importa la función onMount de Svelte

	export let data; // Propiedad exportada llamada "data"
	$: ({ session, supabase } = data); // Desestructura "data" en las variables "session" y "supabase" y establece una reactividad

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => { // Escucha los cambios en el estado de autenticación de Supabase
			if (!newSession) {
				/**
				 * Encola esto como una tarea para que la navegación no impida que la
				 * función de activación se complete
				 */
				setTimeout(() => {
					goto('/', { invalidateAll: true }); // Navega a la página de inicio y invalida todos los datos en caché
				});
			}
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth'); // Invalida los datos de autenticación en caché si la sesión ha expirado o ha cambiado
			}
		});

		return () => data.subscription.unsubscribe(); // Cancela la suscripción a los cambios en el estado de autenticación al desmontar el componente
	});
</script>

<AppShell> <!-- Componente de la biblioteca @skeletonlabs/skeleton -->
	<svelte:fragment slot="sidebarLeft"> <!-- Fragmento utilizado como slot en el componente AppShell -->
		<AppRail width="w-36"> <!-- Componente de navegación lateral -->
			<!-- Default -->
			<AppRailAnchor href="/dashboard"> <!-- Ancla de navegación -->
				<svelte:fragment slot="lead"><i class="fa-solid fa-house text-4xl"></i></svelte:fragment> <!-- Fragmento utilizado como slot para el ícono -->
				<span class="text-lg">Inicio</span> <!-- Texto del enlace -->
			</AppRailAnchor>

			<AppRailAnchor href="/dashboard/pacientes">
				<svelte:fragment slot="lead"
					><i class="fa-solid fa-user-group text-4xl"></i></svelte:fragment
				>
				<span class="text-lg">Pacientes</span>
			</AppRailAnchor>

			<AppRailAnchor href="/dashboard/seguimiento">
				<svelte:fragment slot="lead"
					><i class="fa-solid fa-clipboard-list text-4xl"></i></svelte:fragment
				>
				<span class="text-lg">Seguimientos</span>
			</AppRailAnchor>

			<AppRailAnchor href="/dashboard/reportes">
				<svelte:fragment slot="lead"
					><i class="fa-solid fa-folder-open text-4xl"></i></svelte:fragment
				>
				<span class="text-lg">Reportes</span>
			</AppRailAnchor>

			<AppRailAnchor href="/dashboard/inventario">
				<svelte:fragment slot="lead"
					><i class="fa-solid fa-boxes-stacked text-4xl"></i></svelte:fragment
				>
				<span class="text-lg">Inventario</span>
			</AppRailAnchor>

			<!-- ---- Bottom ---- -->
			<svelte:fragment slot="trail"> <!-- Fragmento utilizado como slot en el componente AppRail -->
				<hr class="!border-t-4" /> <!-- Línea horizontal -->
				<button type="button" class="btn btn-lg w-full bg-initial"> <!-- Botón -->
					<span>
						<i class="fa-solid fa-right-from-bracket"></i> <!-- Ícono -->
					</span>
					<span>Salir</span> <!-- Texto del botón -->
				</button>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>

	<slot /> <!-- Slot para el contenido principal -->
</AppShell>
