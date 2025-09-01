import type { StateCreator } from "zustand";

export type Notification = {
  text: string;
  error: boolean;
  show: boolean;
};

export type NotificationSliceType = {
  notification: Notification;
  showNotification: (payload: Pick<Notification, 'error'| 'text'>)=>void

};

export const createNotificationSlice: StateCreator<NotificationSliceType> = (set, get) => ({
  notification: {
    text: "",
    error: false,
    show: false,
  },

  showNotification:(payload)=>{
    set({
        notification:{
            text: payload.text,
            error:payload.error,
            show: true
        }
    })
  }

});

/*
    La estructura basica de un slice es: se declara el createSlice:stateCreator<>= (set,get,api)=>({}) en cristiano es: declaro la creacion del slice con el tipo stateCreator y generic <> los tipos que tiene ese slice. Y veo que tengo que crear el type aparte de las propiedades del slice ( text, error, show) por que? porque despues al ser un state lo tengo que inicializar dentro del slice. Te viste tentado a definir el objeto notification dentro del sliceType pero te das cuenta que ahi van las propiedades (states/funciones) y su tipo directamente. Si no esta definido el tipo previeamente ts se va a quejar. --buen intento igual--

    Entonces, declaras la creacion del slice de tipo statecreator, definies el tipo del slice, te das cuenta que necesitas un tipo previo, lo haces, inicializas la porpiedad (state/funcion) del tipo del slice. Acuerdate que el slice es una arrow que devuelve un, un que,.. adivina que devuelve, si.. un OBJETO (set,get,api-si es necesario-)=>({ O B J  E  T  O })

    Despues, agregas el slice en el store pirncipal.. ve a store.

    - Este slice tiene la funcion que maneja la notificacion, es showNotification por lo tanto se agrega en el type y se escribe en el slice. La funcion maneja el estado del objeto notificacion por eso le pasamos set.




*/
