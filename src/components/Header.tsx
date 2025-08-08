import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const [isHome, setIsHome] = useState(false);
  useEffect(() => {
    pathname === "/" ? setIsHome(true) : setIsHome(false);
  }, [pathname]);

  return (
    <header className="bg-slate-800 ">
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
          <form className="bg-orange-400 p-10 my-32 rounded-lg md:w-1/2 2xl:w-1/3 shadow space-y-6">
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
              />
            </div>
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
              />
            </div>
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

- Es raro usar el hook useLocation para saber si estamos en inicio entonces renderizar el formulario, pero creo que el punto es aprender un hook diferente. Normalmente lo que yo haria es en la pagina de inicio hacer el formulario peeeeeero... 


 */
