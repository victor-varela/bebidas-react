import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

const Header = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const fecthCategories = useAppStore(state => state.fecthCategories);
  const categories = useAppStore(state => state.categories);
  const [searchFilter, setSearchFilter] = useState({
    ingredient: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setSearchFilter({
      ...searchFilter,
      [e.target.name]: e.target.value,
    });
  };
  const isDisabled = Object.values(searchFilter).includes("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("enviando..");
  };

  useEffect(() => {
    fecthCategories();
  }, []);

  return (
    <header className={isHome ? "bg-[url(/bg.jpg)] bg-center bg-cover" : "bg-slate-800"}>
      <div className="mx-auto px-5 py-16 container">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="imagen logo" />
          </div>
          <nav className="flex gap-4">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bol"
              }
            >
              inicio
            </NavLink>
            <NavLink
              to={"/favoritos"}
              className={({ isActive }) =>
                isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bol"
              }
            >
              favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form
            className="bg-orange-400 p-10 my-32 rounded-lg md:w-1/2 2xl:w-1/3 shadow space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4">
              <label htmlFor="ingredient" className="text-white uppercase font-bold">
                nombre o ingredientes
              </label>
              <input
                type="text"
                id="ingredient"
                name="ingredient"
                className="focus:outline-none w-full  bg-white text-black p-3 rounded-lg"
                placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Cafe"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="category" className="text-white uppercase font-bold">
                categoria
              </label>
              <select
                name="category"
                id="category"
                className=" focus:outline-none w-full bg-white text-black p-3 rounded-lg"
                onChange={handleChange}
              >
                <option value="">-- Seleccione --</option>
                {categories.drinks.map(cat => (
                  <option value={cat.strCategory} key={cat.strCategory}>
                    {cat.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value={"Buscar Recetas"}
              className={
                !isDisabled
                  ? " bg-orange-800  hover:bg-orange-900 text-white font-extrabold  uppercase p-2 rounded-lg  w-full cursor-pointer"
                  : "bg-orange-100  text-white font-extrabold  uppercase p-2 rounded-lg  w-full cursor-not-allowed"
              }
            />
          </form>
        )}
      </div>
    </header>
  );
};

export default Header;

/*
- Creamos los enlaces con Link to / NavLink to . Para agregar clases a los enlaces en funcion a si esta activo o no usamos NAVLINK, y llamamos ({isActive})=> para cambiar las clases .

- Usamos el hook useLocation de react-router-dom para saber en que pagina esta el usuario. Es util para contenidos dinamicos. Extraemos pathName directamente del objeto que devuelve el hook.

- Es raro usar el hook useLocation para saber si estamos en inicio entonces renderizar el formulario, pero creo que el punto es aprender un hook diferente. Normalmente lo que yo haria es en la pagina de inicio hacer el formulario peeeeeero... Si el formulario es parte del Header y puede aparecer en varias rutas, mantenlo en el layout con useLocation.

Si el formulario solo vive en la página /, ponlo en el componente de esa página y deja el layout sin lógica de rutas.

<header className={isHome ? "bg-[url(/bg.jpg)] bg-center bg-cover" : "bg-slate-800"}>
usamos la notacion de corchete de tailwind para inyectar la ruta directamente en la clase bg bg-[value]

- Creamos un state 'local' par capturar los input del formulario.


 */
