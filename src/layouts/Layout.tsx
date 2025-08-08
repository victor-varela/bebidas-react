import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto py-16">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

/*
  - Renderiza los elementos que conforman el LAYOUT (header, body, footer, etc...), y DESPUES lo demas, es decir, <Outlet/>: OUTLET va a ser el contenido independiente (las paginas, inicio, favoritos, carrito, etc...)

  - Semanticamente el outlet va dentro de un main

*/
