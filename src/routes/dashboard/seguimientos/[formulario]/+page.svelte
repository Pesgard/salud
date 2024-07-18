<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import SeguimientoFisica from '../../../../components/formularios/actividadFisica/SeguimientoFisica.svelte';
	import SeguimientoBiologicos from '../../../../components/formularios/biologicos/SeguimientoBiologicos.svelte';
	import SeguimientosDeficiencia from '../../../../components/formularios/deficienciaVisual/SeguimientosDeficiencia.svelte';
    import SeguimientoDiabetes from '../../../../components/formularios/Diabetes/SeguimientoDiabetes.svelte';
    import SeguimientoDrogas from '../../../../components/formularios/drogasAlcohol/SeguimientoDrogas.svelte';
    import SeguimientosLipidos from '../../../../components/formularios/Lipidos/SeguimientosLipidos.svelte';
    import SeguimientoNutricional from '../../../../components/formularios/nutricional/SeguimientoNutricional.svelte';
    import SegumientoSaludBucal from '../../../../components/formularios/saludBucal/SegumientoSaludBucal.svelte';
    import SeguridadSeguimiento from '../../../../components/formularios/CursosSeguiridad/SeguridadSeguimiento.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	const urlData = $page.params.formulario;
	// console.log(urlData);

	let data: any;

	//se separa el id del paciente y el nombre de la tabla
	const splitedData = urlData.split('-');
	// console.log(splitedData);

	const pacienteID = splitedData[0];
	let tableName = splitedData[1];

	//Constante con el nombre de las tablas en Base de datos
	const tableNames: { [key: string]: string } = {
		'Actividad Fisica': 'actividadFisica',
		Biologicos: 'biologicos',
		'Deficiencia Visual': 'deficienciaVisual',
		Diabetes: 'diabetes',
		Drogas: 'drogas',
		Lipidos: 'lipidos',
		Nutricional: 'nutricional',
		SaludBucal: 'saludBucal',
		Seguridad: 'seguridad'
	};

	// Sustuir el nombre de la tabla por el nombre de la tabla en la base de datos
	tableName = tableNames[tableName];

	let nombrePaciente = '';

	onMount(async () => {
		const getPaciente = await fetch('/api/pacientes/paciente', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: pacienteID })
		});
		nombrePaciente = await getPaciente.json();
		// console.log(nombrePaciente);

		const response = await fetch('/api/formularios/get', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ pacienteID, tableName })
		});
		if (!response.ok) {
			const errorData = await response.json();

			console.log(errorData);
			throw new Error('Network response was not ok');
		}
		data = await response.json();
		// console.log(data);
	});
</script>

<ol class="breadcrumb m-4">
	<li class="crumb"><a class="anchor" href="/dashboard/seguimientos">Seguimientos</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Paciente</li>
</ol>

{#if nombrePaciente}
	{#if data}
		{#if tableName === 'actividadFisica'}
			<SeguimientoFisica {data} />
		{:else if tableName === 'biologicos'}
			<SeguimientoBiologicos {data} />
		{:else if tableName === 'deficienciaVisual'}
			<SeguimientosDeficiencia {data} />
        {:else if tableName === 'diabetes'}
            <SeguimientoDiabetes {data} />
        {:else if tableName === 'drogas'}        
            <SeguimientoDrogas {data} />
        {:else if tableName === 'lipidos'}
            <SeguimientosLipidos {data} />
        {:else if tableName === 'nutricional'}
            <SeguimientoNutricional {data} />
        {:else if tableName === 'saludBucal'}
            <SegumientoSaludBucal {data} />
        {:else if tableName === 'seguridad'}
            <SeguridadSeguimiento {data} />
		{/if}
	{:else}
		<hr />
		<p class="h4 w-full h-full text-center my-8">
			El paciente
			<span class="font-bold text-xl"
				>{nombrePaciente.firstName + ' ' + nombrePaciente.lastName}</span
			>
			no se a consultado en <span class="font-bold text-xl">{tableName}</span> favor de consultarlo en
			la seccion "Consultas"
		</p>
	{/if}
{:else}
	<div class=" w-full h-full flex flex-col items-center justify-center">
		<ProgressRadial value={undefined}></ProgressRadial>
		<h3 class="h3 my-4">Cargando...</h3>
	</div>
{/if}
