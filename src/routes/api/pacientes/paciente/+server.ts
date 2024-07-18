import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({
	request,
	locals: { supabase }
}): Promise<Response> => {
	const requestBody = await request.json();
    console.log(requestBody);

	const { data: fetchedData, error } = await supabase
		.from('pacientes')
		.select('firstName, lastName')
		.eq('pacienteID', requestBody.id);

	if (error) {
		console.error('Error fetching data from supabase:', error);
		return new Response(JSON.stringify({ error: 'Error fetching data' }), { status: 500 });
	}

	if (fetchedData.length === 0) {
		return new Response(JSON.stringify({ error: 'No data found' }), { status: 404 });
	}

	return new Response(JSON.stringify(fetchedData[0]), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
