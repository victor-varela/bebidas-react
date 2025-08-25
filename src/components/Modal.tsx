import { Dialog, Transition, TransitionChild, DialogTitle, DialogPanel } from "@headlessui/react";
import { Fragment } from "react";
import { useAppStore } from "../stores/useAppStore";
import type { Recipe } from "../types";

export default function Modal() {
  const modal = useAppStore(state => state.modal);
  const closeModal = useAppStore(state => state.closeModal);
  const selectedRecipe = useAppStore(state => state.selectedRecipe);

  const renderIngredients = () => {
    const ingredients = []; //aca vamos a guardar los Li que van a tener ingrediente - medida

    for (let i = 1; i <= 6; i++) {
      const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe];
      const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe];

      if (ingredient && measure) {
        ingredients.push(
          <li key={i}>
            {ingredient} - {measure}
          </li>
        );
      }
    }

    return ingredients;
  };

  const handleFavorite = ()=>{
    console.log('agregando...');
    
  }

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <div className=" flex justify-end ">
                    <button
                      className=" w-10 h-10 text-3xl font-bold rounded-full bg-black text-white cursor-pointer"
                      type="button"
                      onClick={closeModal}
                    >
                      X
                    </button>
                  </div>
                  <DialogTitle as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                    {/* title */}
                    {selectedRecipe.strDrink}
                  </DialogTitle>
                  <img
                    src={selectedRecipe.strDrinkThumb}
                    alt={`imagen de ${selectedRecipe.strDrink}`}
                    className="w-96 mx-auto"
                  />
                  <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    {/* Ingredients  */}
                    Ingredientes y Cantidades
                  </DialogTitle>
                  {renderIngredients()}
                  <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    {/*Instructions*/}
                    Instrucciones
                  </DialogTitle>
                  <p className="text-lg"> {selectedRecipe.strInstructions}</p>
                  <button
                    className=" w-full p-3 bg-orange-500 hover:bg-orange-400 mt-2 rounded text-center text-white font-bold uppercase cursor-pointer"
                    type="button"
                    onClick={handleFavorite}
                  >
                    Agregar a Favoritos
                  </button>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

// UseAPPStore comparte el estadao GLOBAL DE APP, por eso nos valemos del hook para pasar el valor de modal al componente.

/*
- ATENCION: lo mas importante hasta ahora de este modal es la logica para manejar los datos de la api y mostrarlos en el modal. Sabemos que ajustamos hasta a 6 ingredientes y medidas para las recetas. Algunos tienen mas y otros tienen menos. La logica para mostrar todos los que realmente tengan en el modal es la que hicimos en renderIngredients. Basicamente esa funcion retorna un <li> element (HTML) --> JsxElement (React). es una funcion que pinta un Li. Por eso el array ingredients es un : JSX.Element.




*/
