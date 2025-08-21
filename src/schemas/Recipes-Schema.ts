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

export const RecipeSchema = z.object({
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
});

export const SelectedRecipeAPISchema = z.object({
  drinks: z.array(RecipeSchema),
});

/*
    Vemos la respuesta que da la api y ade ahi armamos el schema que va a validr zod.

    - Vemos el objeto que le enviamos a recipesSlices que es el que tenemos del form y lo declaramos aca para despues tiparlo en types/index.ts

    - En esta APP vemos que vamos a mostrar cada receta por separado en su componente de presentacion por eso creamos 2 types, uno singular y otro plurar para usarlos en la llamada a la api y en la presentacion en UI

    - Para las instrucciones de las recetas colocamos .nullable() porque no tadas las recetas tienen la misma cantidad de ingredientes ni medidas

    -Comentario corregido por IA:
   /**
 * 💡 Comentario revisado y corregido
 *
 * - Tuve un dilema con el `SelectedRecipeSchema`.  
 *   Al inicio lo definí de forma **fiel a la respuesta de la API**,  
 *   es decir: un objeto con la propiedad `drinks` que contiene un array  
 *   con todas las propiedades (ingredientes, instrucciones, nombres, etc.).
 *
 * - Para mantener las responsabilidades separadas, terminé creando  
 *   un **schema individual `RecipeSchema`** y luego lo usé dentro de  
 *   `SelectedRecipeSchema`.
 *
 * - La lógica es la siguiente:
 *   1. Primero valido la **respuesta completa de la API** contra  
 *      `SelectedRecipeSchema` para asegurarme que el objeto realmente  
 *      tiene la forma esperada (`{ drinks: [...] }`).
 *
 *   2. Una vez validado lo anterior, extraigo el objeto puntual que  
 *      me interesa (`drinks[0]`).
 *
 *   3. Esa data reducida la vuelvo a validar con `RecipeSchema` usando `.parse()`.  
 *      Esto garantiza que el objeto que voy a mostrar en el `Modal` cumple exactamente  
 *      con la forma que necesito en la UI.
 *
 * - De esta manera separo dos niveles de validación:
 *   - **Estructura general de la API** → `SelectedRecipeSchema`
 *   - **Estructura ajustada para la vista (UI)** → `RecipeSchema`
 *
 * ✅ Así me aseguro de que:
 *   - El backend me responde lo esperado.
 *   - Los datos que renderizo en la UI están correctamente tipados y validados.
 */


