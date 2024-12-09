import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import SidebarAdm from "../../components/admin/sidebarAdm.jsx";
import NavBarAdm from "../../components/admin/navbarAdm.jsx";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Tabela from "../../components/table/tabela.jsx";
import BtnAcao from "../../components/botoes/btnAcao.jsx";
import BtnModais from "../../components/botoes/btnModais.jsx";
import PopupExcluido from "../../components/popups/popupExcluido.jsx";
import PopupEditado from "../../components/popups/popupEditado.jsx";
import PopupCadastrado from "../../components/popups/popupCadastro.jsx";
import FilterSelect from "../../components/filter/FilterSelect.jsx";


function TipoAtracao() {
  const baseUrl = "https://localhost:7256/api/TipoAtracao";

  const [data, setData] = useState([]);
  const [atualizarData, setAtualizarData] = useState(true);

  const [modalInserir, setModalInserir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);

  const [modalCadastrado, setModalCadastrado] = useState(false);
  const [modalExcluido, setModalExcluido] = useState(false);
  const [modalEditado, setModalEditado] = useState(false);

  const [tipoatracaoNome, setTipoAtracaoNome] = useState("");
  const [tipoatracaoId, setTipoAtracaoId] = useState("");
  const [tipoatracaoStatus, setTipoAtracaoStatus] = useState(1); // Definindo o status como 1 por padrão
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userType, setUserType] = useState(null);

  const [tipoatracaoSelecionado, setTipoAtracaoSelecionado] = useState({
    id: "",
    nome: "",
    status: 1
  });

  const navigate = useNavigate();

  const TipoAtracaoSet = (tipoatracao, opcao) => {
    setTipoAtracaoNome(tipoatracao.nome);
    setTipoAtracaoId(tipoatracao.id);
    setTipoAtracaoStatus(tipoatracao.status);
    setTipoAtracaoSelecionado(tipoatracao.id);


    if (opcao === "Editar") {
      abrirFecharModalEditar();
    } else {
      abrirFecharModalDeletar();
    }
  };

  const toggleModalCadastro = () => setModalCadastrado(!modalCadastrado);
  const toggleModalEdita = () => setModalEditado(!modalEditado);
  const toggleModalExclui = () => setModalExcluido(!modalExcluido);

  const abrirFecharModalInserir = () => {
    setModalInserir(!modalInserir);
  };

  const abrirFecharModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirFecharModalDeletar = () => {
    setModalDeletar(!modalDeletar);
  };

  const pedidoGet = async () => {
    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const pedidoPost = async () => {
    try {
      const response = await axios.post(baseUrl, {
        nome: tipoatracaoNome,
        idUsuario: userType,
        status: 1 // Garante que todos os novos registros terão status = 1
      });
      setData(data.concat(response.data));
      abrirFecharModalInserir();
      toggleModalCadastro();
    } catch (error) {
      console.error("Erro ao cadastrar tipo de atração:", error);
    }
  };

  const pedidoAtualizar = async () => {
    try {
      const response = await axios.put(`${baseUrl}/${tipoatracaoId}`, {
        nome: tipoatracaoNome,
      });

      const updatedTipoAtracao = response.data;

      setData((prevData) =>
        prevData.map((tipoatracao) =>
          tipoatracao.id === tipoatracaoId ? updatedTipoAtracao : tipoatracao
        )
      );

      abrirFecharModalEditar();
      toggleModalEdita();
    } catch (error) {
      console.error("Erro ao editar tipo de atração:", error);
    }
  };

  const pedidoDeletar = async () => {
    try {
      await axios.delete(`${baseUrl}/${tipoatracaoId}`);
      setData(data.filter((tipoatracao) => tipoatracao.id !== tipoatracaoId));
      abrirFecharModalDeletar();
      toggleModalExclui();
    } catch (error) {
      console.error("Erro ao deletar tipo de atração:", error);
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


  const statusOptions = [
    { value: '', label: 'Todos' },
    { value: '1', label: 'Em Análise' },
    { value: '2', label: 'Aprovado' },
    { value: '3', label: 'Reprovado' },
    { value: '4', label: 'Desativado' }
  ];

  const statusColors = {
    1: "bg-gray-800 text-white", // cinza para Em Análise
    2: "bg-[#009688] text-white", // verde escuro para Aprovado
    3: "bg-[#FF6B6B] text-white", // Vermelho claro para Reprovado
    4: "bg-gray-400 text-white", // Cinza claro para Desativado
  };

  const apresentaDados = (data) => {
    return data.map((tipoatracao) => ({
      id: tipoatracao.id,
      nome: tipoatracao.nome,
      status: (
        <div className={`px-3 py-1 rounded-md ${statusColors[tipoatracao.status]}`}>
          {statusOptions.find(option => option.value === tipoatracao.status.toString())?.label}
        </div>
      ),
      acoes: (
        <div className="flex items-center justify-center border-t-[1px] gap-2 border-gray-100 py-2">
          <BtnAcao
            funcao={() => TipoAtracaoSet(tipoatracao, "Editar")}
            acao="Editar"
          />
          <BtnAcao
            funcao={() => TipoAtracaoSet(tipoatracao, "Excluir")}
            acao="Excluir"
          />
        </div>
      ),
    }));
  };




  const [filtroStatus, setFiltroStatus] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleFiltroStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setFiltroStatus(selectedStatus);
  };

  const filterData = () => {
    if (filtroStatus === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => item.status === parseInt(filtroStatus, 10));
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    filterData();
  }, [filtroStatus, data]);
  const filteredAndFormattedData = apresentaDados(filteredData);

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
            <div className="flex w-full justify-between">
              <h1 className="w-fit text-3xl font-semibold pb-2"> Lista de Tipos de Atrações </h1>
              <FilterSelect
                id="filtroStatus"
                label="Filtro Status"
                options={statusOptions}
                value={filtroStatus}
                onChange={handleFiltroStatusChange}
              />

            </div>
            <hr className="pb-4 border-[2.5px] border-gray-300" />
            <Tabela
              object={filteredAndFormattedData}
              colunas={["ID", "Nome", "Status", "Ações"]}
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={setCurrentPage}
              numColunas={4}
            />

            <div className="inline-flex float-right  py-6">
              <BtnAcao
                funcao={() => abrirFecharModalInserir("Cadastrar")}
                acao="Cadastrar"
              />

              <BtnAcao
                funcao={() => navigate(`/atracao`)}
                acao="CadastrarTipo"
                objeto="Atração"
              />
            </div>
          </div>
        </div>

        <Modal isOpen={modalInserir}>
          <ModalHeader>Cadastrar Tipo de Atração</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nome: </label>
              <br />
              <input
                type="text"
                className="form-control"
                onChange={(e) => setTipoAtracaoNome(e.target.value)}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <BtnModais funcao={() => pedidoPost()} acao="Cadastrar" />
            <BtnModais
              funcao={() => abrirFecharModalInserir()}
              acao="Cancelar"
            />
          </ModalFooter>
        </Modal>
        <PopupCadastrado
          isOpen={modalCadastrado}
          toggle={toggleModalCadastro}
          objeto="Tipo de Atração"
        />
        <Modal isOpen={modalEditar}>
          <ModalHeader>Editar Tipo de Atração</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nome: </label>
              <br />
              <input
                type="text"
                className="form-control"
                value={tipoatracaoNome}
                onChange={(e) => setTipoAtracaoNome(e.target.value)}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <BtnModais funcao={() => pedidoAtualizar()} acao="Editar" />
            <BtnModais
              funcao={() => abrirFecharModalEditar()}
              acao="Cancelar"
            />
          </ModalFooter>
        </Modal>
        <PopupEditado
          isOpen={modalEditado}
          toggle={toggleModalEdita}
          objeto="Tipo de Atração"
        />
        <Modal isOpen={modalDeletar}>
          <ModalHeader>Excluir Tipo de Atração</ModalHeader>
          <ModalBody>
            Confirma a exclusão deste Tipo de Atração: {tipoatracaoNome}?
          </ModalBody>
          <ModalFooter>
            <BtnModais funcao={() => pedidoDeletar()} acao="Excluir" />
            <BtnModais
              funcao={() => abrirFecharModalDeletar()}
              acao="Cancelar"
            />
          </ModalFooter>
        </Modal>
        <PopupExcluido
          isOpen={modalExcluido}
          toggle={toggleModalExclui}
          objeto="Tipo de Atração"
        />
      </div >
    );
  }
}

export default TipoAtracao;
