import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({
	request,
	locals: { supabase }
}): Promise<Response> => {
	const requestBody = await request.json();
	const botiquin = requestBody.botiquin;
	const data = requestBody.data;

	console.log('Request body:', requestBody);

	const idMedicamento = parseInt(data.idMedicamento);
	const idBotiquin = parseInt(data.idBotiquin);
	const piezaInventario = parseInt(data.piezaInventario);
	const cajasInventario = parseInt(data.cajasInventario);
	const cantidadUnitaria = parseInt(data.cantidadUnitaria);
	const unidadesCaja = 12; //parseInt(data.unidadesCaja);

	// Actualizar el inventario
	let inventarioPiezas = piezaInventario;
	let inventarioCajas = cajasInventario;

	// Actualizar la cantidad de medicamentos en el botiquin
	inventarioPiezas -= cantidadUnitaria;

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

	// console.log('Inventario actualizado:', { inventarioPiezas, inventarioCajas });

	const { error } = await supabase.from('detalleBotiquin').insert([
		{
			idBotiquin: idBotiquin,
			idMedicamento: idMedicamento,
			cantidadUnitaria: cantidadUnitaria
		}
	]);

	if (error) {
		return new Response(
			JSON.stringify({ error: 'Error al hacer operaciones en la base de datos' }),
			{
				status: 500
			}
		);
	}

	const { error: errorInventario } = await supabase
		.from('detalleMedicamento')
		.update({
			cantidad: inventarioPiezas,
			caja: inventarioCajas
		})
		.eq('idMedicamento', idMedicamento);

        if (errorInventario) {
            return new Response(JSON.stringify({ error: 'Error al actualizar el inventario' }), {
                status: 500
            });
        }

	return new Response(JSON.stringify({ message: 'Operación realizada con éxito' }), {
		status: 200
	});
};
