import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({cookies}) => {
	const token = cookies.get('token')
	const user = { name: 'John', id: 1 };
	return {
		user: token ?  user : null
	};
};