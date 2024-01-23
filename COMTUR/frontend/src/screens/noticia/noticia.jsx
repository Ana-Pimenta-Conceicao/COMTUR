import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
//import { useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import InputMask from 'react-input-mask';
import Sidebar from '../../components/sidebar';
import NavBar from '../../components/navbar';
//import visualizarNoticia from "./visualizarNoticia";
import { useNavigate } from 'react-router-dom';

export default function Noticia() {

  const baseUrl = "https://localhost:7256/api/Noticia";

  const [data, setData] = useState([])

  const [atualizarData, setAtualizarData] = useState(true)

  const [modalInserir, setModalInserir] = useState(false)

  const [modalEditar, setModalEditar] = useState(false)

  const [modalDeletar, setModalDeletar] = useState(false)

  const [noticiaTitulo, setNoticiaTitulo] = useState("")

  const [noticiaSubtitulo, setNoticiaSubtitulo] = useState("")

  const [noticiaConteudo, setNoticiaConteudo] = useState("")

  const [noticiaDataPublicacao, setNoticiaDataPublicacao] = useState("")

  const [noticiaHoraPublicacao, setNoticiaHoraPublicacao] = useState("")

  const [noticiaId, setNoticiaId] = useState("")

  //const { id } = useParams();

  const navigate = useNavigate();

  const [selecionarNoticia, setSelecionarNoticia] = useState({
    id: "",
    titulo: "",
    subtitulo: "",
    conteudo: "",
    dataPublicacao: "",
    horaPublicacao: "",
  })

  const NoticiaSet = (noticia, opcao) => {
    console.log("Noticia que foi passada: ", noticia);
    setNoticiaId(noticia.id)
    setNoticiaTitulo(noticia.titulo)
    setNoticiaSubtitulo(noticia.subtitulo)
    setNoticiaConteudo(noticia.conteudo)
    setNoticiaDataPublicacao(formatarDataParaExibicao(noticia.dataPublicacao))
    setNoticiaHoraPublicacao(noticia.horaPublicacao)

    if (opcao === "Editar") {
      abrirFecharModalEditar();
    }
    else if (opcao === "Excluir") {
      abrirFecharModalDeletar();
    }
    else {
      navigate(`/visualizarNoticia/${noticia.id }`)
    }
  }

  const abrirFecharModalInserir = () => {
    setModalInserir(!modalInserir)
  }

  const abrirFecharModalEditar = () => {
    setModalEditar(!modalEditar)
  }

  const abrirFecharModalDeletar = () => {
    setModalDeletar(!modalDeletar)
  }

  function inverterDataParaFormatoBanco(data) {
    const partes = data.split('/');
    if (partes.length === 3) {
      const [dia, mes, ano] = partes;
      return `${ano}-${mes}-${dia}`;
    }
    return data;
  }

  function formatarDataParaExibicao(data) {
    const partes = data.split('-');
    if (partes.length === 3) {
      const [ano, mes, dia] = partes;
      return `${dia}/${mes}/${ano}`;
    }
    return data; // Retorna a data original se não estiver no formato esperado
  }
  const pedidoGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const dataFormatoBanco = inverterDataParaFormatoBanco(noticiaDataPublicacao);

  const pedidoPost = async () => {
    delete selecionarNoticia.id
    await axios.post(baseUrl, {
      titulo: noticiaTitulo,
      subtitulo: noticiaSubtitulo,
      conteudo: noticiaConteudo,
      dataPublicacao: dataFormatoBanco,
      horaPublicacao: noticiaHoraPublicacao
    })
      .then(response => {
        setData(data.concat(response.data));
        abrirFecharModalInserir();
      }).catch(error => {
        console.log(error);
      })
  }

  async function pedidoAtualizar() {
    console.log("Id que chegou: ", noticiaId);
    try {
      const response = await axios.put(`${baseUrl}/${noticiaId}`, {
        titulo: noticiaTitulo,
        subtitulo: noticiaSubtitulo,
        conteudo: noticiaConteudo,
        dataPublicacao: dataFormatoBanco,
        horaPublicacao: noticiaHoraPublicacao
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
    } catch (error) {
      console.log(error);
    }
  }

  const atualizarListaNoticias = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const pedidoDeletar = async () => {
    await axios.delete(baseUrl + "/" + noticiaId)
      .then(response => {
        const newNoticias = data.filter(noticia => noticia.id !== response.data);
        setData(newNoticias);
        atualizarListaNoticias();
        abrirFecharModalDeletar();
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    if (atualizarData) {
      pedidoGet();
      setAtualizarData(false);
    }
  }, [atualizarData])

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-2 container-fluid">
        <NavBar />
        <h1 className="text-2xl pb-10 font-semibold">Lista de Notícias</h1>
        <div className="flex relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-200 dark:text-gray-800">
              <tr>
                <th scope="col" className="p-3">Id</th>
                <th scope="col" className="px-6 py-3">Título</th>
                <th scope="col" className="px-6 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map(noticia => (
                <React.Fragment key={noticia.id}>
                  <tr className="bg-white border-b dark:bg-slate-100">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-800">{noticia.id}</td>
                    <td className="px-6 py-4">{noticia.titulo}</td>
                    <td className="px-6 py-4">
                      <button className="text-white bg-teal-800 hover:bg-teal-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                        onClick={() => NoticiaSet(noticia, "Editar")}>
                        Editar
                      </button>

                      <button className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={() => NoticiaSet(noticia, "Excluir")}>
                        Excluir
                      </button>

                      <button className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => NoticiaSet(noticia, "Visualizar")}>
                        Visualizar
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}

            </tbody>
          </table>
        </div>
        <div className="float-right flex-auto py-14">
          <button className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
            onClick={() => abrirFecharModalInserir()}
          >Cadastrar</button>
        </div>
      </div>
      <Modal isOpen={modalInserir}>
        <ModalHeader>Cadastrar Noticia</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Titulo: </label>
            <br />
            <input type="text" className="form-control" onChange={(e) => setNoticiaTitulo(e.target.value)} />
            <br />
            <label>Subtitulo:</label>
            <br />
            <input type="text" className="form-control" onChange={(e) => setNoticiaSubtitulo(e.target.value)} />
            <br />
            <label>Conteúdo:</label>
            <br />
            <input type="text" className="form-control" onChange={(e) => setNoticiaConteudo(e.target.value)} />
            <br />
            <label>Data:</label>
            <br />
            <InputMask mask="99/99/9999" maskPlaceholder="dd/mm/yyyy" type="text" className="form-control" onChange={(e) => setNoticiaDataPublicacao(e.target.value)} value={noticiaDataPublicacao} />
            <br />
            <label>Hora:</label>
            <br />
            <InputMask mask="99:99" maskPlaceholder="hh:mm" type="text" className="form-control" onChange={(e) => setNoticiaHoraPublicacao(e.target.value)} value={noticiaHoraPublicacao} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn bg-yellow-400 text-white hover:bg-yellow-500" onClick={() => pedidoPost()}>Cadastrar</button>{"  "}
          <button className="btn bg-gray-400 hover:bg-gray-600 text-white" onClick={() => abrirFecharModalInserir()}>Cancelar</button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Noticia</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label><br />
            <input type="text" className="form-control" readOnly value={noticiaId} /> <br />

            <label>Titulo:</label>
            <input type="text" className="form-control" name="noticiaTitulo" onChange={(e) => setNoticiaTitulo(e.target.value)}
              value={noticiaTitulo} />
            <br />
            <label>Subtitulo:</label>
            <br />
            <input type="text" className="form-control" name="noticiaSubtitulo" onChange={(e) => setNoticiaSubtitulo(e.target.value)}
              value={noticiaSubtitulo} />
            <br />
            <br />
            <label>Conteúdo:</label>
            <br />
            <input type="text" className="form-control" name="noticiaConteudo" onChange={(e) => setNoticiaConteudo(e.target.value)}
              value={noticiaConteudo} />
            <br />
            <br />
            <label>Data:</label>
            <br />
            <InputMask mask="99/99/9999" maskPlaceholder="dd/mm/yyyy" type="text" className="form-control" onChange={(e) => setNoticiaDataPublicacao(e.target.value)} value={noticiaDataPublicacao} />
            <br />
            <label>Hora:</label>
            <br />
            <InputMask mask="99:99" maskPlaceholder="hh:mm" type="text" className="form-control" onChange={(e) => setNoticiaHoraPublicacao(e.target.value)} value={noticiaHoraPublicacao} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn bg-teal-700 hover:bg-teal-900 text-white" onClick={() => pedidoAtualizar()}>Editar</button>{"  "}
          <button className="btn bg-gray-400 hover:bg-gray-600 text-white" onClick={() => abrirFecharModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalDeletar}>
        <ModalBody>
          Confirma a exclusão da notícia "{noticiaTitulo}" ?
        </ModalBody>
        <ModalFooter>
          <button className='btn bg-red-800 hover:bg-red-900 text-white' onClick={() => pedidoDeletar()}>Sim</button>
          <button className='btn bg-gray-400 hover:bg-gray-600 text-white' onClick={() => abrirFecharModalDeletar()}>Não</button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
