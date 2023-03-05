import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async({fetch}) => {
    const response = await fetch('http://localhost:3000/api/nouns')

    if(response.ok){
        const resJSON = await response.json()
        return json(resJSON, {
            status: 200
        })
    }

    throw error(response.status, response.statusText)
}
