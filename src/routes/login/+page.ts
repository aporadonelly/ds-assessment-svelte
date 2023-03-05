import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async({parent, data}) => {
    const {user} = await parent()
    if(user) throw redirect(307, '/')

    return {
        nouns: data.nouns,
        title: 'List of Nouns'
    }

}
