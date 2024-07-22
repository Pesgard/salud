import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({
	request,
	locals: { supabase }
}): Promise<Response> => {
	const requestBody = await request.json();
	const botiquin = requestBody.botiquin;
	const data = requestBody.data;

	const idMedicamento = data.idMedicamento;
	const idBotiquin = data.idBotiquin;
	const operacion = data.operacion;
	const cantidadActual = parseInt(data.cantidadActual);
	const cantidadActualizada = parseInt(data.cantidadActualizada);

	// console.log(botiquin);

	// Encontrar el detalle del botiquin correspondiente al medicamento
	const detalleBotiquin = botiquin.detalleBotiquin.find(
		(d: any) => d.idMedicamento === parseInt(idMedicamento)
	);

	if (!detalleBotiquin) {
		return new Response(JSON.stringify({ error: 'Medicamento no encontrado en el botiquin' }), {
			status: 404
		});
	}

	let nuevaCantidad = cantidadActual;
	let inventarioPiezas = detalleBotiquin.inventario.piezas;
	let inventarioCajas = detalleBotiquin.inventario.cajas;
	const unidadesCaja = detalleBotiquin.inventario.unidadesCaja;

	if (operacion === '+') {
		// Actualizar la cantidad de medicamentos en el botiquin
		nuevaCantidad += cantidadActualizada;
		inventarioPiezas -= cantidadActualizada;

		// Manejar el inventario
		while (inventarioPiezas < 0) {
			inventarioCajas -= 1;
			inventarioPiezas += unidadesCaja;

			if (inventarioCajas < 0) {
				return new Response(
					JSON.stringify({ error: 'No hay suficientes piezas disponibles en el inventario' }),
					{ status: 400 }
				);
			}
		}

		if (inventarioPiezas === 0 && inventarioCajas > 0) {
			inventarioCajas -= 1;
			inventarioPiezas = unidadesCaja;
		}

		if (inventarioCajas < 0 || (inventarioCajas === 0 && inventarioPiezas < 0)) {
			return new Response(
				JSON.stringify({ error: 'No hay suficientes piezas disponibles en el inventario' }),
				{ status: 400 }
			);
		}

		// Actualizar el inventario en base de datos
		const { error } = await supabase
			.from('detalleBotiquin')
			.update({
				cantidadUnitaria: nuevaCantidad
			})
			.eq('idBotiquin', idBotiquin)
			.eq('idMedicamento', idMedicamento);

		const { error: errorInventario } = await supabase
			.from('detalleMedicamento')
			.update({
				cantidad: inventarioPiezas,
				caja: inventarioCajas
			})
			.eq('idMedicamento', idMedicamento);

		if (error || errorInventario) {
			return new Response(JSON.stringify({ error: 'Error al actualizar el inventario' }), {
				status: 500
			});
		}

		return new Response(JSON.stringify({ message: 'Medicamento actualizado' }), {
			status: 200
		});
	}

	if (operacion === '-') {
		// Actualizar la cantidad de medicamentos en el botiquin
		nuevaCantidad -= cantidadActualizada;

		// actualizar la cantidad de medicamentos en el botiquin
		const { error } = await supabase
			.from('detalleBotiquin')
			.update({
				cantidadUnitaria: nuevaCantidad
			})
			.eq('id', detalleBotiquin.id)
			.eq('idMedicamento', idMedicamento);

		if (error) {
			return new Response(
				JSON.stringify({ error: 'Error al actualizar la cantidad de medicamentos' }),
				{ status: 500 }
			);
		}
	}

	return new Response(JSON.stringify({ message: 'Medicamento actualizado' }), {
		status: 200
	});
};
