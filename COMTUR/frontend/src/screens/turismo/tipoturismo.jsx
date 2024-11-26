import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import axios from "axios";
import "../turismo/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarAdm from "../../components/admin/sidebarAdm.jsx";
import NavBarAdm from "../../components/admin/navbarAdm.jsx";
import Tabela from "../../components/table/tabela.jsx";
import BtnAcao from "../../components/botoes/btnAcao.jsx";
import BtnModais from "../../components/botoes/btnModais.jsx";
import PopupCadastrado from "../../components/popups/popupCadastro.jsx";
import PopupExcluido from "../../components/popups/popupExcluido.jsx";
import PopupEditado from "../../components/popups/popupEditado.jsx";

function TipoTurismo() {
  const baseUrl = "https://localhost:7256/api/TipoTurismo";

  const [data, setData] = useState([]);
  const [atualizarData, setAtualizarData] = useState(true);

  const [modalInserir, setModalInserir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);

  const [modalCadastrado, setModalCadastrado] = useState(false);
  const [modalExcluido, setModalExcluido] = useState(false);
  const [modalEditado, setModalEditado] = useState(false);

  const [tipoturismoNome, setTipoTurismoNome] = useState("");
  const [tipoturismoId, setTipoTurismoId] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userType, setUserType] = useState(null);
  const [idUsuario, setIdUsuario] = useState("");

  const [tipoturismoSelecionado, setTipoTurismoSelecionado] = useState({
    id: "",
    nome: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userTypeFromLocalStorage = localStorage.getItem("tipoUsuario");
    const idTipoUsuarioAPI = localStorage.getItem("id");
    setUserType(userTypeFromLocalStorage);
    setIdUsuario(idTipoUsuarioAPI);
  }, []);

  const toggleModalCadastro = () => setModalCadastrado(!modalCadastrado);
  const toggleModalEdita = () => setModalEditado(!modalEditado);
  const toggleModalExclui = () => setModalExcluido(!modalExcluido);

  const TipoTurismoSet = (tipoturismo, opcao) => {
    setTipoTurismoNome(tipoturismo.nome);
    setTipoTurismoId(tipoturismo.id);

    if (opcao === "Editar") {
      abrirFecharModalEditar();
    } else {
      abrirFecharModalDeletar();
    }
  };

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
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const atualizarListaTipoTurismo = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pedidoPost = async () => {
    delete tipoturismoSelecionado.id;

    await axios
      .post(baseUrl, {
        nome: tipoturismoNome,
        imagem: "teste",
        idUsuario: idUsuario,
        status: 1,
      })
      .then((response) => {
        setData(data.concat(response.data));
        abrirFecharModalInserir();
        toggleModalCadastro();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function pedidoAtualizar() {
    console.log("Id que chegou: ", tipoturismoId);
    try {
      const response = await axios.put(`${baseUrl}/${tipoturismoId}`, {
        nome: tipoturismoNome,
        imagem: "teste",
        idUsuario: idUsuario,
      });

      const updatedTipoTurismo = response.data;

      setData((prevData) => {
        return prevData.map((tipoturismo) => {
          if (tipoturismo.id === tipoturismoId) {
            return updatedTipoTurismo;
          }
          return tipoturismo;
        });
      });

      abrirFecharModalEditar();
      toggleModalEdita();
    } catch (error) {
      console.log(error);
    }
  }

  const pedidoDeletar = async () => {
    await axios
      .delete(baseUrl + "/" + tipoturismoId)
      .then((response) => {
        setData(data.filter((tipoturismo) => tipoturismo.id !== response.data));
        atualizarListaTipoTurismo();
        abrirFecharModalDeletar();
        toggleModalExclui();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (atualizarData) {
      pedidoGet();
      setAtualizarData(false);
    }
  }, [atualizarData]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Função para pegar uma parte específica da lista
  const getCurrentPageItems = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Renderiza os itens da página atual
  const currentItems = getCurrentPageItems(currentPage);

  // Funções para navegar entre as páginas
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const statusOptions = [
    { value: "", label: "Todos" },
    { value: "1", label: "Em Análise" },
    { value: "2", label: "Aprovado" },
    { value: "3", label: "Reprovado" },
    { value: "4", label: "Desativado" },
  ];

  const statusColors = {
    1: "bg-gray-800 text-white", // cinza para Em Análise
    2: "bg-[#009688] text-white", // verde escuro para Aprovado
    3: "bg-[#FF6B6B] text-white", // Vermelho claro para Reprovado
    4: "bg-gray-400 text-white", // Cinza claro para Desativado
  };

  useEffect(() => {
    const userTypeFromLocalStorage = localStorage.getItem("tipoUsuario");
    setUserType(userTypeFromLocalStorage);
  }, []);

  const apresentaDados = Array.isArray(currentItems)
    ? currentItems.map((tipoturismo) => {
        return {
          id: tipoturismo.id,
          nome: tipoturismo.nome,
          status: (
            <div
              className={`px-3 py-1 rounded-md ${
                statusColors[tipoturismo.status]
              }`}
            >
              {
                statusOptions.find(
                  (option) => option.value === tipoturismo.status.toString()
                )?.label
              }
            </div>
          ),
          acoes: (
            <div className="flex items-center justify-center border-t-[1px] gap-2 border-gray-100 py-2">
              <BtnAcao
                funcao={() => TipoTurismoSet(tipoturismo, "Editar")}
                acao="Editar"
              />
              <BtnAcao
                funcao={() => TipoTurismoSet(tipoturismo, "Excluir")}
                acao="Excluir"
              />
            </div>
          ),
        };
      })
    : [];

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
              Lista de Tipos de Turismo
            </h1>
            <hr className="pb-4 border-[2.5px] border-[#DBDBDB]" />
            <Tabela
              object={apresentaDados}
              colunas={["ID", "Nome", "Status", "Ações"]}
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={setCurrentPage}
              formatarData={""}
              numColunas={4}
            />
            <div className=" inline-flex float-right py-6">
              <BtnAcao
                funcao={() => abrirFecharModalInserir("Cadastrar")}
                acao="Cadastrar"
              />

              <BtnAcao
                funcao={() => navigate(`/turismo`)}
                acao="CadastrarTipo"
                objeto="Turismo"
              />
            </div>
          </div>
        </div>

        <Modal isOpen={modalInserir}>
          <ModalHeader>Cadastrar Tipo Turismo</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nome: </label>
              <br />
              <input
                type="text"
                className="form-control text-sm"
                placeholder="Digite o Nome"
                onChange={(e) => setTipoTurismoNome(e.target.value)}
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
          objeto="Tipo de Turismo"
        />
        <Modal isOpen={modalEditar}>
          <ModalHeader>Editar Tipo Turismo</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>ID: </label>
              <br />
              <input
                type="text"
                className="form-control text-sm"
                readOnly
                value={tipoturismoId}
              />{" "}
              <br />
              <label>Nome:</label>
              <input
                type="text"
                className="form-control"
                name="tipoturismoNome"
                onChange={(e) => setTipoTurismoNome(e.target.value)}
                value={tipoturismoNome}
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
          objeto="Tipo de Turismo"
        />

        <Modal isOpen={modalDeletar}>
          <ModalBody>
            <label>Confirma a exclusão de "{tipoturismoNome}" ?</label>
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
          objeto="Tipo de Turismo"
        />
      </div>
    );
  }
}

export default TipoTurismo;
