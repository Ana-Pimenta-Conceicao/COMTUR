import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarUsr from "../../components/user/navbarUsr";
import FooterUsr from "../../components/user/footerUsr";
import "../inicio/inicio.css"

function Inicio() {
    const [outrasNoticias, setOutrasNoticias] = useState([]);
    const navigate = useNavigate();
    const baseUrl = "https://localhost:7256/api/Noticia";

    useEffect(() => {
        const obterOutrasNoticias = async () => {
            try {
                const response = await axios.get(`${baseUrl}`);
                setOutrasNoticias(response.data);
            } catch (error) {
                console.error("Erro ao obter outras notícias:", error);
            }
        };

        obterOutrasNoticias();
    }, []);

    function formatarDataParaExibicao(data) {
        const partes = data.split("-");
        if (partes.length === 3) {
            const [ano, mes, dia] = partes;
            return `${dia}/${mes}/${ano}`;
        }
        return data; // Retorna a data original se não estiver no formato esperado
    }

    return (

        <div className="">
            <NavbarUsr />



            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet" />


            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />


            {/* Conteudo site user */}

            <div className="container-fluid p-0">

                <div id="carouselExampleIndicators" class="carousel slide">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="./src/assets/carrossel01.png" class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src="./src/assets/carrossel02.png" class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src="./src/assets/carrossel03.png" class="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>



                <div class="container-xxl py-5">
                    <div class="container">
                        <div class="row g-5 align-items-center">
                            <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                                <p class="section-title bg-white text-start text-black pe-3">VENHA CONHECER</p>
                                <h1 class="mb-4">Poucas razões pelas quais as pessoas nos visitam!</h1>
                                <p class="mb-4">Mesmo ZoOpOlis sendo uma cidade destinada à preservação de animais e biomas, nós, seres humanos, conseguimos andar e observar como eles vivem. Não mais uma experiência de um zoológico comum, mas uma verdadeira voltinha na savana.</p>
                                <p><i class="fa fa-check text-black me-3"></i>Segurança aos turistas</p>
                                <p><i class="fa fa-check text-black me-3"></i>Preservação de espécies em extinção</p>
                                <p><i class="fa fa-check text-black me-3"></i>Reserva sustentável</p>
                                <a class="btn btnmais rounded-pill py-3 px-5 mt-3" href="">Explorar</a>
                            </div>
                            <div class="col-lg-6">
                                <div class="rounded overflow-hidden">
                                    <div class="row g-0">
                                        <div class="col-sm-6 wow fadeIn">
                                            <div class="text-center bg-black py-5 px-4">
                                                <div class="d-flex justify-content-center">
                                                    <img class="img-fluid mb-4" src="./src/assets/experience.png" alt="" />
                                                </div>
                                                <h1 class="display-6 text-white" data-toggle="counter-up">83</h1>
                                                <span class="fs-5 fw-semi-bold text-secondary">Anos de Fundação</span>
                                            </div>
                                        </div>
                                        <div class="col-sm-6 wow fadeIn">
                                            <div class="text-center bg-warning py-5 px-4">
                                                <div class="d-flex justify-content-center">
                                                    <img class="img-fluid mb-4" src="./src/assets/award.png" alt="" />
                                                </div>
                                                <h1 class="display-6" data-toggle="counter-up">368,6 km²</h1>
                                                <span class="fs-5 fw-semi-bold text-black">Área Territoria</span>
                                            </div>
                                        </div>
                                        <div class="col-sm-6 wow fadeIn">
                                            <div class="text-center bg-warning py-5 px-4">
                                                <div class="d-flex justify-content-center">
                                                    <img class="img-fluid mb-4" src="./src/assets/animal.png" alt="" />
                                                </div>
                                                <h1 class="display-6" data-toggle="counter-up">8.000</h1>
                                                <span class="fs-5 fw-semi-bold text-black">Total de animais</span>
                                            </div>
                                        </div>
                                        <div class="col-sm-6 wow fadeIn">
                                            <div class="text-center bg-black py-5 px-4">
                                                <div class="d-flex justify-content-center">
                                                    <img class="img-fluid mb-4" src="./src/assets/client.png" alt="" />
                                                </div>
                                                <h1 class="display-6 text-white" data-toggle="counter-up">49.201</h1>
                                                <span class="fs-5 fw-semi-bold text-secondary">Habitantes</span>
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
                        <h1 className="text-[#373636] sm:text-2xl text-sm font-bold sm:pl-6 pl-3">CONHEÇA JALES</h1>
                    </div>
                </div>

                {/* menu de card  */}

                <div class="container mt-0">
                    <div class="row g-4 m-0 justify-content-center">
                        <div class="col-lg-3 col-md-6 espacocard">
                            <div class="team-item rounded p-0 d-flex flex-column align-items-center">
                                <div className="card cardconteudo">
                                    <img class="img-fluid" src="./src/assets/cardsaude.png" alt="" />
                                    <div class="justify-content-center">
                                        <div class="d-grid gap-2">
                                            <button class="btn btncard font-medium">Saúde</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 espacocard">
                            <div class="team-item rounded p-0 d-flex flex-column align-items-center">
                                <div className="card cardconteudo">
                                    <img class="img-fluid" src="./src/assets/cardhospedagem.png" alt="" />
                                    <div class="justify-content-center">
                                        <div class="d-grid gap-2">
                                            <button class="btn btncard font-medium">Hospedagem</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 espacocard">
                            <div class="team-item rounded p-0 d-flex flex-column align-items-center">
                                <div className="card cardconteudo">
                                    <img class="img-fluid" src="./src/assets/cardalimentacao.png" alt="" />
                                    <div class="justify-content-center">
                                        <div class="d-grid gap-2">
                                            <button class="btn btncard font-medium">Alimentação</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row g-4 m-0 justify-content-center">
                        <div class="col-lg-3 col-md-6 espacocard">
                            <div class="team-item rounded p-0 d-flex flex-column align-items-center">
                                <div className="card cardconteudo">
                                    <img class="img-fluid" src="./src/assets/cardeventos.png" alt="" />
                                    <div class="justify-content-center">
                                        <div class="d-grid gap-2">
                                            <button class="btn btncard font-medium">Eventos</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 espacocard">
                            <div class="team-item rounded p-0 d-flex flex-column align-items-center">
                                <div className="card cardconteudo">
                                    <img class="img-fluid" src="./src/assets/cardrural.png" alt="" />
                                    <div class="justify-content-center">
                                        <div class="d-grid gap-2">
                                            <button class="btn btncard font-medium">Turismo Rural</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 espacocard">
                            <div class="team-item rounded p-0 d-flex flex-column align-items-center">
                                <div className="card cardconteudo">
                                    <img class="img-fluid" src="./src/assets/cardcultura.png" alt="" />
                                    <div class="justify-content-center">
                                        <div class="d-grid gap-2">
                                            <button class="btn btncard font-medium">Cultura</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="inline-flex items-center justify-center w-full mt-5">
                    <hr className="w-full h-1 my-6 opacity-100 bg-[#FFD121] border-0 rounded" />
                    <div className="absolute justify-center items-center px-4 -translate-x-1/2 bg-white left-1/2">
                        <h1 className="text-[#373636] sm:text-2xl text-sm font-bold sm:pl-6 pl-3">EVENTOS</h1>
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
                                        <button className="mt-6 bg-[#FFD121] text-xs sm:text-bas text-[#373636]font-medium hover:bg-black hover:text-white w-20 h-6 sm:w-32 sm:h-10"
                                            onClick={() => navigate(`/visualizarNoticia/${outraNoticia.id}`)}
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
