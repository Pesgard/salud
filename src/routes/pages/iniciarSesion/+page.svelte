<script>
	import logo from '$lib/logo.png'
</script>

<div class="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm mb-2">
		<img src={logo} alt="Logo" />
		<h2 class="mt-4 text-center text-2xl font-bold leading-9 tracking-tigh">Ingresa a tu cuenta</h2>
	</div>
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<!-- Formularios de inicio de Sesion -->
		<form class="space-y-6" method="POST" action="?/login">
			<label>
				<p>Username</p>
				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input name="email" type="email" placeholder="Ingresa Correo electronico" />
				</div>
			</label>

			<label>
				<p>Password</p>
				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input name="password" type="password" placeholder="Password" />
				</div>
			</label>

			<div class="flex flex-col items-center">
				<button formaction="?/login" class="btn variant-filled">
					<span>Iniciar Sesion</span>
					<span
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
							{...$$props}
						>
							<path
								fill="currentColor"
								d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z"
							/>
						</svg></span
					>
				</button>
			</div>
		</form>
	</div>
</div>
