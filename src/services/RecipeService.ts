import axios from "axios";
import { CategoryAPIResponseSchema } from "../schemas/Recipes-Schema";

export const getCategories = async () => {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

  try {
    const { data } = await axios(url);

    const result = CategoryAPIResponseSchema.safeParse(data);

    if (!result.success) {
      console.log("Respuesta mal formada");
      return;
    }

    return result.data;
  } catch (error) {
    console.log(error);
  }
};
