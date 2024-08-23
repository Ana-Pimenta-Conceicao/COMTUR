import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import SidebarAdm from "../../components/admin/sidebarAdm.jsx";
import NavBarAdm from "../../components/admin/navbarAdm.jsx";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Tabela from "../../components/table/tabela.jsx";
import BtnAcao from "../../components/botoes/btnAcao.jsx";
import StatusDropdown from "../../components/admin/statusDropdown.jsx";

function Status() {
  const baseUrl = "https://localhost:7256/api/TipoAtracao";

  const [data, setData] = useState([]);
  const [atualizarData, setAtualizarData] = useState(true);

  const [tipoatracaoNome, setTipoAtracaoNome] = useState("");
  const [tipoatracaoId, setTipoAtracaoId] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userType, setUserType] = useState(null);

  const navigate = useNavigate();

  const TipoAtracaoSet = (tipoatracao, opcao) => {
    setTipoAtracaoNome(tipoatracao.nome);
    setTipoAtracaoId(tipoatracao.id);

    if (opcao === "Editar") {
      abrirFecharModalEditar();
    } else {
      abrirFecharModalDeletar();
    }
  };

  const pedidoGet = async () => {
    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (atualizarData) {
      pedidoGet();
      setAtualizarData(false);
    }
  }, [atualizarData]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getCurrentPageItems = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const currentItems = getCurrentPageItems(currentPage);

  useEffect(() => {
    const userTypeFromLocalStorage = localStorage.getItem("tipoUsuario");
    setUserType(userTypeFromLocalStorage);
  }, []);

  const apresentaDados = Array.isArray(currentItems)
    ? currentItems.map((tipoatracao) => {
        return {
          id: tipoatracao.id,
          nome: tipoatracao.nome,
          status: (
            <StatusDropdown
              currentStatus={tipoatracao.status}
              onUpdateStatus={(newStatus) => handleStatusUpdate(tipoatracao.id, newStatus)}
            />
          ),
          entidade: "Tipo Atração"
        };
      })
    : [];

    const handleStatusUpdate = async (id, newStatus) => {
        let url;
      
        switch (newStatus) {
          case '1': // Em Análise
            url = `${baseUrl}/${id}/EmAnalise`;
            break;
          case '2': // Aprovado
            url = `${baseUrl}/${id}/Aprovar`;
            break;
          case '3': // Reprovado
            url = `${baseUrl}/${id}/Reprovar`;
            break;
          case '4': // Desativado
            url = `${baseUrl}/${id}/Desativar`;
            break;
          default:
            console.error('Status desconhecido:', newStatus);
            return;
        }
      
        try {
          await axios.put(url); // Envia a requisição PUT para o endpoint correto
          setAtualizarData(true); // Força a atualização da lista
        } catch (error) {
          console.error("Erro ao atualizar o status:", error);
        }
      };
      

  if (userType === "1" || userType === "3") {
    return <Navigate to="/notfound" />;
  } else {
    return (
      <div className="home">
        <div className="h-screen flex fixed">
          <SidebarAdm setOpen={setSidebarOpen} open={sidebarOpen} />
        </div>
        <div
          className="flex-1 container-fluid"
          style={{ paddingLeft: sidebarOpen ? 200 : 100 }}
        >
          <NavBarAdm />
          <div className="pl-8 pr-8 pt-[20px]">
            <h1 className="text-3xl font-semibold pb-2">
              Lista de Tipos de Atrações
            </h1>
            <hr className="pb-4 border-[2.5px] border-gray-300" />
            <Tabela
              object={apresentaDados}
              colunas={["ID", "Nome", "Status", "Entidade"]}
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={setCurrentPage}
              numColunas={4}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Status;
