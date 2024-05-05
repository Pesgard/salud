<script>
	import logo from '$lib/logo.png';
	import './menu-styles.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
</script>

<div>
	<ol class="breadcrumb m-4">
		<li class="crumb">Inicio</li>
		<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	</ol>
	<div class="circle-menu">
		<div class="center-content">
			<img src={logo} alt="Logo" />
		</div>
		<ul>
			<li>
				<a class="opcion1" href="/dashboard/biologicos">Biologicos</a>
			</li>
			<li><a class="opcion2" href="/dashboard/estadoNutricional">Nutricional</a></li>
			<li><a class="opcion3" href="/dashboard/diabetesHipertension">Diabetes</a></li>
			<li><a class="opcion4" href="/dashboard/lipidos">Lipidos</a></li>
			<li><a class="opcion5" href="/dashboard/RCP">RCP</a></li>
			<li><a class="opcion6" href="/dashboard/actividadFisica">Actividad Fisica</a></li>
			<li><a class="opcion7" href="/dashboard/drogas">Drogas</a></li>
			<li><a class="opcion8" href="/dashboard/deficienciaVisual">Deficiencia Visual</a></li>
			<li><a class="opcion9" href="/dashboard/saludBucal">Salud Bucal</a></li>
			<li><a class="opcion10" href="#">Opcion 10</a></li>
			<li><a class="opcion11" href="#">Opcion 11</a></li>
		</ul>
	</div>
</div>
