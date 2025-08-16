import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../stores/useAppStore";

const IndexPage = () => {
  const recipes = useAppStore(state => state.recipes);
  const hasRecipes = recipes.drinks.length;

  return (
    <>
      <h1 className="font-bold text-6xl">Recetas</h1>
      {hasRecipes ? (
        <>
          {recipes.drinks.map(recipe => (
            <DrinkCard recipe={recipe} key={recipe.idDrink} />
          ))}
        </>
      ) : (
        <p className=" my-10 text-center text-2xl">No hay bebidas aun, utiliza el formulario para buscar recetas</p>
      )}
    </>
  );
};

export default IndexPage;

/*
- Siempre implementar la modularidad, dividir en componentes la app para codigo mas limpio y reutilizable. Cuando queremos mostrar un listado debemos tener el componente contenedor y el componente de presentacion (también conocidos como Smart & Dumb Components en la jerga más antigua).

Container (contenedor):
Se encarga de la lógica: traer datos (de un store, API, contexto, etc.), gestionar estado, manejar eventos.
No le importa cómo se ven las cosas, sino qué datos/acciones tiene que pasarle a los hijos.

Presentational (presentacional):
Se encarga de la UI pura: recibe props y renderiza.
No maneja estado complejo ni efectos secundarios, solo se enfoca en "mostrar".




*/
