import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import axios from 'axios'
import "../tipoturismo/index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import SidebarAdm from "../../components/admin/sidebarAdm";
import NavbarAdm from "../../components/admin/navbarAdm";
import {
    CaretLeft,
    CaretRight,
    Pencil,
    Trash,
    Eye,
    FilePlus,
} from "@phosphor-icons/react";

function TipoTurismo() {

    const baseUrl = "https://localhost:7256/api/TipoTurismo";

    const [data, setData] = useState([])

    const [atualizarData, setAtualizarData] = useState(true)

    const [modalInserir, setModalInserir] = useState(false)

    const [modalEditar, setModalEditar] = useState(false)

    const [modalDeletar, setModalDeletar] = useState(false)

    const [tipoturismoNome, setTipoTurismoNome] = useState("")

    const [tipoturismoId, setTipoTurismoId] = useState("")

    const [tipoturismoSelecionado, setTipoTurismoSelecionado] = useState({
        id: '',
        nome: ''
    });


    const TipoTurismoSet = (tipoturismo, opcao) => {
        setTipoTurismoNome(tipoturismo.nome)
        setTipoTurismoId(tipoturismo.id)

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

    const atualizarListaTipoTurismo = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const pedidoPost = async () => {
        delete tipoturismoSelecionado.id
        await axios.post(baseUrl, { nome: tipoturismoNome })
            .then(response => {
                setData(data.concat(response.data));
                abrirFecharModalInserir();
            }).catch(error => {
                console.log(error);
            })
    }

    async function pedidoAtualizar() {
        console.log("Id que chegou: ", tipoturismoId);
        try {
            const response = await axios.put(`${baseUrl}/${tipoturismoId}`, {
                nome: tipoturismoNome
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
        await axios.delete(baseUrl + "/" + tipoturismoId)
            .then(response => {
                setData(data.filter(tipoturismo => tipoturismo.id !== response.data));
                atualizarListaTipoTurismo();
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
                <NavbarAdm />
                <div className="pl-8 pr-8 pt-[20px]">
                    <h1 className="text-3xl font-semibold pb-2">Lista de Tipo Turismo</h1>
                    <hr className="pb-4 border-[2.5px] border-[#DBDBDB]" />
                    <div className="w-full rounded-[10px]  border-[#DBDBDB] ">
                        <div className="grid grid-cols-3 w-full bg-[#DBDBDB] rounded-t-[8px] h-10 items-center text-base font-semibold text-black">
                            <span className="flex ml-5 items-center">ID</span>
                            <span className="flex justify-center items-center">Nome</span>
                            <span className="flex justify-center items-center">Ações</span>
                        </div>


                        <ul className="w-full">
                            {currentItems.map(tipoturismo => (
                                <React.Fragment key={tipoturismo.id}>
                                    <li className="grid grid-cols-3 w-full bg-[#F5F5F5]">
                                        <span scope="row" className="flex pl-5 border-r-[1px] border-t-[1px] border-[#DBDBDB] pt-[12px] pb-[12px] text-gray-700">{tipoturismo.id}</span>
                                        <span className="flex justify-left items-center pl-2 border-t-[1px] border-r-[1px] border-[#DBDBDB] text-gray-700 ">{tipoturismo.nome.length > 25 ? tipoturismo.nome.substring(0, 25) + '...' : tipoturismo.nome}</span>
                                        <span className="flex items-center justify-center border-t-[1px] gap-2 border-[#DBDBDB]">


                                            <button className="text-white bg-teal-800 hover:bg-teal-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                                                onClick={() => TipoTurismoSet(tipoturismo, "Editar")}>
                                                <Pencil className="mr-1" size={16} />
                                                Editar
                                            </button>

                                            <button className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                                onClick={() => TipoTurismoSet(tipoturismo, "Excluir")}>
                                                <Trash className="mr-1" size={16} />
                                                Excluir
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
                        <input type="text" className="form-control text-sm" 
                        placeholder='Digite o Tipo de Turismo'
                        onChange={(e) => setTipoTurismoNome(e.target.value)} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btncadastrarmodal" onClick={() => pedidoPost()}>Cadastrar</button>{"  "}
                    <button className="btn btncancelarmodal" onClick={() => abrirFecharModalInserir()}>Cancelar</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Tipo Turismo</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID: </label><br />
                        <input type="text" className="form-control text-sm"
                         readOnly value={tipoturismoId} /> <br />

                        <label>Nome:</label>
                        <input type="text" className="form-control" name="tipoturismoNome" onChange={(e) => setTipoTurismoNome(e.target.value)}
                            value={tipoturismoNome} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btnmodalverde  text-white" onClick={() => pedidoAtualizar()}>Alterar</button>{"  "}
                    <button className="btn btnmodalcinza  text-white" onClick={() => abrirFecharModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalDeletar}>
                <ModalBody>
                    <label> Confirma a exclusão deste tipo Turismo : {tipoturismoNome} ?</label>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btnmodalverde  text-white' onClick={() => pedidoDeletar()}>Sim</button>
                    <button className='btn btnmodalcinza  text-white' onClick={() => abrirFecharModalDeletar()}>Não</button>
                </ModalFooter>
            </Modal>




        </div>





    );
}

export default TipoTurismo