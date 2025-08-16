import type { StateCreator } from "zustand";
import { getCategories, getRecipies } from "../services/RecipeService";
import type { Categories, Recipes, SearchFilter } from "../types";

//al principio no sabemos como es la estructura de las categorias porque eso lo da la api. por eso creamos una category 'generic' para hacer feliz a Ts.
export type RecipesSliceType = {
  categories: Categories;
  fecthCategories: () => Promise<void>;
  fetchRecipes: (search: SearchFilter) => Promise<void>;
  recipes: Recipes;
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = set => ({
  categories: {
    drinks: [],
  },

  recipes: {
    drinks: [],
  },

  fecthCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },

  fetchRecipes: async search => {
    const recipes = await getRecipies(search);
    set({ recipes });
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

- Aca recibimos los datos del form y hacemos el llamado a la api. Este slice maneja la parte de las recetas por eso se llama asi bebe hermoso!°

- Fijate la estructura, los states (variables tiene un type) las funciones (acciones) tienen un type, todas se agrupane en RecipesSliceType y dentro del Slice estan ya definidas/inicializadas las variables (states) y las funciones (acciones), getRecipies y getCategories son funciones AUXILIARES, no tienen su type porque no forman parte del estado global de APP.

- Inicializacion de states como arrays vacios: --> 👉 Entonces, sí, se escribe drinks porque es una propiedad garantizada de la API, y se inicializa como [] porque es la forma más fiel y segura de representar "no hay datos aún" sin romper el tipado de TS ni engañar al frontend.

*/
