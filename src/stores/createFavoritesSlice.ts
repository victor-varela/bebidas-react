import type { StateCreator } from "zustand";
import type { Recipe } from "../types";

export type FavoritesSliceType = {
    favorites:Recipe[],
    adFavorite:(recipe: Recipe) => void

}



export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (set)=>({
    favorites:[],

    adFavorite:(recipe: Recipe)=>{
    set((state)=>({
        favorites: [...state.favorites, recipe]
    })) 
        
    }
})


/*
- Primero escribi la funcion createFavoritesSilce como arrow function.OJO los slices son ({}) objeto, retorna un Objeto no se define un arrow function con ()=>{} con llaves sino que retorna un objeto por eso es ()=>(  {  }  )
- Me di cuenta que tengo que usar el stateCreator de zustan y lo agrego en el type : StateCreator (Vs lo importa solo desde zustand)
- Me di cuenta que pide un type por eso lo escribo. Pienso.. que hace este slice? guarda los favoritos, luego tengo que crear un state favorites. Lo declaro dentro del type del slice.
- Que type tiene favorites recien creado? es un array de recetas. Le asigno el type Recipe.
- Ahora inicializo en el slice el state favorites.
- La funcion adFavorite va a modifcar un state por ello el set y le pasamos al set state.





*/