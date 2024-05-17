<script>
	// JavaScript code inside the script tag
	import logo from '$lib/logo.png'; // Importing the logo image
	import './menu-styles.css'; // Importing the menu styles
	import '@fortawesome/fontawesome-free/css/all.min.css'; // Importing the Font Awesome CSS
</script>

<!-- HTML code outside the script tag -->
<div>
	<ol class="breadcrumb m-4">
		<li class="crumb">Inicio</li> <!-- Breadcrumb item for "Inicio" -->
		<li class="crumb-separator" aria-hidden>&rsaquo;</li> <!-- Breadcrumb separator -->
	</ol>
	<div class="circle-menu">
		<div class="center-content">
			<img src={logo} alt="Logo" /> <!-- Displaying the logo image -->
		</div>
		<ul>
			<li>
				<a class="opcion1" href="/dashboard/biologicos">Biologicos</a> <!-- Menu option 1 -->
			</li>
			<li><a class="opcion2" href="/dashboard/estadoNutricional">Nutricional</a></li> <!-- Menu option 2 -->
			<li><a class="opcion3" href="/dashboard/diabetesHipertension">Diabetes</a></li> <!-- Menu option 3 -->
			<li><a class="opcion4" href="/dashboard/lipidos">Lipidos</a></li> <!-- Menu option 4 -->
			<li><a class="opcion5" href="/dashboard/rcp">RCP</a></li> <!-- Menu option 5 -->
			<li><a class="opcion6" href="/dashboard/actividadFisica">Actividad Fisica</a></li> <!-- Menu option 6 -->
			<li><a class="opcion7" href="/dashboard/drogas">Drogas</a></li> <!-- Menu option 7 -->
			<li><a class="opcion8" href="/dashboard/deficienciaVisual">Deficiencia Visual</a></li> <!-- Menu option 8 -->
			<li><a class="opcion9" href="/dashboard/saludBucal">Salud Bucal</a></li> <!-- Menu option 9 -->
			<li><a class="opcion10" href="/dashboard/cursosSeguridad">Cursos Seguridad</a></li> <!-- Menu option 10 -->
			<li><a class="opcion11" href="#">Opcion 11</a></li> <!-- Menu option 11 -->
		</ul>
	</div>
</div>
