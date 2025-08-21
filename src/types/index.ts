import {
  CategoryAPIResponseSchema,
  RecipeAPIResponseSchema,
  RecipesAPIResponseSchema,
  RecipeSchema,
  SearchFilterSchema,
  SelectedRecipeAPISchema,
} from "../schemas/Recipes-Schema";
import { z } from "zod";

export type Categories = z.infer<typeof CategoryAPIResponseSchema>;
export type SearchFilter = z.infer<typeof SearchFilterSchema>;
export type Recipes = z.infer<typeof RecipesAPIResponseSchema>;
export type Drink = z.infer<typeof RecipeAPIResponseSchema>;
export type SelectedRecipe = z.infer <typeof SelectedRecipeAPISchema>
export type Recipe = z.infer<typeof RecipeSchema>
