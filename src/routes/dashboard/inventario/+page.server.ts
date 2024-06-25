import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    // Consulta a la tabla medicamento
    const { data: medicamentos } = await supabase.from('medicamento').select('*');

    // Por cada medicamento, consulta su detalleMedicamento y combina los datos
    const medicamentosConDetalles = await Promise.all(medicamentos.map(async (medicamento) => {
        const { data: detalles } = await supabase
            .from('detalleMedicamento')
            .select('*')
            .eq('idMedicamento', medicamento.id);
    
        return { ...medicamento, detalleMedicamento: detalles ?? [] };
    }));

    return { medicamentos: medicamentosConDetalles ?? [] };
};