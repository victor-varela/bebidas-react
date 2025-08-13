import { CategoryAPIResponseSchema } from "../schemas/Recipes-Schema"

export type Categories = z.infer< typeof CategoryAPIResponseSchema>