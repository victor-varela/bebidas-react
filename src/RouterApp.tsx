import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
const IndexPage = lazy(() => import("./pages/IndexPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
import Layout from "./layouts/Layout";

function RouterApp() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <Suspense fallback='cargando...'>
                  <IndexPage />
                </Suspense>
              }
              index
            />
            <Route
              path="/favoritos"
              element={
                <Suspense fallback='cargando...'>
                  <FavoritesPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouterApp;

/*
  -Importamos react-router-dom y sus componentes principales BrowerRouter, Routes, Route
  - Cada ruta indica una view o page (creamos la carpeta en src, y dentro los componentes)- '/' inicio '/favoritos/ etc. Tiene 2 props principales, path y element

  - Para envolver views que comparten layout se hace en un Route con solo la prop element y nombreDelElemento (Layout) este componente funciona con el componente Outlet.

  - A la pagina principal le asignamos el prop index.-> va asi, solito index

  - Por ultimo importamos lazy y Suspense para dividir las paginas en varios archivos js de la APP: a cada pagina la envolvemos en <Suspense> a las paginas que queremos separar y la importamos dentro de la funcion lazy. Fijate en vsCode te da los ejemplos para usar lazy, te paras en la funcion y lees, lees, lees, lees bebe.


*/
