import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarUsr from "../../components/user/navbarUsr";
import FooterUsr from "../../components/user/footerUsr";
import { useParams, useNavigate } from "react-router-dom";
import { CaretRight, CaretLeft } from "@phosphor-icons/react";
import BtnAcao from "../../components/botoes/btnAcao";

export default function VisualizarNoticia() {
  const { id } = useParams(); // UseParams para obter parâmetros da URL
  const [noticia, setNoticia] = useState(null);
  const [outrasNoticias, setOutrasNoticias] = useState([]);
  const navigate = useNavigate();
  const baseUrl = "https://localhost:7256/api/Noticia";
  const imagensUrl = `https://localhost:7256/api/ImagemNoticia/${id}`;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [atualizarOutrasNoticias, setAtualizarOutrasNoticias] = useState(false);


  useEffect(() => {
    const obterDetalhesNoticia = async () => {
      try {
        const response = await axios.get(baseUrl + `/${id}`);
        setNoticia(response.data);
      } catch (error) {
        console.error("Erro ao obter detalhes da notícia:", error);
      }
    };

    const obterOutrasNoticias = async () => {
      try {
        const response = await axios.get(`${baseUrl}`);
        setOutrasNoticias(response.data.filter(outraNoticia => outraNoticia.id !== parseInt(id)));
        setAtualizarOutrasNoticias(true);
      } catch (error) {
        console.error("Erro ao obter outras notícias:", error);
      }
    };

    obterDetalhesNoticia();
    obterOutrasNoticias();
  }, []);

  useEffect(() => {
    if (atualizarOutrasNoticias) {
      const outrasNoticiasOrdenada = [...outrasNoticias].sort((a, b) => b.id - a.id);
      const outrasNoticiasFiltradas = outrasNoticiasOrdenada.slice(0, 3);

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

  const nextSlide = () => {
    if (noticia.imagemNoticia.length > 1) {
      setCurrentSlide((prev) => (prev === noticia.imagemNoticia.length - 1 ? 0 : prev + 1));
    }
  };

  const prevSlide = () => {
    if (noticia.imagemNoticia.length > 1) { 
      setCurrentSlide((prev) => (prev === 0 ? noticia.imagemNoticia.length - 1 : prev - 1));
    }
  };

  if (!noticia && outrasNoticias.length < 4) {
    return <p>Carregando...</p>;
  }

  const VisualizarTodasNoticias  = () => {

    navigate(`/todasnoticias`);

  }

  return (
    <div>
      <NavbarUsr />
      <div className="flex flex-col px-4 sm:pl-24 sm:pr-24">
        <h1 className="text-[#373636] text-lg font-extrabold pt-4 sm:pt-14 sm:px-16 sm:text-4xl">
          {noticia.titulo}
        </h1>
        <h2 className="text-[#373636] text-xs sm:text-lg font-semibold sm:px-16  pt-3 pb-2">
          {noticia.subtitulo}
        </h2>
        <p className="text-[#373636] italic text-xs sm:text-lg sm:px-16  font-normal pb-4">
          {formatarDataParaExibicao(noticia.dataPublicacao)} às {noticia.horaPublicacao}
        </p>
      </div>

      
        <div className="relative w-full h-[200px] sm:h-[400px] lg:h-[500px] mb-10">

          {noticia.imagemNoticia?.length > 1 && (
            <button
              className="absolute top-1/2 z-10 transform -translate-y-1/2 text-white
               bg-[#FFD121] p-3 px-3 m-2 rounded-full opacity-90 hover:opacity-100 focus:outline-none"
              onClick={prevSlide}
            >
              <CaretLeft size={14} />
            </button>
          )}

          {noticia.imagemNoticia?.length > 1 && (
            <button
              className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 
                text-white bg-[#FFD121] opacity-90 hover:opacity-100  p-3 px-3 m-2 rounded-full  focus:outline-none"
              onClick={nextSlide}
            >
              <CaretRight size={14} />
            </button>
          )}


          {noticia.imagemNoticia?.length > 0 && (
            <>
              <img
                src={noticia.imagemNoticia[currentSlide]?.imagem}
                alt={`Imagem ${currentSlide + 1}`}
                className="object-cover w-full h-full sm:h-full "
              />

              <h3 className="text-xs sm:text-lg font-medium text-center italic ">
                {noticia.imagemNoticia[currentSlide]?.legendaImagem}
              </h3>
            </>
          )}

          <h3 className="text-xs sm:text-lg font-medium text-justify italic px-4 ">
            {noticia.legendaImagem}
          </h3>
        </div>



        <div className="sm:px-16" >
        <div className=" px-4 pb-10 text-[#373636] text-sm sm:text-lg font-base sm:pt-6 pt-0">
          {noticia.conteudo.split("\n").map((paragrafo, index) => (
            <React.Fragment key={index}>
              <p className="sm:px-14 pt-1 text-justify">{paragrafo}</p>
            </React.Fragment>
          ))}
        </div>

        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-1 my-8 opacity-100 bg-[#FFD121] border-0 rounded" />
          <div className="absolute justify-center items-center px-4 -translate-x-1/2 bg-white left-1/2">
            <h1 className="text-[#373636] text-2xl font-bold pl-6">MAIS</h1>
            <h1 className="text-[#373636] text-2xl font-bold">NOTÍCIAS</h1>
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

            <div className="flex items-center justify-center">
            <BtnAcao
              funcao={() => VisualizarTodasNoticias()}
              acao="VisualizarMais"
            /> 
            </div>
          </div>
        </div>
      </div>
      <FooterUsr />
    </div>

  );
};

