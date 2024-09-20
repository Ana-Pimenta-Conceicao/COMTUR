import { useState, useEffect, InputMask } from "react";
import axios from "axios";
import NavbarUsr from "../../components/user/navbarUsr.jsx";
import FooterUsr from "../../components/user/footerUsr.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { CaretRight, CaretLeft, Star } from "@phosphor-icons/react";
import React from "react";
import Estrela from "../../assets/estrela";
import Estrelasemcor from "../../assets/Estrelasemcor";
import Xadrez from "../../assets/xadrez";
import Comtur from "../../assets/Comtur";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import BtnModaisIMG from "../../components/botoes/btnModaisIMG.jsx";
import BtnModais from "../../components/botoes/btnModais.jsx";

export default function VisualizarEmpresa() {
    const { id } = useParams();
    const [empresa, setEmpresa] = useState(null);
    const baseUrl = "https://localhost:7256/api/Empresa";
    const imagensUrl = `https://localhost:7256/api/ImagemEmpresa/${id}`;
    const avaliacaoUrl = "https://localhost:7256/api/Avaliacao";
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [outrasAtracoes, setOutrasAtracoes] = useState([]);
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const [modalInserir, setModalInserir] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalDeletar, setModalDeletar] = useState(false);

    const abrirFecharModalAvaliacao = () => {
        if (modalInserir) {
            limparDados(); // Limpa os dados se o modal estava aberto
        }
        setModalInserir(!modalInserir); // Alterna o estado do modal
    };


    const [avaliacaoNota, setAvaliacaoNota] = useState(0);
    const [avaliacaoDataPublicacao, setAvaliacaoDataPublicacao] = useState("");
    const [avaliacaoComentario, setAvaliacaoComentario] = useState("");
    const [userType, setUserType] = useState(null);
    const [avaliacaoId, setAvaliacaoId] = useState("");

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

    const abrirFecharModalEditar = () => {
        modalEditar ? limparDados() : null;
        setModalEditar(!modalEditar);
    };

    const abrirFecharModalDeletar = () => {
        modalDeletar ? limparDados() : null;
        setModalDeletar(!modalDeletar);
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
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const pedidoPost = async () => {
        const formData = new FormData();
        formData.append("nota", avaliacaoNota);
        formData.append("dataPublicacao", inverterDataParaFormatoBanco(avaliacaoDataPublicacao));
        formData.append("comentario", avaliacaoComentario);

        try {
            const response = await axios.post(avaliacaoUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setData(data.concat(response.data));
            abrirFecharModalInserir();
            limparDados();
            setAtualizarData(true);

        } catch (error) {
            console.log(error);
        }
    };

    const pedidoAtualizar = async () => {
        const formData = new FormData();
        formData.append("nota", avaliacaoNota);
        formData.append("dataPublicacao", inverterDataParaFormatoBanco(avaliacaoDataPublicacao));
        formData.append("comentario", avaliacaoComentario);

        try {
            const response = await axios.put(`${avaliacaoUrl}/${avaliacaoId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const updatedAvaliacao = response.data;

            setData((prevData) =>
                prevData.map((avaliacao) => (avaliacao.id === avaliacaoId ? updatedAvaliacao : avaliacao))
            );

            abrirFecharModalEditar();
            setAtualizarData(true);

        } catch (error) {
            console.log(error);
        }
    };

    const pedidoDeletar = async () => {
        await axios
            .delete(avaliacaoUrl + "/" + avaliacaoId)
            .then((response) => {
                const newAvaliacao = data.filter((avaliacao) => avaliacao.id !== response.data);
                setData(newAvaliacao);
                abrirFecharModalDeletar();
                limparDados();
                setAtualizarData(true);

            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const buscarEmpresa = async () => {
            try {
                const response = await axios.get(baseUrl + `/${id}`);
                setEmpresa(response.data);
            } catch (error) {
                console.error("Erro ao obter detalhes da empresa:", error);
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

    const handleStarClick = (index) => {
        setAvaliacaoNota(index);
    };

    const handleDate = (value) => {
        // Filtra somente números
        const numbersOnly = value.replace(/\D/g, '');
    
        // Limita a quantidade de caracteres a 10
        const limitedValue = numbersOnly.slice(0, 10);
    
        // Formata para o formato 99/99/9999
        const formattedValue = limitedValue
            .replace(/^(\d{2})(\d{0,2})/, '$1/$2')      // Adiciona a barra após os primeiros 2 dígitos
            .replace(/\/(\d{2})(\d{0,4})/, '/$1/$2')   // Adiciona a segunda barra após os próximos 2 dígitos
            .slice(0, 10);                             // Garante que o comprimento máximo seja 10 caracteres
    
        // Atualiza o estado com a data formatada
        setAvaliacaoDataPublicacao(formattedValue);
    };    
    
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
                                <div className="d-flex justify-content-between mt-2">
                                    <div className="flex flex-row w-full justify-start items-center text-[#FFD121]">
                                        <Star size={20} /> <Star size={20} />
                                        <Star size={20} />
                                        <Star size={20} />
                                        <Star size={20} />
                                        <h3 className="text-gray-800 text-xs pl-2">14 avaliações</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="container d-flex align-items-center mt-6">

                                <div className="mr-2" onClick={abrirFecharModalAvaliacao}>
                                    <button className="btn border rounded-none h-10 w-20 text-center text-black mb-6 bg-zinc-300">Avaliar</button>
                                </div>
                                <div className="mr-2">
                                    <button className="btn border rounded-none h-10 w-20 text-center text-black mb-6 bg-zinc-300">Maps</button>
                                </div>
                                <div className="mr-2">
                                    <button className="btn border rounded-none h-10 w-20 text-center text-black mb-6 bg-zinc-300">Site</button>
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
                        <hr className="pb-4 border-[1.5px] border-black  w-75 ml-auto" />
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

                    <div className="card rounded-none w-[352px] m-2">
                        <div className="w-[352px] h-[367px]">
                            <img src="..." className="card-img-top" alt="..." />
                        </div>
                        <div className="card-body">

                            <h2 className="mt-3 text-[#373636] text-xs sm:text-lg font-semibold">TÍTULO DO ANÚNCIO</h2>
                            <p className="card-text mt-2 text-gray-500 dark:text-gray-400">breve resumo breve resumo breve resumo breve
                                resumo breve resumo breve resumo
                                breve resumo breve resumo </p>

                        </div>

                        <div className="mt-4 flex justify-center">
                            <button type="button" className="btn btn-outline-secondary rounded-none h-10 w-40 text-black mb-6">Visualizar</button>
                        </div>

                    </div>

                    <div className="card rounded-none w-[352px] m-2">
                        <div className="w-[352px] h-[367px]">
                            <img src="..." className="card-img-top" alt="..." />
                        </div>
                        <div className="card-body">

                            <h2 className="mt-3 text-[#373636] text-xs sm:text-lg font-semibold">TÍTULO DO ANÚNCIO</h2>
                            <p className="card-text mt-2 text-gray-500 dark:text-gray-400">breve resumo breve resumo breve resumo breve
                                resumo breve resumo breve resumo
                                breve resumo breve resumo </p>

                        </div>

                        <div className="mt-4 flex justify-center">
                            <button type="button" className="btn btn-outline-secondary rounded-none h-10 w-40 text-black mb-6">Visualizar</button>
                        </div>

                    </div>

                    <div className="card rounded-none w-[352px] m-2">
                        <div className="w-[352px] h-[367px]">
                            <img src="..." className="card-img-top" alt="..." />
                        </div>
                        <div className="card-body">

                            <h2 className="mt-3 text-[#373636] text-xs sm:text-lg font-semibold">TÍTULO DO ANÚNCIO</h2>
                            <p className="card-text mt-2 text-gray-500 dark:text-gray-400">breve resumo breve resumo breve resumo breve
                                resumo breve resumo breve resumo
                                breve resumo breve resumo </p>

                        </div>

                        <div className="mt-4 flex justify-center">
                            <button type="button" className="btn btn-outline-secondary rounded-none h-10 w-40 text-black mb-6">Visualizar</button>
                        </div>

                    </div>

                </div>


            </div>




            <FooterUsr />

            <Modal isOpen={modalInserir}>
                <ModalBody>
                    <div className="m-2">
                        <div className="flex items-center mb-2">
                            <div className="w-10 h-10 mr-2 rounded-full">
                                <Xadrez />
                            </div>
                            <div className="font-medium text-gray-500 ml-1">
                                <p>@User</p>
                            </div>
                            <div className="ml-auto"><Comtur /></div>
                        </div>

                        <div className="flex flex-col items-center justify-center mb-8">
                            <label>Comentário:</label>
                            <textarea
                                className="form-control text-sm"
                                onChange={(e) => setAvaliacaoComentario(e.target.value)}
                                placeholder="Deixe seu Comentário"
                            />
                            <br />

                            <label htmlFor="avaliacaoDataPublicacao">Data:</label>
                            <input
                                type="text"
                                className="form-control text-sm"
                                id="avaliacaoDataPublicacao"
                                onChange={(e) => handleDate(e.target.value)}
                                placeholder="Digite apenas números"
                                value={avaliacaoDataPublicacao}
                            />
                            <br />

                            <h1 className="m-2 text-black">Faça uma avaliação!</h1>
                            <h2 className="m-2 text-gray-500">Compartilhe sua experiência para ajudar outras pessoas</h2>

                            <div className="flex items-center mt-2">
                                <div className="flex flex-row w-full justify-start items-center text-[#FFD121]">
                                    {[1, 2, 3, 4, 5].map((starIndex) => (
                                        <Star
                                            key={starIndex}
                                            size={30}
                                            className={starIndex <= avaliacaoNota ? "text-yellow-400" : "text-gray-300"}
                                            onClick={() => handleStarClick(starIndex)}
                                            style={{ cursor: "pointer" }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                className="btn btnavaliar bg-yellow-400 rounded-md mr-1"
                                onClick={() => {
                                    pedidoPost(); // Chamando diretamente a função para cadastrar
                                }}
                            >
                                Avaliar
                            </button>

                            <button
                                className="btn btncancelarmodal"
                                onClick={() => abrirFecharModalAvaliacao()}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            <Modal className="modal-xl-gridxl" isOpen={modalEditar} style={{ maxWidth: "1000px" }} >
                <ModalHeader>Editar Noticia</ModalHeader>
                <ModalBody>
                    <div className="m-2">
                        <div className="flex items-center mb-2">
                            <div className="w-10 h-10 mr-2 rounded-full">
                                <Xadrez />
                            </div>
                            <div className="font-medium text-gray-500 ml-1">
                                <p>@User</p>
                            </div>
                            <div className="ml-auto"><Comtur /></div>
                        </div>

                        <div className="flex flex-col items-center justify-center mb-8">
                            <label>Comentário:</label>
                            <textarea
                                className="form-control text-sm"
                                onChange={(e) => setAvaliacaoComentario(e.target.value)}
                                placeholder="Deixe seu Comentário"
                            />
                            <br />

                            <label htmlFor="avaliacaoDataPublicacao">Data:</label>
                            <input
                                type="text"
                                className="form-control text-sm"
                                id="avaliacaoDataPublicacao"
                                onChange={(e) => handleDate(e.target.value)}
                                placeholder="Digite apenas números"
                                value={avaliacaoDataPublicacao}
                            />
                            <br />

                            <h1 className="m-2 text-black">Faça uma avaliação!</h1>
                            <h2 className="m-2 text-gray-500">Compartilhe sua experiência para ajudar outras pessoas</h2>

                            <div className="flex items-center mt-2">
                                <div className="flex flex-row w-full justify-start items-center text-[#FFD121]">
                                    {[1, 2, 3, 4, 5].map((starIndex) => (
                                        <Star
                                            key={starIndex}
                                            size={30}
                                            className={starIndex <= avaliacaoNota ? "text-yellow-400" : "text-gray-300"}
                                            onClick={() => handleStarClick(starIndex)}
                                            style={{ cursor: "pointer" }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center px-[395px] pt-5">
                        <BtnModaisIMG
                            funcao={() => pedidoAtualizar(avaliacaoId)}
                            acao="Editar"
                        />
                        <BtnModaisIMG
                            funcao={() => abrirFecharModalEditar()}
                            acao="Cancelar"
                        />
                    </div>
                </ModalBody>
            </Modal>
            <Modal isOpen={modalDeletar}>
                <ModalBody>Confirma a exclusão de "{avaliacaoId}" ?</ModalBody>
                <ModalFooter>
                    <BtnModais funcao={() => pedidoDeletar()} acao="Excluir" />
                    <BtnModais
                        funcao={() => abrirFecharModalDeletar()}
                        acao="Cancelar"
                    />
                </ModalFooter>
            </Modal>
        </div>
    );
}