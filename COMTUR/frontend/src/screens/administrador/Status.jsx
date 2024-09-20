import SidebarAdm from "../../components/admin/sidebarAdm.jsx";
import NavBarAdm from "../../components/admin/navbarAdm.jsx";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Tabela from "../../components/table/tabelaStatus.jsx";
import StatusDropdown from "../../components/admin/statusDropdown.jsx";
import ModalStatus from "../../components/modais/modalStatus.jsx";

function Status() {
  const entities = ["TipoAtracao", "TipoTurismo", "Turismo", "Noticia"];
  const [data, setData] = useState([]);
  const [auditoriaInfo, setAuditoriaInfo] = useState({});
  const [usuarioInfo, setUsuarioInfo] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loadingAuditoria, setLoadingAuditoria] = useState({});

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
          entity // Adiciona o nome da entidade
        }));
        allData.push(...enrichedData);
      } catch (error) {
        console.error(`Erro ao buscar dados de ${entity}:`, error);
      }
    }

    setData(allData);
    setLoading(false);
  };

  useEffect(() => {
    const userTypeFromLocalStorage = localStorage.getItem("tipoUsuario");
    setUserType(userTypeFromLocalStorage);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleRowClick = (id, entidade) => {
    openModal(id, entidade);
  };

  const fetchAuditoria = async (id, entidade) => {
    try {
      const urlAuditoria = `https://localhost:7256/api/auditoria/ultima-modificacao/${id}/${entidade}`;
      setLoadingAuditoria(prev => ({ ...prev, [id]: true })); // Marca como carregando
      const response = await axios.get(urlAuditoria);
      setAuditoriaInfo(prev => ({ ...prev, [id]: response.data }));
    } catch (error) {
      console.error("Erro ao buscar auditoria:", error);
    } finally {
      setLoadingAuditoria(prev => ({ ...prev, [id]: false })); // Marca como não carregando
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

  const apresentaDados = data.map(item => {
    const auditoria = auditoriaInfo[item.id];
    const usuario = usuarioInfo[item.idUsuario];

    return {
      id: item.id,
      nome: item.nome ? item.nome : "Em Branco",
      autor: usuario ? usuario.nome : "Desconhecido",
      entidade: loadingAuditoria[item.id] ? "Carregando..." : auditoria ? auditoria.nomeEntidade : "Desconhecido",
      status: (
        <StatusDropdown
          currentStatus={item.status}
          onUpdateStatus={(newStatus) => handleStatusUpdate(item.id, newStatus)}
        />
      ),
      data: loadingAuditoria[item.id] ? "Carregando..." : auditoria ? `${auditoria.data} às ${auditoria.hora}` : "Desconhecido",
    };
  });

  const handleStatusUpdate = async (id, newStatus) => {
    let url;
    switch (newStatus) {
      case '1':
        url = `https://localhost:7256/api/TipoAtracao/${id}/EmAnalise`;
        break;
      case '2':
        url = `https://localhost:7256/api/TipoAtracao/${id}/Aprovar`;
        break;
      case '3':
        url = `https://localhost:7256/api/TipoAtracao/${id}/Reprovar`;
        break;
      case '4':
        url = `https://localhost:7256/api/TipoAtracao/${id}/Desativar`;
        break;
      default:
        console.error('Status desconhecido:', newStatus);
        return;
    }

    try {
      await axios.put(url);
      setData(prevData =>
        prevData.map(item =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
      await fetchAuditoria(id, "TipoAtracao");
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
    }
  };

  if (userType === "1" || userType === "3") {
    return <Navigate to="/notfound" />;
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="home">
        <div className="h-screen flex fixed">
          <SidebarAdm setOpen={setSidebarOpen} open={sidebarOpen} />
        </div>
        <div className="flex-1 container-fluid" style={{ paddingLeft: sidebarOpen ? 200 : 100 }}>
          <NavBarAdm />
          <div className="pl-8 pr-8 pt-[20px]">
            <h1 className="text-3xl font-semibold pb-2">Lista de Atrações, Turismos e Notícias</h1>
            <hr className="pb-4 border-[2.5px] border-gray-300" />
            <Tabela
              object={apresentaDados}
              colunas={["ID", "Nome", "Autor", "Entidade", "Status", "Data"]}
              currentPage={1}
              totalPages={1} // Ajuste conforme necessário
              goToPage={() => {}}
              numColunas={6}
              onRowClick={(id, entidade) => handleRowClick(id, entidade)} // Ajuste para passar a entidade correta
            />
            {isModalOpen && (
              <ModalStatus data={modalData} closeModal={closeModal} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Status;