import { useEffect, useState } from "react";
import NavbarAdm from "./navbarAdm";
import SidebarAdm from "./sidebarAdm";


export default function Layout({children}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [userName, setUserName] = useState("");
    const [userType, setUserType] = useState(null);
  
    useEffect(() => {
      const storedUserName = localStorage.getItem("nome");
      if (storedUserName) {
        setUserName(storedUserName);
      }
  
      const userTypeFromLocalStorage = localStorage.getItem("tipoUsuario");
      setUserType(userTypeFromLocalStorage);
    }, []);
  
    if (userType === null) {
      return <div>Carregando...</div>;
    } else if (userType === "1" || userType === "3") {
      return <Navigate to="/notfound" />;
    } else {
    return (

        <div className="home">
            <div className="h-screen flex fixed">
                <SidebarAdm setOpen={setSidebarOpen} open={sidebarOpen} nomeUsuario={localStorage.getItem("nome")} />
            </div>
            <div className={`flex-1  ${sidebarOpen ? "ml-[90px]" : "ml-[90px]"}  ${sidebarOpen ? "md:ml-[190px]" : "md:ml-[75px]"} w-fit`}>
                <NavbarAdm />
                <div className="flex flex-col md:pl-[50px]">
                    {children}
                </div>
            </div>
        </div>
    );
};
}