<script lang="ts">
	// JavaScript code inside the script tag
	import logo from '$lib/logo.png'; // Importing the logo image
	import './menu-styles.css'; // Importing the menu styles

	export const load = async ({
		depends,
		locals: { supabase }
	}: {
		depends: any;
		locals: { supabase: any };
	}) => {
		depends('supabase:db:notes');
		const { data: notes } = await supabase.from('notes').select('id,note').order('id');
		return { notes: notes ?? [] };
	};
</script>

<!-- HTML code outside the script tag -->
<div>
	<ol class="breadcrumb m-4">
		<li class="crumb">Inicio</li>
		<!-- Breadcrumb item for "Inicio" -->
		<li class="crumb-separator" aria-hidden>&rsaquo;</li>
		<!-- Breadcrumb separator -->
	</ol>
	<div class="circle-menu">
		<div class="center-content">
			<img src={logo} alt="Logo" />
			<!-- Displaying the logo image -->
		</div>
		<ul>
			<li>
				<a class="opcion1" href="dashboard/home/biologicos">Biologicos</a>
				<!-- Menu option 1 -->
			</li>
			<li><a class="opcion2" href="dashboard/home/estadoNutricional">Nutricional</a></li>
			<!-- Menu option 2 -->
			<li><a class="opcion3" href="dashboard/home/diabetesHipertension">Diabetes</a></li>
			<!-- Menu option 3 -->
			<li><a class="opcion4" href="dashboard/home/lipidos">Lipidos</a></li>
			<!-- Menu option 4 -->
			<li><a class="opcion5" href="dashboard/home/rcp">RCP</a></li>
			<!-- Menu option 5 -->
			<li><a class="opcion6" href="dashboard/home/actividadFisica">Actividad Fisica</a></li>
			<!-- Menu option 6 -->
			<li><a class="opcion7" href="dashboard/home/drogas">Drogas</a></li>
			<!-- Menu option 7 -->
			<li><a class="opcion8" href="dashboard/home/deficienciaVisual">Deficiencia Visual</a></li>
			<!-- Menu option 8 -->
			<li><a class="opcion9" href="dashboard/home/saludBucal">Salud Bucal</a></li>
			<!-- Menu option 9 -->
			<li><a class="opcion10" href="dashboard/home/cursosSeguridad">Cursos Seguridad</a></li>
			<!-- Menu option 10 -->
			<li><a class="opcion11" href="#">Opcion 11</a></li>
			<!-- Menu option 11 -->
		</ul>
	</div>
</div>
