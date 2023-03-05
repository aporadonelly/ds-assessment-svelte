import { error, json, } from '@sveltejs/kit';
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({request, cookies}) => {
    const data = await request.json()
    if(!data.homeroomName){
        throw error(400, {
            message: 'Homeroom name is required.'
        })
    }
    if(!data.studentNo){
        throw error(400, {
            message: 'Student number is required.',
             code: 'NOT_FOUND'
        })
    }

    cookies.set('token', 'token_value', {
        path: '/'
    })
    
    return json({student: data.studentNo, id: 1});
}