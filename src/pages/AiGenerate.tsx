import { useEffect, useState } from "react";
import { useAppStore } from "../stores/useAppStore";

export default function GenerateAI() {
  const showNotification = useAppStore(state => state.showNotification);
  const generateRecipe = useAppStore(state => state.generateRecipe);
  const recipe = useAppStore(state => state.recipe);
  const isGenerating = useAppStore(state => state.isGenerating);
  const isOutOfContext = useAppStore(state => state.isOutOfContext);
  const handleAiFavorite = useAppStore(state => state.handleAiFavorite);

  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    if (!isGenerating && recipe !== "" && !isOutOfContext) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [isGenerating, recipe, isOutOfContext]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    // Crea un objeto con todos los inputs del form.
    const prompt = form.get("prompt") as string;
    // Obtiene el valor del input con name="prompt". esta asociando con el name del input

    if (prompt.trim() === "") {
      showNotification({ text: "la busqueda no puede tener campos vacios", error: true });
      return;
    }

    await generateRecipe(prompt);
  };

  return (
    <>
      <h1 className="text-6xl font-extrabold">Generar Receta con IA</h1>

      <div className="max-w-4xl mx-auto px-1">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3 py-10">
          <div className="relative">
            <input
              name="prompt"
              id="prompt"
              className="border bg-white p-4 rounded-lg w-full border-slate-800"
              placeholder="Genera una receta con ingredientes. Ej. Bebida con Tequila y Fresa"
            />
            <button
              type="submit"
              aria-label="Enviar"
              className={`absolute top-1/2 right-5 transform -translate-x-1/2 -translate-y-1/2 ${
                isGenerating ? "cursor-not-allowed opacity-50 " : "cursor-pointer"
              }`}
              disabled={isGenerating}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        </form>
        {isGenerating && <p className="text-center animate-pulse">Generando...</p>}
        <div className="flex flex-col py-10 px-3 whitespace-pre-wrap">{recipe}</div>
        <button
          className={` transform origin-left transition-all duration-1000 ease-in-out 
              ${
                showButton
                  ? "opacity-100 bg-orange-400 w-full p-2 text-white uppercase font-bold hover:bg-orange-500 cursor-pointer"
                  : "opacity-0 "
              }`}
          type="button"
          onClick={() => {
            handleAiFavorite();
            // closeModal();
          }}
        >
          Agregar a Favoritos
          {/* {favoriteExist(selectedRecipe.idDrink) ? "Eliminar Favorito" : "Agregar a Favoritos"} */}
        </button>
      </div>
    </>
  );
}

/*
- Validamos el onSubmit usando el objeto FormData.
- Usamos async y await generateRecipe para await.. esperar a que tenga la data desde openROuter (el modelo IA)

✅ Qué hace whitespace-pre-wrap

Cuando aplicás esta clase de Tailwind, en CSS equivale a:

white-space: pre-wrap;


Esto significa:

Respeta los saltos de línea (\n) → lo que viene de la IA aparece en líneas distintas.

Respeta los espacios consecutivos → si hay dos espacios, los muestra.

Pero también hace wrap (ajuste automático) → si la línea es muy larga, la corta y la baja a la siguiente, evitando el scroll horizontal infinito.



*/
