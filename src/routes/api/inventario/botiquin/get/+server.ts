import type { RequestHandler } from '@sveltejs/kit';

// Api para obtener la informacion de todos los botiquines , sus detalles y medicamentos asociados con detalles
export const POST: RequestHandler = async ({ request, locals: { supabase } }): Promise<Response> => {
  const requestBody = await request.json();
  // console.log(requestBody);

  const { data: fetchedData, error } = await supabase
    .from(requestBody.tableName) // Use the table name from the request
    .select('id, zona, fechaCreacion, users(firstName, lastName)')
    console.log(fetchedData);


  if (error) {
    console.error('Error fetching data from supabase:', error);
    return new Response(JSON.stringify({ error: 'Error fetching data' }), { status: 500 });
  }

  if (fetchedData.length === 0) {
    return new Response(JSON.stringify({ error: 'No data found' }), { status: 404 });
  }

  // Assuming that fetchedData has the correct structure and only has one relevant object
  const dataObject = fetchedData;
  const responsePayload: Record<string, unknown> = {};

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