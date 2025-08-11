import { create } from "zustand";
import { createRecipesSlice } from "./createRecipesSlice";


export const useAppStore = create((...a)=>({
    ...createRecipesSlice(...a)
}))



/*
- Sintaxis de zustand para crear un store. 
...a en la definicion de la funcion create es el rest parameter que guarda las funcionse set, get, api de zustand en un array a.
...a en la llamada createRecipesSlice(...a) no es una copia de la función, sino que es la forma de desempaquetar el array de argumentos que capturaste antes con (...a) en el callback de create.
*/