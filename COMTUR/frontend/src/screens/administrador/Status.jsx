import SidebarAdm from "../../components/admin/sidebarAdm.jsx";
import NavBarAdm from "../../components/admin/navbarAdm.jsx";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Tabela from "../../components/table/tabelaStatus.jsx";
import StatusDropdown from "../../components/admin/statusDropdown.jsx";
import ModalStatus from "../../components/modais/modalStatus.jsx";
import FiltroEntidade from "../../components/filter/FiltroEntidade.jsx"; // Importar o filtro de entidade

function Status() {
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
  const [selectedEntity, setSelectedEntity] = useState(""); // Estado para a entidade selecionada

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
          entity // Certifique-se de que a entidade correta é atribuída
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
      entidade: loadingAuditoria[item.id] ? "Carregando..." : item.entity, // Alterado para usar item.entity
      status: (
        <StatusDropdown
          currentStatus={item.status}
          onUpdateStatus={(newStatus) => handleStatusUpdate(item.id, newStatus, item.entity)} // Adicionando ID e entidade
        />
      ),
      data: loadingAuditoria[item.id] ? "Carregando..." : auditoria ? `${auditoria.data} às ${auditoria.hora}` : "Desconhecido",
    };
  });

  const filteredData = selectedEntity
    ? apresentaDados.filter(item => item.entidade === selectedEntity)
    : apresentaDados;

  const handleStatusUpdate = async (id, newStatus, entidade) => {
    console.log('ID:', id, 'Entidade:', entidade); // Verifique os valores aqui

    if (!id || !entidade) {
      console.error('ID ou entidade indefinidos:', id, entidade);
      return;
    }

    let url;
    switch (newStatus) {
      case '1':
        url = `https://localhost:7256/api/${entidade}/${id}/EmAnalise`;
        break;
      case '2':
        url = `https://localhost:7256/api/${entidade}/${id}/Aprovar`;
        break;
      case '3':
        url = `https://localhost:7256/api/${entidade}/${id}/Reprovar`;
        break;
      case '4':
        url = `https://localhost:7256/api/${entidade}/${id}/Desativar`;
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
      await fetchAuditoria(id, entidade);
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
              object={filteredData} // Usar dados filtrados
              colunas={["ID", "Nome", "Autor", "Entidade", "Status", "Data"]}
              currentPage={1}
              totalPages={1} // Ajuste conforme necessário
              goToPage={() => { }}
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