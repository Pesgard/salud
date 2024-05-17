<script>
	import '../app.postcss'; // Import the project's postcss styles file
	import { AppShell, AppBar } from '@skeletonlabs/skeleton'; // Import the AppShell and AppBar components from the @skeletonlabs/skeleton package
	import logo from '$lib/logo.png' // Import the logo image from the $lib folder
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom'; // Import necessary functions for handling floating popups from the @floating-ui/dom package
	import { storePopup } from '@skeletonlabs/skeleton'; // Import the storePopup function from the @skeletonlabs/skeleton package and assign it to the storePopup variable
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow }); // Configure the necessary functions for handling floating popups in the storePopup variable
</script>

<!-- App Shell -->
<AppShell> <!-- Component that defines the basic structure of the application -->
	<!-- Header -->
	<svelte:fragment slot="header"> <!-- Fragment that is inserted into the "header" slot of the AppShell component -->
		<!-- App Bar -->
		<AppBar> <!-- Component that represents the application's navigation bar -->
			<svelte:fragment slot="lead"> <!-- Fragment that is inserted into the "lead" slot of the AppBar component -->
				<a href="/"> <!-- Link to the home page -->
					<strong class="text-xl uppercase">Salud en Movimiento</strong> <!-- Link text -->
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail"> <!-- Fragment that is inserted into the "trail" slot of the AppBar component -->
				<a
					class="btn btn-sm variant-ghost-surface"
					href="/pages/contactanos"
					target="_blank"
					rel="noreferrer"
				>
					Contactanos
				</a> <!-- Link to the contact page -->

				<a
					class="btn btn-sm variant-ghost-surface"
					href="/dashboard"
					target="_blank"
					rel="noreferrer"
				>
					Dashboard
				</a> <!-- Link to the dashboard -->

				<a
					class="btn btn-sm variant-filled-surface"
					href="pages/iniciarSesion"
				>
					Iniciar Sesion
				</a> <!-- Link to the login page -->
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Main Content -->
	<div class="container h-full mx-auto flex justify-center items-center"> <!-- Main container of the page -->
		<div class="space-y-10 text-center flex flex-col items-center"> <!-- Container for elements with space between them, vertically centered and aligned to the center -->
			<h2 class="h2">GRUPO SALUD EN Movimiento</h2> <!-- Heading level 2 -->
			<!-- Animated Logo -->
			<img src={logo} alt="Logo Grupo salud en movimiento" /> <!-- Image of the Grupo salud en movimiento logo -->
			<!-- / -->
			<div class="flex justify-center space-x-2"> <!-- Container for flexible elements with space between them and aligned to the center -->
				<a class="btn variant-filled" href="/pages/iniciarSesion" target="_blank" rel="noreferrer">
					Utiliza nuestra aplicacion
				</a> <!-- Link to use the application -->
			</div>
		</div>
	</div>

	<slot /> <!-- Reserved space for inserting additional content -->
</AppShell>
