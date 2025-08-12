import axios from "axios";


export const getCategories = async ()=>{

    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'

    try {
        const data = await axios(url)
        console.log(data);
        
    } catch (error) {
        console.log(error);
        
    }
    console.log('buscando recetas...');
    
}