import type { StateCreator } from "zustand";

export type AiSliceType = {
  recipe: string;
  generateRecipe: (prompt: string) => Promise<void>;
};

export const createAiSlice: StateCreator<AiSliceType> = () => ({
  recipe: "",

  generateRecipe: async prompt => {
    console.log(prompt);
  },
});

/*
- Crear un slice: se declara la funcion createNombreSlice de tipo StateCreator<TypeDelSlice> y es un arrow que retorna un objeto.
    se inicializan los states y se desarrollan las funciones. 

- Se une el slice en el store principal por medio de & nombreSliceType en el < generic del store  > y se agrega la function createNombreSilce en el cuerpo del store con los ...a eje: createAiSlice(...a)

- Este slice tiene un recipe que es el input del formulario --> string - recipe: string y tiene la funcion que llama a la AI generateRecipe() OJO: fijate que el handleSubmit tiene que ser async porque tiene que esperar a que generateRecipe traiga la data del modelo AI.


*/
