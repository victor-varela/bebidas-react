import type { StateCreator } from "zustand";
import { generateRecipeService } from "../services/AiService";
import { findIngredients} from "../helpers";

export type AiSliceType = {
  recipe: string;
  generateRecipe: (prompt: string) => Promise<void>;
  isGenerating: boolean;
  handleAiFavorite: () => void;
};

export const createAiSlice: StateCreator<AiSliceType> = (set, get) => ({
  recipe: "",
  isGenerating: false,
  generateRecipe: async prompt => {
    const data = await generateRecipeService(prompt);
    set({ recipe: "" });
    for await (const textPart of data) {
      set({ isGenerating: true });
      set(state => ({
        recipe: state.recipe + textPart,
      }));
    }
    set({ isGenerating: false });
  },

  handleAiFavorite: () => {
    //separa por espacios vacios la respuesta de la AI
    const lines = get().recipe.split("\n");
    console.log(lines);

    //Obtener titulo
    const title = lines[0];

    //Obtener ingredientes
    const { ingredients, instructions } = findIngredients(lines);
    console.log(title);
    console.log(ingredients);
    console.log(instructions);

    //Obtener Instrucciones
    //  const instructions = findInstructions(lines)
  },
});

/*
- Crear un slice: se declara la funcion createNombreSlice de tipo StateCreator<TypeDelSlice> y es un arrow que retorna un objeto.
    se inicializan los states y se desarrollan las funciones. 

- Se une el slice en el store principal por medio de & nombreSliceType en el < generic del store  > y se agrega la function createNombreSilce en el cuerpo del store con los ...a eje: createAiSlice(...a)

- Este slice tiene un state recipe que es el input del formulario --> string - recipe: string y tiene la funcion que llama a la AI generateRecipeService() que se declara como Promise<void> por que es asincrona. OJO: fijate que el handleSubmit tiene que ser async porque tiene que esperar a que generateRecipeService traiga la data del modelo AI.

- Data tiene el valor de la funcion servicio. es un dato:  AsyncIterableStream<string>, se itera con un for await.Lo que va trayendo textStream lo vamos guardando en nuestra variable recipe.

*/
