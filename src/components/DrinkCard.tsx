import type { Recipe } from "../types"

type DrinkCardProps={
    recipe: Recipe
}

const DrinkCard = ({recipe}:DrinkCardProps) => {
  return (
    <div>
        <h2>{recipe.strDrink}</h2>
    </div>
  )
}

export default DrinkCard