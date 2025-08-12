import axios from "axios";
import {z} from 'zod';
import { CategoryAPIResponseSchema } from "../schemas/Recipes-Schema";
import { da } from "zod/locales";


export const getCategories = async ()=>{

    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'

    try {
        const {data} = await axios(url)
     
        const parsedCategories = CategoryAPIResponseSchema.safeParse(data)
        console.log(parsedCategories);
    
        
        
    } catch (error) {
        console.log(error);
        
    }
    console.log('buscando recetas...');
    
}