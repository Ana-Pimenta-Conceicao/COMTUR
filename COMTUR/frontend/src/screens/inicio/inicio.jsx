import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarUsr from "../../components/user/navbarUsr.jsx";
import FooterUsr from "../../components/user/footerUsr.jsx";
import "../inicio/inicio.css";
import hospedagem from '../../assets/HospedagemCad.svg';
import rural from '../../assets/RuralCard.svg';
import saude from '../../assets/SaudeCard.svg';
import alimentacao from '../../assets/AlimentacaoCard.svg';
import eventos from '../../assets/EventosCard.svg';
import cultura from '../../assets/CulturaCard.svg';
function Inicio() {
  const [outrasNoticias, setOutrasNoticias] = useState([]);
  const [atualizarData, setAtualizarData] = useState(true);
  const [turismo, setTurismo] = useState([]);
  const [parametro, setParametro] = useState([]);
  const navigate = useNavigate();
  const baseUrl = "https://localhost:7256/api/Noticia";
  const [isMobile, setIsMobile] = useState(false);

  const baseUrlParametro = "https://localhost:7256/api/Parametro/1";
  const { id } = useParams();
  const baseUrlTurismo = "https://localhost:7256/api/Turismo";
  const [currentTurismoIndex, setCurrentTurismoIndex] = useState(0);

  const pedidoGet = async () => {
    try {
      const response = await axios.get(baseUrlTurismo);
      const turismosFiltrados = response.data.filter(
        (turismo) => turismo.status === 2
      );
      setTurismo(turismosFiltrados);
    } catch (error) {
      console.log("API error:", error);
    }
  };

  const pedidoGetParametro = async () => {
    try {
      const response = await axios.get(baseUrlParametro);
      setParametro(response.data);
      console.log(parametro);
    } catch (error) {
      console.log("API error:", error);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Chama a função uma vez para definir o estado inicial
    window.addEventListener("resize", handleResize); // Adiciona o listener

    return () => {
      window.removeEventListener("resize", handleResize); // Limpa o listener ao desmontar
    };
  }, []);

  useEffect(() => {
    if (atualizarData) {
      console.log("useEffect executed");
      pedidoGetParametro();
      setAtualizarData(false);
    }
  }, [atualizarData]);

  useEffect(() => {
    if (atualizarData) {
      console.log("useEffect executed"); // Log para verificar se o useEffect está sendo executado
      pedidoGet();
      setAtualizarData(false);
    }
  }, [atualizarData]);

  useEffect(() => {
    const obterOutrasNoticias = async () => {
      try {
        const response = await axios.get(`${baseUrl}`);
        const noticiasFiltradas = response.data.filter(
          (noticia) => noticia.status === 2
        );
        setOutrasNoticias(noticiasFiltradas);
      } catch (error) {
        console.error("Erro ao obter outras notícias:", error);
      }
    };

    obterOutrasNoticias();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTurismoIndex((prevIndex) =>
        prevIndex === turismo.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [turismo]);

  console.log(turismo);

  return (
    <div className="">
      <NavbarUsr />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&family=Open+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
        rel="stylesheet"
      />

      <div className="container-fluid p-0 ">
        <div className="bg-black">
          {turismo.length > 0 && (
            <div className="flex relative items-center bg-black">
              <div
                className={`absolute inset-0 w-full h-full bg-cover bg-center opacity-50`}
                style={{
                  backgroundImage: `url(${turismo[currentTurismoIndex].imagemTurismo[0].imagem})`,
                }}
              />
              <div
                className={`relative flex flex-col w-full h-[200px] sm:h-[400px] lg:h-[500px] mb-8 gap-2 z-10`}
              >
                <h3 className="flex justify-center items-end uppercase h-28 sm:h-60 gap-0 text-xl sm:text-2xl text-slate-50 font-bold text-center">
                  {turismo[currentTurismoIndex].nome}
                </h3>
                <button
                  className="mx-32 sm:mx-[550px] py-1 border-3 rounded-sm border-[#FFD121] text-xs sm:text-2xl font-medium text-slate-50 bg-transparent hover:bg-[#FFD121] transition-colors duration-300"
                  onClick={() => {
                    navigate(
                      `/visualizarTurismo/${turismo[currentTurismoIndex].id}`
                    );
                  }}
                >
                  Leia Mais
                </button>
              </div>
            </div>
          )}
        </div>

        <div class="container-xxl pb-5 pt-3">
          <div class="container">
            <div class="row g-5 align-items-center">
              <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                <p class="section-title bg-white text-start text-black pe-3">
                  O QUE É TURISMO?
                </p>
                <h1 class="mb-4">Conheça mais sobre a cidade de Jales!</h1>
                <div className="flex relative items-center bg-black">
        
                </div>
                {parametro && ( // Verifique se 'parametro' não é null
        <div>
          <h1 className="text-black">
            {parametro.definicaoTurismo} a
          </h1>
        </div>
      )}
                <p class="mb-4">
                  Mais do que um guia. Uma experiência turística e moderna!
                  Mergulhe em uma experiência única, onde a modernidade se
                  encontra com a criatividade para revelar o melhor da nossa
                  cidade
                </p>
                <p>
                  <i class="fa fa-check text-black me-3"></i>Explore Pontos
                  Turísticos e Atrações
                </p>
                <p>
                  <i class="fa fa-check text-black me-3"></i>Descubra Eventos
                  Imperdíveis
                </p>
                <p>
                  <i class="fa fa-check text-black me-3"></i>Mantenha-se
                  Atualizado{" "}
                </p>

                <button
                  class="btn btnmais rounded-pill py-3 px-5 mt-3"
                  onClick={() => {
                    navigate(`/todosTurismos`);
                  }}
                >
                  Explorar
                </button>
              </div>
              <div class="col-lg-6">
                <div class="rounded overflow-hidden">
                  <div class="row g-0">
                    <div class="col-sm-6 wow fadeIn">
                      <div class="text-center bg-black py-5 px-4">
                        <div class="d-flex justify-content-center">
                          <img
                            class="img-fluid mb-4"
                            src="./src/assets/experience.png"
                            alt=""
                          />
                        </div>
                        <h1
                          class="display-6 text-white"
                          data-toggle="counter-up"
                        >
                          83
                        </h1>
                        <span class="fs-5 fw-semi-bold text-secondary">
                          Anos de Fundação
                        </span>
                      </div>
                    </div>
                    <div class="col-sm-6 wow fadeIn">
                      <div class="text-center bg-warning py-5 px-4">
                        <div class="d-flex justify-content-center">
                          <img
                            class="img-fluid mb-4"
                            src="./src/assets/award.png"
                            alt=""
                          />
                        </div>
                        <h1 class="display-6" data-toggle="counter-up">
                          368,6 km²
                        </h1>
                        <span class="fs-5 fw-semi-bold text-black">
                          Área Territorial
                        </span>
                      </div>
                    </div>
                    <div class="col-sm-6 wow fadeIn">
                      <div class="text-center bg-warning py-5 px-4">
                        <div class="d-flex justify-content-center">
                          <img
                            class="img-fluid mb-4"
                            src="./src/assets/animal.png"
                            alt=""
                          />
                        </div>
                        <h1 class="display-6" data-toggle="counter-up">
                          586 km
                        </h1>
                        <span class="fs-5 fw-semi-bold text-black">
                          da cidade de São Paulo
                        </span>
                      </div>
                    </div>
                    <div class="col-sm-6 wow fadeIn">
                      <div class="text-center bg-black py-5 px-4">
                        <div class="d-flex justify-content-center">
                          <img
                            class="img-fluid mb-4"
                            src="./src/assets/client.png"
                            alt=""
                          />
                        </div>
                        <h1
                          class="display-6 text-white"
                          data-toggle="counter-up"
                        >
                          49.201
                        </h1>
                        <span class="fs-5 fw-semi-bold text-secondary">
                          Habitantes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center justify-center w-full p-4">
          <hr className="w-full h-1 my-6 opacity-100 bg-[#FFD121] border-0 rounded" />
          <div className="absolute justify-center items-center px-4 -translate-x-1/2 bg-white left-1/2">
            <h1 className="text-[#373636] sm:text-2xl text-sm font-bold sm:pl-6 pl-3">
              CONHEÇA JALES
            </h1>
          </div>
        </div>

        {/* menu de card  */}
        <div className="container mt-4">
          {isMobile ? (
            <div id="cardCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-touch="true"> {/* Adicionado para permitir deslizar */}
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="d-flex justify-content-center">
                    <div className="card cardlaranja p-1 text-white mx-2">
                      <img className="m-3" src={cultura} alt="icone cultura" />
                      <h6 className="card-title text-center">Cultura</h6>
                    </div>
                    <div className="card cardazul p-1 bg-info text-white mx-2">
                      <img className="m-3" src={rural} alt="icone rural" />
                      <h6 className="card-title text-center">Turismo Rural</h6>
                    </div>
                    <div className="card cardlaranja p-1 bg-warning text-white mx-2">
                      <img className="m-3" src={hospedagem} alt="icone hotel" />
                      <h6 className="card-title text-center">Hospedagem</h6>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="d-flex justify-content-center">
                    <div className="card cardlaranja p-1 text-white mx-2">
                      <img className="m-3" src={saude} alt="icone saude" />
                      <h6 className="card-title text-center">Saúde</h6>
                    </div>
                    <div className="card cardazul p-1 text-white mx-2">
                      <img className="m-3" src={alimentacao} alt="icone alimentação" />
                      <h6 className="card-title text-center">Alimentação</h6>
                    </div>
                    <div className="card cardlaranja p-1 text-white mx-2">
                      <img className="m-3" src={eventos} alt="icone eventos" />
                      <h6 className="card-title text-center">Eventos</h6>
                    </div>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#cardCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#cardCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          ) : (
            <div className="row justify-content-center text-center">
              <div className="card cardlaranja m-2 text-white">
                <img className="m-3" src={cultura} alt="icone cultura" />
                <h6 className="card-title">Cultura</h6>
              </div>
              <div className="card cardazul m-2 text-white">
                <img className="m-4" src={rural} alt="icone rural" />
                <h6 className="card-title">Turismo Rural</h6>
              </div>
              <div className="card cardlaranja m-2 text-white">
                <img className="m-4" src={hospedagem} alt="icone hotel" />
                <h6 className="card-title">Hospedagem</h6>
              </div>
              <div className="card cardazul m-2 text-white">
                <img className="m-4" src={saude} alt="icone saude" />
                <h6 className="card-title">Saúde</h6>
              </div>
              <div className="card cardlaranja m-2 text-white">
                <img className="m-4" src={alimentacao} alt="icone alimentação" />
                <h6 className="card-title">Alimentação</h6>
              </div>
              <div className="card cardazul m-2 text-white">
                <img className="m-4" src={eventos} alt="icone eventos" />
                <h6 className="card-title">Eventos</h6>
              </div>
            </div>
          )}
        </div>
        <div className="inline-flex items-center justify-center w-full mt-5">
          <hr className="w-full h-1 my-6 opacity-100 bg-[#FFD121] border-0 rounded" />
          <div className="absolute justify-center items-center px-4 -translate-x-1/2 bg-white left-1/2">
            <h1 className="text-[#373636] sm:text-2xl text-sm font-bold ">
              NOTÍCIAS
            </h1>
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
                    <h2 className="truncate pr-6 text-[#373636] text-ellipsis overflow-hidden font-semibold text-xs sm:text-base uppercase">
                      {outraNoticia.titulo}
                    </h2>
                    <h2 className="truncate pr-6 pt-1 text-[#373636] font-normal text-xs sm:text-bas">
                      {outraNoticia.subtitulo}
                    </h2>

                    <div className="flex">
                      <button
                        className="mt-6 bg-[#FFD121] text-xs sm:text-bas text-[#373636]font-medium hover:bg-black hover:text-white w-20 h-6 sm:w-32 sm:h-10"
                        onClick={() =>
                          navigate(`/visualizarNoticia/${outraNoticia.id}`)
                        }
                      >
                        Leia Mais
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute bottom-0 right-0">
                    <div className="flex justify-center items-center text-[10px] sm:text-xs text-[#373636] font-medium bg-[#FFD121] w-20 h-4 sm:w-32 sm:h-8">
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

export default Inicio;
