/* eslint-disable @typescript-eslint/no-unused-vars */
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: pacientes } = await supabase.from('pacientes').select('*');
	return { pacientes: pacientes ?? [] };
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.json();
		console.log(formData);
		const firstName = formData.firstName as string;
		const lastName = formData.lastName as string;
		const tel = formData.tel as string;
		const email = formData.email as string;
		const rfc = formData.rfc as string;
		const curp = formData.curp as string;
		const nss = formData.nss as string;
		const tipoSangre = formData.tipoSangre as string;
		const escolaridad = formData.escolaridad as string;
		const calle = formData.calle as string;
		const noExt = formData.noExt as string;
		const noInt = formData.noInt as string;
		const cp = formData.cp as string;
		const colonia = formData.colonia as string;
		const localidad = formData.localidad as string;
		const municipio = formData.municipio as string;
		const estado = formData.estado as string;
		const pais = formData.pais as string;
		const imagen = formData.imagen as File

		const { data, error } = await supabase.storage
			.from('pacientes')
			.upload('paciente2.jpg',imagen, { 
				cacheControl: '3600',
				upsert: true
			});

		const image_url = data?.path;
		console.log(image_url);
		console.log(error);
		if (error === null) {
			const { data, error } = await supabase.from('pacientes').insert([
				{
					firstName: firstName,
					lastName: lastName,
					tel: tel,
					email: email,
					rfc: rfc,
					curp: curp,
					nss: nss,
					tiposangre: tipoSangre,
					escolaridad: escolaridad,
					calle: calle,
					noext: noExt,
					noint: noInt,
					cp: cp,
					colonia: colonia,
					localidad: localidad,
					municipio: municipio,
					estado: estado,
					pais: pais,
					imagen: image_url
				}
			]);

			if (error) {
				console.error(error);
			} else {
				console.log('Data inserted successfully:', data);
			}
		} else {
			console.error(error);
		}
	}
};
