import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import SidebarAdm from '../../components/admin/sidebarAdm';
import NavBarAdm from '../../components/admin/navbarAdm';
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

function TipoAtracao() {

  const baseUrl = "https://localhost:7256/api/TipoAtracao";

  const [data, setData] = useState([])

  const [atualizarData, setAtualizarData] = useState(true)

  const [modalInserir, setModalInserir] = useState(false)

  const [modalEditar, setModalEditar] = useState(false)

  const [modalDeletar, setModalDeletar] = useState(false)

  const [tipoatracaoNome, setTipoAtracaoNome] = useState("")

  const [tipoatracaoId, setTipoAtracaoId] = useState("")

  const [tipoatracaoSelecionado, setTipoAtracaoSelecionado] = useState({
    id: '',
    nome: ''
  });


  const TipoAtracaoSet = (tipoatracao, opcao) => {
    setTipoAtracaoNome(tipoatracao.nome)
    setTipoAtracaoId(tipoatracao.id)
    setTipoAtracaoSelecionado(tipoatracao.id)

    if (opcao === "Editar") {
      abrirFecharModalEditar();
    }
    else {
      abrirFecharModalDeletar();
    }
  }

  const abrirFecharModalInserir = () => {
    setModalInserir(!modalInserir)
  }

  const abrirFecharModalEditar = () => {
    setModalEditar(!modalEditar)
  }

  const abrirFecharModalDeletar = () => {
    setModalDeletar(!modalDeletar)
  }

  const pedidoGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }
   
  const atualizarListaTipoAtracao = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }


  const pedidoPost = async () => {
    delete tipoatracaoSelecionado.id
    await axios.post(baseUrl, { nome: tipoatracaoNome })
      .then(response => {
        setData(data.concat(response.data));
        abrirFecharModalInserir();
      }).catch(error => {
        console.log(error);
      })
  }

  async function pedidoAtualizar() {
    console.log("Id que chegou: ", tipoatracaoId);
    try {
      const response = await axios.put(`${baseUrl}/${tipoatracaoId}`, {
        nome: tipoatracaoNome
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
    } catch (error) {
      console.log(error);
    }
  }



  const pedidoDeletar = async () => {
    await axios.delete(baseUrl + "/" + tipoatracaoId)
      .then(response => {
        setData(data.filter(tipoatracao => tipoatracao.id !== response.data));
        atualizarListaTipoAtracao ();
        abrirFecharModalDeletar();
      }).catch(error => {
        console.log(error);
      })
  }


  useEffect(() => {
    if (atualizarData) {
      pedidoGet();
      setAtualizarData(false);
    }
  }, [atualizarData])

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

  return (
    <div className="h-screen flex">
    <SidebarAdm />
    <div className="flex-2 container-fluid">
      <NavBarAdm />
      <div className="pl-8 pr-8 pt-[20px]">
          <h1 className="text-3xl font-semibold pb-2">Lista de Tipo Atração</h1>
          <hr className="pb-4 border-[2.5px] border-[#DBDBDB]" />
          <div className="w-full rounded-[10px]  border-[#DBDBDB] ">
            <div className="grid grid-cols-4 w-full bg-[#DBDBDB] rounded-t-[8px] h-10 items-center text-base font-semibold text-black">
              <span className="flex ml-5 items-center">ID</span>
              <span className="flex justify-center items-center">Nome</span>
            </div>

            
            <ul className="w-full">
            {currentItems.map(tipoatracao => (
              <React.Fragment key={tipoatracao.id}>
                <li className="grid grid-cols-4 w-full bg-[#F5F5F5]">
                  <span scope="row" className="flex pl-5 border-r-[1px] border-t-[1px] border-[#DBDBDB] pt-[12px] pb-[12px] text-gray-700">{tipoatracao.id}</span>
                  <span className="flex justify-left items-center pl-2 border-t-[1px] border-r-[1px] border-[#DBDBDB] text-gray-700 ">{tipoatracao.nome.length > 25 ? tipoatracao.nome.substring(0, 25) + '...' : tipoatracao.nome}</span>
                  <span className="flex items-center justify-center border-t-[1px] gap-2 border-[#DBDBDB]">
                   
                   
                    <button className="text-white bg-teal-800 hover:bg-teal-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                      onClick={() => TipoAtracaoSet(tipoatracao, "Editar")}>
                      Editar
                    </button>

                    <button className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      onClick={() => TipoAtracaoSet(tipoatracao, "Excluir")}>
                      Excluir
                    </button>

                    <button className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => TipoAtracaoSet(tipoatracao, "Visualizar")}>
                      Visualizar
                    </button>

                  </span>
                </li>
              </React.Fragment>
            ))}
          </ul>

          <div className="pt-4 pb-4 flex justify-center gap-2 border-t-[1px] border-[#DBDBDB]">
              <button
                className=""
                onClick={() => goToPage(currentPage - 1)}
              >
                <CaretLeft size={22} className="text-[#DBDBDB]" />
              </button>
              <select
                className="rounded-sm hover:border-[#DBDBDB] select-none"
                value={currentPage}
                onChange={(e) => goToPage(Number(e.target.value))}
              >
                {[...Array(totalPages)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <button
                className=""
                onClick={() => goToPage(currentPage + 1)}
              >
                <CaretRight size={22} className="text-[#DBDBDB]" />
              </button>
            </div>
          </div>
          <div className="float-right flex-auto py-6">
            <button className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
              onClick={() => abrirFecharModalInserir()}
            >Cadastrar</button>
          </div>
        </div>
      </div>
            

            
                      <Modal isOpen={modalInserir}>
                        <ModalHeader>Incluir Tipo Atração</ModalHeader>
                        <ModalBody>
                          <div className="form-group">
                            <label>Nome: </label>
                            <br />
                            <input type="text" className="form-control" onChange={(e) => setTipoAtracaoNome(e.target.value)} />
                            <br />
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <button className="btn btn-primary" onClick={() => pedidoPost()}>Cadastrar</button>{"  "}
                          <button className="btn btn-danger" onClick={() => abrirFecharModalInserir()}>Cancelar</button>
                        </ModalFooter>
                      </Modal>
                      <Modal isOpen={modalEditar}>
                        <ModalHeader>Editar Tipo Atração</ModalHeader>
                        <ModalBody>
                          <div className="form-group">
                            <label>ID: </label><br />
                            <input type="text" className="form-control" readOnly value={tipoatracaoId} /> <br />

                            <label>Nome:</label>
                            <input type="text" className="form-control" name="tipoatracaoNome" onChange={(e) => setTipoAtracaoNome(e.target.value)}
                              value={tipoatracaoNome} />
                            <br />
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <button className="btn btn-primary" onClick={() => pedidoAtualizar()}>Alterar</button>{"  "}
                          <button className="btn btn-danger" onClick={() => abrirFecharModalEditar()}>Cancelar</button>
                        </ModalFooter>
                      </Modal>
                      <Modal isOpen={modalDeletar}>
                        <ModalBody>
                          <label>Confirma a exclusão deste tipo Atração : {tipoatracaoNome} ?</label>
                        </ModalBody>
                        <ModalFooter>
                          <button className='btn btn-primary' onClick={() => pedidoDeletar()}>Sim</button>
                          <button className='btn btn-danger' onClick={() => abrirFecharModalDeletar()}>Não</button>
                        </ModalFooter>
                      </Modal>
                    </div>


  );
}

export default TipoAtracao