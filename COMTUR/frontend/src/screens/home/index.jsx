import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarAdm from "../../components/admin/sidebarAdm";
import NavbarAdm from "../../components/admin/navbarAdm";
import CardHome from "../../components/cards/cardHome";
import { Navigate } from 'react-router-dom';

const Home = () => {
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
        <div className={`flex-1  ${sidebarOpen ? "ml-[200px]" : "ml-[100px]"}  `}>
          <NavbarAdm />
          <div className="cont-home pl-[50px]">
            <h1 className="text-2xl font-semibold">Bem Vindo, {userName || "Usuário"}!</h1>
            <div className="flex">
              <CardHome />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
