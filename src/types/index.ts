import { CategoryAPIResponseSchema, SearchFilterSchema } from "../schemas/Recipes-Schema"
import {z} from 'zod'

export type Categories = z.infer< typeof CategoryAPIResponseSchema>
export type SearchFilter = z.infer <typeof SearchFilterSchema >