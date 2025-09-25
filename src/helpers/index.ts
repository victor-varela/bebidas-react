import type { Recipe } from "../types";

export const skipEmptyLines = (lines: string[], startIndex: number, options: { reverse: boolean }) => {
  let i = startIndex;
  while (i < lines.length && lines[i].trim() === "") {
    options.reverse ? i-- : i++;
  }
  return i;
};

//recibe el array de strings de la respuesta de la IA. Previamente se habia creado la variable lines con .split de la respuesta de la IA, y el indice donde detectamos lo que nos interesa: Instrucciones / Preparacion. Recorre el array completo DESDE ese indice y devuelve un numero que es el indice donde ya NO hay mas lineas vacias.

export const createAiRecipe = (lines: string[]) => {
  let ingredients: { ingredient: string }[] = [];
  let instructions = [];
  let title = lines[0];
  const ingredientSection = { start: 0, finish: 0 };
  let instructionSectionStart = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("Ingredientes:") || lines[i].includes("preparación")) {
      //estamos en ingredientes

      //ahora detectamos la primera linea no vacia despues de eso
      ingredientSection.start = skipEmptyLines(lines, i + 1, { reverse: false });
      console.log(ingredientSection.start);
    }

    if (lines[i].includes("Instrucciones:") || lines[i].includes("Preparación:")) {
      console.log(i);

      // buscás la primera línea no vacía ANTES de instrucciones

      ingredientSection.finish = skipEmptyLines(lines, i - 1, { reverse: true });
      console.log(ingredientSection.finish);
      instructionSectionStart = skipEmptyLines(lines, i + 1, { reverse: false });
    }
  }

  for (let i = ingredientSection.start; i <= ingredientSection.finish; i++) {
    let ingredient = { ingredient: lines[i] };
    ingredients.push(ingredient);
  }

  for (let i = instructionSectionStart; i < lines.length; i++) {
    if (lines[i] !== "") {
      instructions.push(lines[i]);
    } else break;
  }

const ingredientsProps = Object.fromEntries(
  Array.from({ length: 6 }).map((_, index) => {
    const key = `strIngredient${index + 1}` as keyof Recipe;
    const value = ingredients[index]?.ingredient ?? null;
    return [key, value];
  })
) as Pick<
  Recipe,
  | "strIngredient1"
  | "strIngredient2"
  | "strIngredient3"
  | "strIngredient4"
  | "strIngredient5"
  | "strIngredient6"
>;

  console.log(ingredientsProps);

  const placeHolders =["/drink1.jpg","/drink2.jpg","/drink3.jpg"]

  const aiRecipe: Recipe = {
    idDrink: "ai"+ crypto.randomUUID(),
    strDrink: title,
    strDrinkThumb: placeHolders[Math.floor(Math.random()* placeHolders.length)],
    strInstructions: instructions.toString(),
   ...ingredientsProps,
    strMeasure1: null,
    strMeasure2: null,
    strMeasure3: null,
    strMeasure4: null,
    strMeasure5: null,
    strMeasure6: null,
  };

  return aiRecipe
};

//mi bebe.. estuve 4 o 5 dias creando esto. Sientete orgulloso!!

// ingredientsProps. Es un OBJETO, por que? quiero llenar las key - values de aiRecipe para enviarle a adFavorite (que recibe un recipe), por eso tengo que TRANSFORMAR las variables instructions y ingredients para que se AJUSTEN a lo que espera adFavorite. Entonces para los ingredientes ME DOY CUENTA que aiRecipe tiene esta forma 'strIngredient1...strIngredient6' eso me dice que debo crear DINAMICAMENTE esas keys- esas llaves-- strIngredient hasta aca es FIJO, lo que CAMBIA es el numero y como cambiamos dinamicamente eso??? pues con un for o con un array method. Usamos reduce porque vamos acumulando en el OBJETO ingredientsProps las Keys-- las llaves-- que creamos y a su vez asignamos dinamicamente dentro del array method. LUEGO--> en el objeto aiRecipe EXPANDIMOS ingredientsProps en el lugar donde van los antiguamente strIngredient1... escritos manualmente.. Esa forma nos dio un error porque Ts espera los 6 ingredientes y no pueden ser undefined. Luego creamos la forma que quedo activo usando objet.entries .map y as Pick<|strIngredient1... strIngredient6 para el type. Aca la expliacion:

// ✅ Resumen conceptual:

// Creamos un array de 6 posiciones para iterar 6 ingredientes.

// Generamos dinámicamente los nombres de propiedad que espera Recipe.

// Tomamos los valores de ingredients o asignamos null si no hay.

// Convertimos el array de pares [key, value] en un objeto listo para usar.

// Le decimos a TypeScript que este objeto tiene las claves exactas que necesitamos.
