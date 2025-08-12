import {z} from 'zod'

export const CategoryAPIResponseSchema = z.object({
    drinks: z.array(
        z.object({
            "strCategory": z.string()
        })
    )
})

/*
    Vemos la respuesta que da la api y ade ahi armamos el schema que va a validr zod.

*/