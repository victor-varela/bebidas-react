import { z } from "zod";

export const CategoryAPIResponseSchema = z.object({
  drinks: z.array(
    z.object({
      strCategory: z.string(),
    })
  ),
});

export const SearchFilterSchema = z.object({
  ingredient: z.string(),
  category: z.string(),
});

export const RecipeAPIResponseSchema = z.object({
  idDrink: z.string(),
  strDrink: z.string(),
  strDrinkThumb: z.string(),
});

export const RecipesAPIResponseSchema = z.object({
  drinks: z.array(RecipeAPIResponseSchema),
});

export const SelectedRecipeAPIShcema = z.object({
  drinks: z.array(
    z.object({
      idDrink: z.string(),
      strDrink: z.string(),
      strDrinkThumb: z.string(),
      strInstructions: z.string(),
      strIngredient1: z.string().nullable(),
      strIngredient2: z.string().nullable(),
      strIngredient3: z.string().nullable(),
      strIngredient4: z.string().nullable(),
      strIngredient5: z.string().nullable(),
      strIngredient6: z.string().nullable(),
      strMeasure1: z.string().nullable(),
      strMeasure2: z.string().nullable(),
      strMeasure3: z.string().nullable(),
      strMeasure4: z.string().nullable(),
      strMeasure5: z.string().nullable(),
      strMeasure6: z.string().nullable(),
    })
  ),
});


/*
    Vemos la respuesta que da la api y ade ahi armamos el schema que va a validr zod.

    - Vemos el objeto que le enviamos a recipesSlices que es el que tenemos del form y lo declaramos aca para despues tiparlo en types/index.ts

    - En esta APP vemos que vamos a mostrar cada receta por separado en su componente de presentacion por eso creamos 2 types, uno singular y otro plurar para usarlos en la llamada a la api y en la presentacion en UI

    - Para las instrucciones de las recetas colocamos .nullable() porque no tadas las recetas tienen la misma cantidad de ingredientes ni medidas

*/
