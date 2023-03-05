import { fail, error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const actions: Actions ={
    default: async ({request, cookies }) => {
        const form = await request.formData()

        const homeroomName = form.get('homeroomName')
        const studentNo = form.get('studentNo')

        if(!homeroomName){
            return fail(400,{homeroomNameMissing: true})
        }
        if(!studentNo){
            return fail(400,{studentNoMissing: true})
        }

        cookies.set('token','token_value', {
            path: '/'
        })

        return {success: true}

    }
}
export const load: PageServerLoad =  async ({fetch}) => {
    const response = await fetch('api/nouns')
    if(response.ok){
      return {
          nouns: response.json()
      }
    }
    const errorJSON = await response.json()
    throw error(response.status, errorJSON.message)
      
  }