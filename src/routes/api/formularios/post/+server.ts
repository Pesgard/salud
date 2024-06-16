import { type RequestHandler } from '@sveltejs/kit';

// Función para calcular el porcentaje de campos no vacíos en un objeto
function calculateFilledPercentage(obj: Record<string, unknown>): number {
	const keysWithoutDocumento = Object.keys(obj).filter((key) => key !== 'documento');
	const totalFields = keysWithoutDocumento.length;
	const filledFields = keysWithoutDocumento.filter(
		(key) => obj[key] !== null && obj[key] !== ''
	).length;
	return (filledFields / totalFields) * 100;
}
// Api para guardar los datos de un formulario en la tabla correspondiente de manera dinamica segun la tabla que se envie en el body
export const POST: RequestHandler = async ({
	request,
	locals: { supabase }
}): Promise<Response> => {
	const requestBody = await request.json();
	let newId;

	console.log(requestBody.data);

	// establecer los valores vacios como nulos
	requestBody.data = setEmptyValuesToNull(requestBody.data);

	if (requestBody.data.id === null) {
		// consulta el utlimo id de la tabla para asignar el siguiente
		const { data: lastIdValue } = await supabase
			.from(requestBody.tableName)
			.select('id')
			.order('id', { ascending: false })
			.limit(1);

		if (!lastIdValue || lastIdValue.length === 0) {
			newId = 1;
		} else {
			// convertir el lastvalue a int y sumarle 1
			newId = parseInt(lastIdValue[0].id) + 1;
		}

		//Asignar el nuevo id al objeto
		requestBody.data.id = newId;
		console.log(requestBody.data);

		// Insertar el nuevo objeto en la tabla
		const { error } = await supabase.from(requestBody.tableName).insert(requestBody.data);

		if (error) {
			console.log(error);
			return new Response(JSON.stringify({ error: 'Error al insertar los datos' }), {
				status: 500
			});
		}

		// Calcular el porcentaje de campos no vacíos
		const filledPercentage = calculateFilledPercentage(requestBody.data);
		console.log(filledPercentage);

		// Insertar el porcentaje en la tabla seguimientos junto con el id del paciente
		const { error: seguimientosError } = await supabase
			.from('seguimientos')
			.update({
				[requestBody.tableName]: filledPercentage
			})
			.eq('pacienteID', requestBody.data.pacienteID);

		if (seguimientosError) {
			console.log(seguimientosError);
			return new Response(JSON.stringify({ error: 'Error al actualizar los seguimientos' }), {
				status: 500
			});
		}

		return new Response(JSON.stringify({ info: 'Datos insertados con exito' }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} else {
		// Si el formulario ya existe, se actualiza
		const { error } = await supabase
			.from(requestBody.tableName)
			.update(requestBody.data)
			.eq('id', requestBody.data.id);

		if (error) {
			console.log(error);
			return new Response(JSON.stringify({ error: 'Error al actualizar los datos' }), {
				status: 500
			});
		}

		// Calcular el porcentaje de campos no vacíos
		const filledPercentage = calculateFilledPercentage(requestBody.data);
		console.log(filledPercentage);

		// Actualizar el porcentaje en la tabla seguimientos
		const { error: seguimientosError } = await supabase
			.from('seguimientos')
			.update({ [requestBody.tableName]: filledPercentage })
			.eq('pacienteID', requestBody.data.pacienteID);

		if (seguimientosError) {
			console.log(seguimientosError);
			return new Response(JSON.stringify({ error: 'Error al actualizar los seguimientos' }), {
				status: 500
			});
		}

		return new Response(JSON.stringify({ info: 'Datos Actualizados con exito' }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			},
			// agregamos el resultado de la actualizacion al body de la respuesta
			body: 'Formulario actualizado correctamente'
		} as ResponseInit); // Add 'as ResponseInit' to fix the error
	}
};

// funcion para establecer a null los valores vacios de un objeto
function setEmptyValuesToNull(obj: Record<string, unknown>): Record<string, unknown> {
	const newObj: Record<string, unknown> = {};
	for (const key in obj) {
		if (obj[key] === '') {
			newObj[key] = null;
		} else {
			newObj[key] = obj[key];
		}
	}
	console.log(newObj);
	return newObj;
}
