import type { StateCreator } from "zustand";

type Category = {};

//al principio no sabemos como es la estructura de las categorias porque eso lo da la api. por eso creamos una category 'generic' para hacer feliz a Ts.
export type RecipesSliceType = {
  categories: Category[];
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = () => ({
  categories: [],
});

/*
- Nota que los Slices retornan un Objeto. ( {} ) parentesis, llaves..

sin el stateCreator de Zustand Ts se quejaría..

*/
