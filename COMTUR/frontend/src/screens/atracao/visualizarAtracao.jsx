import { useState, useEffect } from "react";
import axios from "axios";
import NavbarUsr from "../../components/user/navbarUsr";
import FooterUsr from "../../components/user/footerUsr";
import { useParams, useNavigate } from "react-router-dom";
import { CaretRight, CaretLeft } from "@phosphor-icons/react";
import React from "react";
import "../atracao/index.css"
import Estrela from "../../assets/estrela";
import Estrelasemcor from "../../assets/Estrelasemcor";
import Xadrez from "../../assets/xadrez";
import Quadrado from "../../assets/Quadrado";
import Comtur from "../../assets/Comtur"
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";


export default function VisualizarAtracao() {
    const { id } = useParams();
    const [atracao, setAtracao] = useState(null);
    const baseUrl = "https://localhost:7256/api/Atracao";
    const imagensUrl = `https://localhost:7256/api/ImagemAtracao/${id}`
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [outrasAtracoes, setOutrasAtracoes] = useState([]);
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const [modalAvaliacao, setModalAvaliacao] = useState(false);


    const abrirFecharModalAvaliacao = () => {
        setModalAvaliacao(!modalAvaliacao);
      };
    useEffect(() => {
        // Função para buscar os detalhes da atração pelo ID
        const buscarAtracao = async () => {
            try {
                const response = await axios.get(baseUrl + `/${id}`);
                // Corrigindo a atribuição dos dados da atração
                setAtracao(response.data);
                console.log("Atração recebida:", response.data);
            } catch (error) {
                console.error("Erro ao buscar atração:", error);
            }
        };
        buscarAtracao();
    }, [id]);
    if (!atracao) {
        return <h2>Carregando...</h2>;
    }
    const nextSlide = () => {
        if (atracao.imagemAtracao.length > 1) {
            setCurrentSlide((prev) => (prev === atracao.imagemAtracao.length - 1 ? 0 : prev + 1));
        }
    };
    const prevSlide = () => {
        if (atracao.imagemAtracao.length > 1) {
            setCurrentSlide((prev) => (prev === 0 ? atracao.imagemAtracao.length - 1 : prev - 1));
        }
    };
    const VisualizarTodasAtracoes = () => {
        navigate(`/todasatracoes`);
    }
    return (
        <div>
            <NavbarUsr />

            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] mb-10">
                <div className="flex flex-col px-4 sm:pl-24 sm:pr-24">
                    <h1 className="text-[#373636] mb-3 text-lg font-extrabold pt-4 sm:pt-14 sm:px-16 sm:text-4xl">
                        {atracao.nome}
                    </h1>
                </div>
                {atracao.imagemAtracao?.length > 1 && (
                    <button
                        className="absolute top-1/2 z-10 transform -translate-y-1/2 text-white bg-[#FFD121] p-3 px-3 m-2 rounded-full opacity-90 hover:opacity-100 focus:outline-none"
                        onClick={prevSlide}
                    >
                        <CaretLeft size={14} />
                    </button>
                )}
                {atracao.imagemAtracao?.length > 1 && (
                    <button
                        className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 text-white bg-[#FFD121] opacity-90 hover:opacity-100  p-3 px-3 m-2 rounded-full  focus:outline-none"
                        onClick={nextSlide}
                    >
                        <CaretRight size={14} />
                    </button>
                )}

                {atracao.imagemAtracao?.length > 0 && (
                    <>
                        <img
                            src={atracao.imagemAtracao[currentSlide]?.imagem}
                            alt={`Imagem ${currentSlide + 1}`}
                            className="object-cover w-full h-full sm:h-full "
                        />
                        <h3 className="text-xs sm:text-lg font-medium text-center italic ">
                            {atracao.imagemAtracao[currentSlide]?.legendaImagem}
                        </h3>
                    </>
                )}
                <h3 className="text-xs sm:text-lg font-medium text-justify italic px-4 ">
                    {atracao.legendaImagem}
                </h3>
            </div>

            <div className="">
                <div className="row m-8">
                    <div className="flex flex-col">
                        <p className="text-[#373636] italic text-xs sm:text-lg sm:px-16  font-normal pb-4">
                            {atracao.nome}
                        </p>

                        <div className="row mb-3 flex justify-between">
                            <div className="flex flex-col">
                                <p className="text-[#373636] italic text-xs sm:text-lg sm:px-16  font-normal pb-4">
                                    {atracao.nome}
                                </p>
                                <div class="d-flex justify-content-between">
                                    <div class="flex items-center">
                                        <Estrela />
                                        <Estrela />
                                        <Estrela />
                                        <Estrela />
                                        <Estrelasemcor />
                                        <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">44</p>
                                        <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">Avaliações</p>
                                    </div>


                                    <div className="btn bg-light" onClick={abrirFecharModalAvaliacao}>
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
                            {atracao.descricao.split("\n").map((paragrafo, index) => (
                                <React.Fragment key={index}>
                                    <p className="sm:px-14 pt-1 text-justify break-all">{paragrafo}</p>
                                </React.Fragment>
                            ))}
                        </div>

                        <hr class="pb-4 border-[1.5px] border-black  w-75 ml-auto" />
                    </div>
                </div>
                <div className="flex justify-center mb-3">
                    <h1 className="text-[#FFD121] sm:text-2xl text-sm font-bold sm:pl-6 pl-3">Avaliações da atração</h1>
                </div>

                <div className="container m-auto flex justify-center ">
                    <div class="card m-2 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                        <article>
                            <div class="flex items-center mb-3">
                                <div className="w-10 h-10 me-4 rounded-full" >

                                    <Xadrez />
                                </div>
                                <div class="font-medium dark:text-white">
                                    <p>@User <time datetime="2014-08-16 19:00" class="block text-sm text-gray-500 dark:text-gray-400">Aqui vai a data</time></p>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <Estrela />
                                <Estrela />
                                <Estrela />
                                <Estrela />
                                <Estrelasemcor />
                            </div>


                            <p class="mt-7 text-gray-500 dark:text-gray-400">Paragráfo com comentário</p>

                        </article>

                    </div>
                    <div class="card m-2 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                        <article>
                            <div class="flex items-center mb-3">
                                <div className="w-10 h-10 me-4 rounded-full" >

                                    <Xadrez />
                                </div>
                                <div class="font-medium dark:text-white">
                                    <p>@User <time datetime="2014-08-16 19:00" class="block text-sm text-gray-500 dark:text-gray-400">Aqui vai a data</time></p>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <Estrela />
                                <Estrela />
                                <Estrela />
                                <Estrela />
                                <Estrelasemcor />
                            </div>


                            <p class="mt-7 text-gray-500 dark:text-gray-400">Paragráfo com comentário</p>

                        </article>

                    </div>
                    <div class="card m-2 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                        <article>
                            <div class="flex items-center mb-3">
                                <div className="w-10 h-10 me-4 rounded-full" >

                                    <Xadrez />
                                </div>
                                <div class="font-medium dark:text-white">
                                    <p>@User <time datetime="2014-08-16 19:00" class="block text-sm text-gray-500 dark:text-gray-400">Aqui vai a data</time></p>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <Estrela />
                                <Estrela />
                                <Estrela />
                                <Estrela />
                                <Estrelasemcor />
                            </div>


                            <p class="mt-7 text-gray-500 dark:text-gray-400">Paragráfo com comentário</p>

                        </article>

                    </div>

                </div>
                <div class="flex justify-end mr-12">
                    <div class="items-left">
                        <p class="mt-2 ml-5 text-gray-500 dark:text-gray-400">Mais Avaliações</p>
                    </div>
                </div>
                <div>


                    <div className="inline-flex items-center justify-center w-full p-4">
                        <hr className="w-full h-1 my-6 opacity-100 bg-[#FFD121] border-0 rounded" />
                        <div className="absolute justify-center items-center px-4 -translate-x-1/2 bg-white left-1/2">
                            <h1 className="text-[#373636] sm:text-2xl text-sm font-bold sm:pl-6 pl-3">Outras Atrações</h1>
                        </div>
                    </div>


                    <div className="container mb-5 m-auto flex justify-center ">
                        <div class="card m-2 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                            <article>
                                <div class="flex items-center ">

                                    <Quadrado />


                                </div>
                                <div>
                                    <h2 className="mt-3 text-[#373636] text-xs sm:text-lg font-semibold">TÍTULO DA ATRAÇÃO</h2>
                                    <p class="mt-2 text-gray-500 dark:text-gray-400">BREVE RESUMO </p>
                                </div>
                                <div className="mt-4  flex justify-center">
                                    <button className="h-10 w-40 bg-light borda text-black">Avaliar</button>
                                </div>
                            </article>

                        </div>
                        <div class="card m-2 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                            <article>
                                <div class="flex items-center ">

                                    <Quadrado />


                                </div>
                                <div>
                                    <h2 className="mt-3 text-[#373636] text-xs sm:text-lg font-semibold">TÍTULO DA ATRAÇÃO</h2>
                                    <p class="mt-2 text-gray-500 dark:text-gray-400">BREVE RESUMO </p>
                                </div>
                                <div className="mt-4  flex justify-center">
                                    <button className="h-10 w-40 bg-light borda text-black">Avaliar</button>
                                </div>
                            </article>

                        </div>
                        <div class="card m-2 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                            <article>
                                <div class="flex items-center ">

                                    <Quadrado />


                                </div>
                                <div>
                                    <h2 className="mt-3 text-[#373636] text-xs sm:text-lg font-semibold">TÍTULO DA ATRAÇÃO</h2>
                                    <p class="mt-2 text-gray-500 dark:text-gray-400">BREVE RESUMO </p>
                                </div>
                                <div className="mt-4  flex justify-center">
                                    <button className="h-10 w-40 bg-light borda text-black">Avaliar</button>
                                </div>
                            </article>

                        </div>
                    </div>
                </div>

                {/* <div className="pt-5 pb-5 px-2 text-xs sm:pl-32 sm:pr-32 sm:min-w-[320px] lg:w-[90%] xl:w-[80%] 2xl:w-[70%]">
                        {outrasAtracoes.map((outraAtracao) => (
                            <div key={outraAtracao.id} className="p-4">
                                <div className="grid grid-cols-2 h-[140px] sm:h-[300px] border-2 border-[#DBDBDB]">
                                    {outraAtracao.imagemNoticia[0] && (
                                        <img
                                            src={outraAtracao.imagemNoticia[0]?.imagem}
                                            alt="Preview"
                                            className="flex w-full h-[136px] sm:h-[290px]"
                                        />
                                    )}
                                    <div className="pl-6 pt-3">
                                        <h2 className=" truncate pr-6 text-[#373636] text-ellipsis overflow-hidden font-semibold text-xs sm:text-base uppercase">
                                            {outraAtracao.nome}
                                        </h2>
                                        <h2 className="truncate pr-6 pt-1 text-[#373636] font-normal text-xs sm:text-bas">
                                            {outraAtracao.descricao
                                            }
                                        </h2>
                                        <div className="flex">
                                            <button className="mt-6 bg-[#FFD121] text-xs sm:text-bas text-[#373636]
                    font-medium hover:bg-black hover:text-white w-20 h-6 sm:w-32 sm:h-10"
                                                onClick={() => {
                                                    navigate(`/visualizarAtracao/${outraAtracao.id}`);
                                                    window.location.reload();
                                                }}
                                            >Leia Mais
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex items-center justify-center">
                            <BtnAcao
                                funcao={() => VisualizarTodasAtracoes()}
                                acao="VisualizarMais"
                            />
                        </div>
                    </div> */}

            </div>
            <FooterUsr />
            <Modal isOpen={modalAvaliacao}>
          <ModalHeader><div class="position-absolute top-0 end-0 mr-4 mt-2 "><Comtur /> </div></ModalHeader>
          <ModalBody>
          <div class="flex items-center mb-3">
                                <div className="w-10 h-10 me-4 rounded-full" >

                                    <Xadrez />
                                </div>
                                <div class="font-medium dark:text-white">
                                    <p>@User</p>
                                </div>
                            </div>
                            <textarea
                    className="form-control text-sm"

                    placeholder="Deixe um comentário"
                  />
                            <p class="mt-2 text-gray-500 dark:text-gray-400">Faça uma avalição!</p>
                            <div class="flex items-center">
                                <Estrela />
                                <Estrela />
                                <Estrela />
                                <Estrela />
                                <Estrelasemcor />
                            </div>

          </ModalBody>
          <ModalFooter>
            
            <button className="btn btnavaliar">
              Avaliar
            </button>
            {"  "}
            <button
              className="btn btncancelarmodal"
              onClick={() => abrirFecharModalAvaliacao()}
            >
              Cancelar
            </button>

          </ModalFooter>
        </Modal>
        </div>
    );
}