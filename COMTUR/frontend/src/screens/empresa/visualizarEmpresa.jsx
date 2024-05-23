import { useState, useEffect } from "react";
import axios from "axios";
import NavbarUsr from "../../components/user/navbarUsr";
import FooterUsr from "../../components/user/footerUsr";
import { useParams, useNavigate } from "react-router-dom";
import { CaretRight, CaretLeft } from "@phosphor-icons/react";
import React from "react";
import Estrela from "../../assets/estrela";
import Estrelasemcor from "../../assets/Estrelasemcor";
import Xadrez from "../../assets/xadrez";
import Comtur from "../../assets/Comtur"
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";


export default function VisualizarEmpresa() {
    const { id } = useParams();
    const [empresa, setEmpresa] = useState(null);
    const baseUrl = "https://localhost:7256/api/Empresa";
    const imagensUrl = `https://localhost:7256/api/ImagemEmpresa/${id}`
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [outrasAtracoes, setOutrasAtracoes] = useState([]);
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const [modalAvaliacao, setModalAvaliacao] = useState(false);


    const abrirFecharModalAvaliacao = () => {

        setModalAvaliacao(!modalAvaliacao);

    };
    useEffect(() => {

        const buscarEmpresa = async () => {
            try {
                const response = await axios.get(baseUrl + `/${id}`);

                setEmpresa(response.data);
                console.log("Empresa recebida:", response.data);
            } catch (error) {
                console.error("Erro ao buscar empresa:", error);
            }
        };
        buscarEmpresa();
    }, [id]);
    if (!empresa) {
        return <h2>Carregando...</h2>;
    }
    const nextSlide = () => {
        if (empresa.imagemEmpresa.length > 1) {
            setCurrentSlide((prev) => (prev === empresa.imagemEmpresa.length - 1 ? 0 : prev + 1));
        }
    };
    const prevSlide = () => {
        if (empresa.imagemEmpresa.length > 1) {
            setCurrentSlide((prev) => (prev === 0 ? empresa.imagemEmpresa.length - 1 : prev - 1));
        }
    };
    const VisualizarTodasEmpresas = () => {
        navigate(`/todasempresa`);
    }
    return (
        <div>
            <NavbarUsr />
            <div className="flex flex-col px-4 sm:pl-24 sm:pr-24">
                <h1 className="text-[#373636] mb-3 text-lg font-extrabold pt-4 sm:pt-14 sm:px-16 sm:text-4xl">
                    {empresa.nome}
                </h1>
            </div>
            <div className="container border mt-2">

                <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] mb-10 mt-3">
                    {empresa.imagemEmpresa?.length > 1 && (
                        <button
                            className="absolute top-1/2 z-10 transform -translate-y-1/2 text-white bg-[#FFD121] p-3 px-3 m-2 rounded-full opacity-90 hover:opacity-100 focus:outline-none"
                            onClick={prevSlide}
                        >
                            <CaretLeft size={14} />
                        </button>
                    )}
                    {empresa.imagemEmpresa?.length > 1 && (
                        <button
                            className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 text-white bg-[#FFD121] opacity-90 hover:opacity-100  p-3 px-3 m-2 rounded-full  focus:outline-none"
                            onClick={nextSlide}
                        >
                            <CaretRight size={14} />
                        </button>
                    )}

                    {empresa.imagemEmpresa?.length > 0 && (
                        <>
                            <img
                                src={empresa.imagemEmpresa[currentSlide]?.imagem}
                                alt={`Imagem ${currentSlide + 1}`}
                                className="object-cover w-full h-full sm:h-full "
                            />
                            <h3 className="text-xs sm:text-lg font-medium text-center italic ">
                                {empresa.imagemEmpresa[currentSlide]?.legendaImagem}
                            </h3>
                        </>
                    )}
                    <h3 className="text-xs sm:text-lg font-medium text-justify italic px-4 ">
                        {empresa.legendaImagem}
                    </h3>
                </div>


                <div className="row m-8">
                    <div className="flex flex-col">
                        <p className="text-[#373636] italic text-xs sm:text-lg font-normal mt-2">
                            {empresa.endereco}
                        </p>

                        <div className="row mb-3 flex justify-between">
                            <div className="flex flex-col">
                                <div class="d-flex justify-content-between mt-2">
                                    <div class="flex items-center">
                                        <Estrela />
                                        <Estrela />
                                        <Estrela />
                                        <Estrela />
                                        <Estrelasemcor />
                                        <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">44</p>
                                        <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">Avaliações</p>
                                    </div>

                                </div>
                            </div>
                            <div class="container d-flex align-items-center mt-6">

                                <div class="mr-2" onClick={abrirFecharModalAvaliacao}>
                                    <button class="btn border rounded-none h-10 w-20 text-center text-black mb-6 bg-zinc-300">Avaliar</button>
                                </div>
                                <div class="mr-2">
                                    <button class="btn border rounded-none h-10 w-20 text-center text-black mb-6 bg-zinc-300">Maps</button>
                                </div>
                                <div class="mr-2">
                                    <button class="btn border rounded-none h-10 w-20 text-center text-black mb-6 bg-zinc-300">Site</button>
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
                            {empresa.descricao.split("\n").map((paragrafo, index) => (
                                <React.Fragment key={index}>
                                    <p className="sm:px-14 pt-1 text-justify break-all">{paragrafo}</p>
                                </React.Fragment>
                            ))}
                        </div>
                        <hr class="pb-4 border-[1.5px] border-black  w-75 ml-auto" />
                    </div>
                </div>
            </div>





            <div>
                <div className="inline-flex items-center justify-center w-full p-4">
                    <hr className="w-full h-1 my-6 opacity-100 bg-[#FFD121] border-0 rounded" />
                    <div className="absolute justify-center items-center px-4 -translate-x-1/2 bg-white left-1/2">
                        <h1 className="text-[#373636] sm:text-2xl text-sm font-bold sm:pl-6 pl-3">Anúncios Recentes</h1>
                    </div>
                </div>

                <div className="row justify-center items-center m-2">

                    <div class="card rounded-none w-[352px] m-2">
                        <div class="w-[352px] h-[367px]">
                            <img src="..." class="card-img-top" alt="..." />
                        </div>
                        <div class="card-body">

                            <h2 className="mt-3 text-[#373636] text-xs sm:text-lg font-semibold">TÍTULO DO ANÚNCIO</h2>
                            <p class="card-text mt-2 text-gray-500 dark:text-gray-400">breve resumo breve resumo breve resumo breve
                                resumo breve resumo breve resumo
                                breve resumo breve resumo </p>

                        </div>

                        <div className="mt-4 flex justify-center">
                            <button type="button" class="btn btn-outline-secondary rounded-none h-10 w-40 text-black mb-6">Visualizar</button>
                        </div>

                    </div>

                    <div class="card rounded-none w-[352px] m-2">
                        <div class="w-[352px] h-[367px]">
                            <img src="..." class="card-img-top" alt="..." />
                        </div>
                        <div class="card-body">

                            <h2 className="mt-3 text-[#373636] text-xs sm:text-lg font-semibold">TÍTULO DO ANÚNCIO</h2>
                            <p class="card-text mt-2 text-gray-500 dark:text-gray-400">breve resumo breve resumo breve resumo breve
                                resumo breve resumo breve resumo
                                breve resumo breve resumo </p>

                        </div>

                        <div className="mt-4 flex justify-center">
                            <button type="button" class="btn btn-outline-secondary rounded-none h-10 w-40 text-black mb-6">Visualizar</button>
                        </div>

                    </div>

                    <div class="card rounded-none w-[352px] m-2">
                        <div class="w-[352px] h-[367px]">
                            <img src="..." class="card-img-top" alt="..." />
                        </div>
                        <div class="card-body">

                            <h2 className="mt-3 text-[#373636] text-xs sm:text-lg font-semibold">TÍTULO DO ANÚNCIO</h2>
                            <p class="card-text mt-2 text-gray-500 dark:text-gray-400">breve resumo breve resumo breve resumo breve
                                resumo breve resumo breve resumo
                                breve resumo breve resumo </p>

                        </div>

                        <div className="mt-4 flex justify-center">
                            <button type="button" class="btn btn-outline-secondary rounded-none h-10 w-40 text-black mb-6">Visualizar</button>
                        </div>

                    </div>

                </div>
            </div>


            <FooterUsr />
            <Modal isOpen={modalAvaliacao}>
                <div class="position-absolute top-0 end-0 mr-4 m-3 "><Comtur /> </div>
                <ModalBody>
                    <div class="flex items-center m-3">
                        <div className="w-10 h-10 mr-2 rounded-full" >
                            <Xadrez />
                        </div>
                        <div class="font-medium text-gray-500 ml-1">
                            <p>@User</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="m-2 text-gray-500">Faça uma avaliação!</h1>
                        <div className="flex items-center">
                            <svg className="w-8 h-8 mx-3 text-yellow-300 m-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-8 h-8 mx-3 text-yellow-300 m-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-8 h-8 mx-3 text-yellow-300 m-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-8 h-8 mx-3 text-yellow-300 m-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-8 h-8 mx-3 text-gray-300 dark:text-gray-500 m-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex justify-end mt-10">
                        <button className="btn btnavaliar bg-yellow-400 rounded-md m-1">
                            Avaliar
                        </button>
                        <button
                            className="btn btncancelarmodal m-1"
                            onClick={() => abrirFecharModalAvaliacao()}
                        >
                            Cancelar
                        </button>
                    </div>

                </ModalBody>

            </Modal>
        </div>
    );
}