import { useAppStore } from "../stores/useAppStore";
import type { Drink } from "../types";

type DrinkCardProps = {
  recipe: Drink;
};

const DrinkCard = ({ recipe }: DrinkCardProps) => {
const selectRecipe=  useAppStore((state)=> state.selectRecipe)
const ai =recipe.idDrink.startsWith('ai')
  return (
    <div className="shadow-lg">
      <div className="w-full aspect-[4/5] overflow-hidden">
        <img src={recipe.strDrinkThumb} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt={`imagen de ${recipe.strDrink}`} />
      </div>
      <div className="p-5">
        <h2 className="text-2xl truncate font-black">{recipe.strDrink}</h2>
        <button
          type="button"
          className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg cursor-pointer"
          onClick={()=>selectRecipe(recipe.idDrink, {ai:ai})}
        >
          Ver Receta
        </button>
      </div>
    </div>
  );
};

export default DrinkCard;
