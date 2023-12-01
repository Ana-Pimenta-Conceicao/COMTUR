import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../../components/sidebar';
import NavBar from '../../components/navbar';
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import React from 'react';
import InputMask from 'react-input-mask';

export default function Empresario() {

    const baseUrl = "https://localhost:7256/api/Empresario";

    const [data, setData] = useState([])

    const [atualizarData, setAtualizarData] = useState(true)

    const [modalInserir, setModalInserir] = useState(false)

    const [modalEditar, setModalEditar] = useState(false)

    const [modalDeletar, setModalDeletar] = useState(false)

    const [empresarioNome, setEmpresarioNome] = useState("")

    const [empresarioEmail, setEmpresarioEmail] = useState("")

    const [empresarioSenha, setEmpresarioSenha] = useState("")

    // const [empresarioTelefone, setEmpresarioTelefone] = useState("")

    const [empresarioTelefone, setEmpresarioTelefone] = useState("");

    const [empresarioId, setEmpresarioId] = useState("")


    const [selecionarEmpresario, setSelecionarEmpresario] = useState({
        id: "",
        nome: "",
        email: "",
        senha: "",
        telefone: ""
    })

    const EmpresarioSet = (empresario, opcao) => {
        console.log("Empresario: ", empresario);
        setEmpresarioId(empresario.id)
        setEmpresarioNome(empresario.nome)
        setEmpresarioEmail(empresario.emailEmpresario)
        setEmpresarioSenha(empresario.senhaEmpresario)
        setEmpresarioTelefone(empresario.telefoneEmpresario)

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

    const atualizarListaEmpresarios = async () => {
        await axios.get(baseUrl)
          .then(response => {
            setData(response.data);
          }).catch(error => {
            console.log(error);
          })
      }

    const pedidoPost = async () => {
        delete selecionarEmpresario.id
        await axios.post(baseUrl, { nome: empresarioNome, emailEmpresario: empresarioEmail, senhaEmpresario: empresarioSenha, telefoneEmpresario: empresarioTelefone })
            .then(response => {
                setData(data.concat(response.data));
                abrirFecharModalInserir();
            }).catch(error => {
                console.log(error);
            })
    }

    async function pedidoAtualizar() {
        console.log("Id que chegou: ", empresarioId);
        try {
            const response = await axios.put(`${baseUrl}/${empresarioId}`, {
                nome: empresarioNome,
                emailEmpresario: empresarioEmail,
                senhaEmpresario: empresarioSenha,
                telefoneEmpresario: empresarioTelefone
            });

            const updatedEmpresario = response.data;

            setData((prevData) => {
                return prevData.map((empresario) => {
                    if (empresario.id === empresarioId) {
                        return updatedEmpresario;
                    }
                    return empresario;
                });
            });

            abrirFecharModalEditar();
        } catch (error) {
            console.log(error);
        }
    }

    const pedidoDeletar = async () => {
        await axios.delete(baseUrl + "/" + empresarioId)
            .then(response => {
                const newEmpresarios = data.filter(empresario => empresario.id !== response.data);
                setData(newEmpresarios);
                atualizarListaEmpresarios();
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

    return (
        <div className="h-screen flex">
            <Sidebar />
            <div className="flex-2 container-fluid">
                <NavBar />
                <h1 className="text-2xl pb-10 font-semibold">Lista de Empresários</h1>
                <div className="flex relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-200 dark:text-gray-800">
                            <tr>
                                <th scope="col" className="p-3">Id</th>
                                <th scope="col" className="px-6 py-3">Nome</th>
                                <th scope="col" className="px-6 py-3">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(empresario => (
                                <tr className="bg-white border-b dark:bg-slate-100" key={empresario.id}>
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-800">{empresario.id}</td>
                                    <td class="px-6 py-4">{empresario.nome}</td>
                                    <td>
                                        <button className="text-white bg-teal-800 hover:bg-teal-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={() => EmpresarioSet(empresario, "Editar")}>
                                            <svg width="19" height="19" style={{ padding: 3 }} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.6471 3.29931L14.8235 6.47578M9.52941 18.1228H18M16.5028 4.79649L4.67521 16.6241C4.38735 16.912 4.02667 17.1162 3.63173 17.2149V17.2149C1.98673 17.6262 0.496683 16.1361 0.907934 14.4911V14.4911C1.00667 14.0962 1.21088 13.7355 1.49874 13.4476L13.3264 1.62002C13.7235 1.22302 14.262 1 14.8235 1C15.3851 1 15.9236 1.22302 16.3207 1.62002L16.5028 1.80214C16.8998 2.19925 17.1228 2.73779 17.1228 3.29931C17.1228 3.86084 16.8998 4.39937 16.5028 4.79649Z" stroke="#F3F3F3" stroke-width="1.33257" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            Editar
                                        </button>
                                        {"  "}

                                        <button className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                            onClick={() => EmpresarioSet(empresario, "Excluir")}>
                                            <svg width="23" height="18" style={{ padding: 3 }} viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.2423 11.9046C21.6434 12.3029 21.6438 12.9516 21.2431 13.3504L20.883 13.7088C20.2842 14.3048 20.2842 15.2739 20.883 15.8699L21.244 16.2292C21.6446 16.6279 21.6453 17.2762 21.2457 17.6758V17.6758C20.846 18.0755 20.1978 18.0747 19.799 17.6741L19.4397 17.3131C18.8438 16.7144 17.8746 16.7144 17.2787 17.3131L16.9202 17.6733C16.5214 18.0739 15.8728 18.0736 15.4744 17.6724V17.6724C15.0788 17.2739 15.0799 16.6305 15.477 16.2334L15.8399 15.8705C16.437 15.2734 16.437 14.3053 15.8399 13.7082L15.4778 13.3461C15.0807 12.949 15.0807 12.3051 15.4778 11.908V11.908C15.875 11.5109 16.5188 11.5109 16.916 11.908L17.278 12.2701C17.8752 12.8672 18.8432 12.8672 19.4404 12.2701L19.8033 11.9071C20.2004 11.5101 20.8438 11.5089 21.2423 11.9046V11.9046ZM11.2195 4.5898C9.52639 4.5898 8.15965 5.95654 8.15965 7.64967C8.15965 9.34279 9.52639 10.7095 11.2195 10.7095C12.9126 10.7095 14.2794 9.34279 14.2794 7.64967C14.2794 5.95654 12.9126 4.5898 11.2195 4.5898ZM11.2195 13.2594C8.38696 13.2594 5.74916 12.0687 3.88556 10.0653C2.62138 8.70635 2.62052 6.59274 3.88457 5.23363C4.48274 4.59047 5.16578 4.02568 5.91827 3.55633C7.50856 2.56441 9.34524 2.03857 11.2195 2.03857C13.0938 2.03857 14.9305 2.56441 16.5208 3.55633C18.0188 4.49071 19.2416 5.80337 20.0675 7.35951C20.1639 7.54107 20.1642 7.75825 20.0679 7.9398V7.9398C19.8442 8.36118 20.0724 8.9046 20.5202 9.06913C20.5986 9.09794 20.6762 9.12836 20.753 9.16041C21.1759 9.33704 21.6884 9.22301 21.9016 8.81726C22.0071 8.61659 22.1072 8.4121 22.202 8.20412C22.3627 7.8517 22.3638 7.44701 22.2039 7.09423C20.3085 2.91199 16.1058 0 11.2195 0C6.96109 0 3.22182 2.21176 1.07657 5.54853C0.254872 6.82662 0.254872 8.47271 1.07657 9.7508C3.22182 13.0876 6.96109 15.2993 11.2195 15.2993C11.4194 15.2993 11.6161 15.2993 11.8114 15.2904C12.0617 15.2789 12.2395 15.0399 12.2395 14.7894V14.7894C12.2395 14.6571 12.244 14.526 12.2528 14.3961C12.293 13.8028 11.8142 13.2594 11.2195 13.2594V13.2594Z" fill="#F3F3F3" />
                                            </svg>
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="float-right flex-auto py-32">
                    <button className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                        onClick={() => abrirFecharModalInserir()}
                    >Cadastrar</button>
                </div>
            </div>
            <Modal isOpen={modalInserir}>
                <ModalHeader>Cadastrar Empresario</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nome: </label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setEmpresarioNome(e.target.value)} />
                        <br />
                        <label>Email:</label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setEmpresarioEmail(e.target.value)} />
                        <br />
                        <label>Senha:</label>
                        <br />
                        <input type="password" className="form-control" onChange={(e) => setEmpresarioSenha(e.target.value)} />
                        <br />
                        <label>Telefone:</label>
                        <br />
                        <InputMask
                            mask="(99) 99999-9999"
                            placeholder="Digite o telefone"
                            value={empresarioTelefone}
                            onChange={(e) => setEmpresarioTelefone(e.target.value)}
                            className="form-control" // Adiciona a classe para estilizar o campo
                            style={{ border: '1px solid #ccc' }} // Adiciona uma borda ao campo
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn bg-yellow-400 text-white hover:bg-yellow-500" onClick={() => pedidoPost()}>Cadastrar</button>{"  "}
                    <button className="btn bg-gray-400 hover:bg-gray-600 text-white" onClick={() => abrirFecharModalInserir()}>Cancelar</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Empresário</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID: </label><br />
                        <input type="text" className="form-control" readOnly value={empresarioId} /> <br />

                        <label>Nome:</label>
                        <input type="text" className="form-control" name="empresarioNome" onChange={(e) => setEmpresarioNome(e.target.value)}
                            value={empresarioNome} />
                        <br />
                        <label>Email:</label>
                        <br />
                        <input type="text" className="form-control" name="empresarioEmail" onChange={(e) => setEmpresarioEmail(e.target.value)}
                            value={empresarioEmail} />
                        <br />
                        <br />
                        <label>Senha:</label>
                        <br />
                        <input type="password" className="form-control" name="empresarioSenha" onChange={(e) => setEmpresarioSenha(e.target.value)}
                            value={empresarioSenha} />
                        <br />
                        <br />
                        <label>Telefone:</label>
                        <br />
                        <InputMask
                            mask="(99) 99999-9999"
                            placeholder="Digite o telefone"
                            value={empresarioTelefone}
                            onChange={(e) => setEmpresarioTelefone(e.target.value)}
                            className="form-control"
                            style={{ border: '1px solid #ccc' }}
                        />
                        <br/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn bg-teal-700 hover:bg-teal-900 text-white" onClick={() => pedidoAtualizar()}>Editar</button>{"  "}
                    <button className="btn bg-gray-400 hover:bg-gray-600 text-white" onClick={() => abrirFecharModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalDeletar}>
                <ModalBody>
                    Confirma a exclusão do empresário: {empresarioNome} ?
                </ModalBody>
                <ModalFooter>
                    <button className='btn bg-red-800 hover:bg-red-900 text-white' onClick={() => pedidoDeletar()}>Sim</button>
                    <button className='btn bg-gray-400 hover:bg-gray-600 text-white' onClick={() => abrirFecharModalDeletar()}>Não</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}