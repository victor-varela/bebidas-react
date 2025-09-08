import axios from "axios";
import {
  CategoryAPIResponseSchema,
  RecipesAPIResponseSchema,
  RecipeSchema,
  SelectedRecipeAPISchema,
} from "../schemas/Recipes-Schema";
import type { Recipe, SearchFilter } from "../types";

export const getCategories = async () => {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

  let response;

  try {
    response = await axios(url);
    if (response.data === "missing data") {
      console.log("hubo un error...");
      return;
    }
  } catch (error) {
    console.error(error);
    return;
  }

  const result = CategoryAPIResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.log("Respuesta mal formada");
    return;
  }

  return result.data;
};

export const getRecipies = async (search: SearchFilter) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search.ingredient}&c=${search.category}`;

  const { data } = await axios(url);

  const result = RecipesAPIResponseSchema.safeParse(data);

  if (!result.success) {
    console.log("respuesta mal formada");
    return;
  }

  return result.data;
};

export const getSelectedRecipe = async (id: Recipe["idDrink"]) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const { data } = await axios(url);

  const result = SelectedRecipeAPISchema.safeParse(data); //validacion fiel de la api

  if (!result.success) {
    console.log("respuesta mal formada");
    return;
  }

  return RecipeSchema.parse(result.data.drinks[0]); //aca retornamos lo que nos interesa, ajustamos la respuesta a nuestra data
};

/*
- el try catch es para controlar donde se puede romper el codigo cuando haces una peticion a una api, en este caso es en axios.. se usa una tecnica destructurin con parentesis para poder obtener el valor destructurado de data. Por defecto para que entre en el catch es por un error de red o mas grave, si quieres controlar la peticion hay que ver en el objeto data si no tiene 'missing data' por ejemplo.. 

- En la llamada a los ingredientes y categorias se hizo una union con & para i= y c= son la union de 2 endpoints de la api.

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
