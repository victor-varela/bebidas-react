import type { StateCreator } from "zustand";
import { generateRecipeService } from "../services/AiService";
import { da } from "zod/v4/locales";

export type AiSliceType = {
  recipe: string;
  generateRecipe: (prompt: string) => Promise<void>;
};

export const createAiSlice: StateCreator<AiSliceType> = (set) => ({
  recipe: "",

  generateRecipe: async prompt => {
  const data = await  generateRecipeService(prompt)
  
    for await (const textPart of data){
      set((state)=>({
        recipe: state.recipe + textPart
      }))

    }
  
  },
});

/*
- Crear un slice: se declara la funcion createNombreSlice de tipo StateCreator<TypeDelSlice> y es un arrow que retorna un objeto.
    se inicializan los states y se desarrollan las funciones. 

- Se une el slice en el store principal por medio de & nombreSliceType en el < generic del store  > y se agrega la function createNombreSilce en el cuerpo del store con los ...a eje: createAiSlice(...a)

- Este slice tiene un state recipe que es el input del formulario --> string - recipe: string y tiene la funcion que llama a la AI generateRecipe() que se declara como Promise<void> por que es asincrona. OJO: fijate que el handleSubmit tiene que ser async porque tiene que esperar a que generateRecipe traiga la data del modelo AI.

- Data tiene el valor de la funcion servicio. es un dato  AsyncIterableStream<string>, se itera con un for await.Lo que va trayendo textStream lo vamos guardando en nuestra variable recipe.

*/
