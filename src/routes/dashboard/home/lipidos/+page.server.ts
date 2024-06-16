import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: pacientes } = await supabase.from('pacientes').select('*');
	return { pacientes: pacientes ?? [] };
};
