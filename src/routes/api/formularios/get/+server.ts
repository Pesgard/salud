import type { RequestHandler } from '@sveltejs/kit';

// Api para obtener la informacion del formulario de el paciente seleccionado
export const POST: RequestHandler = async ({
	request,
	locals: { supabase }
}): Promise<Response> => {
	const requestBody = await request.json();
	console.log(requestBody);

	const { data: fetchedData, error } = await supabase
		.from(requestBody.tableName) // Use the table name from the request
		.select('*')
		.eq('pacienteID', requestBody.pacienteID);
	console.log(fetchedData);

	// Obtener nombre del paciente
	const { data: fetchedPaciente } = await supabase
		.from('pacientes')
		.select('firstName, lastName')
		.eq('pacienteID', requestBody.pacienteID);
	console.log(fetchedPaciente);

const nombrePaciente = fetchedPaciente && fetchedPaciente[0] ? fetchedPaciente[0].firstName + ' ' + fetchedPaciente[0].lastName : '';

  if (error) {
    // console.error('Error fetching data from supabase:', error);
    return new Response(
      JSON.stringify({ error: 'Error fetching data', details: fetchedPaciente, errorDetails: error }),
      { status: 500 }
    );
  }

	if (fetchedData.length === 0 || !fetchedPaciente || fetchedPaciente.length === 0) {
		return new Response(JSON.stringify({ error: 'No data found', pacienteNombre:nombrePaciente }), { status: 404 });
	}

	// Assuming that fetchedData has the correct structure and only has one relevant object
	const dataObject = fetchedData[0];
	const pacienteObject = fetchedPaciente[0]; // Assuming fetchedPaciente has at least one object
	const responsePayload: Record<string, unknown> = {
		pacienteNombre: pacienteObject // Include paciente details
	};

	// Iterate over the keys of the data object and assign them to responsePayload
	for (const key in dataObject) {
		responsePayload[key] = dataObject[key];
	}

	return new Response(JSON.stringify(responsePayload), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
