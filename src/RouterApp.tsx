import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import FavoritesPage from "./pages/FavoritesPage";
import Layout from "./layouts/Layout";

function RouterApp() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}> 

          <Route path="/" element={<IndexPage/>} />
          <Route path="/favoritos" element={<FavoritesPage/>} />

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




*/
