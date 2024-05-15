import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import axios from "axios";
import "../turismo/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarAdm from "../../components/admin/sidebarAdm";
import NavBarAdm from "../../components/admin/navbarAdm";
import {
  FilePlus,
} from "@phosphor-icons/react";
import Tabela from "../../components/table/tabela";
import BtnAcao from "../../components/botoes/btnAcao";

function TipoTurismo() {
  const baseUrl = "https://localhost:7256/api/TipoTurismo";

  const [data, setData] = useState([]);

  const [atualizarData, setAtualizarData] = useState(true);

  const [modalInserir, setModalInserir] = useState(false);

  const [modalEditar, setModalEditar] = useState(false);

  const [modalDeletar, setModalDeletar] = useState(false);

  const [tipoturismoNome, setTipoTurismoNome] = useState("");

  const [tipoturismoId, setTipoTurismoId] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [userType, setUserType] = useState(null);

  const [tipoturismoSelecionado, setTipoTurismoSelecionado] = useState({
    id: "",
    nome: "",
  });

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
      .post(baseUrl, { nome: tipoturismoNome })
      .then((response) => {
        setData(data.concat(response.data));
        abrirFecharModalInserir();
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

  useEffect(() => {
    const userTypeFromLocalStorage = localStorage.getItem("tipoUsuario");
    setUserType(userTypeFromLocalStorage);
  }, []);

  const apresentaDados = Array.isArray(currentItems)
    ? currentItems.map((tipoturismo) => {
        return {
          id: tipoturismo.id,
          nome: tipoturismo.nome,
          status: "teste",
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
              <BtnAcao
                funcao={() => TipoTurismoSet(tipoturismo, "Visualizar")}
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
            <div className="float-right flex-auto py-6">
              <button
                className="text-white bg-yellow-400 hover:bg-yellow-500 
               rounded-xl text-lg px-3 font-semibold py-1.5 text-center"
                onClick={() => abrirFecharModalInserir()}
              >
                <span className="inline-flex items-center">
                  <FilePlus className="mr-1" size={24} />
                  Cadastrar
                </span>
              </button>
            </div>
          </div>
        </div>

        <Modal isOpen={modalInserir}>
          <ModalHeader>Incluir Tipo Turismo</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nome: </label>
              <br />
              <input
                type="text"
                className="form-control text-sm"
                placeholder="Digite o Tipo de Turismo"
                onChange={(e) => setTipoTurismoNome(e.target.value)}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btncadastrarmodal"
              onClick={() => pedidoPost()}
            >
              Cadastrar
            </button>
            {"  "}
            <button
              className="btn btncancelarmodal"
              onClick={() => abrirFecharModalInserir()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
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
            <button
              className="btn btnmodalverde  text-white"
              onClick={() => pedidoAtualizar()}
            >
              Alterar
            </button>
            {"  "}
            <button
              className="btn btnmodalcinza  text-white"
              onClick={() => abrirFecharModalEditar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modalDeletar}>
          <ModalBody>
            <label>
              {" "}
              Confirma a exclusão deste tipo Turismo : {tipoturismoNome} ?
            </label>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btnmodalverde  text-white"
              onClick={() => pedidoDeletar()}
            >
              Sim
            </button>
            <button
              className="btn btnmodalcinza  text-white"
              onClick={() => abrirFecharModalDeletar()}
            >
              Não
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default TipoTurismo;