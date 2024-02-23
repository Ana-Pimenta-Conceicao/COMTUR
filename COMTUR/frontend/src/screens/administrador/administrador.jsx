import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import InputMask from 'react-input-mask';
import SidebarAdm from '../../components/sidebarAdm';
import NavBarAdm from '../../components/navbarAdm';
import { useNavigate } from 'react-router-dom';
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
0

export default function Administrador() {

    const baseUrl = "https://localhost:7256/api/Administrador";

    const [data, setData] = useState([])

    const [atualizarData, setAtualizarData] = useState(true)

    const [modalInserir, setModalInserir] = useState(false)
    const [modalEditar, setModalEditar] = useState(false)
    const [modalDeletar, setModalDeletar] = useState(false)

    const [nomeAdmin, setNomeAdmin] = useState("")
    const [cargoAdmin, setCargoAdmin] = useState("")
    const [cpfAdmin, setCpfAdmin] = useState("")
    const [telefoneAdmin, setTelefoneAdmin] = useState("")
    const [emailAdmin, setEmailAdmin] = useState("")
    const [senhaAdmin, setSenhaAdmin] = useState("")
    const [imagemAdmin, setImagemAdmin] = useState("")
    const [idAdmin, setIdAdmin] = useState("")

    const navigate = useNavigate();

    const limparDados = () => {
        setNomeAdmin("");
        setCargoAdmin("");
        setCpfAdmin("");
        setTelefoneAdmin("");
        setEmailAdmin("");
        setSenhaAdmin("");
        setImagemAdmin("");
        setIdAdmin("");
    }

    const AdminSet = (admin, opcao) => {
        console.log("Admin que foi passado: ", admin);
        setIdAdmin(admin.id)
        setNomeAdmin(admin.nomeAdministrador)
        setCargoAdmin(admin.cargoAdministrador)
        setCpfAdmin(admin.cpfAdministrador)
        setTelefoneAdmin(admin.telefoneAdministrador)
        setEmailAdmin(admin.emailAdministrador)
        setSenhaAdmin(admin.senhaAdministrador)
        setImagemAdmin(admin.imagemPerfilAdministrador)

        if (opcao === "Editar") {
            abrirFecharModalEditar();
        }
        else {
            abrirFecharModalDeletar();
        }
    }

    const abrirFecharModalInserir = () => {
        modalInserir ? limparDados() : null;
        setModalInserir(!modalInserir)
    }

    const abrirFecharModalEditar = () => {
        modalEditar ? limparDados() : null;
        setModalEditar(!modalEditar)
    }

    const abrirFecharModalDeletar = () => {
        modalDeletar ? limparDados() : null;
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

    const pedidoPost = async () => {
        const formData = new FormData();

        formData.append("nomeAdministrador", nomeAdmin);
        formData.append("cpfAdministrador", cpfAdmin);
        formData.append("cargoAdministrador", cargoAdmin);
        formData.append("telefoneAdministrador", telefoneAdmin);
        formData.append("emailAdministrador", emailAdmin);
        formData.append("senhaAdministrador", senhaAdmin);

        const base64Image = await convertImageToBase64(imagemAdmin);
        formData.append("imagemPerfilAdministrador", base64Image);

        try {
            const response = await axios.post(baseUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const newAdmin = response.data; // Ensure the response contains the newly registered admin data
            setData([...data, newAdmin]); // Add the new admin to the existing data

            abrirFecharModalInserir();
            limparDados();
        } catch (error) {
            console.log(error);
        }
    }


    function base64ToImage(base64String) {
        return `data:image/jpeg;base64,${base64String}`;
    }

    function convertImageToBase64(imageFile) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    async function pedidoAtualizar() {
        const formData = new FormData();

        formData.append("nomeAdministrador", nomeAdmin);
        formData.append("cpfAdministrador", cpfAdmin);
        formData.append("cargoAdministrador", cargoAdmin);
        formData.append("telefoneAdministrador", telefoneAdmin);
        formData.append("emailAdministrador", emailAdmin);
        formData.append("senhaAdministrador", senhaAdmin);

        if (imagemAdmin instanceof File) {
            // Converter a imagem para base64 antes de enviar
            const base64Image = await convertImageToBase64(imagemAdmin);
            formData.append("imagemPerfilAdministrador", base64Image);
        } else {
            formData.append("imagemPerfilAdministrador", imagemAdmin);
        }

        try {
            const response = await axios.put(`${baseUrl}/${idAdmin}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const updateAdmin = response.data;

            setData((prevData) => {
                return prevData.map((admin) => {
                    if (admin.id === idAdmin) {
                        return updateAdmin;
                    }
                    return admin;
                });
            });

            abrirFecharModalEditar();
            limparDados();
        } catch (error) {
            console.log(error);
        }
    }

    const atualizarListaAdmin = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const pedidoRemoverImagem = () => {
        // Método para limpar a constante (não limpa o campo)
        setImagemAdmin("");
    }

    const pedidoDeletar = async () => {
        await axios.delete(baseUrl + "/" + idAdmin)
            .then(response => {
                const newAdmin = data.filter(admin => admin.id !== response.data);
                setData(newAdmin);
                atualizarListaAdmin();
                abrirFecharModalDeletar();
                limparDados();
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
        return data.slice(startIndex, endIndex).map(admin => {
            if (admin.imagemPerfilAdministrador instanceof File) {
                return { ...admin, imagemPerfilAdministrador: URL.createObjectURL(admin.imagemPerfilAdministrador) };
            }
            return admin;
        });
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
                    <h1 className="text-3xl font-semibold pb-2">Lista de Administradores</h1>
                    <hr className="pb-4 border-[2.5px] border-[#DBDBDB]" />
                    <div className="w-full rounded-[10px]  border-[#DBDBDB] ">
                        <div className="grid grid-cols-5 w-full bg-[#DBDBDB] rounded-t-[8px] h-10 items-center text-base font-semibold text-black">
                            <span className="flex ml-5 items-center">ID</span>
                            <span className="flex justify-center items-center">Imagem</span>
                            <span className="flex justify-center items-center">Nome</span>
                            <span className="flex justify-center items-center">Cargo</span>
                            <span className="flex justify-center items-center">Ações</span>
                        </div>
                        <ul className="w-full">
                            {currentItems.map(admin => (
                                <React.Fragment key={admin.id}>
                                    <li className="grid grid-cols-5 w-full bg-[#F5F5F5]">
                                        <span scope="row" className="flex pl-5 border-r-[1px c] border-t-[1px] border-[#DBDBDB] pt-[12px] pb-[12px] text-gray-700">{admin.id}</span>
                                        <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#DBDBDB] text-gray-700">
                                            {admin.imagemPerfilAdministrador ? (
                                                <img src={admin.imagemPerfilAdministrador} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                                            ) : (
                                                <div>No image</div>
                                            )}
                                        </span>
                                        <span className="flex justify-left items-center pl-2 border-t-[1px] border-r-[1px] border-[#DBDBDB] text-gray-700 ">{admin.nomeAdministrador.length > 15 ? admin.nomeAdministrador.substring(0, 25) + '...' : admin.nomeAdministrador}</span>
                                        <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#DBDBDB] text-gray-700">{admin.cargoAdministrador}</span>
                                        <span className="flex items-center justify-center border-t-[1px] gap-2 border-[#DBDBDB]">
                                            <button className="text-white bg-teal-800 hover:bg-teal-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                                                onClick={() => AdminSet(admin, "Editar")}>
                                                Editar
                                            </button>

                                            <button className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                                onClick={() => AdminSet(admin, "Excluir")}>
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
                        <button className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                            onClick={() => abrirFecharModalInserir()}
                        >Cadastrar</button>
                    </div>
                </div>
            </div>

            <Modal isOpen={modalInserir}>
                <ModalHeader>Cadastrar Administrador</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nome: </label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setNomeAdmin(e.target.value)} />
                        <br />
                        <label>Cargo:</label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setCargoAdmin(e.target.value)} />
                        <br />
                        <label>CPF:</label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setCpfAdmin(e.target.value)} />
                        <br />
                        <label>Telefone:</label>
                        <br />
                        <InputMask mask="(99) 99999-9999" maskPlaceholder="(99) 99999-9999" type="text" className="form-control" onChange={(e) => setTelefoneAdmin(e.target.value)} value={telefoneAdmin} />
                        <br />
                        <label>Email:</label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setEmailAdmin(e.target.value)} />
                        <br />
                        <label>Senha:</label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setSenhaAdmin(e.target.value)} />
                        <br />
                        <label>Imagem:</label>
                        {imagemAdmin && modalEditar && (
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                {typeof imagemAdmin === 'string' ? (
                                    <img src={base64ToImage(imagemAdmin)} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                                ) : (
                                    <img src={URL.createObjectURL(imagemAdmin)} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                                )}
                                <button style={{ position: 'absolute', top: '15px', right: '5px', width: '30px', height: '30px', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '50%', border: 'none', padding: '0', cursor: 'pointer' }} onClick={() => pedidoRemoverImagem()}>X</button>
                                <br />
                            </div>
                        )}
                        <input type="file" className="form-control" onChange={(e) => setImagemAdmin(e.target.files[0])} value={imagemAdmin === "" ? '' : undefined} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn bg-yellow-400 text-white hover:bg-yellow-500" onClick={() => pedidoPost()}>Cadastrar</button>{"  "}
                    <button className="btn bg-gray-400 hover:bg-gray-600 text-white" onClick={() => abrirFecharModalInserir()}>Cancelar</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalEditar}>
                <ModalHeader>Alterar Administrador</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID: </label>
                        <br />
                        <input type="text" className='form-control' readOnly value={idAdmin} />
                        <br />
                        <label>Nome: </label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setNomeAdmin(e.target.value)}
                            value={nomeAdmin} />
                        <br />
                        <label>Cargo:</label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setCargoAdmin(e.target.value)}
                            value={cargoAdmin} />
                        <br />
                        <label>CPF:</label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setCpfAdmin(e.target.value)}
                            value={cpfAdmin} />
                        <br />
                        <label>Telefone:</label>
                        <br />
                        <InputMask mask="(99) 99999-9999" maskPlaceholder="(99) 99999-9999" type="text" className="form-control" onChange={(e) => setTelefoneAdmin(e.target.value)}
                            value={telefoneAdmin} />
                        <br />
                        <label>Email:</label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setEmailAdmin(e.target.value)}
                            value={emailAdmin} />
                        <br />
                        <label>Senha:</label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setSenhaAdmin(e.target.value)}
                            value={senhaAdmin} />
                        <br />
                        <label>Imagem:</label>
                        {imagemAdmin && modalEditar && (
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                {typeof imagemAdmin === 'string' ? (
                                    <img src={imagemAdmin} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                                ) : (
                                    <img src={URL.createObjectURL(imagemAdmin)} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                                )}
                                <button style={{ position: 'absolute', top: '15px', right: '5px', width: '30px', height: '30px', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '50%', border: 'none', padding: '0', cursor: 'pointer' }} onClick={() => pedidoRemoverImagem()}>X</button>
                                <br />
                            </div>
                        )}
                        <input type="file" className="form-control" onChange={(e) => setImagemAdmin(e.target.files[0])} value={imagemAdmin === "" ? '' : undefined} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn bg-yellow-400 text-white hover:bg-yellow-500" onClick={() => pedidoPost()}>Cadastrar</button>{"  "}
                    <button className="btn bg-gray-400 hover:bg-gray-600 text-white" onClick={() => abrirFecharModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

        </div>
    )
}