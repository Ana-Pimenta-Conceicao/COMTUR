import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarAdm from "../../components/admin/sidebarAdm";
import NavBarAdm from "../../components/admin/navbarAdm";
import { useParams } from "react-router-dom";

export default function VisualizarPerfil({ userType }) {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState("");

  useEffect(() => {
    // Função para buscar os detalhes do usuário pelo ID
    const buscarUsuario = async () => {
      try {
        const response = await axios.get(`https://localhost:7256/api/Usuario/${id}`);
        setUsuario(response.data);
        console.log("Tipo de usuário recebido:", response.data.tipoUsuario);
        setTipoUsuario(response.data.tipoUsuario);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    buscarUsuario();
  }, [id]);

  if (!usuario) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="h-screen flex">
      <SidebarAdm />
      <div className="flex-2 container-fluid">
        <NavBarAdm />
        <div className="pl-8 pr-8 pt-[16px]">
          <h1 className="text-2xl font-semibold pb-2">
            Perfil do Usuário: {usuario.nome}
          </h1>
          <hr className="pb-[30px] border-[2.5px] border-[#DBDBDB]" />
        </div>
        <div className="grid grid-cols-4 justify-center">
          <div className="pl-28 col-span-1 justify-center ">
            <div className="relative rounded-full">
            <img className="flex w-40 h-40 rounded-full cursor-pointer" src={usuario.imagemPerfilUsuario} alt="Imagem do usuário"/>

            </div>
          </div>

          <div className="flex flex-col col-span-3 pl-20 form-group ">
            <label className="text-sm font-semibold">ID: </label>
            <input
              type="text"
              className="form-control text-sm mb-2 w-[300px] pointer-events-none"
              readOnly
              value={usuario.id}
            />
            <label className="text-sm font-semibold">Nome: </label>
            <input
              type="text"
              className="form-control text-sm mb-2 w-[300px] pointer-events-none"
              readOnly
              value={usuario.nome}
            />
             <label className="text-sm font-semibold">Telefone: </label>
            <input
              type="text"
              className="form-control text-sm mb-2 w-[300px] pointer-events-none"
              readOnly
              value={usuario.telefone}
            />
            <label className="text-sm font-semibold">E-mail:</label>
            <input
              type="text"
              className="form-control text-sm mb-2 w-[300px] pointer-events-none"
              readOnly
              value={usuario.emailUsuario}
            />
            <label className="text-sm font-semibold">Tipo de Usuário:</label>
            <input
              type="text"
              className="form-control text-sm mb-2 w-[300px] pointer-events-none"
              readOnly
              value={
                tipoUsuario === 4 ? "Administrador" :
                tipoUsuario === 3 ? "Empresário" :
                tipoUsuario === 2 ? "Funcionário" :
                tipoUsuario === 1 ? "Usuário" :
                "Tipo de usuário inválido"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
