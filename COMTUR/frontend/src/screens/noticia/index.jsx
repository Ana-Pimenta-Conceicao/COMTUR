import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import axios from 'axios'
import "../noticia/index.css"
//import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import "bootstrap/dist/css/bootstrap.min.css"

function Noticia() {

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
    } catch(error) {
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


    
    <div className='App'>

      <br />
      <h3 className='ListNot'>Lista de Noticia</h3>
      <header>
        <button className='btn btn-success' onClick={() => abrirFecharModalInserir()}>Adicionar</button>
      </header>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Titulo</th>
            <th>Subtitulo</th>
            <th>Conteúdo</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {data.map(noticia => (
            <tr key={noticia.id}>
              <td>{noticia.id}</td>
              <td>{noticia.titulo}</td>
              <td>{noticia.subtitulo}</td>
              <td>{noticia.conteudo}</td>
              <td>{noticia.data}</td>
              <td>
                <button className="btn btn-primary" onClick={() => NoticiaSet(noticia, "Editar")}>Editar</button> {"  "}
                <button className="btn btn-danger" onClick={() => NoticiaSet(noticia, "Excluir")}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
  );
}

export default Noticia