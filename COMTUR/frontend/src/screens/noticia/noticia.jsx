import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import InputMask from "react-input-mask";
import SidebarAdm from "../../components/sidebarAdm";
import NavBarAdm from "../../components/navbarAdm";
import { useNavigate } from "react-router-dom";
import {
  CaretLeft,
  CaretRight,
  Pencil,
  Trash,
  Eye,
  FilePlus,
} from "@phosphor-icons/react";

export default function Noticia() {
  const baseUrl = "https://localhost:7256/api/Noticia";

  const [data, setData] = useState([]);

  const [atualizarData, setAtualizarData] = useState(true);

  const [modalInserir, setModalInserir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);

  const [noticiaTitulo, setNoticiaTitulo] = useState("");

  const [noticiaSubtitulo, setNoticiaSubtitulo] = useState("");

  const [noticiaConteudo, setNoticiaConteudo] = useState("");

  const [noticiaArquivoImagem, setNoticiaArquivoImagem] = useState("");

  const [noticiaDataPublicacao, setNoticiaDataPublicacao] = useState("");

  const [noticiaHoraPublicacao, setNoticiaHoraPublicacao] = useState("");

  const [noticiaLegendaImagem, setNoticiaLegendaImagem] = useState("");

  const [noticiaId, setNoticiaId] = useState("");

  const navigate = useNavigate();

  const limparDados = () => {
    setNoticiaTitulo("");
    setNoticiaSubtitulo("");
    setNoticiaConteudo("");
    setNoticiaArquivoImagem("");
    setNoticiaDataPublicacao("");
    setNoticiaHoraPublicacao("");
    setNoticiaLegendaImagem("");
    setNoticiaId("");
  };

  const NoticiaSet = (noticia, opcao) => {
    console.log("Noticia que foi passada: ", noticia);
    setNoticiaId(noticia.id);
    setNoticiaTitulo(noticia.titulo);
    setNoticiaSubtitulo(noticia.subtitulo);
    setNoticiaConteudo(noticia.conteudo);
    setNoticiaDataPublicacao(formatarDataParaExibicao(noticia.dataPublicacao));
    setNoticiaHoraPublicacao(noticia.horaPublicacao);
    setNoticiaLegendaImagem(noticia.legendaImagem);
    setNoticiaArquivoImagem(noticia.arquivoImagem);

    if (opcao === "Editar") {
      abrirFecharModalEditar();
    } else if (opcao === "Excluir") {
      abrirFecharModalDeletar();
    } else {
      navigate(`/visualizarNoticia/${noticia.id}`);
    }
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

  function inverterDataParaFormatoBanco(data) {
    const partes = data.split("/");
    if (partes.length === 3) {
      const [dia, mes, ano] = partes;
      return `${ano}-${mes}-${dia}`;
    }
    return data;
  }

  function formatarDataParaExibicao(data) {
    const partes = data.split("-");
    if (partes.length === 3) {
      const [ano, mes, dia] = partes;
      return `${dia}/${mes}/${ano}`;
    }
    return data; // Retorna a data original se não estiver no formato esperado
  }

  const pedidoGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dataFormatoBanco = inverterDataParaFormatoBanco(noticiaDataPublicacao);

  const pedidoPost = async () => {
    const formData = new FormData();
    formData.append("titulo", noticiaTitulo);
    formData.append("subtitulo", noticiaSubtitulo);
    formData.append("conteudo", noticiaConteudo);
    formData.append("dataPublicacao", dataFormatoBanco);
    formData.append("horaPublicacao", noticiaHoraPublicacao);
    formData.append("legendaImagem", noticiaLegendaImagem);

    const base64Image = await convertImageToBase64(noticiaArquivoImagem);
    formData.append("arquivoImagem", base64Image);

    await axios
      .post(baseUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setData(data.concat(response.data));
        abrirFecharModalInserir();
        limparDados();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function base64ToImage(base64String) {
    return `data:image/jpeg;base64,${base64String}`;
  }

  function convertImageToBase64(imageFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  async function pedidoAtualizar() {
    const formData = new FormData();
    formData.append("titulo", noticiaTitulo);
    formData.append("subtitulo", noticiaSubtitulo);
    formData.append("conteudo", noticiaConteudo);
    formData.append("dataPublicacao", dataFormatoBanco);
    formData.append("horaPublicacao", noticiaHoraPublicacao);
    formData.append("legendaImagem", noticiaLegendaImagem);

    // Verificando se noticiaArquivoImagem é um arquivo para converter em base64
    if (noticiaArquivoImagem instanceof File) {
      // Converter a imagem para base64 antes de enviar
      const base64Image = await convertImageToBase64(noticiaArquivoImagem);
      formData.append("arquivoImagem", base64Image);
    } else {
      formData.append("arquivoImagem", noticiaArquivoImagem);
    }

    try {
      const response = await axios.put(`${baseUrl}/${noticiaId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedNoticia = response.data;

      setData((prevData) => {
        return prevData.map((noticia) => {
          if (noticia.id === noticiaId) {
            return updatedNoticia;
          }
          return noticia;
        });
      });

      abrirFecharModalEditar();
      limparDados();
    } catch (error) {
      console.log(error);
    }
  }

  const atualizarListaNoticias = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pedidoRemoverImagem = () => {
    // Método para limpar a constante (não limpa o campo)
    setNoticiaArquivoImagem("");
  };

  const pedidoDeletar = async () => {
    await axios
      .delete(baseUrl + "/" + noticiaId)
      .then((response) => {
        const newNoticias = data.filter(
          (noticia) => noticia.id !== response.data
        );
        setData(newNoticias);
        atualizarListaNoticias();
        abrirFecharModalDeletar();
        limparDados();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (atualizarData) {
      pedidoGet();
      setAtualizarData(false);
    }
  }, [atualizarData]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Função para pegar uma parte específica da lista
  const getCurrentPageItems = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Renderiza os itens da página atual
  const currentItems = getCurrentPageItems(currentPage);

  // Funções para navegar entre as páginas
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="h-screen flex">
      <SidebarAdm />
      <div className="flex-2 container-fluid">
        <NavBarAdm />
        <div className="pl-8 pr-8 pt-[20px]">
          <h1 className="text-3xl font-semibold pb-2">Lista de Notícias</h1>
          <hr className="pb-4 border-[2.5px] border-[#DBDBDB]" />
          <div className="w-full rounded-[10px]  border-[#DBDBDB] ">
            <div className="grid grid-cols-7 w-full bg-[#DBDBDB] rounded-t-[8px] h-10 items-center text-base font-semibold text-black">
              <span className="flex col-span-1 ml-5 items-center">ID</span>
              <span className="flex col-span-3 justify-center items-center">
                Titulo
              </span>
              <span className="flex justify-center items-center">Data</span>
              <span className="flex col-span-2 justify-center items-center">
                Ações
              </span>
            </div>
            <ul className="w-full">
              {currentItems.map((noticia) => (
                <React.Fragment key={noticia.id}>
                  <li className="grid grid-cols-7 w-full bg-[#F5F5F5]">
                    <span
                      scope="row"
                      className="flex pl-5 border-r-[1px] border-t-[1px] border-[#DBDBDB] pt-[12px] pb-[12px] text-gray-700"
                    >
                      {noticia.id}
                    </span>
                    <span className="flex col-span-3 justify-left items-center pl-2 border-t-[1px] border-r-[1px] border-[#DBDBDB] text-gray-700 ">
                      {noticia.titulo.length > 50
                        ? noticia.titulo.substring(0, 55) + "..."
                        : noticia.titulo}
                    </span>
                    <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#DBDBDB] text-gray-700">
                      {formatarDataParaExibicao(noticia.dataPublicacao)}
                    </span>
                    <span className="flex col-span-2 items-center justify-center border-t-[1px] gap-2 border-[#DBDBDB]">
                      <button
                        className="text-white bg-teal-800 hover:bg-teal-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                        onClick={() => NoticiaSet(noticia, "Editar")}
                      >
                        <Pencil className="mr-1" size={16} />
                        Editar
                      </button>

                      <button
                        className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={() => NoticiaSet(noticia, "Excluir")}
                      >
                        <Trash className="mr-1" size={16} />
                        Excluir
                      </button>

                      <button
                        className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => NoticiaSet(noticia, "Visualizar")}
                      >
                        <Eye className="mr-1" size={16} />
                        Visualizar
                      </button>
                    </span>
                  </li>
                </React.Fragment>
              ))}
            </ul>
            <div className="pt-4 pb-4 flex justify-center gap-2 border-t-[1px] border-[#DBDBDB]">
              <button className="" onClick={() => goToPage(currentPage - 1)}>
                <CaretLeft size={22} className="text-[#DBDBDB]" />
              </button>
              <select
                className="rounded-sm hover:border-[#DBDBDB] select-none"
                value={currentPage}
                onChange={(e) => goToPage(Number(e.target.value))}
              >
                {[...Array(totalPages)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <button className="" onClick={() => goToPage(currentPage + 1)}>
                <CaretRight size={22} className="text-[#DBDBDB]" />
              </button>
            </div>
          </div>
          <div className="float-right flex-auto py-6">
            <button
              className="text-white bg-yellow-400 hover:bg-yellow-500 
               rounded-xl text-lg px-3 font-semibold py-1.5 text-center"
              onClick={() => abrirFecharModalInserir()}
            >
              <span className="inline-flex items-center">
                <FilePlus className="mr-1" size={24} />
                Cadastrar
              </span>
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={modalInserir}>
        <ModalHeader>Cadastrar Noticia</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Titulo: </label>
            <br />
            <input
              type="text"
              className="form-control text-sm"
              onChange={(e) => setNoticiaTitulo(e.target.value)}
              placeholder="Digite o Titulo"
            />
            <br />
            <label>Subtitulo:</label>
            <br />
            <textarea
              className="form-control text-sm" 
              onChange={(e) => setNoticiaSubtitulo(e.target.value)}
              placeholder="Digite o Subtitulo"
            />
            <br />
            <label>Conteúdo:</label>
            <br />
            <textarea
              className="form-control text-sm"
              onChange={(e) => setNoticiaConteudo(e.target.value)}
              placeholder="Digite o Conteúdo"
            />
            <br />
            <label>Data:</label>
            <br />
            <InputMask
              mask="99/99/9999"
              maskPlaceholder="dd/mm/yyyy"
              type="text"
              className="form-control text-sm"
              onChange={(e) => setNoticiaDataPublicacao(e.target.value)}
              placeholder="Digite apenas números"
              value={noticiaDataPublicacao}
            />
            <br />
            <label>Hora:</label>
            <br />
            <InputMask
              mask="99:99"
              maskPlaceholder="hh:mm"
              type="text"
              className="form-control text-sm"
              onChange={(e) => setNoticiaHoraPublicacao(e.target.value)}
              placeholder="Digite apenas números"
              value={noticiaHoraPublicacao}
            />
            <br />
            <label>Legenda:</label>
            <br />
            <input
              type="text"
              className="form-control text-sm"
              onChange={(e) => setNoticiaLegendaImagem(e.target.value)}
              placeholder="Digite a legenda"
            />
            <br />
            <label>Imagem:</label>
            {noticiaArquivoImagem && modalEditar && (
              <div style={{ position: "relative", display: "inline-block" }}>
                {typeof noticiaArquivoImagem === "string" ? (
                  <img
                    src={base64ToImage(noticiaArquivoImagem)}
                    alt="Preview"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(noticiaArquivoImagem)}
                    alt="Preview"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                )}
                <button
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "5px",
                    width: "30px",
                    height: "30px",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    borderRadius: "50%",
                    border: "none",
                    padding: "0",
                    cursor: "pointer",
                  }}
                  onClick={() => pedidoRemoverImagem()}
                >
                  X
                </button>
                <br />
              </div>
            )}
            {/* Tudo o que está dentro desse comando somente será criado se noticiaArquivoImagem tiver um dado e modalInserir for true */}
            <input
              type="file"
              className="form-control"
              onChange={(e) => setNoticiaArquivoImagem(e.target.files[0])}
              value={noticiaArquivoImagem === "" ? "" : undefined}
            />{" "}
            {/* Caso noticiaArquivoImagem esteja vazio, limpamos o campo, se não estiver, nenhuma ação é efetuada */}{" "}
            {/* Informamos '' (ou "") para limpar o campo, e undefined para não efetuar nenhuma ação */}
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn bg-yellow-400 text-white hover:bg-yellow-500"
            onClick={() => pedidoPost()}
          >
            Cadastrar
          </button>
          {"  "}
          <button
            className="btn bg-gray-400 hover:bg-gray-600 text-white"
            onClick={() => abrirFecharModalInserir()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Noticia</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label>
            <br />
            <input
              type="text"
              className="form-control  text-sm"
              readOnly
              value={noticiaId}
            />{" "}
            <br />
            <label>Titulo:</label>
            <input
              type="text"
              className="form-control  text-sm"
              name="noticiaTitulo"
              onChange={(e) => setNoticiaTitulo(e.target.value)}
              value={noticiaTitulo}
            />
            <br />
            <label>Subtitulo:</label>
            <br />
            <textarea
              className="form-control  text-sm"
              name="noticiaSubtitulo"
              onChange={(e) => setNoticiaSubtitulo(e.target.value)}
              value={noticiaSubtitulo}
            />
            <br />
            <label>Conteúdo:</label>
            <br />
            <textarea
              className="form-control  text-sm"
              name="noticiaConteudo"
              onChange={(e) => setNoticiaConteudo(e.target.value)}
              value={noticiaConteudo}
            />
            <br />
            <label>Data:</label>
            <br />
            <InputMask
              mask="99/99/9999"
              maskPlaceholder="dd/mm/yyyy"
              type="text"
              className="form-control  text-sm"
              onChange={(e) => setNoticiaDataPublicacao(e.target.value)}
              value={noticiaDataPublicacao}
            />
            <br />
            <label>Hora:</label>
            <br />
            <InputMask
              mask="99:99"
              maskPlaceholder="hh:mm"
              type="text"
              className="form-control  text-sm"
              onChange={(e) => setNoticiaHoraPublicacao(e.target.value)}
              value={noticiaHoraPublicacao}
            />
            <br />
            <label>Legenda:</label>
            <br />
            <input
              type="text"
              className="form-control  text-sm"
              onChange={(e) => setNoticiaLegendaImagem(e.target.value)}
              value={noticiaLegendaImagem}
            />
            <br />
            <label>Imagem:</label>
            {noticiaArquivoImagem && modalEditar && (
              <div style={{ position: "relative", display: "inline-block" }}>
                {typeof noticiaArquivoImagem === "string" ? (
                  <img
                    src={noticiaArquivoImagem}
                    alt="Preview"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(noticiaArquivoImagem)}
                    alt="Preview"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                )}
              </div>
            )}
            <input
              type="file"
              className="form-control"
              onChange={(e) => setNoticiaArquivoImagem(e.target.files[0])}
              value={noticiaArquivoImagem === "" ? "" : undefined}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn bg-teal-700 hover:bg-teal-900 text-white"
            onClick={() => pedidoAtualizar()}
          >
            Editar
          </button>
          {"  "}
          <button
            className="btn bg-gray-400 hover:bg-gray-600 text-white"
            onClick={() => abrirFecharModalEditar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalDeletar}>
        <ModalBody>
          Confirma a exclusão da notícia "{noticiaTitulo}" ?
        </ModalBody>
        <ModalFooter>
          <button
            className="btn bg-red-800 hover:bg-red-900 text-white"
            onClick={() => pedidoDeletar()}
          >
            Sim
          </button>
          <button
            className="btn bg-gray-400 hover:bg-gray-600 text-white"
            onClick={() => abrirFecharModalDeletar()}
          >
            Não
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
