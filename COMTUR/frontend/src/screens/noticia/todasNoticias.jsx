import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarUsr from "../../components/user/navbarUsr.jsx";
import FooterUsr from "../../components/user/footerUsr.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { CaretRight, CaretLeft } from "@phosphor-icons/react";

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
        setOutrasNoticias(
          response.data.filter(
            (outraNoticia) => outraNoticia.id !== parseInt(id) && outraNoticia.status === 2
          )
        );

        setAtualizarOutrasNoticias(true);
      } catch (error) {
        console.error("Erro ao obter outras notícias:", error);
      }
    };

    obterOutrasNoticias();
  }, []);

  useEffect(() => {
    if (atualizarOutrasNoticias) {
      const outrasNoticiasOrdenada = [...outrasNoticias].sort(
        (a, b) => b.id - a.id
      );
      const outrasNoticiasFiltradas = outrasNoticiasOrdenada.filter(
        (outraNoticia) => outraNoticia.id !== noticia?.id
      );

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
    if (currentNoticiaIndex > 0) {
      setCurrentNoticiaIndex(currentNoticiaIndex - 1);
      setCurrentSlide(0); // Define o slide para o primeiro ao mudar de notícia
    } else {
      setCurrentNoticiaIndex(outrasNoticias.length - 1); // Vai para a última notícia
      setCurrentSlide(0); // Define o slide para o primeiro ao mudar de notícia
    }
  };

  const nextSlide = () => {
    if (currentNoticiaIndex < outrasNoticias.length - 1) {
      setCurrentNoticiaIndex(currentNoticiaIndex + 1);
      setCurrentSlide(0); // Define o slide para o primeiro ao mudar de notícia
    } else {
      setCurrentNoticiaIndex(0); // Volta para a primeira notícia
      setCurrentSlide(0); // Define o slide para o primeiro ao mudar de notícia
    }
  };

  function formatarDataParaExibicao(data) {
    const partes = data.split("-");
    if (partes.length === 3) {
      const [ano, mes, dia] = partes;
      return `${dia}/${mes}/${ano}`;
    }
    return data; // Retorna a data original se não estiver no formato esperado
  }

  return (
    <div>
      <NavbarUsr />
      <div className="flex flex-col px-4 sm:pl-24 sm:pr-24">
        <h1 className="text-[#373636] mb-3 text-lg font-extrabold pt-4 sm:pt-14 sm:px-16 sm:text-4xl">
          Conheça as notícias da cidade</h1>
      </div>

      <hr class="pb-4 border-[1.5px] border-black  w-75 ml-auto" />
      <div className="">
        <div className="pb-6">
          <div className="relative w-full  h-[200px] sm:h-[400px] lg:h-[500px]">
            {outrasNoticias.map((outraNoticia, index) => (
              <div
                key={outraNoticia.id}
                className=""
                style={{
                  display: index === currentNoticiaIndex ? "block" : "none",
                }}
              >
                {outraNoticia.imagemNoticia && (
                  <button
                    className="absolute top-1/2  transform -translate-y-1/2 text-white
                                   px-3 m-2  bg-[#FFD121] p-3  rounded-full opacity-80 hover:opacity-100 focus:outline-none"
                    onClick={prevSlide}
                  >
                    <CaretLeft size={16} />
                  </button>
                )}

                {outraNoticia.imagemNoticia && (
                  <button
                    className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 
                        px-3 m-2 p-3 text-white bg-[#FFD121] opacity-80 hover:opacity-100  rounded-full  focus:outline-none"
                    onClick={nextSlide}
                  >
                    <CaretRight size={16} />
                  </button>
                )}

                {outraNoticia.imagemNoticia &&
                  outraNoticia.imagemNoticia.length > 0 && (
                    <>
                      <img
                        src={outraNoticia.imagemNoticia[currentSlide]?.imagem}
                        alt={`Imagem ${currentSlide + 1}`}
                        className="object-cover w-full h-[200px] sm:h-[400px]  rounded-lg"
                        onClick={() => {
                          navigate(`/visualizarNoticia/${outraNoticia.id}`);
                          window.location.reload();
                        }}
                      />

                      {/* <h3 className="text-xs sm:text-lg font-medium text-center italic">
                                            {outraNoticia.imagemNoticia[currentSlide]?.legendaImagem}
                                        </h3> */}
                    </>
                  )}
                <h3
                  className="text-xs sm:text-lg font-medium text-justify italic px-4 "
                  onClick={() => {
                    navigate(`/visualizarNoticia/${outraNoticia.id}`);
                    window.location.reload();
                  }}
                >
                  {formatarDataParaExibicao(outraNoticia.dataPublicacao)} - "
                  {outraNoticia.titulo}"
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="inline-flex items-center justify-center w-full pt-4">
          <hr className="w-full h-1 my-8 opacity-100 bg-[#FFD121] border-0 rounded" />
          <div className="absolute justify-center items-center px-4 -translate-x-1/2 bg-white left-1/2">
            <h1 className="text-[#373636] text-2xl font-bold">NOTÍCIAS</h1>
          </div>
        </div>

        <div className="flex justify-center pb-2 pt-4 items-center">
          {/* Cards de outras notícias */}
          <div className=" pb-2 px-2 text-xs sm:pl-32 sm:pr-32 sm:min-w-[320px] lg:w-[90%] xl:w-[80%] 2xl:w-[70%]">
            {outrasNoticias.map((outraNoticia) => (
              <div key={outraNoticia.id} className="pb-3 px-4">
                <div className="grid grid-cols-2 h-[140px] sm:h-[300px] border-2 border-[#DBDBDB]">
                  {outraNoticia.imagemNoticia[0] && (
                    <img
                      src={outraNoticia.imagemNoticia[0]?.imagem}
                      alt="Preview"
                      className="flex w-full h-[136px] sm:h-[290px]"
                    />
                  )}
                  <div className="pl-6 pt-2">
                    <h2 className=" truncate pr-6 text-[#373636] text-ellipsis overflow-hidden font-semibold text-xs sm:text-base uppercase">
                      {outraNoticia.titulo}
                    </h2>
                    <h2 className="truncate pr-6 pt-1 text-[#373636] font-normal text-xs sm:text-bas">
                      {outraNoticia.subtitulo}
                    </h2>

                    <div className="flex">
                      <button
                        className="mt-6 bg-[#FFD121] text-xs sm:text-bas text-[#373636]
                     font-medium hover:bg-black hover:text-white w-20 h-6 sm:w-32 sm:h-10"
                        onClick={() => {
                          navigate(`/visualizarNoticia/${outraNoticia.id}`);
                          window.location.reload();
                        }}
                      >
                        Leia Mais
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute bottom-0 right-0">
                    <div
                      className="flex justify-center items-center text-[10px]
                   sm:text-xs text-[#373636] font-medium bg-[#FFD121]
                   w-20 h-4 sm:w-32 sm:h-8"
                    >
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
}
