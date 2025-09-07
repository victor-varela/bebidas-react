import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

export const openrouter = createOpenRouter({
  apiKey: import.meta.env.VITE_OPENROUTER_KEY,
});

export const generateRecipeService = async (prompt: string) => {
  const result = streamText({
    model: openrouter("meta-llama/llama-4-maverick:free"),
    // model: openrouter("deepseek/deepseek-chat-v3.1:free"),
    // model: openrouter("openai/gpt-oss-120b:free"),
    system:
      "Eres un bartender profesional con 30 años de experiencia con amor por los tragos clasicos." +
      "Si te hacen una pregunta que no tiene que ver con recetas de tragos, bebidas o cocktails debes respetuosamente decir que no es tu funcion.",
      temperature:1,
    prompt,
  });

  return result.textStream;
};

/*
🔹 ¿Qué es el Vercel AI SDK?

Es un framework hecho por Vercel para integrar modelos de IA en proyectos (especialmente frontends con React/Next.js, aunque sirve también para otros entornos).
Se enfoca en UX y DX (developer experience): te da herramientas listas para manejar streaming de respuestas, UI reactivas, y conexión simple con múltiples proveedores de modelos (OpenAI, Anthropic, Cohere, HuggingFace, OpenRouter, etc).

Vercel AI SDK + OpenRouter → mejor si querés flexibilidad entre modelos, UI de chat/completions con streaming en frontend, y si trabajás en React/Next.js.

- Fijate que en el createOpenRouter debe estar apikey. Luego la variable openrouter (en minusculas) ya contiene la apiKey.

- Esa variable como es una instancia de openRouter --> el puente entre APP y openRouter la usamos para asignar el modelo, prompt etc a streamText ---> el manejador de respuesta 'en vivo' stream de la dependencia 'ai'. El modelo lo tenemos de la web de openrouter seleccionando el que mas nos guste.

- La funcion generateRecipeService retorna el metodo .textStream quien es el que guarda la respuesta, es un dato de tipo  AsyncIterableStream<string> significa que se va llenando asincrono y se va iterando.. que emocion!! la pregunta es : como se itera un dato asincrono? --> con un for await.

- Para solo hacer consultas usamos model y prompt. Para el comportamiento usamos system y temperature.

Gracias a la dependencia AI que es de los creadores de NextJs y Vercel se hace la integracion de estas variables (system--> el rol de la IA (puedes sumar varios roles uniendos los strings con + 'eres bartender' + 'solo respondes preguntas de bartender' + 'tienes predileccion por los clasicos' etc...) y temperature--> que tal loca se pone el rango es de 0 a 1) la web es la de sdk vercel ai : https://ai-sdk.dev/

*/
