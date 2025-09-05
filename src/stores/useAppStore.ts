import { create } from "zustand";
import { createRecipesSlice, type RecipesSliceType } from "./createRecipesSlice";
import { devtools } from 'zustand/middleware'
import { createFavoritesSlice, type FavoritesSliceType } from "./createFavoritesSlice";
import { createNotificationSlice, type NotificationSliceType } from "./createNotification";
import { createAiSlice, type AiSliceType } from "./createAiSlice";


export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType & AiSliceType >()(
    devtools((...a)=>({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
    ...createAiSlice(...a)
})))



/*
- Sintaxis de zustand para crear un store. 
...a en la definicion de la funcion create es el rest parameter que guarda las funcionse set, get, api de zustand en un array a.
...a en la llamada createRecipesSlice(...a) no es una copia de la función, sino que es la forma de desempaquetar el array de argumentos que capturaste antes con (...a) en el callback de create.

- Se van agregando los types como generics de los diferentes slices como el type principal del store. El primero fue RecipesSliceType

- Ojo con devtool, es como deadpool -->> hay que poner () inmediatamente despues del type y ANTES del callback escribir devtool(...todo lo demas)

- Agrego el otro slice, el viene con su respectivo Type. Por eso la UNION de types en el generic de appstore.
*/