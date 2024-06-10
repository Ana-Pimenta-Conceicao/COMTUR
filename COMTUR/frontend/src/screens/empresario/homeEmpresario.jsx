import React, { useState, useEffect } from "react";
import SidebarEmp from "../../components/empresario/sidebarEmp.jsx";
import { Navigate } from "react-router-dom";
import NavbarAdm from "../../components/admin/navbarAdm.jsx";
import CardDashboard from "../../components/cards/cardDashboard.jsx";
import { Cursor, Star, ThumbsUp } from "@phosphor-icons/react";
import TabelaDashboard from "../../components/table/tabelaDashboard.jsx";

const HomeEmpresario = () => {
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

  if (userType === "1" || userType === "2" || userType === "4") {
    return <Navigate to="/notfound" />;
  } else {
    return (
      <div>
        <div className="h-screen flex fixed">
          <SidebarEmp
            setOpen={setSidebarOpen}
            open={sidebarOpen}
            nomeUsuario={localStorage.getItem("nome")}
          />
        </div>
        <div className={`flex-1  ${sidebarOpen ? "ml-[200px]" : "ml-[100px]"}  `} >
          <NavbarAdm />
          <div className="cont-home pl-[50px] ">
            <h1 className="text-2xl font-semibold pb-2">
              Bem Vindo, {userName || "Usuário"}!
            </h1>
            <hr className="pb-4 border-[2.5px] border-gray-300 mr-8" />
            <div className="flex flex-wrap gap-10 text-[#FFD121]">
              <CardDashboard titulo="Acessos à Página" contagem="0.000" icone={<Cursor size={22} />} />
              <CardDashboard titulo="Avaliações" contagem="0.000" icone={<ThumbsUp size={22}/>} />
              <CardDashboard titulo="Média de Estrelas" contagem="0.000" icone={<Star size={22} />} />
            </div>
            <div className="pr-[300px] mt-8 mr-32">
            <TabelaDashboard/>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default HomeEmpresario;
