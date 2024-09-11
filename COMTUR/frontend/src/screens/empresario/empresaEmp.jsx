import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import InputMask from "react-input-mask";
import BtnAcao from "../../components/botoes/btnAcao.jsx";
import BtnModais from "../../components/botoes/btnModais.jsx";
import BtnModaisIMG from "../../components/botoes/btnModaisIMG.jsx";
import SidebarAdm from "../../components/admin/sidebarAdm.jsx";
import NavBarAdm from "../../components/admin/navbarAdm.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import Tabela from "../../components/table/tabela.jsx";
import PopupCadastrado from "../../components/popups/popupCadastro.jsx";
import PopupExcluido from "../../components/popups/popupExcluido.jsx";
import PopupEditado from "../../components/popups/popupEditado.jsx";
import SidebarEmp from "../../components/empresario/sidebarEmp.jsx";

export default function EmpresaEmp() {
    const baseUrl = "https://localhost:7256/api/Empresa";
    const baseUrlImagem = "https://localhost:7256/api/ImagemEmpresa";
    const baseUrlUsuario = "https://localhost:7256/api/Usuario";
    const baseUrlTipoTurismo = "https://localhost:7256/api/TipoTurismo";

    const [data, setData] = useState([]);
    const [dataUsuario, setDataUsuario] = useState([]);
    const [dataTipoTurismo, setDataTipoTurismo] = useState([]);
    const [empresas, setEmpresas] = useState([]);

    const [modalCadastrado, setModalCadastrado] = useState(false);
    const [modalExcluido, setModalExcluido] = useState(false);
    const [modalInserir, setModalInserir] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalDeletar, setModalDeletar] = useState(false);
    const [modalEditado, setModalEditado] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [empresaNome, setNome] = useState("");
    const [empresaCNPJ, setCNPJ] = useState("");
    const [empresaEndereco, setEndereco] = useState("");
    const [imagensEmpresa, setImagensEmpresa] = useState([]);
    const [empresaLegendaImagem, setEmpresaLegendaImagem] = useState([]);
    const [empresaDescricao, setDescricao] = useState("");
    const [empresaId, setEmpresaId] = useState("");
    const [userType, setUserType] = useState(null);
    const [usuarioId, setUsuarioId] = useState("");
    const [tipoTurismoSelecionado, setTipoTurismoSelecionado] = useState("");
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [usuarioOptions, setUsuarioOptions] = useState([]);
    const [tipoTurismoOptions, setTipoTurismoOptions] = useState([]);
    const [idUsuario, setIdUsuario] = useState("");
    const [tipoTurismoId, setTipoTurismoId] = useState("");
    const [atualizarData, setAtualizarData] = useState(false);

    const navigate = useNavigate();

    const limparDados = useCallback(() => {
        setNome("");
        setCNPJ("");
        setEndereco("");
        setImagensEmpresa([]);
        setEmpresaLegendaImagem([]);
        setDescricao("");
        setEmpresaId("");
    }, []);

    const EmpresaSet = useCallback((empresa, opcao) => {
        setEmpresaId(parseInt(empresa.id));
        setNome(empresa.nome);
        setCNPJ(empresa.cnpj);
        setEndereco(empresa.endereco);
        setDescricao(empresa.descricao);
        setEmpresaLegendaImagem(empresa.legendaImagem);
        setImagensEmpresa(empresa.imagemEmpresa);
        setUsuarioId(empresa.idUsuario);
        setTipoTurismoSelecionado(empresa.idTipoTurismo);

        setUsuarioSelecionado(usuarioOptions.find(opcao => opcao.value === empresa.idUsuario));
        setTipoTurismoSelecionado(empresa.idTipoTurismo);

        switch (opcao) {
            case "Editar":
                abrirFecharModalEditar();
                break;
            case "Excluir":
                abrirFecharModalDeletar();
                break;
            case "Visualizar":
                navigate(`/visualizarEmpresa/${empresa.id}`);
                break;
            default:
                break;
        }
    }, [usuarioOptions, navigate]);

    const abrirFecharModalInserir = () => {
        if (modalInserir) limparDados();
        setModalInserir(!modalInserir);
    };

    const abrirModalCadastrado = () => setModalCadastrado(true);
    const fecharModalCadastrado = () => setModalCadastrado(false);

    const abrirModalExcluido = () => setModalExcluido(true);
    const fecharModaExcluido = () => setModalExcluido(false);

    const abrirModalEditado = () => setModalEditado(true);
    const fecharModaEditado = () => setModalEditado(false);

    const abrirFecharModalEditar = async () => {
        if (modalEditar) limparDados();
        setModalEditar(!modalEditar);
    };

    const abrirFecharModalDeletar = () => {
        if (modalDeletar) limparDados();
        setModalDeletar(!modalDeletar);
    };

    const pedidoGetTipoTurismo = useCallback(async () => {
        try {
            const response = await axios.get(baseUrlTipoTurismo);
            setDataTipoTurismo(response.data);
        } catch (error) {
            console.error("Erro ao buscar tipos de turismo:", error);
        }
    }, []);

    const pedidoGet = useCallback(async () => {
        try {
            const response = await axios.get(baseUrl);
            setData(response.data);
        } catch (error) {
            console.error("Erro ao buscar empresas:", error);
        }
    }, []);

    const pedidoGetUsuario = useCallback(async () => {
        try {
            const response = await axios.get(baseUrlUsuario);
            setDataUsuario(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    }, []);

    const pedidoPost = async () => {
        const formData = new FormData();
        formData.append("nome", empresaNome);
        formData.append("cnpj", empresaCNPJ);
        formData.append("endereco", empresaEndereco);
        formData.append("descricao", empresaDescricao);
        formData.append("idtipoturismo", tipoTurismoSelecionado);
        formData.append("idUsuario", idUsuario);

        try {
            const response = await axios.post(baseUrl, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setData(prevData => [...prevData, response.data]);

            if (imagensEmpresa.length > 0) await pedidoPostImagens(response.data.id);

            abrirFecharModalInserir();
            limparDados();
            abrirModalCadastrado();
            setAtualizarData(true);
        } catch (error) {
            console.error("Erro ao cadastrar empresa:", error);
        }
    };

    const pedidoPostImagens = async (idEmpresa) => {
        const formData = new FormData();

        imagensEmpresa.forEach(imagem => {
            formData.append("imagens", imagem.imagem);
            formData.append("legendas", imagem.legendaImagem);
        });
        formData.append("idUsuario", idUsuario);

        try {
            await axios.post(`${baseUrlImagem}/${idEmpresa}/CadastrarImagensEmpresa`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (error) {
            console.error("Erro ao cadastrar imagens:", error);
        }
    };

    const pedidoAtualizar = async () => {
        const formData = new FormData();
        formData.append("id", empresaId);
        formData.append("nome", empresaNome);
        formData.append("cnpj", empresaCNPJ);
        formData.append("endereco", empresaEndereco);
        formData.append("descricao", empresaDescricao);
        formData.append("imagemEmpresa", imagensEmpresa);
        formData.append("idtipoturismo", tipoTurismoSelecionado);
        formData.append("idUsuario", idUsuario);

        try {
            const response = await axios.put(`${baseUrl}/${empresaId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const updatedEmpresa = response.data;
            setData(prevData => prevData.map(empresa => empresa.id === empresaId ? updatedEmpresa : empresa));

            if (imagensEmpresa.length > 0) await PutImagens();

            abrirFecharModalEditar();
            limparDados();
            abrirModalEditado();
            setAtualizarData(true)
        } catch (error) {
            console.error("Erro ao atualizar empresa:", error);
        }
    };

    const PutImagens = async () => {
        const formData = new FormData();

        imagensEmpresa.forEach(imagem => {
            formData.append("imagens", imagem.imagem);
            formData.append("legendas", imagem.legendaImagem);
        });
        formData.append("idUsuario", idUsuario);

        try {
            await axios.put(`${baseUrlImagem}/${empresaId}/AtualizarImagensEmpresa`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (error) {
            console.error("Erro ao atualizar imagens:", error);
        }
    };

    const removeImagemByIndex = useCallback((indexToRemove) => {
        setImagensEmpresa(prevImagens => prevImagens.filter((_, index) => index !== indexToRemove));
    }, []);

    const pedidoDeletar = async () => {
        try {
            const response = await axios.delete(`${baseUrl}/${empresaId}`);
            setData(prevData => prevData.filter(empresa => empresa.id !== response.data));
            abrirFecharModalDeletar();
            limparDados();
            abrirModalExcluido();
            setAtualizarData(true);
        } catch (error) {
            console.error("Erro ao deletar empresa:", error);
        }
    };

    const pedidoGetEmpresas = useCallback(async () => {
        if (!idUsuario) {
            console.warn("ID do Usuário não disponível para buscar empresas.");
            return;
        }

        try {
            const response = await axios.get(`${baseUrl}/${idUsuario}/usuario`);
            setEmpresas(response.data);
            console.log("Empresas recebidas:", response.data);
        } catch (error) {
            console.error("Erro ao buscar empresas:", error);
        }
    }, [idUsuario]);

    useEffect(() => {
        const userTypeFromLocalStorage = localStorage.getItem("tipoUsuario");
        const idTipoUsuarioAPI = localStorage.getItem("id");
        setUserType(userTypeFromLocalStorage);
        setIdUsuario(idTipoUsuarioAPI); // Defina o ID do usuário
    }, []);

    useEffect(() => {
        if (idUsuario && atualizarData) {
            pedidoGet();
            pedidoGetTipoTurismo();
            pedidoGetUsuario();
            pedidoGetEmpresas();
            setAtualizarData(false);
        }
    }, [idUsuario, pedidoGet, pedidoGetTipoTurismo, pedidoGetUsuario, pedidoGetEmpresas, atualizarData]);

    useEffect(() => {
        if (dataUsuario) {
            const options = dataUsuario
                .filter(usuario => usuario.tipoUsuario === 3)
                .map(usuario => ({ value: usuario.id, label: usuario.nome }));

            setUsuarioOptions(options);
            if (options.length > 0) {
                setUsuarioSelecionado(options[0].value);
                setUsuarioId(options[0].value);
            }
        }
    }, [dataUsuario]);

    useEffect(() => {
        if (dataTipoTurismo) {
            const options = dataTipoTurismo.map(tipoturismo => ({ value: tipoturismo.id, label: tipoturismo.nome }));
            setTipoTurismoOptions(options);

            if (!options.some(option => option.value === tipoTurismoSelecionado)) {
                const turismoPadrao = options.length > 0 ? options[0].value : "";
                setTipoTurismoSelecionado(turismoPadrao);
                setTipoTurismoId(turismoPadrao);
            }
        }
    }, [dataTipoTurismo, tipoTurismoSelecionado]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (idUsuario && atualizarData) {
                pedidoGetEmpresas();
                pedidoGet();
                setAtualizarData(false);
            }
        }, 60000); // Atualiza a cada 60 segundos

        return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
    }, [idUsuario, pedidoGetEmpresas, pedidoGet, atualizarData]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getCurrentPageItems = (page) => {
        const startIndex = (page - 1) * itemsPerPage;
        return data.slice(startIndex, startIndex + itemsPerPage);
    };

    const currentItems = getCurrentPageItems(currentPage);

    const apresentaDados = empresas
        .map(empresa => {
            const tipoTurismo = dataTipoTurismo.find(tipo => tipo.id === empresa.idTipoTurismo);
            const tipoTurismoNome = tipoTurismo ? tipoTurismo.nome : "Tipo não encontrado";
            return {
                id: empresa.id,
                nome: empresa.nome,
                cnpj: empresa.cnpj,
                tipo: tipoTurismoNome,
                status: "teste",
                acoes: (
                    <div className="flex items-center justify-center border-t-[1px] gap-2 border-gray-100 py-2">
                        <BtnAcao funcao={() => EmpresaSet(empresa, "Editar")} acao="Editar" />
                        <BtnAcao funcao={() => EmpresaSet(empresa, "Excluir")} acao="Excluir" />
                        <BtnAcao funcao={() => EmpresaSet(empresa, "Visualizar")} acao="Visualizar" />
                    </div>
                ),
            };
        });

    if (userType === "1" || userType === "2") {
        return <Navigate to="/notfound" />;
    } else {
        return (
            <div className="home">
                <div className="h-screen flex fixed">
                    <SidebarEmp setOpen={setSidebarOpen} open={sidebarOpen} />
                </div>
                <div className="flex-1 container-fluid" style={{ paddingLeft: sidebarOpen ? 200 : 100 }}>
                    <NavBarAdm />

                    <div className="pl-8 pr-8 pt-[20px]">
                        <h1 className="text-3xl font-semibold pb-2">Lista de Empresas</h1>
                        <hr className="pb-4 border-[2.5px] border-[#DBDBDB]" />
                        <Tabela
                            object={apresentaDados}
                            colunas={["ID", "Nome", "CNPJ", "Segmento", "Status", "Ações"]}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            goToPage={setCurrentPage}
                            formatarData={""}
                            numColunas={6}
                        />
                        <div className="float-right flex-auto py-6">
                            <BtnAcao funcao={abrirFecharModalInserir} acao="Cadastrar" />
                        </div>
                    </div>
                </div>


                <Modal
                    className="modal-xl-gridxl"
                    isOpen={modalInserir}
                    style={{ maxWidth: "1000px" }}
                >
                    <ModalHeader className="">Cadastrar Empresa</ModalHeader>
                    <ModalBody className="">
                        <div className="grid grid-cols-2 ">
                            <div className="form-group  ">
                                <div className="flex flex-col col-span-1 pr-6">
                                    <label>Nome Fantasia: </label>
                                    <input
                                        type="text"
                                        className="form-control text-sm"
                                        onChange={(e) => setNome(e.target.value)}
                                        placeholder="Digite o Nome Fantasia"
                                    />
                                    <br />

                                    <label htmlFor="empresaCNPJ">CNPJ:</label>
                                    <InputMask
                                        mask="99.999.999/9999-99"
                                        maskPlaceholder="99.999.999/9999-99"
                                        type="text"
                                        className="form-control text-sm"
                                        id="empresaCNPJ"
                                        onChange={(e) => setCNPJ(e.target.value)}
                                        placeholder="Digite apenas números"
                                        value={empresaCNPJ}
                                    />
                                    <br />

                                    <label>Endereço:</label>
                                    <textarea
                                        className="form-control text-sm"
                                        onChange={(e) => setEndereco(e.target.value)}
                                        placeholder="Digite o Endereço"
                                    />
                                    <br />
                                    <label>Descrição:</label>
                                    <textarea
                                        className="form-control text-sm"
                                        onChange={(e) => setDescricao(e.target.value)}
                                        placeholder="Descrição Empresa"
                                    />
                                    <br />
                                    <label>Tipo:</label>
                                    <select
                                        className="form-control"
                                        value={tipoTurismoSelecionado}
                                        onChange={(e) => settipoTurismoSelecionado(e.target.value)}
                                    >
                                        {tipoTurismoOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <br />
                                </div>
                            </div>
                            <div className="flex flex-col col-span-1 pl-4  border-l-[1px]">
                                <label>Imagem:</label>
                                <div>
                                    {/* Campo para seleção de imagem */}
                                    <input
                                        type="file"
                                        className="form-control "
                                        onChange={(e) => {
                                            convertImageToBase64(e.target.files[0], (result) => {
                                                if (result) {
                                                    const objetoImagem = {
                                                        imagem: result,
                                                        legendaImagem: "",
                                                    };
                                                    setImagensEmpresa((prevImagens) => [
                                                        ...prevImagens,
                                                        objetoImagem,
                                                    ]);
                                                }
                                                // Limpa o campo de entrada de arquivo após a seleção
                                                e.target.value = null;
                                            });
                                        }}
                                        multiple
                                    />
                                    {(Array.isArray(imagensEmpresa) ? imagensEmpresa : []).map(
                                        (imagem, index) =>
                                            index % 1 === 0 && (
                                                <div
                                                    className="flex pt-3 justify-end "
                                                    key={`row-${index}`}
                                                >
                                                    {Array.from(
                                                        {
                                                            length: Math.min(
                                                                1,
                                                                imagensEmpresa.length - index
                                                            ),
                                                        },
                                                        (_, i) => (
                                                            <div key={index} className="flex flex-col  pr-5 ">
                                                                <div className="flex w-[140px] justify-end">
                                                                    <img
                                                                        className="w-min-[140px] h-[100px] mr-2 mt-2 justify-center rounded-md"
                                                                        src={imagensEmpresa[index + i].imagem}
                                                                        alt={`Imagem ${index}`}
                                                                    />
                                                                    <div className="flex flex-col pl-3 justify-end">
                                                                        <label>Legenda:</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control text-sm w-[286px] mb-0 "
                                                                            onChange={(e) =>
                                                                                setImagensEmpresa((prevImagens) => {
                                                                                    const novasImagens = [...prevImagens];
                                                                                    novasImagens[
                                                                                        index + i
                                                                                    ].legendaImagem = e.target.value;
                                                                                    return novasImagens;
                                                                                })
                                                                            }
                                                                            placeholder="Digite a legenda"
                                                                        />
                                                                        <br />
                                                                        <button
                                                                            className="w-[140px] rounded-md text-md text-white  bg-red-800 hover:bg-red-900"
                                                                            onClick={() => removeImagemByIndex(index)}
                                                                        >
                                                                            Remover
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center px-[405px] pt-5">
                            <BtnModais funcao={() => pedidoPost()} acao="Cadastrar" />
                            <BtnModais
                                funcao={() => abrirFecharModalInserir()}
                                acao="Cancelar"
                            />
                        </div>
                    </ModalBody>
                </Modal>
                <PopupCadastrado isOpen={modalCadastrado} toggle={fecharModalCadastrado} objeto="Empresa" />
                <PopupExcluido isOpen={modalExcluido} toggle={fecharModaExcluido} objeto="Empresa" />
                <PopupEditado isOpen={modalEditado} toggle={fecharModaEditado} objeto="Empresa" />
                <Modal className="modal-xl-gridxl" isOpen={modalEditar} style={{ maxWidth: "1000px" }}>
                    <ModalHeader>Editar Empresa</ModalHeader>
                    <ModalBody>
                        <div className="grid grid-cols-2 ">
                            <div className="form-group  ">
                                <div className="flex flex-col pr-6">
                                    <label>Nome Fantasia: </label>
                                    <input
                                        type="text"
                                        className="form-control text-sm"
                                        onChange={(e) => setNome(e.target.value)}
                                        value={empresaNome}
                                    />
                                    <br />
                                    <label htmlFor="empresaCNPJ">CNPJ:</label>
                                    <InputMask
                                        mask="99.999.999/9999-99"
                                        maskPlaceholder="99.999.999/9999-99"
                                        type="text"
                                        className="form-control text-sm"
                                        id="empresaCNPJ"
                                        onChange={(e) => setCNPJ(e.target.value)}
                                        placeholder="Digite apenas números"
                                        value={empresaCNPJ}
                                    />
                                    <br />
                                    <label>Endereço:</label>
                                    <textarea
                                        className="form-control  text-sm"
                                        name="empresaEndereco"
                                        onChange={(e) => setEndereco(e.target.value)}
                                        value={empresaEndereco}
                                    />
                                    <br />
                                    <label>Descrição:</label>
                                    <textarea
                                        className="form-control  text-sm"
                                        name="empresaEndereco"
                                        onChange={(e) => setDescricao(e.target.value)}
                                        value={empresaDescricao}
                                    />
                                    <br />
                                    <label>Tipo:</label>
                                    <select
                                        className="form-control"
                                        value={tipoTurismoSelecionado}
                                        onChange={(e) => settipoTurismoSelecionado(e.target.value)}
                                    >
                                        {tipoTurismoOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <br />
                                </div>
                            </div>
                            <div className="flex flex-col col-span-1  pl-4  border-l-[1px]">
                                <label>Imagem:</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(e) => {
                                        Array.from(e.target.files).forEach((file) => {
                                            convertImageToBase64(file, (result) => {
                                                if (result) {
                                                    const objetoImagem = {
                                                        imagem: result,
                                                        legendaImagem: "",
                                                    };
                                                    setImagensEmpresa((prevImagens) => [
                                                        ...prevImagens,
                                                        objetoImagem,
                                                    ]);
                                                }
                                            });
                                        });
                                        // Limpa o campo de entrada de arquivo após a seleção
                                        e.target.value = null;
                                    }}
                                    multiple
                                />

                                {modalEditar && (
                                    <div>
                                        {(Array.isArray(imagensEmpresa) ? imagensEmpresa : []).map(
                                            (imagem, index) =>
                                                index % 1 === 0 && (
                                                    <div
                                                        className="flex pt-3 justify-end "
                                                        key={`row-${index}`}
                                                    >
                                                        {Array.from(
                                                            {
                                                                length: Math.min(
                                                                    1,
                                                                    imagensEmpresa.length - index
                                                                ),
                                                            },
                                                            (_, i) => (
                                                                <div
                                                                    key={index + i}
                                                                    className="flex flex-col items-start pr-5"
                                                                >
                                                                    <div className="flex w-[140px] justify-end">
                                                                        <img
                                                                            className="w-min-[140px] h-[100px] mr-2 mt-2 justify-center rounded-md"
                                                                            src={imagensEmpresa[index + i].imagem}
                                                                        />
                                                                        <div className="flex flex-col pl-3 justify-end">
                                                                            <label>Legenda:</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control  text-sm w-[286px]"
                                                                                onChange={(e) =>
                                                                                    setImagensEmpresa((prevImagens) => {
                                                                                        const novasImagens = [
                                                                                            ...prevImagens,
                                                                                        ];
                                                                                        novasImagens[
                                                                                            index + i
                                                                                        ].legendaImagem = e.target.value;
                                                                                        return novasImagens;
                                                                                    })
                                                                                }
                                                                                value={
                                                                                    imagensEmpresa[index + i]
                                                                                        .legendaImagem
                                                                                }
                                                                            />
                                                                            <br />

                                                                            <button
                                                                                className="w-[140px] rounded-md  mt-[2px] mb-3 text-md text-white p-[0.2px]  bg-red-800 hover:bg-red-900"
                                                                                onClick={() =>
                                                                                    removeImagemByIndex(index + i)
                                                                                }
                                                                            >
                                                                                Remover
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                )
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between items-center px-[395px] pt-5">
                            <BtnModaisIMG funcao={() => pedidoAtualizar(empresaId)} acao="Editar" />
                            <BtnModaisIMG funcao={() => abrirFecharModalEditar()} acao="Cancelar" />
                        </div>
                    </ModalBody>
                </Modal>
                <Modal isOpen={modalDeletar}>
                    <ModalBody>
                        Confirma a exclusão da "{empresaNome}" ?
                    </ModalBody>
                    <ModalFooter>
                        <BtnModais funcao={() => pedidoDeletar()} acao="Excluir" />
                        <BtnModais funcao={() => abrirFecharModalDeletar()} acao="Cancelar" />
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}