import type { StateCreator } from "zustand";
import { getCategories } from "../services/RecipeService";

type Category = {};

//al principio no sabemos como es la estructura de las categorias porque eso lo da la api. por eso creamos una category 'generic' para hacer feliz a Ts.
export type RecipesSliceType = {
  categories: Category[];
  fecthCategories: () => Promise<void>;
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = () => ({
  categories: [],

  fecthCategories: async () => {
    getCategories();
  },
});

/*
- Nota que los Slices retornan un Objeto. ( {} ) parentesis, llaves..

sin el stateCreator de Zustand Ts se quejaría.. 
Si solo tipas como RecipesSliceType, TypeScript cree:

“esto es un objeto con { categories: Category[] } y nada más”.

Pero tu slice no es un objeto plano, sino una función que recibe (set, get, store) y devuelve el objeto de estado inicial.
El tipo StateCreator<RecipesSliceType> le dice a TS:

Esto es una función, no un simple objeto.

Esa función devuelve un estado que tiene la forma RecipesSliceType.

Además, puede usar set() y get() dentro, y TS te va a autocompletar eso.

Por eso la diferencia:

RecipesSliceType = forma del estado. QUE FORMA VA A TENER EL SLICE--> Un slice es una pieza de estado y lógica; en Zustand se suele tipar con StateCreator para integrarlo correctamente en el store y mantener tipado estricto, aunque no es estrictamente obligatorio para que funcione.r

StateCreator<RecipesSliceType> = forma de la función que crea ese estado y que Zustand sabe usar.

*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

La logica y estado que tenga que ver con las recetas van aca, por lo tanto llamar a api se hace aca, y la funcion que finalmente la llama la ubicamos en services para no agrandar demasiado el store.

*/
