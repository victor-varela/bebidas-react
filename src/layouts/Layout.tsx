import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet/>
    </>
  );
};

export default Layout;

/*
  - Renderiza los elementos que conforman el LAYOUT, y DESPUES lo demas, es decir, outlet: OUTLET va a ser el contenido independiente 

*/
