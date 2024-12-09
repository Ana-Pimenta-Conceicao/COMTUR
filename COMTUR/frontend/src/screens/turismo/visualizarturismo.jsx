import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarUsr from "../../components/user/navbarUsr.jsx";
import FooterUsr from "../../components/user/footerUsr.jsx";
import { useParams, useNavigate } from "react-router-dom";
import BtnAcao from "../../components/botoes/btnAcao.jsx";
import { CaretRight, CaretLeft, Star, MapPinLine, Clock, CalendarCheck, NotePencil, Trash, X } from "@phosphor-icons/react";
import GaleriaAtracao from "../../components/cards/GaleriaAtracao";
import iconemodallogin from '../../assets/loginmodal.svg';

import Xadrez from "../../assets/xadrez";
import Comtur from "../../assets/Comtur";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function VisualizarTurismos() {
  const { id } = useParams();
  const [turismo, setTurismo] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const [outrosTurismos, setOutrosTurismos] = useState([]);

  const imagensUrl = `https://localhost:7256/api/ImagemTurismo/${id}`;
  const usuarioUrl = "https://localhost:7256/api/Usuario";
  const avaliacaoUrl = "https://localhost:7256/api/Avaliacao";
  const avaliacaoTurismoUrl = "https://localhost:7256/api/AvaliacaoTurismo";

  const [modalInserir, setModalInserir] = useState(false);
  const [atualizarScoreAvaliacoes, setAtualizarScoreAvaliacoes] = useState(true);

  const baseUrl = "https://localhost:7256/api/Turismo";

  //aqui 
  const [modalLogin, setModalLogin] = useState(false);
  const abrirModalLogin = () => setModalLogin(true);
  const fecharModalLogin = () => setModalLogin(false);

  //ate aqui

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

  const [avaliacoesTurismo, setAvaliacoesTurismo] = useState([]);

  const [avaliacoesCompletas, setAvaliacoesCompletas] = useState([]);

  const [modalAvaliacoes, setModalAvaliacoes] = useState(false);

  const abrirFecharModalAvaliacoes = () => {
    setModalAvaliacoes(!modalAvaliacoes);
  };

  // Função para verificar se o usuário está logado
  const isUserLoggedIn = () => {
    return localStorage.getItem("id") !== null; // Ajuste conforme sua lógica de autenticação
  };

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      const avaliacoesData = await Promise.all(
        avaliacoesTurismo.map(async (avaliacaoTurismo) => {
          const avaliacao = await pedidoGetAvaliacao(
            avaliacaoTurismo.idAvaliacao
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

    if (avaliacoesTurismo.length > 0) {
      fetchAvaliacoes();
    }
  }, [avaliacoesTurismo]);

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
      await pedidoPostAvaliacaoTurismo(response.data.id);

      abrirFecharModalInserir();
      limparDados();
      setAtualizarScoreAvaliacoes(true);
    } catch (error) {
      console.log(error);
    }
  };

  const pedidoPostAvaliacaoTurismo = async (idAvaliacao) => {
    const formData = new FormData();
    formData.append("idAvaliacao", idAvaliacao);
    formData.append("idTurismo", id);
    formData.append("status", 1);

    try {
      const response = await axios.post(avaliacaoTurismoUrl, formData, {
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
      .get(`${avaliacaoTurismoUrl}/Turismo/${id}/Score`)
      .then((response) => {
        setAvaliacoes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pedidoDeletar = async (id) => {
    const avaliacaoIdFinal = id || avaliacaoId;

    if (!avaliacaoIdFinal) {
      console.error("ID inválido para exclusão.");
      return;
    }

    try {
      await axios.delete(`${avaliacaoUrl}/${avaliacaoIdFinal}`);
      console.log("Avaliação excluída com sucesso.");
      setAtualizarScoreAvaliacoes(true);
      await pedidoGetAvaliacoesTurismo();
    } catch (error) {
      console.error("Erro ao excluir avaliação:", error.message);
    }
  };


  const pedidoGetAvaliacoesTurismo = async () => {
    await axios
      .get(`${avaliacaoTurismoUrl}/Turismo/${id}`)
      .then((response) => {
        setAvaliacoesTurismo(response.data);
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

  const pedidoGetAvaliacaoTurismoPorIdAvaliacao = async (id) => {
    var data = {};
    await axios
      .get(`${avaliacaoTurismoUrl}/Avaliacao/${id}`)
      .then((response) => {
        data = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    return data;
  };

  const pedidoDeletarAvaliacaoTurismo = async (id) => {
    await axios
      .delete(`${avaliacaoTurismoUrl}/${id}`)
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
      pedidoGetAvaliacoesTurismo();

      setAtualizarScoreAvaliacoes(false);
    }
  }, [atualizarScoreAvaliacoes]);

  useEffect(() => {
    const idTipoUsuarioAPI = localStorage.getItem("id");
    setIdUsuario(idTipoUsuarioAPI);
  }, []);



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

  useEffect(() => {
    const obterDetalhesTurismo = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${id}`);
        setTurismo(response.data);
      } catch (error) {
        console.error("Erro ao obter detalhes do turismo:", error);
      }
    };

    const obterOutrosTurismos = async () => {
      try {
        const response = await axios.get(baseUrl);
        setOutrosTurismos(
          response.data.filter((t) => t.id !== parseInt(id)).slice(0, 3)
        );
      } catch (error) {
        console.error("Erro ao obter outros turismos:", error);
      }
    };

    obterDetalhesTurismo();
    obterOutrosTurismos();
  }, [id]);

  const nextSlide = () => {
    if (turismo && turismo.imagemTurismo.length > 1) {
      setCurrentSlide((prev) =>
        prev === turismo.imagemTurismo.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevSlide = () => {
    if (turismo && turismo.imagemTurismo.length > 1) {
      setCurrentSlide((prev) =>
        prev === 0 ? turismo.imagemTurismo.length - 1 : prev - 1
      );
    }
  };

  const abrirGoogleMaps = (local) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${local}`,
      "_blank"
    );
  };

  return (
    <div>
      <NavbarUsr />
      <div className="flex flex-col ">

        {turismo ? (
          <>
            <h1 className="text-[#373636] text-lg font-bold pt-4 px-4 m:pt-14 sm:px-16 sm:text-4xl sm:pb-4">
              {turismo.nome}
            </h1>
            <div className="px-4  sm:pl-24 sm:pr-24">
              <div className="container px-0 mt-2 border">
                <div className="relative w-full h-[200px] sm:h-[400px] lg:h-[500px] mb-8">
                  {turismo.imagemTurismo.length > 1 && (
                    <button
                      className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2 text-white bg-[#58AFAE] p-2 m-2 rounded-full opacity-90 hover:opacity-100 focus:outline-none"
                      onClick={prevSlide}
                    >
                      <CaretLeft size={24} />
                    </button>
                  )}

                  {turismo.imagemTurismo.length > 1 && (
                    <button
                      className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 text-white bg-[#58AFAE] opacity-90 hover:opacity-100 p-2 m-2 rounded-full focus:outline-none"
                      onClick={nextSlide}
                    >
                      <CaretRight size={24} />
                    </button>
                  )}

                  {turismo.imagemTurismo.length > 0 && (
                    <>
                      <img
                        src={turismo.imagemTurismo[currentSlide].imagem}
                        alt={`Imagem ${currentSlide + 1}`}
                        className="object-cover w-full h-full"
                      />
                      <h3 className="pt-1 text-xs italic font-medium text-center sm:text-lg">
                        {turismo.imagemTurismo[currentSlide].legendaImagem}
                      </h3>
                    </>
                  )}
                </div>

                {/* mexer aqui */}
                <div className="mx-8 row pt-3 sm:pt-20">
                  <div className="flex flex-col">
                    <div className="flex justify-between mb-3 row">
                      <div className="flex flex-col">
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
                            <h3 className="pl-2 text-xs text-gray-800">
                              {avaliacoes.avaliacoes} avaliações
                            </h3>
                          </div>

                          <div
                            className="btn btn-warning"
                            onClick={() => {
                              if (isUserLoggedIn()) {
                                abrirFecharModalAvaliacao();
                              } else {
                                abrirModalLogin(); // Função para abrir a modal de login
                              }
                            }}
                          >
                            <button>Avaliar</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* ate aqui  */}
                <div className="flex items-center justify-center w-full pt-2">
                  <hr className="w-11/12 mb-2 h-[1px] text-[#58AFAE] rounded" />
                </div>

                <div className="sm:px-16 ">
                  <div className="flex flex-row items-center gap-2 ml-6 text-sm text-white">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${turismo.local}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="flex justify-center items-center bg-[#064D56] w-[30px] h-6 rounded-md">
                        <MapPinLine size={18} />
                      </button>
                    </a>
                    <button
                      className="flex items-center justify-start w-full h-6 pl-1 text-xs text-gray-900 flex-start"
                      onClick={() => abrirGoogleMaps(turismo.local)}
                    >
                      {turismo.local}
                    </button>
                  </div>

                  <div className="flex flex-row items-center gap-2 pt-2 ml-6 text-white">
                    <button className="flex justify-center items-center w-[30px]  bg-[#064D56] h-6 rounded-md">
                      <CalendarCheck size={18} />
                    </button>
                    <button className="flex items-center justify-start w-full h-6 pl-1 text-xs text-gray-900 flex-start">
                      {turismo.diaFuncionamento}
                    </button>
                  </div>

                  <div className="flex flex-row items-center gap-2 pt-2 pb-4 ml-6 text-white">
                    <button className="flex justify-center items-center w-[30px]  bg-[#064D56] h-6 rounded-md">
                      <Clock size={18} />
                    </button>
                    <button className="flex items-center justify-start w-full h-6 pl-1 text-xs text-gray-900 flex-start">
                      {turismo.horario}
                    </button>
                  </div>
                </div>
                <hr className="flex float-right w-3/4 pb-4 text-[#58AFAE]  border-[1.5px]" />
                <h3 className="flex w-full pl-3 mt-4 text-sm font-semibold sm:font-bold sm:text-lg sm:pl-6">
                  Mais informações sobre o(a) {turismo.nome}{" "}
                </h3>
                <p className="pt-1 sm:pt-6 pl-4 sm:pl-8 pb-3 text-[#373636] text-xs sm:text-lg font-base  text-justify">
                  {turismo.descricao}
                </p>
              </div>
            </div>

            <div className="pb-12">


              <div className="flex justify-center m-6">
                <h1 className="text-[#FFD121] sm:text-2xl text-sm font-bold sm:pl-6 pl-3 mb-2">
                  Avaliações do Turismo
                </h1>
              </div>

              {/* Avaliações */}


              <div className="container">
                <div className="row d-flex justify-content-center g-4">
                  {displayedAvaliacoes.length > 0 ? (
                    displayedAvaliacoes.map((avaliacaoCompleta, index) => (
                      <div className="justify-center col-md-3" key={index}>
                        <div className="justify-center w-full max-w-sm p-4 m-1 bg-white border border-gray-200 rounded-lg shadow card sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                          <article>
                            <div className="flex items-center mb-3">
                              <div className="w-10 h-10 rounded-full me-3">
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
                            <p className="text-gray-500 mt-7 dark:text-gray-400">
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
                    className="px-4 py-2 mx-2 bg-gray-200 rounded-lg"
                    disabled={currentPage === 0}
                  >
                    <CaretLeft size={24} />
                  </button>
                  <button
                    onClick={nextAvaliacoes}
                    className="px-4 py-2 mx-2 bg-gray-200 rounded-lg"
                    disabled={
                      (currentPage + 1) * itemsPerPage >= avaliacoesCompletas.length
                    }
                  >
                    <CaretRight size={24} />
                  </button>
                </div>

                <div className="flex justify-end pt-8 mr-12">
                  <div className="items-left">

                    <span
                      onClick={abrirFecharModalAvaliacoes}
                      className="mt-2 ml-5 text-gray-500 cursor-pointer dark:text-gray-400 hover:text-blue-500"
                    >
                      Mais Avaliações
                    </span>

                  </div>
                </div>
              </div>
              {/* <div>
                    <div className="inline-flex items-center justify-center w-full p-4">
                        <hr className="w-full h-1 my-6 opacity-100 bg-[#FFD121] border-0 rounded" />
                        <div className="absolute items-center justify-center px-4 -translate-x-1/2 bg-white left-1/2">
                            <h1 className="text-[#373636] sm:text-2xl text-sm font-bold sm:pl-6 pl-3">
                                Mais Atrações
                            </h1>
                        </div>
                    </div>

                    <div className="items-center justify-center m-2 row">
                        <div className="card rounded-none w-[352px] m-2">
                            <div className="w-[352px] h-[367px]">
                                <img src="..." className="card-img-top" alt="..." />
                            </div>
                            <div className="card-body">
                                <h2 className="mt-3 text-[#373636] text-xs sm:text-lg font-semibold">
                                    TÍTULO DO ANÚNCIO
                                </h2>
                                <p className="mt-2 text-gray-500 card-text dark:text-gray-400">
                                    breve resumo breve resumo breve resumo breve resumo breve
                                    resumo breve resumo breve resumo breve resumo{" "}
                                </p>
                            </div>

                            <div className="flex justify-center mt-4">
                                <button
                                    type="button"
                                    className="w-40 h-10 mb-6 text-black rounded-none btn btn-outline-secondary"
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
                                <p className="mt-2 text-gray-500 card-text dark:text-gray-400">
                                    breve resumo breve resumo breve resumo breve resumo breve
                                    resumo breve resumo breve resumo breve resumo{" "}
                                </p>
                            </div>

                            <div className="flex justify-center mt-4">
                                <button
                                    type="button"
                                    className="w-40 h-10 mb-6 text-black rounded-none btn btn-outline-secondary"
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
                                <p className="mt-2 text-gray-500 card-text dark:text-gray-400">
                                    breve resumo breve resumo breve resumo breve resumo breve
                                    resumo breve resumo breve resumo breve resumo{" "}
                                </p>
                            </div>

                            <div className="flex justify-center mt-4">
                                <button
                                    type="button"
                                    className="w-40 h-10 mb-6 text-black rounded-none btn btn-outline-secondary"
                                >
                                    Visualizar
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}

            </div>



            <div className="flex w-full justify-center items-center mt-3 mb-4 bg-[#064D56]  h-[330px]">
              <div className="flex flex-col w-full">
                <h2 className="pb-3 text-base font-bold text-center text-white">
                  GALERIA DE ATRAÇÕES
                </h2>
                <GaleriaAtracao identi={turismo.id} />
              </div>
            </div>

            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-full h-1 my-8 opacity-100 bg-[#FFD121] border-0 rounded" />
              <div className="absolute items-center justify-center px-4 -translate-x-1/2 bg-white left-1/2">
                <h1 className="text-[#373636] text-2xl font-bold pl-6">MAIS</h1>
                <h1 className="text-[#373636] text-2xl font-bold">TURISMOS</h1>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="pt-5 pb-5 px-2 text-xs sm:pl-32 sm:pr-32 sm:min-w-[320px] lg:w-[90%] xl:w-[80%] 2xl:w-[70%]">
                {outrosTurismos.map((outroTurismo) => (
                  <div key={outroTurismo.id} className="p-4">
                    <div className="grid grid-cols-2 h-[140px] sm:h-[300px] border-2 border-[#DBDBDB]">
                      {outroTurismo.imagemTurismo[0] && (
                        <img
                          src={outroTurismo.imagemTurismo[0]?.imagem}
                          alt="Preview"
                          className="w-full h-[140px] sm:h-[296px] object-cover"
                        />
                      )}
                      <div className="pt-3 pl-6">
                        <h2 className="truncate pr-6 text-[#373636] text-ellipsis overflow-hidden font-semibold text-xs sm:text-base uppercase">
                          {outroTurismo.nome}
                        </h2>
                        <h2 className="truncate pr-6 pt-1 text-[#373636] font-normal text-xs sm:text-base">
                          {outroTurismo.descricao}
                        </h2>
                        <div className="flex">
                          <button
                            className="mt-6 bg-[#FFD121] text-xs sm:text-base text-[#373636] font-medium hover:bg-black hover:text-white w-20 h-6 sm:w-32 sm:h-10"
                            onClick={() =>
                              navigate(`/visualizarTurismo/${outroTurismo.id}`)
                            }
                          >
                            Leia Mais
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-center">
                  <BtnAcao
                    funcao={() => navigate("/todosTurismos")}
                    acao="VisualizarMais"
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Carregando...</p>
        )}
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

              <div className="ml-1 font-medium text-gray-500">
                <p>@{usuario?.nome}</p>
              </div>
              <div className="ml-auto">
                <Comtur />
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <label>Comentário:</label>
              <textarea
                className="mt-2 text-sm form-control "
                onChange={(e) => setAvaliacaoComentario(e.target.value)}
                placeholder="Deixe seu Comentário"
              />

              <br />

              {/* Campo de Data removido da exibição */}
              <input
                hidden
                type="text"
                className="text-sm form-control"
                readOnly
                value={format(new Date(), "dd/MM/yyyy", { locale: ptBR })} // Mostra apenas a data
              />

              <h1 className="mb-2 text-black">Faça uma avaliação!</h1>
              <h2 className="mb-2 text-gray-500">
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
                className="mr-1 bg-yellow-400 rounded-md btn btnavaliar"
                onClick={() => {
                  if (!avaliacaoComentario && !avaliacaoNota) {
                    // Caso ambos os campos estejam vazios
                    alert("Por favor, deixe seu comentário e selecione a quantidade de estrelas!");
                  } else if (!avaliacaoComentario) {
                    // Caso apenas o comentário esteja vazio
                    alert("Por favor, deixe um comentário!");
                  } else if (!avaliacaoNota) {
                    // Caso apenas a nota esteja vazia
                    alert("Por favor, selecione a quantidade de estrelas!");
                  } else {
                    pedidoPostAvaliacao(); // Se ambos os campos estiverem preenchidos
                  }
                }}
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
                              className="w-10 h-10 rounded-full"
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
                              className="cursor-pointer me-2"
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
                            className="mt-2 text-sm form-control"
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
                          <div className="gap-2 d-grid d-md-flex justify-content-md-end">
                            <button type="button" className="bg-yellow-400 rounded-md btn btn-sm" onClick={() => selecionarAvaliacao(avaliacaoCompleta.avaliacao.id)}>
                              Salvar
                            </button>
                            <button type="button" className="bg-gray-300 rounded-md btn btn-sm" onClick={() => cancelarEdicao(index)}>
                              Cancelar
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex mt-3 ml-3">
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
          <button className="bg-yellow-400 rounded-md btn" onClick={abrirFecharModalAvaliacoes}>
            Fechar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalLogin} toggle={fecharModalLogin}>
        <ModalBody>
          <div className="flex justify-end w-full">
            {/* Botão de Fechar */}
            <button
              onClick={fecharModalLogin} // Usa a função de fechamento
              aria-label="Fechar"
              className="bg-transparent border-0"
            >
              <X size={22} />
            </button>
          </div>
          <div className="flex justify-center w-full">
            <img className="" src={iconemodallogin} alt="icone login" />
          </div>
          <h3 className="text-center mt-2">É necessário fazer login</h3>
          <p className="text-center">
            Para avaliar, acesse sua conta ou cadastre-se!
          </p>
          <div className="flex justify-center mt-4">
            <button
              className="btn btn-warning"
              onClick={() => {
                fecharModalLogin();
                navigate("/login"); // Redireciona para a página de login
              }}
            >
              Continuar
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}