import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: pacientes } = await supabase.from('pacientes').select('*');
	const { data: seguimientos } = await supabase.from('seguimientos').select('*');
	return { pacientes: pacientes ?? [], seguimientos: seguimientos ?? []};
};
