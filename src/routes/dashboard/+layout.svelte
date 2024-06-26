<script>
	import '../../app.postcss'; // Importa un archivo de estilos postcss
	import { AppRail, AppRailAnchor, AppShell } from '@skeletonlabs/skeleton'; // Importa componentes de la biblioteca @skeletonlabs/skeleton
	import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa estilos de FontAwesome
	import { page } from '$app/stores';

	import { goto, invalidate } from '$app/navigation'; // Importa funciones de navegación del framework SvelteKit
	import { onMount } from 'svelte'; // Importa la función onMount de Svelte
	import { initializeStores, Modal } from '@skeletonlabs/skeleton';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom'; // Importa funciones de posicionamiento de Floating UI

	import { storePopup } from '@skeletonlabs/skeleton'; // Importa la tienda storePopup de la biblioteca @skeletonlabs/skeleton
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow }); // Establece las funciones de posicionamiento en la tienda storePopup

	initializeStores(); // Inicializa las tiendas de la biblioteca @skeletonlabs/skeleton

	export let data; // Propiedad exportada llamada "data"
	$: ({ session, supabase } = data); // Desestructura "data" en las variables "session" y "supabase" y establece una reactividad

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
	};

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			// Escucha los cambios en el estado de autenticación de Supabase
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

<Modal />

<AppShell>
	<!-- Componente de la biblioteca @skeletonlabs/skeleton -->
	<svelte:fragment slot="sidebarLeft">
		<!-- Fragmento utilizado como slot en el componente AppShell -->
		<AppRail width="w-full">
			<!-- Componente de navegación lateral -->
			<!-- Default -->
			<AppRailAnchor href="/dashboard" selected={$page.url.pathname === '/dashboard'}>
				<!-- Ancla de navegación -->
				<svelte:fragment slot="lead">
					<i class="fa-solid fa-hospital text-4xl"></i>
				</svelte:fragment>
				<!-- Fragmento utilizado como slot para el ícono -->
				<span class="text-lg">Consultar</span>
				<!-- Texto del enlace -->
			</AppRailAnchor>

			<AppRailAnchor
				href="/dashboard/pacientes"
				selected={$page.url.pathname === '/dashboard/pacientes'}
			>
				<svelte:fragment slot="lead"
					><i class="fa-solid fa-user-group text-4xl"></i></svelte:fragment
				>
				<span class="text-lg">Pacientes</span>
			</AppRailAnchor>

			<AppRailAnchor
				href="/dashboard/seguimientos"
				selected={$page.url.pathname === '/dashboard/seguimientos'}
			>
				<svelte:fragment slot="lead"
					><i class="fa-solid fa-clipboard-list text-4xl"></i></svelte:fragment
				>
				<span class=" text-base">Seguimientos</span>
			</AppRailAnchor>

			<AppRailAnchor
				href="/dashboard/reportes"
				selected={$page.url.pathname === '/dashboard/reportes'}
			>
				<svelte:fragment slot="lead"
					><i class="fa-solid fa-folder-open text-4xl"></i></svelte:fragment
				>
				<span class="text-lg">Reportes</span>
			</AppRailAnchor>

			<AppRailAnchor
				href="/dashboard/inventario"
				selected={$page.url.pathname === '/dashboard/inventario'}
			>
				<svelte:fragment slot="lead"
					><i class="fa-solid fa-boxes-stacked text-4xl"></i></svelte:fragment
				>
				<span class="text-lg">Inventario</span>
			</AppRailAnchor>

			<!-- ---- Bottom ---- -->
			<svelte:fragment slot="trail">
				<!-- Fragmento utilizado como slot en el componente AppRail -->
				<hr class="!border-t-4" />
				<!-- Línea horizontal -->
				<button on:click={logout} type="button" class="btn btn-lg w-full bg-initial">
					<!-- Botón -->
					<span>
						<i class="fa-solid fa-right-from-bracket"></i>
						<!-- Ícono -->
					</span>
					<span>Salir</span>
					<!-- Texto del botón -->
				</button>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>

	<slot />
	<!-- Slot para el contenido principal -->
</AppShell>
