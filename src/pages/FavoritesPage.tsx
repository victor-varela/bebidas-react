import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../stores/useAppStore";

const FavoritesPage = () => {
  const favorites = useAppStore(state => state.favorites);
  const hasFavorites = favorites.length;
  return (
    <>
      <h1 className="text-6xl font-extrabold">Favoritos</h1>
      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 my-10">
          {favorites.map(fav => (
            <DrinkCard key={fav.idDrink} recipe={fav} />
          ))}
        </div>
      ) : (
        <p className="my-10 text-2xl font-bold text-center">Los favoritos se mostraran aqui</p>
      )}
    </>
  );
};

export default FavoritesPage;

/*
- Los favoritos los importamos desde el state no de localStorage, el state es nuestra fuente de la verdad.



*/
