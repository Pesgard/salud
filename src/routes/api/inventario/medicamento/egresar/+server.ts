// Egresar piezas de medicamento seleccionado y actualizarlas en el inventario

import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({
	request,
	locals: { supabase }
}): Promise<Response> => {
	const requestBody = await request.json();
	const data = requestBody.data;
	const medicamento = requestBody.medicamento;
	const idMedicamento = parseInt(data.id);

	// console.log('Request body:', requestBody);

	const piezaInventario = parseInt(medicamento.detalleMedicamento.cantidad);
	const cajasInventario = parseInt(medicamento.detalleMedicamento.caja);
	const cantidadUnitaria = parseInt(data.cantidadEgreso);
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

	// variable con la fecha actual del tipo date
	const fecha = new Date();

	// console.log('Inventario actualizado:', { inventarioPiezas, inventarioCajas });

	const { error } = await supabase
		.from('detalleMedicamento')
		.update({
			cantidad: inventarioPiezas,
			caja: inventarioCajas,
			fechaSalida: fecha
		})
		.eq('idMedicamento', idMedicamento);

	if (error) {
		return new Response(JSON.stringify({ error: 'Error al actualizar el inventario' }), {
			status: 400
		});
	} else {
		return new Response(JSON.stringify({ message: 'Egreso de medicamento exitoso' }), {
			status: 200
		});
	}
};
