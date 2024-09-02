import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import SidebarAdm from "../../components/admin/sidebarAdm.jsx";
import NavBarAdm from "../../components/admin/navbarAdm.jsx";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Tabela from "../../components/table/tabela.jsx";
import StatusDropdown from "../../components/admin/statusDropdown.jsx";

function Status() {
  const baseUrl = "https://localhost:7256/api/TipoAtracao";

  const [data, setData] = useState([]);
  const [atualizarData, setAtualizarData] = useState(true);
  const [auditoriaInfo, setAuditoriaInfo] = useState({});
  const [usuarioInfo, setUsuarioInfo] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  const pedidoGet = async () => {
    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
      setAtualizarData(false); // Resetar flag de atualização após dados serem carregados
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    const fetchAllData = async () => {
      // Fetching data for the current page
      if (atualizarData) {
        await pedidoGet();
      }

      // Fetching auditoria and usuario info for each item
      for (const item of currentItems) {
        if (!auditoriaInfo[item.id]) {
          await fetchAuditoria(item.id, "TipoAtracao");
        }
        if (item.idUsuario && !usuarioInfo[item.idUsuario]) {
          await fetchUsuario(item.idUsuario);
        }
      }

      setLoading(false); // Indica que o carregamento foi concluído
    };

    fetchAllData();
  }, [atualizarData, currentPage]); // Dependências para controlar atualizações

  const fetchAuditoria = async (id, entidade) => {
    try {
      const urlAuditoria = `https://localhost:7256/api/auditoria/ultima-modificacao/${id}/${entidade}`;
      const response = await axios.get(urlAuditoria);
      console.log(`Fetching URL: ${urlAuditoria}`);
      setAuditoriaInfo((prev) => ({
        ...prev,
        [id]: response.data,
      }));
    } catch (error) {
      console.error("Erro ao buscar auditoria:", error);
    }
  };

  const fetchUsuario = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7256/api/Usuario/${id}`);
      setUsuarioInfo((prev) => ({
        ...prev,
        [id]: response.data,
      }));
    } catch (error) {
      console.error(`Erro ao buscar o usuário com ID ${id}:`, error);
    }
  };

  const apresentaDados = Array.isArray(currentItems)
    ? currentItems.map((tipoatracao) => {
      const auditoria = auditoriaInfo[tipoatracao.id];
      const usuario = usuarioInfo[tipoatracao.idUsuario];
      return {
        id: tipoatracao.id,
        nome: tipoatracao.nome,
        autor: usuario ? usuario.nome : "Desconhecido",
        entidade: auditoria ? auditoria.nomeEntidade : "Carregando...",
        status: (
          <StatusDropdown
            currentStatus={tipoatracao.status}
            onUpdateStatus={(newStatus) => handleStatusUpdate(tipoatracao.id, newStatus)}
          />
        ),
        data: auditoria ? `${auditoria.data} às ${auditoria.hora}` : "Carregando...",
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
      await axios.put(url);
      setAtualizarData(true); // Força a atualização da lista
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
    }
  };

  if (userType === "1" || userType === "3") {
    return <Navigate to="/notfound" />;
  } else if (loading) { // Exibir um carregamento enquanto os dados estão sendo obtidos
    return <div>Loading...</div>;
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
              colunas={["ID", "Nome", "Autor", "Entidade", "Status", "Data"]}
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={setCurrentPage}
              numColunas={6}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Status;
