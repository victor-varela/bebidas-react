import {
  CategoryAPIResponseSchema,
  RecipeAPIResponseSchema,
  RecipesAPIResponseSchema,
  SearchFilterSchema,
} from "../schemas/Recipes-Schema";
import { z } from "zod";

export type Categories = z.infer<typeof CategoryAPIResponseSchema>;
export type SearchFilter = z.infer<typeof SearchFilterSchema>;
export type Recipes = z.infer<typeof RecipesAPIResponseSchema>;
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>;
