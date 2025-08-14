import { CategoryAPIResponseSchema } from "../schemas/Recipes-Schema"
import {z} from 'zod'

export type Categories = z.infer< typeof CategoryAPIResponseSchema>