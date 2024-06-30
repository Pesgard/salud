import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	// Consulta a la tabla medicamento
	const { data: medicamentos } = await supabase.from('medicamento').select('*');
	// Agregar la información de los detalles de los medicamentos
	for (let i = 0; medicamentos && i < medicamentos.length; i++) {
		const idMedicamento = medicamentos[i].id;
		const { data: detalles } = await supabase
			.from('detalleMedicamento')
			.select('*')
			.eq('idMedicamento', idMedicamento);
		medicamentos[i].detalles = detalles;
	}

	// Consulta a la tabla botiquines
	const { data: botiquines } = await supabase.from('botiquines').select('*');
	// Agregar la información de los detalles de los botiquines
	for (let i = 0; botiquines && i < botiquines.length; i++) {
		const idBotiquin = botiquines[i].id;
		const { data: detalles } = await supabase
			.from('detalleBotiquin')
			.select(
				'medicamento(nombre, ingredienteActivo, gramaje, tipo), cantidadUnitaria, idMedicamento'
			)
			.eq('idBotiquin', idBotiquin);
		botiquines[i].detalles = detalles;
	}

	console.log(botiquines);

	return { medicamentos, botiquines };
};

export const actions: Actions = {
	medicamento: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const nombre = formData.get('nombreMedicamento') as string;
		const ingrediente = formData.get('ingredienteActivo') as string;
		const valor = formData.get('valor') as string;
		const dosis = formData.get('dosis') as string;
		const caducidad = formData.get('caducidad') as string;
		const contenidoUnitario = formData.get('contenidoUnitario') as string;
		const caja = formData.get('caja') as string;

		const { data, error } = await supabase
			.from('medicamento')
			.insert([
				{
					nombre: nombre,
					ingredienteActivo: ingrediente,
					gramaje: valor,
					tipo: dosis
				}
			])
			.select('id');

		if (error) {
			console.log(error);
			return;
		}

		const idMedicamento = data[0].id;

		// Verificar que caducidad es una fecha válida
		const fechaCaducidad = new Date(caducidad);
		if (isNaN(fechaCaducidad.getTime())) {
			console.log('Fecha de caducidad no válida');
			return;
		}

		// Obtener la fecha actual en formato "aaaa-mm-dd"
		const fechaEntrada = new Date();
		const year = fechaEntrada.getFullYear();
		const month = String(fechaEntrada.getMonth() + 1).padStart(2, '0');
		const day = String(fechaEntrada.getDate()).padStart(2, '0');

		const fechaFormateada = `${year}-${month}-${day}`;

		const { error: errorDetalle } = await supabase.from('detalleMedicamento').insert([
			{
				idMedicamento: idMedicamento,
				caja: caja,
				cantidad: contenidoUnitario,
				fechaCaducidad: caducidad,
				fechaEntrada: fechaFormateada
			}
		]);

		if (errorDetalle) {
			console.log(errorDetalle);
		}
	},

	updateMedicamento: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		console.log(formData);

		const id = formData.get('id') as string;
		const nombreMedicamento = formData.get('nombreMedicamento');
		const ingredienteActivo = formData.get('ingrediente');
		const gramaje = formData.get('gramaje');
		const tipo = formData.get('tipo');
		const fechaCaducidad = formData.get('fechaCaducidad') as string;
		const fechaEntrada = formData.get('fechaEntrada') as string;
		const cantidadUnitaria = formData.get('cantidadUnitaria') as string;
		const caja = formData.get('caja') as string;

		const { error: errorMedicamento } = await supabase
			.from('medicamento')
			.update([
				{
					nombre: nombreMedicamento,
					ingredienteActivo: ingredienteActivo,
					gramaje: gramaje,
					tipo: tipo
				}
			])
			.eq('id', id);

		const { error: errorDetalles } = await supabase
			.from('detalleMedicamento')
			.update([
				{
					caja: caja,
					cantidad: cantidadUnitaria,
					fechaCaducidad: fechaCaducidad,
					fechaEntrada: fechaEntrada
				}
			])
			.eq('idMedicamento', id);

		if (errorMedicamento) {
			console.log(errorMedicamento);
		}

		if (errorDetalles) {
			console.log(errorDetalles);
		}
	},

	deleteMedicamento: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		console.log(formData);

		const id = formData.get('idMedicamento') as string;

		const { error: errorBotiquines } = await supabase
			.from('detalleBotiquin')
			.delete()
			.eq('idMedicamento', id);
		if (errorBotiquines) {
			console.log(errorBotiquines);
		} else {
			const { error: errorDetalles } = await supabase
				.from('detalleMedicamento')
				.delete()
				.eq('idMedicamento', id);

			if (errorDetalles) {
				console.log(errorDetalles);
			} else {
				const { error: errorMedicamento } = await supabase
					.from('medicamento')
					.delete()
					.eq('id', id);

				if (errorMedicamento) {
					console.log(errorMedicamento);
				}
			}
		}
	},

	crearBotiquin: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		//  console.log(formData);
		const medicamentos = formData.get('medicinas') as string;
		// console.log(medicamentos);
		// Parsear la cadena JSON a un objeto JavaScript
		const medicamentosArray = JSON.parse(medicamentos);
		// console.log(medicamentosArray);

		// Obtener la fecha actual en formato "aaaa-mm-dd"
		const fechaEntrada = new Date();
		const year = fechaEntrada.getFullYear();
		const month = String(fechaEntrada.getMonth() + 1).padStart(2, '0');
		const day = String(fechaEntrada.getDate()).padStart(2, '0');

		// valores en tabla Botiquines
		const fechaCreacion = `${year}-${month}-${day}`;
		const zona = formData.get('zona') as string;

		// obtener uid del usuario
		const {
			data: { user }
		} = await supabase.auth.getUser();
		const idUsuario = user?.id;

		// insertar en tabla Botiquines
		const { data: botiquines, error } = await supabase
			.from('botiquines')
			.insert([
				{
					fechaCreacion: fechaCreacion,
					zona: zona,
					creadoPor: idUsuario
				}
			])
			.select('id');

		if (botiquines) {
			const idBotiquin = botiquines[0].id;
			// insertar los detalles botiquin recoriendo el array de medicamentos
			for (let i = 0; i < medicamentosArray.length; i++) {
				const medicamento = medicamentosArray[i];
				const idMedicamento = medicamento.id;
				const piezas = medicamento.piezas;

				const { error: errorDetalle } = await supabase.from('detalleBotiquin').insert([
					{
						idBotiquin: idBotiquin,
						idMedicamento: idMedicamento,
						cantidadUnitaria: piezas
					}
				]);

				if (errorDetalle) {
					console.log(errorDetalle);
				}
			}
		}

		if (error) {
			console.log(error);
		}

		console.log(fechaCreacion, zona, idUsuario);
	},

	// Actualizar Medicamento de Botiquin
	updateBotiquin: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		// console.log(formData);

		const idMedicamento = formData.get('idMedicamento') as string;
		const idBotiquin = formData.get('idBotiquin') as string;
		const cantidadUnitaria = formData.get('cantidadUnitaria') as string;

		const { error } = await supabase
			.from('detalleBotiquin')
			.update({
				cantidadUnitaria: cantidadUnitaria
			})
			.eq('idBotiquin', idBotiquin)
			.eq('idMedicamento', idMedicamento);

		if (error) {
			console.log(error);
		}
	},

	// Agregar medicamento a botiquin
	agregarMedicamento: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		// console.log(formData);

		const idMedicamento = formData.get('idMedicamento') as string;
		const idBotiquin = formData.get('idBotiquin') as string;
		const cantidadUnitaria = formData.get('cantidadUnitaria') as string;

		const { error } = await supabase.from('detalleBotiquin').insert([
			{
				idBotiquin: idBotiquin,
				idMedicamento: idMedicamento,
				cantidadUnitaria: cantidadUnitaria
			}
		]);

		if (error) {
			console.log(error);
		}
	},

	// Eliminar medicamento de botiquin
	eliminarMedicamento: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		// console.log(formData);

		const idMedicamento = formData.get('idMedicamento') as string;
		const idBotiquin = formData.get('idBotiquin') as string;

		const { error } = await supabase
			.from('detalleBotiquin')
			.delete()
			.eq('idBotiquin', idBotiquin)
			.eq('idMedicamento', idMedicamento);

		if (error) {
			console.log(error);
		}
	},

	//eliminar botiquin
	deleteBotiquin: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		// console.log(formData);

		const idBotiquin = formData.get('idBotiquin') as string;

		const { error: errorDetalle } = await supabase
			.from('detalleBotiquin')
			.delete()
			.eq('idBotiquin', idBotiquin);

		if (errorDetalle) {
			console.log(errorDetalle);
		} else {
			const { error } = await supabase.from('botiquines').delete().eq('id', idBotiquin);

			if (error) {
				console.log(error);
			}
		}
	}
};
