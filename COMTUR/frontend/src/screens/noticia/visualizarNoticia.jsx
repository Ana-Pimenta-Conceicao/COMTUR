import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarUsr from "../../components/navbarUsr";
import FooterUsr from "../../components/footerUsr";
import { useParams, useNavigate } from "react-router-dom";

export default function VisualizarNoticia() {
  const { id } = useParams(); // UseParams para obter parâmetros da URL
  const [noticia, setNoticia] = useState(null);
  const [outrasNoticias, setOutrasNoticias] = useState([]);
  const navigate = useNavigate();
  const baseUrl = "https://localhost:7256/api/Noticia";

  useEffect(() => {
    const obterDetalhesNoticia = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${id}`);
        setNoticia(response.data);
      } catch (error) {
        console.error("Erro ao obter detalhes da notícia:", error);
      }
    };

    const obterOutrasNoticias = async () => {
      try {
        const response = await axios.get(`${baseUrl}`);
        const outrasNoticiasOrdenadas = response.data.sort(
          (a, b) => new Date(b.dataPublicacao) - new Date(a.dataPublicacao)
        );
        const outrasNoticiasRecentes = outrasNoticiasOrdenadas.slice(0, 3);
        setOutrasNoticias(outrasNoticiasRecentes);
      } catch (error) {
        console.error("Erro ao obter outras notícias:", error);
      }
    };
    obterDetalhesNoticia();
    obterOutrasNoticias();
  }, [id]);

  function formatarDataParaExibicao(data) {
    const partes = data.split("-");
    if (partes.length === 3) {
      const [ano, mes, dia] = partes;
      return `${dia}/${mes}/${ano}`;
    }
    return data; // Retorna a data original se não estiver no formato esperado
  }

  if (!noticia) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <NavbarUsr />
      <div className="flex flex-col px-4 sm:pl-24 sm:pr-24">
        <h1 className="text-[#373636] text-lg font-extrabold pt-14 sm:text-4xl">
          {noticia.titulo}
        </h1>
        <h2 className="text-[#373636] text-xs sm:text-lg font-semibold pt-3">
          {noticia.subtitulo}
        </h2>
        <p className="text-[#373636] italic text-xs sm:text-lg  font-normal pt-1">
          {formatarDataParaExibicao(noticia.dataPublicacao)} às{" "}
          {noticia.horaPublicacao}
        </p>
      </div>
      <div className="flex flex-col px-2 sm:pl-24 sm:pr-24 items-center">
        {noticia.arquivoImagem && (
          <img
            className="flex pt-4 w-2/3"
            src={noticia.arquivoImagem}
            alt="Preview"
          />
        )}
        <h3 className="text-xs sm:text-lg font-medium italic px-8 sm:pl-24 sm:pr-24">
          {noticia.legendaImagem}
        </h3>
      </div>


      <div className="px-5 sm:px-36 pb-10 text-[#373636] text-sm sm:text-lg font-base pt-4">
        {noticia.conteudo.split("\n").map((paragrafo, index) => (
          <React.Fragment key={index}>
            <p className="pt-1 text-justify">{paragrafo}</p>
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
          {outrasNoticias.map((noticia) => (
            <div key={noticia.id} className="p-4">
              <div className="grid grid-cols-2 h-[140px] sm:h-full border-2 border-[#DBDBDB]">
                {noticia.arquivoImagem && (
                  <img
                    src={noticia.arquivoImagem}
                    alt="Preview"
                    className="flex w-full h-[140px] sm:h-full border-r-2"
                  />
                )}
                <div className="pl-6 pt-3">
                  <h2 className=" truncate pr-6 text-[#373636] text-ellipsis overflow-hidden font-semibold text-xs sm:text-base uppercase">
                    {noticia.titulo}
                  </h2>
                  <h2 className="truncate pr-6 pt-1 text-[#373636] font-normal text-xs sm:text-bas">
                    {noticia.subtitulo
                    }
                  </h2>

                  <div className="flex">
                    <button className="mt-6 bg-[#FFD121] text-xs sm:text-bas text-[#373636]
                     font-medium hover:bg-black hover:text-white w-20 h-6 sm:w-32 sm:h-10"
                      onClick={() => {
                        navigate(`/visualizarNoticia/${noticia.id}`);
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
                    {formatarDataParaExibicao(noticia.dataPublicacao)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterUsr />
    </div>
  );
};

