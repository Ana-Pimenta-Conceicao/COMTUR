import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import SidebarAdm from "../../components/admin/sidebarAdm.jsx";
import NavBarAdm from "../../components/admin/navbarAdm.jsx";
import Tabela from "../../components/table/tabelaStatus.jsx";
import StatusDropdown from "../../components/admin/statusDropdown.jsx";
import ModalStatus from "../../components/modais/modalStatus.jsx";
import FiltroEntidade from "../../components/filter/FiltroEntidade.jsx";

function Status() {
  // Estado inicial
  const entities = ["TipoAtracao", "TipoTurismo", "Turismo", "Noticia", "Atracao", "Empresa"];
  const [data, setData] = useState([]);
  const [auditoriaInfo, setAuditoriaInfo] = useState({});
  const [usuarioInfo, setUsuarioInfo] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loadingAuditoria, setLoadingAuditoria] = useState({});
  const [selectedEntity, setSelectedEntity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  // Funções auxiliares
  const openModal = async (id, entidade) => {
    try {
      const response = await axios.get(`https://localhost:7256/api/auditoria/historico-modificacoes/${id}/${entidade}`);
      setModalData(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar dados de auditoria:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const fetchData = async () => {
    const allData = [];
    for (const entity of entities) {
      try {
        const response = await axios.get(`https://localhost:7256/api/${entity}`);
        const enrichedData = response.data.map(item => ({
          ...item,
          entity
        }));
        allData.push(...enrichedData);
      } catch (error) {
        console.error(`Erro ao buscar dados de ${entity}:`, error);
      }
    }
    setData(allData);
    setLoading(false);
  };

  const fetchAuditoria = async (id, entidade) => {
    try {
      const urlAuditoria = `https://localhost:7256/api/auditoria/ultima-modificacao/${id}/${entidade}`;
      setLoadingAuditoria(prev => ({ ...prev, [id]: true }));
      const response = await axios.get(urlAuditoria);
      setAuditoriaInfo(prev => ({ ...prev, [id]: response.data }));
    } catch (error) {
      console.error("Erro ao buscar auditoria:", error);
    } finally {
      setLoadingAuditoria(prev => ({ ...prev, [id]: false }));
    }
  };

  const fetchUsuario = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7256/api/Usuario/${id}`);
      setUsuarioInfo(prev => ({ ...prev, [id]: response.data }));
    } catch (error) {
      console.error(`Erro ao buscar o usuário com ID ${id}:`, error);
    }
  };

  const handleStatusUpdate = async (id, newStatus, entidade) => {
    if (!id || !entidade) {
      console.error("ID ou entidade indefinidos:", id, entidade);
      return;
    }

    const statusUrls = {
      "1": `https://localhost:7256/api/${entidade}/${id}/EmAnalise`,
      "2": `https://localhost:7256/api/${entidade}/${id}/Aprovar`,
      "3": `https://localhost:7256/api/${entidade}/${id}/Reprovar`,
      "4": `https://localhost:7256/api/${entidade}/${id}/Desativar`,
    };

    const url = statusUrls[newStatus];
    if (!url) {
      console.error("Status desconhecido:", newStatus);
      return;
    }

    try {
      await axios.put(url);
      setData(prevData =>
        prevData.map(item => (item.id === id ? { ...item, status: newStatus } : item))
      );
      await fetchAuditoria(id, entidade);
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
    }
  };

  // Paginação e filtro
  const getCurrentPageItems = (page, data) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const apresentaDados = Array.isArray(data) ? data.map((item) => {
    const auditoria = auditoriaInfo[item.id];
    const usuario = usuarioInfo[item.idUsuario];
    return {
      id: item.id,
      nome: item.nome || "Em Branco",
      autor: usuario ? usuario.nome : "Desconhecido",
      entidade: loadingAuditoria[item.id] ? "Carregando..." : item.entity,
      status: (
        <StatusDropdown
          currentStatus={item.status}
          onUpdateStatus={(newStatus) => handleStatusUpdate(item.id, newStatus, item.entity)}
        />
      ),
      data: loadingAuditoria[item.id]
        ? "Carregando..."
        : auditoria
        ? `${auditoria.data} às ${auditoria.hora}`
        : "Desconhecido",
    };
  }) : [];
  
  // Filtra os dados com base na entidade selecionada
  const filteredData = selectedEntity
    ? apresentaDados.filter(item => item.entidade === selectedEntity)
    : apresentaDados;
  
  // Divide os dados filtrados em páginas
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = getCurrentPageItems(currentPage, filteredData);
  

  // Efeitos
  useEffect(() => {
    const userTypeFromLocalStorage = localStorage.getItem("tipoUsuario");
    setUserType(userTypeFromLocalStorage);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      for (const item of data) {
        await fetchAuditoria(item.id, item.entity);
        if (item.idUsuario) {
          await fetchUsuario(item.idUsuario);
        }
      }
    };
    if (data.length > 0) {
      fetchAllData();
    }
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedEntity]);

  // Renderização
  if (userType === "1" || userType === "3") {
    return <Navigate to="/notfound" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <div className="h-screen flex fixed">
        <SidebarAdm setOpen={setSidebarOpen} open={sidebarOpen} />
      </div>
      <div className="flex-1 container-fluid" style={{ paddingLeft: sidebarOpen ? 200 : 100 }}>
        <NavBarAdm />
        <div className="pl-8 pr-8 pt-[20px]">
          <div className="flex justify-between">
            <h1 className="text-3xl font-semibold pb-2">Lista de Registros</h1>
            <FiltroEntidade
              entities={entities}
              selectedEntity={selectedEntity}
              onSelectEntity={setSelectedEntity}
            />
          </div>
          <hr className="pb-4 border-[2.5px] border-gray-300" />
          <Tabela
            object={currentItems}
            colunas={["ID", "Nome", "Autor", "Entidade", "Status", "Data"]}
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={setCurrentPage}
            numColunas={6}
            onRowClick={(id, entidade) => openModal(id, entidade)}
          />
          {isModalOpen && <ModalStatus data={modalData} closeModal={closeModal} />}
        </div>
      </div>
    </div>
  );
}

export default Status;