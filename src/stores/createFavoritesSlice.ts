import type { StateCreator } from "zustand";
import type { Recipe } from "../types";

export type FavoritesSliceType = {
  favorites: Recipe[];
  adFavorite: (recipe: Recipe) => void;
  favoriteExist: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: ()=> void
};

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (set, get) => ({
  favorites: [],

  adFavorite: (recipe: Recipe) => {
    if (!get().favoriteExist(recipe.idDrink)) {
      set(state => ({
        favorites: [...state.favorites, recipe],
      }));
    } else {
      set(state => ({
        favorites: state.favorites.filter(fav => fav.idDrink !== recipe.idDrink),
      }));
    }

    //Guardamos en localStorage- recuperamos el state de favorites con get()
    localStorage.setItem('favorites', JSON.stringify(get().favorites))

  },

  favoriteExist: id => get().favorites.some(fav => fav.idDrink === id),

  loadFromStorage: ()=>{
    const storedFavorites = localStorage.getItem('favorites')

    if(storedFavorites){
      //si hay algo asignar al state
      set({
        favorites:JSON.parse(storedFavorites)
      })
    }
  }

});

/*
- Primero escribi la funcion createFavoritesSilce como arrow function.OJO los slices son ({}) objeto, retorna un Objeto no se define un arrow function con ()=>{} con llaves sino que retorna un objeto por eso es ()=>(  {  }  )
- Me di cuenta que tengo que usar el stateCreator de zustan y lo agrego en el type : StateCreator (Vs lo importa solo desde zustand)
- Me di cuenta que pide un type por eso lo escribo. Pienso.. que hace este slice? guarda los favoritos, luego tengo que crear un state favorites. Lo declaro dentro del type del slice.
- Que type tiene favorites recien creado? es un array de recetas. Le asigno el type Recipe.
- Ahora inicializo en el slice el state favorites.
- La funcion adFavorite va a modifcar un state por ello el set y le pasamos al set state. Tambien pasamos get porque lo vamos a necesitar
- Para acceder a un state dentro del slice usamos get().nombreDeState

- Para almacenar el localStorage los favoritos que va agregando el usuario usamos el viejo y querido codigo para ello. No aprovechamos el middleware de zustand porque ese nos va a almacenar TODOS LOS SLICES, y no es coherente guardar las recetas en localStorage, ellas vienen de la API. 
    *Luego hay que sincronizar localStorage con el state favorites---> creamos la funcion loadFromStorage. OJO, viste que dentro del slice hay propiedades de un objeto. EL slice es el resultado de lo que devuelve stateCreator de zustand. stateCreator es el papa aqui. Y Ts no se queja porque zustand es flexible con las propiedades que agregamos en el slice / stateCreator. Los types que declaramos antes los toma como minimos pero se pueden exceder. Peeeeeero, despues me di cuenta que cuando la quiero llamar en Layout no puedo porque no la declare en el Type asi que vine y lo hice.
    
    * Luego tenemos que llamar a la funcion loadFromStorage, donde? en el Layout apenas renderice porque ese Layout afecta tanto a FavoritePage.tsx como a IndexPage.tsx






*/
