import { useAppStore } from "../stores/useAppStore";
import type { Recipe } from "../types";

type DrinkCardProps = {
  recipe: Recipe;
};

const DrinkCard = ({ recipe }: DrinkCardProps) => {
const selectRecipe=  useAppStore((state)=> state.selectRecipe)
  return (
    <div className="shadow-lg">
      <div className="overflow-hidden">
        <img src={recipe.strDrinkThumb} className="hover:scale-125 hover:rotate-12 transition-transform" alt={`imagen de ${recipe.strDrink}`} />
      </div>
      <div className="p-5">
        <h2 className="text-2xl truncate font-black">{recipe.strDrink}</h2>
        <button
          type="button"
          className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg cursor-pointer"
          onClick={()=>selectRecipe(recipe.idDrink)}
        >
          Ver Receta
        </button>
      </div>
    </div>
  );
};

export default DrinkCard;
