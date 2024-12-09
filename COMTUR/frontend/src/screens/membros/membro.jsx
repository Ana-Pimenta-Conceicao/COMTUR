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

function Membro() {
    const baseUrl = "https://localhost:7256/api/Membro";

    const [data, setData] = useState([]);
    const [atualizarData, setAtualizarData] = useState(true);

    const [modalInserir, setModalInserir] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalDeletar, setModalDeletar] = useState(false);

    const [modalCadastrado, setModalCadastrado] = useState(false);
    const [modalExcluido, setModalExcluido] = useState(false);
    const [modalEditado, setModalEditado] = useState(false);

    const [membroNome, setMembroNome] = useState("");
    const [membroCargo, setMembroCargo] = useState("");
    const [membroId, setMembroId] = useState("");
    const [membroImagem, setMembroImagem] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [userType, setUserType] = useState(null);
    const [idUsuario, setIdUsuario] = useState("");
    const [previewImage, setPreviewImage] = useState(null);

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

    const MembroSet = (membro, opcao) => {
        setMembroNome(membro.nome);
        setMembroCargo(membro.cargo);
        setMembroId(membro.id);
        setMembroImagem(membro.imagem); // Assuming imagem is in base64 format

        if (opcao === "Editar") {
            abrirFecharModalEditar();
        } else {
            abrirFecharModalDeletar();
        }
    };

    const LimparCampos = () => {
        setMembroNome("");
        setMembroCargo("");
        setMembroId("");
        setMembroImagem("");
    }

    const VisualizarTodosMembros = () => {
        navigate(`/todosmembros`);
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

    const pedidoPost = async () => {
        let imageBase64 = null;

        // Usar membroImagem diretamente como arquivo
        if (membroImagem instanceof File) {
            imageBase64 = await toBase64(membroImagem);
        } else {
            try {
                const response = await fetch("./src/assets/userpadrao.png");
                const blob = await response.blob(); // Converte a resposta em um Blob
                imageBase64 = await toBase64(blob); // Converte o Blob para base64
            } catch (error) {
                console.error("Erro ao buscar a imagem padrão:", error);
                return; // Sai da função se houver um erro
            }
        }

        try {
            await axios.post(baseUrl, {
                nome: membroNome,
                cargo: membroCargo,
                imagem: imageBase64,
            }).then((response) => {
                setData(data.concat(response.data));
                abrirFecharModalInserir();
                toggleModalCadastro();
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    async function pedidoAtualizar() {
        let imageBase64 = null;

        if (membroImagem instanceof File) {
            // Tenta converter a nova imagem para base64
            try {
                imageBase64 = await toBase64(membroImagem);
            } catch (error) {
                console.error("Erro ao converter a imagem:", error);
                return; // Sai se houver um erro
            }
        } else if (membroImagem === "") {
            imageBase64 = await fetch("./src/assets/userpadrao.png");
        } else {
            imageBase64 = membroImagem;
        }

        try {
            const response = await axios.put(`${baseUrl}/${membroId}`, {
                nome: membroNome,
                cargo: membroCargo,
                imagem: imageBase64,
            });

            const updatedMembro = response.data;

            setData((prevData) => {
                return prevData.map((membro) => {
                    if (membro.id === membroId) {
                        return updatedMembro;
                    }
                    return membro;
                });
            });

            abrirFecharModalEditar();
            toggleModalEdita();
        } catch (error) {
            console.log(error);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMembroImagem(file); // Armazena o arquivo
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result); // Armazena o preview
            };
            reader.readAsDataURL(file);
        }
    };

    const pedidoDeletar = async () => {
        await axios
            .delete(`${baseUrl}/${membroId}`)
            .then((response) => {
                setData(data.filter((membro) => membro.id !== membroId));
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


    const apresentaDados = data.map((membro) => {
        return {
            id: membro.id,
            nome: membro.nome,
            cargo: membro.cargo,
            acoes: (
                <div className="flex items-center justify-center border-t-[1px] gap-2 border-gray-100 py-2">
                    <BtnAcao
                        funcao={() => MembroSet(membro, "Editar")}
                        acao="Editar"
                    />
                    <BtnAcao
                        funcao={() => MembroSet(membro, "Excluir")}
                        acao="Excluir"
                    />
                </div>
            ),
        };
    });

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
                            Lista de Membros
                        </h1>
                        <hr className="pb-4 border-[2.5px] border-[#DBDBDB]" />
                        <Tabela
                            object={apresentaDados}
                            colunas={["ID", "Nome", "Cargo", "Ações"]}
                            currentPage={1}
                            totalPages={1}
                            goToPage={() => { }}
                            formatarData={""}
                            numColunas={4}
                        />
                        <div className="inline-flex float-right py-6">
                            <BtnAcao funcao={() => VisualizarTodosMembros()} acao="Publicados"/>
                            <BtnAcao funcao={() => {  abrirFecharModalInserir(); LimparCampos(); }}  acao="Cadastrar"  />
                        </div>
                    </div>
                </div>

                <Modal isOpen={modalInserir}>
                    <ModalHeader>Cadastrar Membro</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label>Nome: </label>
                            <input
                                type="text"
                                className="form-control text-sm"
                                placeholder="Digite o Nome"
                                onChange={(e) => setMembroNome(e.target.value)}
                            />
                            <label>Cargo: </label>
                            <input
                                type="text"
                                className="form-control text-sm"
                                placeholder="Digite o Cargo"
                                onChange={(e) => setMembroCargo(e.target.value)}
                            />
                            <label>Imagem: </label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <div className="flex justify-center">
                                {previewImage && (
                                    <img src={previewImage} alt="Preview" className="mt-3" />
                                )}
                            </div>

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
                    objeto="Membro"
                />
                <Modal isOpen={modalEditar}>
                    <ModalHeader>Editar Membro</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label>ID: </label>
                            <input
                                type="text"
                                className="form-control text-sm"
                                readOnly
                                value={membroId}
                            />
                            <label>Nome:</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setMembroNome(e.target.value)}
                                value={membroNome}
                            />
                            <label>Cargo:</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setMembroCargo(e.target.value)}
                                value={membroCargo}
                            />
                            <label>Imagem: </label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setMembroImagem(e.target.files[0]);
                                    }
                                }}
                            />
                            <div className="flex justify-center">
                                <img src={membroImagem} className="mt-3" />
                            </div>

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
                    objeto="Membro"
                />

                <Modal isOpen={modalDeletar}>
                    <ModalBody>
                        <label>Confirma a exclusão de "{membroNome}"?</label>
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
                    objeto="Membro"
                />
            </div>
        );
    }
}

export default Membro;

