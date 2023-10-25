import { useEffect, useState } from 'react'
import axios from 'axios'
import "../noticia/index.css"
//import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import "bootstrap/dist/css/bootstrap.min.css"

function Noticia() {

  const baseUrl = "https://localhost:7256/api/Noticia";

  const [data, setData] = useState([])

  const pedidoGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    pedidoGet();
  })

  return (


    
    <div className='App'>

      <br />
      <h3 className='ListNot'>Lista de Noticia</h3>
      <header>
        <button className='btn btn-success'>Adicionar</button>
      </header>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Titulo</th>
            <th>Subtitulo</th>
            <th>Conteudo</th>
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
                <button className='btn btn-primary'>Editar</button> {"  "}
                <button className="btn btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Noticia