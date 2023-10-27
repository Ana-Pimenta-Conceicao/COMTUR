import axios from "axios";
import { useState, useEffect } from "react";
import './index.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import "bootstrap/dist/css/bootstrap.min.css"

const Telas = () => {

    const baseUrl = "https://localhost:7256/api/Noticia";

    const [data, setData] = useState([])

    const [atualizarData, setAtualizarData] = useState(true)

    const [modalInserir, setModalInserir] = useState(false)

    const [modalEditar, setModalEditar] = useState(false)

    const [modalDeletar, setModalDeletar] = useState(false)

    const [noticiaTitulo, setNoticiaTitulo] = useState("")

    const [noticiaSubtitulo, setNoticiaSubtitulo] = useState("")

    const [noticiaConteudo, setNoticiaConteudo] = useState("")

    const [noticiaDataHora, setNoticiaDataHora] = useState("")

    const [noticiaId, setNoticiaId] = useState("")

    const [selecionarNoticia, setSelecionarNoticia] = useState({
        id: "",
        titulo: "",
        subtitulo: "",
        conteudo: "",
        data: ""
    })

    const NoticiaSet = (noticia, opcao) => {
        setNoticiaId(noticia.id)
        setNoticiaTitulo(noticia.titulo)
        setNoticiaSubtitulo(noticia.subtitulo)
        setNoticiaConteudo(noticia.conteudo)
        setNoticiaDataHora(noticia.data)

        if (opcao === "Editar") {
            abrirFecharModalEditar();
        }
        else {
            abrirFecharModalDeletar();
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

    const pedidoGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const pedidoPost = async () => {
        delete selecionarNoticia.id
        await axios.post(baseUrl, { titulo: noticiaTitulo, subtitulo: noticiaSubtitulo, conteudo: noticiaConteudo, data: noticiaDataHora })
            .then(response => {
                setData(data.concat(response.data));
                abrirFecharModalInserir();
            }).catch(error => {
                console.log(error);
            })
    }

    async function pedidoAtualizar() {
        delete selecionarNoticia.id

        const dadosAtualizados = {
            id: noticiaId,
            titulo: noticiaTitulo,
            subtitulo: noticiaSubtitulo,
            conteudo: noticiaConteudo,
            data: noticiaDataHora,
        };

        try {
            const response = await axios.put(baseUrl, dadosAtualizados)

            const dadosResposta = response.data;

            const index = data.findIndex(noticia => noticia.id === noticiaId);

            if (index !== -1) {
                data[index] = dadosResposta;
            }

            abrirFecharModalEditar();
            // .then(response => {
            // var answer = response.data
            // var aux = data
            // aux.map(noticia => {
            //   if (noticia.id === selecionarNoticia.id) {
            //     noticia.titulo = answer.noticiaTitulo
            //     noticia.subtitulo = answer.noticiaSubtitulo
            //     noticia.conteudo = answer.noticiaConteudo
            //     noticia.data = answer.noticiaDataHora
            //   }
            // })
        } catch (error) {
            console.log(error)
        }
    }

    const pedidoDeletar = async () => {
        await axios.delete(baseUrl + "/" + selecionarNoticia.id)
            .then(response => {
                setData(data.filter(state => state.id !== response.data));
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
        <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl  pb-10 font-semibold">Notícias</h1>
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
                <tr className="bg-white border-b dark:bg-slate-100" key={noticia.id}>
                  <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-800">{noticia.id}</td>
                  <td class="px-6 py-4">{noticia.titulo}</td>
                  <td>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => NoticiaSet(noticia, "Editar")}>
                      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                      Editar
                    </button>
                    {"  "}
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => NoticiaSet(noticia, "Excluir")}>
                      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="float-right flex-auto py-32">
          <button className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
            onClick={() => abrirFecharModalInserir()}
          >Cadastrar</button>
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
              <input type="text" className="form-control" onChange={(e) => setNoticiaDataHora(e.target.value)} />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => pedidoPost()}>Cadastrar</button>{"  "}
            <button className="btn btn-danger" onClick={() => abrirFecharModalInserir()}>Cancelar</button>
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
              <input type="text" className="form-control" name="noticiaDataHora" onChange={(e) => setNoticiaDataHora(e.target.value)}
                value={noticiaDataHora} />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => pedidoAtualizar()}>Alterar</button>{"  "}
            <button className="btn btn-danger" onClick={() => abrirFecharModalEditar()}>Cancelar</button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modalDeletar}>
          <ModalBody>
            Confirma a exclusão desta noticia : {selecionarNoticia && selecionarNoticia.titulo} ?
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-primary' onClick={() => pedidoDeletar()}>Sim</button>
            <button className='btn btn-danger' onClick={() => abrirFecharModalDeletar()}>Não</button>
          </ModalFooter>
        </Modal>
      </div>
    )
}

export default Telas;