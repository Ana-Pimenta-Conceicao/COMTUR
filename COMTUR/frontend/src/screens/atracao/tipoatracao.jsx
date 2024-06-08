import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import SidebarAdm from "../../components/admin/sidebarAdm.jsx";
import NavBarAdm from "../../components/admin/navbarAdm.jsx";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { Navigate, useNavigate } from "react-router-dom";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import Tabela from "../../components/table/tabela.jsx";
import BtnAcao from "../../components/botoes/btnAcao.jsx";
import BtnModais from "../../components/botoes/btnModais.jsx";
import PopupExcluido from "../../components/popups/popupExcluido.jsx";
import PopupEditado from "../../components/popups/popupEditado.jsx";
import PopupCadastrado from "../../components/popups/popupCadastro.jsx";

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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userType, setUserType] = useState(null);
  const [tipoatracaoSelecionado, setTipoAtracaoSelecionado] = useState({
    id: "",
    nome: "",
  });

  const navigate = useNavigate();

  const TipoAtracaoSet = (tipoatracao, opcao) => {
    setTipoAtracaoNome(tipoatracao.nome);
    setTipoAtracaoId(tipoatracao.id);
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
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const atualizarListaTipoAtracao = async () => {
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
    delete tipoatracaoSelecionado.id;
    await axios
      .post(baseUrl, { nome: tipoatracaoNome })
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
    console.log("Id que chegou: ", tipoatracaoId);
    try {
      const response = await axios.put(`${baseUrl}/${tipoatracaoId}`, {
        nome: tipoatracaoNome,
      });

      const updatedTipoAtracao = response.data;

      setData((prevData) => {
        return prevData.map((tipoatracao) => {
          if (tipoatracao.id === tipoatracaoId) {
            return updatedTipoAtracao;
          }
          return tipoatracao;
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
      .delete(baseUrl + "/" + tipoatracaoId)
      .then((response) => {
        setData(data.filter((tipoatracao) => tipoatracao.id !== response.data));
        atualizarListaTipoAtracao();
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
  const itemsPerPage = 9;
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

  useEffect(() => {
    const userTypeFromLocalStorage = localStorage.getItem("tipoUsuario");
    setUserType(userTypeFromLocalStorage);
  }, []);

  const apresentaDados = Array.isArray(currentItems)
    ? currentItems.map((tipoatracao) => {
        return {
          id: tipoatracao.id,
          nome: tipoatracao.nome,
          status: "teste",
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
              <BtnAcao
                funcao={() => TipoAtracaoSet(tipoatracao, "Visualizar")}
                acao="Visualizar"
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
              Lista de Tipos de Atrações
            </h1>
            <hr className="pb-4 border-[2.5px] border-gray-300" />
            <Tabela
              object={apresentaDados}
              colunas={["ID", "Nome", "Status", "Ações"]}
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={setCurrentPage}
              numColunas={4}
            />

            <div className="float-right flex-auto py-6">
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
              <label>ID: </label>
              <br />
              <input
                type="text"
                className="form-control"
                readOnly
                value={tipoatracaoId}
              />{" "}
              <br />
              <label>Nome:</label>
              <input
                type="text"
                className="form-control"
                name="tipoatracaoNome"
                onChange={(e) => setTipoAtracaoNome(e.target.value)}
                value={tipoatracaoNome}
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
          <ModalBody>
            <label>Confirma a exclusão de "{tipoatracaoNome}" ?</label>
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
      </div>
    );
  }
}

export default TipoAtracao;
