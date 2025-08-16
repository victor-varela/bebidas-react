import axios from "axios";
import { CategoryAPIResponseSchema, RecipesAPIResponseSchema } from "../schemas/Recipes-Schema";
import type { SearchFilter } from "../types";


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
  const url = `https:www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search.ingredient}&c=${search.category}`;
  
  const { data } = await axios(url);

  const result = RecipesAPIResponseSchema.safeParse(data);

  if (!result.success) {
    console.log("respuesta mal formada");
    return;
  }

  return result.data
};

/*
- el try catch es para controlar donde se puede romper el codigo cuando haces una peticion a una api, en este caso es en axios.. se usa una tecnica destructurin con parentesis para poder obtener el valor destructurado de data. Por defecto para que entre en el catch es por un error de red o mas grave, si quieres controlar la peticion hay que ver en el objeto data si no tiene 'missing data' por ejemplo.. 

- En la llamada a los ingredientes y categorias se hizo una union con & para i= y c= son la union de 2 endpoints de la api.




*/
