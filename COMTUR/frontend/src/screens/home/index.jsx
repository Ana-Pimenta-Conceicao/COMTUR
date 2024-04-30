import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarAdm from "../../components/admin/sidebarAdm";
import NavbarAdm from "../../components/admin/navbarAdm";
import CardHome from "../../components/cards/cardHome";
import { Card } from "reactstrap";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Buscar o nome do usuário do localStorage ao montar o componente
    const storedUserName = localStorage.getItem("nome");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div className="home">
      <div className="h-screen flex fixed">
        <SidebarAdm setOpen={setSidebarOpen} open={sidebarOpen} nomeUsuario={localStorage.getItem("nome")} />
      </div>
      <div className="flex-1 container-fluid" style={{ paddingLeft: sidebarOpen ? 200 : 100 }}>
        <NavbarAdm />
        <div className="cont-home" style={{ paddingLeft: 50 }}>
          <h1 className="text-2xl font-semibold">Bem Vindo, {userName || "Usuário"}!</h1>
          <div className="flex">
            <CardHome />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
