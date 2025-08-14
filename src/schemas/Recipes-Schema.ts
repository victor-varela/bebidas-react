import {z} from 'zod'

export const CategoryAPIResponseSchema = z.object({
    drinks: z.array(
        z.object({
            "strCategory": z.string()
        })
    )
});

export const SearchFilterSchema = z.object({
     ingredient: z.string(),
    category: z.string()
})



/*
    Vemos la respuesta que da la api y ade ahi armamos el schema que va a validr zod.

    - Vemos el objeto que le enviamos a recipesSlices que es el que tenemos del form y lo declaramos aca para despues tiparlo en types/index.ts

*/