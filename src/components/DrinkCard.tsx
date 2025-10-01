import { useAppStore } from "../stores/useAppStore";
import type { Drink, Recipe} from "../types";

type DrinkCardProps = {
  recipe: Drink | Recipe;
};

const DrinkCard = ({ recipe }: DrinkCardProps) => {
  const selectRecipe = useAppStore(state => state.selectRecipe);
  const isAiRecipe = (r: Recipe | Drink): r is Recipe=>{
    return r.idDrink.startsWith('ai')
  }
  return (
    <div className="shadow-lg">
      <div className="w-full aspect-[4/5] overflow-hidden">
        <img
          src={recipe.strDrinkThumb}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          alt={`imagen de ${recipe.strDrink}`}
        />
      </div>
      <div className="p-5">
        <h2 className="text-2xl truncate font-black">{recipe.strDrink}</h2>
        <button
          type="button"
          className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg cursor-pointer"
          onClick={() => (isAiRecipe(recipe) ? selectRecipe({ recipe }) : selectRecipe({ id: recipe.idDrink }))}
        >
          Ver Receta
        </button>
      </div>
    </div>
  );
};

export default DrinkCard;

// Type Guard en TypeScript
// -------------------------
// isAiRecipe recibe un parámetro `r` que puede ser Drink o Recipe.
// La anotación de retorno `r is Recipe` es un *Type Predicate*.
// Significa: "si esta función devuelve true, entonces `r` es un Recipe".
// Esto permite a TypeScript refinar el tipo dentro de un if:
//   if (isAiRecipe(r)) {  // aquí r es Recipe }
//   else {               // aquí r es Drink  }
//
// En este caso, decidimos que los Recipe de IA tienen un idDrink
// que empieza con "ai". Por eso la función devuelve true cuando se cumple esa condición.
// const isAiRecipe = (r: Drink | Recipe): r is Recipe => {
//   return r.idDrink.startsWith("ai");
// };
