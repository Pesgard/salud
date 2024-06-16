import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: pacientes } = await supabase.from('pacientes').select('*');
	return { pacientes: pacientes ?? [] };
};

export const actions: Actions = {
	crear: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		console.log(formData);
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const tel = formData.get('tel') as string;
		const email = formData.get('email') as string;
		const rfc = formData.get('rfc') as string;
		const curp = formData.get('curp') as string;
		const nss = formData.get('nss') as string;
		const tipoSangre = formData.get('tipoSangre') as string;
		const escolaridad = formData.get('escolaridad') as string;
		const calle = formData.get('calle') as string;
		const noExt = formData.get('noExt') as string;
		const noInt = formData.get('noInt') as string;
		const cp = formData.get('cp') as string;
		const colonia = formData.get('colonia') as string;
		const localidad = formData.get('localidad') as string;
		const municipio = formData.get('municipio') as string;
		const estado = formData.get('estado') as string;
		const pais = formData.get('pais') as string;

		const imagen = formData.get('imagen') as File;
		//modify the image to be an file image and upload it to the storage

		console.log(imagen);

		//upload the image to the storage
		const { data, error } = await supabase.storage.from('pacientes').upload('public', imagen, {
			contentType: 'image/jpeg',
			cacheControl: '3600',
			upsert: true
		});

		const image_url = data?.path;
		console.log(image_url);
		console.log(error);
		if (error === null) {
			const { data, error } = await supabase
				.from('pacientes')
				.insert([
					{
						firstName: firstName,
						lastName: lastName,
						idHospital: 1,
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
				])
				.select();

			if (error) {
				console.error(error);
			} else {
				const pacienteID = data[0].pacienteID;
				// insert the id of the new patient in the seguimientos table
				await supabase.from('seguimientos').insert([{ pacienteID: pacienteID }]);
			}
		} else {
			console.error(error);
		}
	},

	//update
	update: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		console.log(formData);

		const id = formData.get('id') as string;
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const tel = formData.get('tel') as string;
		const email = formData.get('email') as string;
		const rfc = formData.get('rfc') as string;
		const curp = formData.get('curp') as string;
		const nss = formData.get('nss') as string;
		const tipoSangre = formData.get('tipoSangre') as string;
		const escolaridad = formData.get('escolaridad') as string;
		const calle = formData.get('calle') as string;
		const noExt = formData.get('noExt') as string;
		const noInt = formData.get('noInt') as string;
		const cp = formData.get('cp') as string;
		const colonia = formData.get('colonia') as string;
		const localidad = formData.get('localidad') as string;
		const municipio = formData.get('municipio') as string;
		const estado = formData.get('estado') as string;
		const pais = formData.get('pais') as string;
		const imagen = formData.get('imagen') as File;
		//modify the image to be an file image and upload it to the storage

		console.log(imagen);
		//upload the image to the storage
		const { data, error } = await supabase.storage.from('pacientes').upload('public', imagen, {
			contentType: 'image/jpeg',
			cacheControl: '3600',
			upsert: true
		});

		const image_url = data?.path;
		console.log(image_url);
		console.log(error);
		if (error === null) {
			// update the data of the user id with the new data
			const { data, error } = await supabase
				.from('pacientes')
				.update({
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
				})
				.eq('pacienteID', id);
			if (error) {
				console.error(error);
			} else {
				console.log('Data updated successfully:', data);
			}
		}
	},

	// select paciente y devolverlo como json
	select: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const { data, error } = await supabase.from('pacientes').select('*').eq('id', id);
		if (error) {
			console.error(error);
		} else {
			return data;
		}
	}
};
