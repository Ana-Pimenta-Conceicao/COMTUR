import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarUsr from "../../components/user/navbarUsr";
import FooterUsr from "../../components/user/footerUsr";
import { useParams, useNavigate } from "react-router-dom";


export default function TodasNoticias() {
    const { id } = useParams(); // UseParams para obter parâmetros da URL
    const [noticia, setNoticia] = useState([]);
    const [outrasNoticias, setOutrasNoticias] = useState([]);
    const navigate = useNavigate();
    const baseUrl = "https://localhost:7256/api/Noticia";
    const imagensUrl = `https://localhost:7256/api/ImagemNoticia/${id}`;
    const [currentNoticiaIndex, setCurrentNoticiaIndex] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [atualizarOutrasNoticias, setAtualizarOutrasNoticias] = useState(false);


    useEffect(() => {

        const obterOutrasNoticias = async () => {
            try {
                const response = await axios.get(`${baseUrl}`);
                setOutrasNoticias(response.data.filter(outraNoticia => outraNoticia.id !== parseInt(id)));

                setAtualizarOutrasNoticias(true);
            } catch (error) {
                console.error("Erro ao obter outras notícias:", error);
            }
        };


        obterOutrasNoticias();
    }, []);

    useEffect(() => {
        if (atualizarOutrasNoticias) {
            const outrasNoticiasOrdenada = [...outrasNoticias].sort((a, b) => b.id - a.id);
            const outrasNoticiasFiltradas = outrasNoticiasOrdenada.filter(outraNoticia => outraNoticia.id !== noticia?.id).slice(0, 3);

            setOutrasNoticias(outrasNoticiasFiltradas);
        }
    }, [atualizarOutrasNoticias]);


    function formatarDataParaExibicao(data) {
        const partes = data.split("-");
        if (partes.length === 3) {
            const [ano, mes, dia] = partes;
            return `${dia}/${mes}/${ano}`;
        }
        return data; // Retorna a data original se não estiver no formato esperado
    }

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        } else if (currentNoticiaIndex > 0) {
            setCurrentNoticiaIndex(currentNoticiaIndex - 1);
            setCurrentSlide(outrasNoticias[currentNoticiaIndex - 1].imagemNoticia.length - 1);
        }
    };

    const nextSlide = () => {
        if (currentSlide < outrasNoticias[currentNoticiaIndex].imagemNoticia.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else if (currentNoticiaIndex < outrasNoticias.length - 1) {
            setCurrentNoticiaIndex(currentNoticiaIndex + 1);
            setCurrentSlide(0);
        }
    };

    if (!outrasNoticias) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <NavbarUsr />
            <div className="flex flex-col px-4 sm:pl-24 sm:pr-24">


                <div className="sm:px-16">
                    <div className="relative w-full px-4 h-[200px] sm:h-[400px] lg:h-[500px]">
                        {outrasNoticias.map((outraNoticia, index) => (
                            <div key={outraNoticia.id} className="p-4" style={{ display: index === currentNoticiaIndex ? 'block' : 'none' }}>
                                {outraNoticia.imagemNoticia && (
                                    <button
                                        className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2 text-gray-800 bg-[#FDE964] p-2 px-2 m-2 rounded-lg focus:outline-none"
                                        onClick={prevSlide}
                                    >
                                        Anterior
                                    </button>
                                )}

                                {outraNoticia.imagemNoticia && (
                                    <button
                                        className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 text-gray-800 bg-[#FDE964] p-2 px-2 m-2 rounded-lg focus:outline-none"
                                        onClick={nextSlide}
                                    >
                                        Próxima
                                    </button>
                                )}

                                {outraNoticia.imagemNoticia && outraNoticia.imagemNoticia.length > 0 && (
                                    <>
                                        <img
                                            src={outraNoticia.imagemNoticia[currentSlide]?.imagem}
                                            alt={`Imagem ${currentSlide + 1}`}
                                            className="object-cover w-full h-full sm:h-full sm:px-16 rounded-lg"
                                        />

                                        <h3 className="text-xs sm:text-lg font-medium text-center italic">
                                            {outraNoticia.imagemNoticia[currentSlide]?.legendaImagem}
                                        </h3>
                                    </>
                                )}

                                <h3 className="text-xs sm:text-lg font-medium text-justify italic px-4">
                                    {outraNoticia.legendaImagem}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="flex justify-center items-center">
                    {/* Cards de outras notícias */}
                    <div className="pt-5 pb-5 px-2 text-xs sm:pl-32 sm:pr-32 sm:min-w-[320px] lg:w-[90%] xl:w-[80%] 2xl:w-[70%]">
                        {outrasNoticias.map((outraNoticia) => (
                            <div key={outraNoticia.id} className="p-4">
                                <div className="grid grid-cols-2 h-[140px] sm:h-[300px] border-2 border-[#DBDBDB]">
                                    {outraNoticia.imagemNoticia[0] && (
                                        <img
                                            src={outraNoticia.imagemNoticia[0]?.imagem}
                                            alt="Preview"
                                            className="flex w-full h-[136px] sm:h-[290px]"
                                        />
                                    )}
                                    <div className="pl-6 pt-3">
                                        <h2 className=" truncate pr-6 text-[#373636] text-ellipsis overflow-hidden font-semibold text-xs sm:text-base uppercase">
                                            {outraNoticia.titulo}
                                        </h2>
                                        <h2 className="truncate pr-6 pt-1 text-[#373636] font-normal text-xs sm:text-bas">
                                            {outraNoticia.subtitulo
                                            }
                                        </h2>

                                        <div className="flex">
                                            <button className="mt-6 bg-[#FFD121] text-xs sm:text-bas text-[#373636]
                     font-medium hover:bg-black hover:text-white w-20 h-6 sm:w-32 sm:h-10"
                                                onClick={() => {
                                                    navigate(`/visualizarNoticia/${outraNoticia.id}`);
                                                    window.location.reload();
                                                }}
                                            >Leia Mais
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="absolute bottom-0 right-0">
                                        <div className="flex justify-center items-center text-[10px]
                   sm:text-xs text-[#373636] font-medium bg-[#FFD121]
                   w-20 h-4 sm:w-32 sm:h-8">
                                            {formatarDataParaExibicao(outraNoticia.dataPublicacao)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <FooterUsr />
        </div>

    );
};

