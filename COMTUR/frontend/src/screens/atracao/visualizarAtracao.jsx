import { useState, useEffect, InputMask } from "react";
import axios from "axios";
import NavbarUsr from "../../components/user/navbarUsr.jsx";
import FooterUsr from "../../components/user/footerUsr.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { CaretRight, CaretLeft, Star, Trash, NotePencil } from "@phosphor-icons/react";
import React from "react";
import Xadrez from "../../assets/xadrez";
import Comtur from "../../assets/Comtur";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import BtnModaisIMG from "../../components/botoes/btnModaisIMG.jsx";
import BtnModais from "../../components/botoes/btnModais.jsx";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function VisualizarAtracao() {
    const { id } = useParams();
    const [atracao, setAtracao] = useState(null);
    const baseUrl = "https://localhost:7256/api/Atracao";
    const imagensUrl = `https://localhost:7256/api/ImagemAtracao/${id}`;
    const usuarioUrl = "https://localhost:7256/api/Usuario";
    const avaliacaoUrl = "https://localhost:7256/api/Avaliacao";
    const avaliacaoAtracaoUrl = "https://localhost:7256/api/AvaliacaoAtracao";
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [outrasAtracoes, setOutrasAtracoes] = useState([]);
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const [modalInserir, setModalInserir] = useState(false);
    const [atualizarScoreAvaliacoes, setAtualizarScoreAvaliacoes] = useState(true);

    const abrirFecharModalAvaliacao = () => {
        if (modalInserir) {
            limparDados(); // Limpa os dados se o modal estava aberto
        } else {
            setBuscarUsuario(true);
        }
        setModalInserir(!modalInserir); // Alterna o estado do modal
    };

    const [avaliacaoNota, setAvaliacaoNota] = useState(0);
    const [avaliacaoDataPublicacao, setAvaliacaoDataPublicacao] = useState("");
    const [avaliacaoComentario, setAvaliacaoComentario] = useState("");
    const [userType, setUserType] = useState(null);
    const [avaliacaoId, setAvaliacaoId] = useState(0);
    const [idUsuario, setIdUsuario] = useState(0);
    const [usuario, setUsuario] = useState({});
    const [buscarUsuario, setBuscarUsuario] = useState(false);

    const [avaliacoes, setAvaliacoes] = useState("");

    const [avaliacoesAtracao, setAvaliacoesAtracao] = useState([]);

    const [avaliacoesCompletas, setAvaliacoesCompletas] = useState([]);

    const [modalAvaliacoes, setModalAvaliacoes] = useState(false);

    const abrirFecharModalAvaliacoes = () => {
        setModalAvaliacoes(!modalAvaliacoes);
    };


    useEffect(() => {
        const fetchAvaliacoes = async () => {
            const avaliacoesData = await Promise.all(
                avaliacoesAtracao.map(async (avaliacaoAtracao) => {
                    const avaliacao = await pedidoGetAvaliacao(
                        avaliacaoAtracao.idAvaliacao
                    );

                    if (avaliacao && Object.keys(avaliacao).length > 0) {
                        const usuario = await pedidoGetUsuario(avaliacao.idUsuario);
                        if (usuario && Object.keys(usuario).length > 0) {
                            return {
                                avaliacao,
                                usuario,
                            };
                        }
                    }
                    return null;
                })
            );

            setAvaliacoesCompletas(
                avaliacoesData.filter((avaliacao) => avaliacao !== null)
            );
        };

        if (avaliacoesAtracao.length > 0) {
            fetchAvaliacoes();
        }
    }, [avaliacoesAtracao]);

    // Aqui começa a navegação das avaliações 

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3; // Define quantas avaliações serão mostradas por vez

    // Filtra as últimas 12 avaliações
    const ultimasAvaliacoes = avaliacoesCompletas.slice(-12);

    // Usa as últimas 12 avaliações para a lógica de paginação
    const displayedAvaliacoes = ultimasAvaliacoes.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const nextAvaliacoes = () => {
        if ((currentPage + 1) * itemsPerPage < ultimasAvaliacoes.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevAvaliacoes = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Total de páginas para a navegação
    const totalPages = Math.ceil(ultimasAvaliacoes.length / itemsPerPage);

    // aqui termina, comentario para alterar caso necessario 



    const limparDados = () => {
        setAvaliacaoNota("");
        setAvaliacaoDataPublicacao("");
        setAvaliacaoComentario("");
        setAvaliacaoId("");
    };

    const abrirFecharModalInserir = () => {
        modalInserir ? limparDados() : null;
        setModalInserir(!modalInserir);
    };


    const inverterDataParaFormatoBanco = (data) => {
        const partes = data.split("/");
        if (partes.length === 3) {
            const [dia, mes, ano] = partes;
            return `${ano}-${mes}-${dia}`;
        }
        return data;
    };

    const formatarDataParaExibicao = (data) => {
        const partes = data.split("-");
        if (partes.length === 3) {
            const [ano, mes, dia] = partes;
            return `${dia}/${mes}/${ano}`;
        }
        return data; // Retorna a data original se não estiver no formato esperado
    };
    const pedidoGet = async () => {
        await axios
            .get(avaliacaoUrl)
            .then((response) => { })
            .catch((error) => {
                console.log(error);
            });
    };

    const pedidoGetDadosUsuario = async () => {
        const idUsuario = localStorage.getItem("id");

        try {
            const response = await axios.get(`${usuarioUrl}/${idUsuario}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setUsuario(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const buscar = async () => {
            await pedidoGetDadosUsuario();
        };

        if (buscarUsuario) buscar();
    }, [buscarUsuario]);

    const pedidoPostAvaliacao = async () => {
        const currentDate = new Date();

        // Formata a data apenas para o formato desejado (DD/MM/YYYY)
        const formattedDate = format(currentDate, "yyyy-MM-dd", { locale: ptBR }); // Formato para o banco de dados

        const formData = new FormData();
        formData.append("nota", avaliacaoNota);
        formData.append("dataAvaliacao", formattedDate);
        formData.append("comentario", avaliacaoComentario);
        formData.append("status", 1);
        formData.append("idUsuario", idUsuario);

        try {
            const response = await axios.post(avaliacaoUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            await pedidoPostAvaliacaoAtracao(response.data.id);

            abrirFecharModalInserir();
            limparDados();
            setAtualizarScoreAvaliacoes(true);
        } catch (error) {
            console.log(error);
        }
    };

    const pedidoPostAvaliacaoAtracao = async (idAvaliacao) => {
        const formData = new FormData();
        formData.append("idAvaliacao", idAvaliacao);
        formData.append("idAtracao", id);

        try {
            const response = await axios.post(avaliacaoAtracaoUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            limparDados();
            setAtualizarScoreAvaliacoes(true);
        } catch (error) {
            console.log(error);
        }
    };

    // aqui
    const toggleEdit = (index) => {
        setAvaliacoesCompletas((prev) => {
            const updatedAvaliacoes = [...prev];
            updatedAvaliacoes[index].editMode = !updatedAvaliacoes[index].editMode;
            return updatedAvaliacoes;
        });
    };

    const handleComentarioChange = (index, value) => {
        setAvaliacoesCompletas((prev) => {
            const updatedAvaliacoes = [...prev];
            updatedAvaliacoes[index].avaliacao.comentario = value;
            return updatedAvaliacoes;
        });
    };

    const handleStarClickEdit = (index, starIndex) => {
        setAvaliacoesCompletas((prev) => {
            const novasAvaliacoes = [...prev];
            novasAvaliacoes[index].avaliacao.nota = starIndex; // Atualiza a nota
            return novasAvaliacoes;
        });
    };

    const selecionarAvaliacao = (id) => {
        const avaliacaoSelecionada = avaliacoesCompletas.find(
            (avaliacao) => avaliacao.avaliacao.id === id
        );

        if (avaliacaoSelecionada) {
            console.log(avaliacaoSelecionada);
            pedidoAtualizar(avaliacaoSelecionada);
        }
    };

    const pedidoAtualizar = async (avaliacao) => {
        const formData = new FormData();
        formData.append("nota", avaliacao?.avaliacao?.nota || avaliacaoNota);
        formData.append(
            "dataAvaliacao",
            inverterDataParaFormatoBanco(avaliacao?.avaliacao?.dataAvaliacao || avaliacaoDataPublicacao)
        );
        formData.append("comentario", avaliacao?.avaliacao?.comentario || avaliacaoComentario);

        try {
            const response = await axios.put(
                `${avaliacaoUrl}/${avaliacao?.avaliacao?.id || avaliacaoId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setModalAvaliacoes(false);
            const updatedAvaliacao = response.data;
            setAtualizarScoreAvaliacoes(true);
        } catch (error) {
            console.log(error);
        }
    };

    const cancelarEdicao = (index) => {
        const novasAvaliacoes = [...avaliacoesCompletas];
        novasAvaliacoes[index].editMode = false;
        setAvaliacoesCompletas(novasAvaliacoes);
    };

    // aqui

    const pedidoAtualizarAvaliacoes = async () => {
        await axios
            .get(`${avaliacaoAtracaoUrl}/Atracao/${id}/Score`)
            .then((response) => {
                setAvaliacoes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const pedidoDeletar = async (id) => {
        await axios
            .delete(avaliacaoUrl + "/" + id || avaliacaoId)
            .then(async (response) => {
                setModalAvaliacoes(false);

                const avaliacaoAtracao = await pedidoGetAvaliacaoAtracaoPorIdAvaliacao(id);
                await pedidoDeletarAvaliacaoAtracao(avaliacaoAtracao.id);

                setAtualizarScoreAvaliacoes(true);
                await pedidoGetAvaliacoesAtracao();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const pedidoGetAvaliacoesAtracao = async () => {
        await axios
            .get(`${avaliacaoAtracaoUrl}/Atracao/${id}`)
            .then((response) => {
                setAvaliacoesAtracao(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const pedidoGetAvaliacao = async (idAvaliacao) => {
        var avaliacao = null;

        await axios
            .get(`${avaliacaoUrl}/${idAvaliacao}`)
            .then((response) => {
                avaliacao = response.data;
            })
            .catch((error) => {
                console.log(error);
                return {};
            });

        return avaliacao;
    };

    const pedidoGetAvaliacaoAtracaoPorIdAvaliacao = async (id) => {
        var data = {};
        await axios
            .get(`${avaliacaoAtracaoUrl}/Avaliacao/${id}`)
            .then((response) => {
                data = response.data;
            })
            .catch((error) => {
                console.log(error);
            });

        return data;
    };

    const pedidoDeletarAvaliacaoAtracao = async (id) => {
        await axios
            .delete(`${avaliacaoAtracaoUrl}/${id}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const pedidoGetUsuario = async (idUsuario) => {
        var usuario = null;

        await axios
            .get(`${usuarioUrl}/${idUsuario}`)
            .then((response) => {
                usuario = response.data;
            })
            .catch((error) => {
                console.log(error);
            });

        return usuario;
    };
    useEffect(() => {
        if (atualizarScoreAvaliacoes) {
            pedidoAtualizarAvaliacoes();
            pedidoGetAvaliacoesAtracao();

            setAtualizarScoreAvaliacoes(false);
        }
    }, [atualizarScoreAvaliacoes]);

    useEffect(() => {
        const idTipoUsuarioAPI = localStorage.getItem("id");
        setIdUsuario(idTipoUsuarioAPI);
    }, []);
    useEffect(() => {
        // Função para buscar os detalhes da atração pelo ID
        const buscarAtracao = async () => {
            await axios
                .get(baseUrl + `/${id}`)
                .then((response) => {
                    setAtracao(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        buscarAtracao();
    }, [id]);

    const nextSlide = () => {
        if (atracao.imagemAtracao.length > 1) {
            setCurrentSlide((prev) =>
                prev === atracao.imagemAtracao.length - 1 ? 0 : prev + 1
            );
        }
    };
    const prevSlide = () => {
        if (atracao.imagemAtracao.length > 1) {
            setCurrentSlide((prev) =>
                prev === 0 ? atracao.imagemAtracao.length - 1 : prev - 1
            );
        }
    };
    const VisualizarTodasAtracoes = () => {
        navigate(`/todasatracoes`);
    };

    const handleStarClick = (index) => {
        setAvaliacaoNota(index);
    };

    const handleDate = (value) => {
        // Filtra somente números
        const numbersOnly = value.replace(/\D/g, "");

        // Limita a quantidade de caracteres a 8 (apenas os dígitos da data)
        const limitedValue = numbersOnly.slice(0, 8);

        let formattedValue = limitedValue;

        // Adiciona a primeira barra após 2 dígitos (se houver mais que 2 dígitos)
        if (limitedValue.length > 2) {
            formattedValue = limitedValue.slice(0, 2) + "/" + limitedValue.slice(2);
        }

        // Adiciona a segunda barra após 4 dígitos (se houver mais que 4 dígitos)
        if (limitedValue.length > 4) {
            formattedValue = formattedValue.slice(0, 5) + "/" + limitedValue.slice(4);
        }

        // Atualiza o estado com a data formatada
        setAvaliacaoDataPublicacao(formattedValue);
    };

    if (!atracao) {
        return <h2>Carregando...</h2>;
    }

    return (
        <div>
            <NavbarUsr />

            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] mb-10">
                <div className="flex flex-col px-4 sm:pl-24 sm:pr-24">
                    <h1 className="text-[#373636] mb-3 text-lg font-extrabold pt-4 sm:pt-14 sm:px-16 sm:text-4xl">
                        {atracao?.nome}
                    </h1>
                </div>
                {atracao?.imagemAtracao?.length > 1 && (
                    <button
                        className="absolute top-1/2 z-10 transform -translate-y-1/2 text-white bg-[#FFD121] p-3 px-3 m-2 rounded-full opacity-90 hover:opacity-100 focus:outline-none"
                        onClick={prevSlide}
                    >
                        <CaretLeft size={14} />
                    </button>
                )}
                {atracao?.imagemAtracao?.length > 1 && (
                    <button
                        className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 text-white bg-[#FFD121] opacity-90 hover:opacity-100  p-3 px-3 m-2 rounded-full  focus:outline-none"
                        onClick={nextSlide}
                    >
                        <CaretRight size={14} />
                    </button>
                )}

                {atracao?.imagemAtracao?.length > 0 && (
                    <>
                        <img
                            src={atracao?.imagemAtracao[currentSlide]?.imagem}
                            alt={`Imagem ${currentSlide + 1}`}
                            className="object-cover w-full h-full sm:h-full "
                        />
                        <h3 className="text-xs sm:text-lg font-medium text-center italic ">
                            {atracao?.imagemAtracao[currentSlide]?.legendaImagem}
                        </h3>
                    </>
                )}
                <h3 className="text-xs sm:text-lg font-medium text-justify italic px-4 ">
                    {atracao?.legendaImagem}
                </h3>
            </div>

            <div className="">
                <div className="row m-8">
                    <div className="flex flex-col">
                        <p className="text-[#373636] italic text-xs sm:text-lg sm:px-16  font-normal pb-4">
                            {atracao?.nome}
                        </p>

                        <div className="row mb-3 flex justify-between">
                            <div className="flex flex-col">
                                <p className="text-[#373636] italic text-xs sm:text-lg sm:px-16  font-normal pb-4">
                                    {atracao?.nome}
                                </p>
                                <div className="d-flex justify-content-between">
                                    <div className="flex items-center">
                                        <Star
                                            size={20}
                                            weight="fill"
                                            className={`${avaliacoes.score >= 1
                                                ? "text-[#FFD121]"
                                                : "text-gray-300"
                                                }`}
                                        />
                                        <Star
                                            size={20}
                                            weight="fill"
                                            className={`${avaliacoes.score >= 2
                                                ? "text-[#FFD121]"
                                                : "text-gray-300"
                                                }`}
                                        />
                                        <Star
                                            size={20}
                                            weight="fill"
                                            className={`${avaliacoes.score >= 3
                                                ? "text-[#FFD121]"
                                                : "text-gray-300"
                                                }`}
                                        />
                                        <Star
                                            size={20}
                                            weight="fill"
                                            className={`${avaliacoes.score >= 4
                                                ? "text-[#FFD121]"
                                                : "text-gray-300"
                                                }`}
                                        />
                                        <Star
                                            size={20}
                                            weight="fill"
                                            className={`${avaliacoes.score === 5
                                                ? "text-[#FFD121]"
                                                : "text-gray-300"
                                                }`}
                                        />
                                        <h3 className="text-gray-800 text-xs pl-2">
                                            {avaliacoes.avaliacoes} avaliações
                                        </h3>
                                    </div>

                                    <div
                                        className="btn btn-warning"
                                        onClick={abrirFecharModalAvaliacao}
                                    >
                                        <button>Avaliar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="pb-4 border-[1.5px] border-[#000000]" />
                </div>

                <div>
                    <div>
                        <h2 className="text-[#373636] text-lg font-bold pt-4 sm:pt-14 sm:px-16 sm:text-2xl">
                            MAIS INFORMAÇÕES
                        </h2>

                        <div className="container px-4 pb-10 text-[#373636] text-sm sm:text-lg font-base sm:pt-6 pt-0 w-full max-w-full">
                            {atracao?.descricao.split("\n").map((paragrafo, index) => (
                                <React.Fragment key={index}>
                                    <p className="sm:px-14 pt-1 text-justify break-all">
                                        {paragrafo}
                                    </p>
                                </React.Fragment>
                            ))}
                        </div>

                        <hr className="pb-4 border-[1.5px] border-black  w-75 ml-auto" />
                    </div>
                </div>
                <div className="flex justify-center mb-3">
                    <h1 className="text-[#FFD121] sm:text-2xl text-sm font-bold sm:pl-6 pl-3 mb-2">
                        Avaliações da Atração
                    </h1>
                </div>

                {/* Avaliações */}


                <div className="container">
                    <div className="row d-flex justify-content-center g-4">
                        {displayedAvaliacoes.length > 0 ? (
                            displayedAvaliacoes.map((avaliacaoCompleta, index) => (
                                <div className="col-md-3 justify-center" key={index}>
                                    <div className="card m-1 justify-center w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                                        <article>
                                            <div className="flex items-center mb-3">
                                                <div className="w-10 h-10 me-3 rounded-full">
                                                    {avaliacaoCompleta.usuario.imagemPerfilUsuario ? (
                                                        <img
                                                            src={
                                                                avaliacaoCompleta.usuario.imagemPerfilUsuario
                                                            }
                                                            alt="Avatar"
                                                            className="rounded-full"
                                                        />
                                                    ) : (
                                                        <Xadrez />
                                                    )}
                                                </div>
                                                <div className="font-medium dark:text-black">
                                                    <p>
                                                        @{avaliacaoCompleta.usuario.nome}
                                                        <time
                                                            dateTime={
                                                                avaliacaoCompleta.avaliacao.dataAvaliacao
                                                            }
                                                            className="block text-sm text-gray-500 dark:text-gray-400"
                                                        >
                                                            {formatarDataParaExibicao(
                                                                avaliacaoCompleta.avaliacao.dataAvaliacao
                                                            )}
                                                        </time>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={20}
                                                        weight="fill"
                                                        className={`${i < parseInt(avaliacaoCompleta.avaliacao.nota)
                                                            ? "text-[#FFD121]"
                                                            : "text-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="mt-7 text-gray-500 dark:text-gray-400">
                                                {avaliacaoCompleta.avaliacao.comentario}
                                            </p>
                                        </article>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Nenhuma avaliação disponível.</p>
                        )}
                    </div>

                    {/* Navegação das avaliações */}
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={prevAvaliacoes}
                            className="mx-2 px-4 py-2 bg-gray-200 rounded-lg"
                            disabled={currentPage === 0}
                        >
                            <CaretLeft size={24} />
                        </button>
                        <button
                            onClick={nextAvaliacoes}
                            className="mx-2 px-4 py-2 bg-gray-200 rounded-lg"
                            disabled={
                                (currentPage + 1) * itemsPerPage >= avaliacoesCompletas.length
                            }
                        >
                            <CaretRight size={24} />
                        </button>
                    </div>
                </div>
                <div className="flex justify-end mr-12">
                    <div className="items-left">

                        <span
                            onClick={abrirFecharModalAvaliacoes}
                            className="mt-2 ml-5 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-blue-500"
                        >
                            Mais Avaliações
                        </span>

                    </div>
                </div>
                <div>
                    <div className="inline-flex items-center justify-center w-full p-4">
                        <hr className="w-full h-1 my-6 opacity-100 bg-[#FFD121] border-0 rounded" />
                        <div className="absolute justify-center items-center px-4 -translate-x-1/2 bg-white left-1/2">
                            <h1 className="text-[#373636] sm:text-2xl text-sm font-bold sm:pl-6 pl-3">
                                Mais Atrações
                            </h1>
                        </div>
                    </div>

                    <div className="row justify-center items-center m-2">
                        <div className="card rounded-none w-[352px] m-2">
                            <div className="w-[352px] h-[367px]">
                                <img src="..." className="card-img-top" alt="..." />
                            </div>
                            <div className="card-body">
                                <h2 className="mt-3 text-[#373636] text-xs sm:text-lg font-semibold">
                                    TÍTULO DO ANÚNCIO
                                </h2>
                                <p className="card-text mt-2 text-gray-500 dark:text-gray-400">
                                    breve resumo breve resumo breve resumo breve resumo breve
                                    resumo breve resumo breve resumo breve resumo{" "}
                                </p>
                            </div>

                            <div className="mt-4 flex justify-center">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary rounded-none h-10 w-40 text-black mb-6"
                                >
                                    Visualizar
                                </button>
                            </div>
                        </div>

                        <div className="card rounded-none w-[352px] m-2">
                            <div className="w-[352px] h-[367px]">
                                <img src="..." className="card-img-top" alt="..." />
                            </div>
                            <div className="card-body">
                                <h2 className="mt-3 text-[#373636] text-xs sm:text-lg font-semibold">
                                    TÍTULO DO ANÚNCIO
                                </h2>
                                <p className="card-text mt-2 text-gray-500 dark:text-gray-400">
                                    breve resumo breve resumo breve resumo breve resumo breve
                                    resumo breve resumo breve resumo breve resumo{" "}
                                </p>
                            </div>

                            <div className="mt-4 flex justify-center">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary rounded-none h-10 w-40 text-black mb-6"
                                >
                                    Visualizar
                                </button>
                            </div>
                        </div>

                        <div className="card rounded-none w-[352px] m-2">
                            <div className="w-[352px] h-[367px]">
                                <img src="..." className="card-img-top" alt="..." />
                            </div>
                            <div className="card-body">
                                <h2 className="mt-3 text-[#373636] text-xs sm:text-lg font-semibold">
                                    TÍTULO DO ANÚNCIO
                                </h2>
                                <p className="card-text mt-2 text-gray-500 dark:text-gray-400">
                                    breve resumo breve resumo breve resumo breve resumo breve
                                    resumo breve resumo breve resumo breve resumo{" "}
                                </p>
                            </div>

                            <div className="mt-4 flex justify-center">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary rounded-none h-10 w-40 text-black mb-6"
                                >
                                    Visualizar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <FooterUsr />
            <Modal isOpen={modalInserir}>
                <ModalBody>
                    <div className="m-2">
                        <div className="flex items-center mb-2">
                            <div className="w-10 h-10 mr-3 rounded-full">
                                {usuario?.imagemPerfilUsuario ? (
                                    <img
                                        src={usuario.imagemPerfilUsuario}
                                        alt="Avatar"
                                        className="rounded-full"
                                    />
                                ) : (
                                    <Xadrez />
                                )}
                            </div>

                            <div className="font-medium text-gray-500 ml-1">
                                <p>@{usuario?.nome}</p>
                            </div>
                            <div className="ml-auto">
                                <Comtur />
                            </div>
                        </div>

                        <div className="flex flex-col mt-4">
                            <label>Comentário:</label>
                            <textarea
                                className="form-control text-sm mt-2 "
                                onChange={(e) => setAvaliacaoComentario(e.target.value)}
                                placeholder="Deixe seu Comentário"
                            />

                            <br />

                            {/* Campo de Data removido da exibição */}
                            <input
                                hidden
                                type="text"
                                className="form-control text-sm"
                                readOnly
                                value={format(new Date(), "dd/MM/yyyy", { locale: ptBR })} // Mostra apenas a data
                            />

                            <h1 className="mb-2 text-black">Faça uma avaliação!</h1>
                            <h2 className="mb-2  text-gray-500">
                                Compartilhe sua experiência para ajudar outras pessoas
                            </h2>

                            <div className="flex items-center mt-2">
                                <div className="flex flex-row w-full justify-start items-center text-[#FFD121]">
                                    {[1, 2, 3, 4, 5].map((starIndex) => (
                                        <Star
                                            key={starIndex}
                                            size={30}
                                            weight="fill"
                                            className={
                                                starIndex <= avaliacaoNota
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                            }
                                            onClick={() => handleStarClick(starIndex)}
                                            style={{ cursor: "pointer" }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                className="btn btnavaliar bg-yellow-400 rounded-md mr-1"
                                onClick={pedidoPostAvaliacao} // Chama a função diretamente
                            >
                                Avaliar
                            </button>

                            <button
                                className="btn btncancelarmodal"
                                onClick={abrirFecharModalAvaliacao}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>


            {/* todas as avaliações/editar/excluir */}

            <Modal className="modal-xl-gridxl" style={{ maxWidth: "500px" }} isOpen={modalAvaliacoes} toggle={abrirFecharModalAvaliacoes}>
                <ModalBody style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                    <div className="container">
                        {avaliacoesCompletas.length > 0 ? (
                            avaliacoesCompletas.map((avaliacaoCompleta, index) => (
                                <div className="col-md-12" key={index}>
                                    <div className="card-auto">
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="mr-3">
                                                    {avaliacaoCompleta.usuario.imagemPerfilUsuario ? (
                                                        <img
                                                            src={avaliacaoCompleta.usuario.imagemPerfilUsuario}
                                                            alt="Avatar"
                                                            className="rounded-full w-10 h-10"
                                                        />
                                                    ) : (
                                                        <Xadrez />
                                                    )}
                                                </div>
                                                <div>
                                                    <h5 className="mb-0">@{avaliacaoCompleta.usuario.nome}</h5>
                                                    <small className="text-muted">
                                                        {formatarDataParaExibicao(avaliacaoCompleta.avaliacao.dataAvaliacao)}
                                                    </small>
                                                </div>
                                                {/* Verificação do ID do usuário logado */}
                                                {localStorage.getItem("id") == avaliacaoCompleta.usuario.id && (
                                                    <div className="ml-auto d-flex">
                                                        <NotePencil
                                                            size={18}
                                                            className="me-2 cursor-pointer"
                                                            onClick={() => toggleEdit(index)}
                                                        />
                                                        <Trash
                                                            size={18}
                                                            className="cursor-pointer"
                                                            onClick={() => pedidoDeletar(avaliacaoCompleta.avaliacao.id)}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            {avaliacaoCompleta.editMode ? (
                                                <>
                                                    <textarea
                                                        className="form-control text-sm mt-2"
                                                        value={avaliacaoCompleta.avaliacao.comentario}
                                                        onChange={(e) => handleComentarioChange(index, e.target.value)}
                                                        placeholder="Deixe seu Comentário"
                                                    />
                                                    <div className="flex items-center mt-2">
                                                        {[1, 2, 3, 4, 5].map((starIndex) => (
                                                            <Star
                                                                key={starIndex}
                                                                weight="fill"
                                                                size={20}
                                                                className={starIndex <= avaliacaoCompleta.avaliacao.nota ? "text-yellow-400" : "text-gray-300"}
                                                                onClick={() => handleStarClickEdit(index, starIndex)} // Chama a função para atualizar a nota
                                                                style={{ cursor: "pointer" }}
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                        <button type="button" className="btn bg-yellow-400 btn-sm rounded-md" onClick={() => selecionarAvaliacao(avaliacaoCompleta.avaliacao.id)}>
                                                            Salvar
                                                        </button>
                                                        <button type="button" className="btn bg-gray-300 btn-sm rounded-md" onClick={() => cancelarEdicao(index)}>
                                                            Cancelar
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="mt-3 ml-3 flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={12}
                                                                weight="fill"
                                                                className={`${i < parseInt(avaliacaoCompleta.avaliacao.nota) ? "text-[#FFD121]" : "text-gray-300"}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="mt-2 ml-3">{avaliacaoCompleta.avaliacao.comentario}</p>
                                                </>
                                            )}
                                            <hr className="pb-3 border-[1.5px] border-[#000000] mt-2" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Nenhuma avaliação disponível.</p>
                        )}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn bg-yellow-400 rounded-md" onClick={abrirFecharModalAvaliacoes}>
                        Fechar
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    );
}