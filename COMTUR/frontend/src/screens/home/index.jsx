import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardHome from "../../components/cards/cardHome.jsx";
import Layout from "../../components/admin/layout.jsx";

const Home = () => {
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

  return (
    <Layout>
      <h1 className="text-[18px] md:text-2xl font-semibold truncate">Bem Vindo, {userName || "Usuário"}!</h1>
      <hr className="pb-4 border-[2.5px] border-gray-300" />
      <div className="flex">
        <CardHome />
      </div>
    </Layout>
  );
}

export default Home;