export const skipEmptyLines = (lines: string[], startIndex: number, options: { reverse: boolean }) => {
  let i = startIndex;
  while (i < lines.length && lines[i].trim() === "") {
    options.reverse ? i-- : i++;
  }
  return i;
};

//recibe el array de strings de la respuesta de la IA. Previamente se habia creado la variable lines con .split de la respuesta de la IA, y el indice donde detectamos lo que nos interesa: Instrucciones / Preparacion. Recorre el array completo DESDE ese indice y devuelve un numero que es el indice donde ya NO hay mas lineas vacias.

export const findIngredients = (lines: string[]) => {
  let ingredients: { ingredient: string }[] = [];
  let instructions = [];
  const ingredientSection = { start: 0, finish: 0 };
  let instructionSectionStart = 0

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
    }else break;
  }

  return { ingredients, instructions };
};
