import type { StateCreator } from "zustand";
import { getCategories, getRecipies, getSelectedRecipe } from "../services/RecipeService";
import type { Categories, Recipes, Recipe, SearchFilter} from "../types";

//al principio no sabemos como es la estructura de las categorias porque eso lo da la api. por eso creamos una category 'generic' para hacer feliz a Ts.
export type RecipesSliceType = {
  categories: Categories;
  fecthCategories: () => Promise<void>;
  fetchRecipes: (search: SearchFilter) => Promise<void>;
  recipes: Recipes;
  selectRecipe: (id: Recipe["idDrink"]) => Promise<void>;
  selectedRecipe: Recipe;
  modal: boolean
  closeModal: () => void
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = set => ({
  categories: {
    drinks: [],
  },

  recipes: {
    drinks: [],
  },

  modal: false,

  selectedRecipe: {} as Recipe,

  fecthCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },

  fetchRecipes: async search => {
    const recipes = await getRecipies(search);
    set({ recipes });
  },

  selectRecipe: async id => {
    const selectedRecipe = await getSelectedRecipe(id);
    set({ selectedRecipe, modal:true });
  },

  closeModal: ()=>{
    set({modal:false, selectedRecipe:{}as Recipe})
  }
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

RecipesSliceType = forma del estado. QUE FORMA VA A TENER EL SLICE--> Un slice es una pieza de estado y lógica; en Zustand se suele tipar con StateCreator para integrarlo correctamente en el store y mantener tipado estricto, aunque no es estrictamente obligatorio para que funcione.

StateCreator<RecipesSliceType> = forma de la función que crea ese estado y que Zustand sabe usar.

*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

La logica y estado que tenga que ver con las recetas van aca, por lo tanto llamar a api se hace aca, y la funcion que finalmente la llama la ubicamos en services para no agrandar demasiado el store.

- Aca recibimos los datos del form y hacemos el llamado a la api. Este slice maneja la parte de las recetas por eso se llama asi bebe hermoso!°

- Fijate la estructura, los states (variables tiene un type) las funciones (acciones) tienen un type, todas se agrupane en RecipesSliceType y dentro del Slice estan ya definidas/inicializadas las variables (states) y las funciones (acciones), getRecipies y getCategories son funciones AUXILIARES, no tienen su type porque no forman parte del estado global de APP.

- Inicializacion de states como arrays vacios: --> 👉 Entonces, sí, se escribe drinks porque es una propiedad garantizada de la API, y se inicializa como [] porque es la forma más fiel y segura de representar "no hay datos aún" sin romper el tipado de TS ni engañar al frontend.

- Cuando seleccionamos una receta tomamos su id y llamamos un nuevo endpoint de la API, esa accion tambien se hace aca porque tiene que ver con las recetas.

- A medida que vamos creando nuevos states / funciones primero lo declaramos en el type del slice, luego si es un state lo inicializamos y luego si es una funcion la desarrollamos en el slice. Asi va el orden. Cuando estamos declarando el type nos daremos cuenta que si es una respuesta de api entonces inferimos con Zod y creamos el type. --  SelectedRecipe: {} as SelectedRecipe, esta declaracion en particular es valida para no poner todos esos strings vacios que quedan feos, tambien se puede hacer con cualquier state : )

- Fijate para crear la funcionalidad del modal que copiamos del curso con HeadlessUI, creamos el state modal en el type y luego en la funcion que queremos que maneje ese state lo seteamos. Que funcion debe trigger el modal ? pues selectRecipe.. ahi va entonces el set.
OJO: sigue el orden: 1-Declararla/define en el type del slice, 2- Inicializarla si es un state si es funcion no se inicializa, 3-Usarla, set si es un state y escribir la funcion si es una accion/funcion

-Fijate que cuando cierras el modal tambien reinicias el objeto selectedRecipe:Patrón común de modal/detail
Lo que estás haciendo es el patrón clásico:

selectRecipe(id) → cargo la data + abro modal

closeModal() → cierro modal + limpio la data

Así te asegurás de que cada vez que abrís el modal, arrancás con un nuevo fetch y no con el estado anterior.
*/
