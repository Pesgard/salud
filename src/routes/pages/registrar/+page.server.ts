import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	signup: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const idHospital = formData.get('idHospital') as string;

		const { data, error } = await supabase.auth.signUp({ email, password });
		const user = data?.user;

		if (error === null) {
			console.log(
				'email',
				email,
				'password',
				password,
				'firstName',
				firstName,
				'lastName',
				lastName,
				'idHospital',
				idHospital
			);
			// Insert user data into public.users table
			const { data, error } = await supabase
				.from('users')
				.insert([
					{ uid: user?.id, firstName: firstName, lastName: lastName, idHospital: 1, email: email }
				]);

			if (error) {
				console.error(error);
			} else {
				console.log('Data inserted successfully:', data);
			}
			return redirect(303, '/dashboard');
		} else {
			console.error(error);
		}
		return redirect(303, '/');
	}
};
