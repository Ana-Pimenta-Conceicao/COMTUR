import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import axios from 'axios'
import "../tipoatracao/index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import SidebarAdm from '../../components/sidebarAdm';
import NavbarAdm from '../../components/navbarAdm';

function TipoAtracao() {

  const baseUrl = "https://localhost:7256/api/TipoAtracao";

  const [data, setData] = useState([])

  const [atualizarData, setAtualizarData] = useState(true)

  const [modalInserir, setModalInserir] = useState(false)

  const [modalEditar, setModalEditar] = useState(false)

  const [modalDeletar, setModalDeletar] = useState(false)

  const [tipoatracaoNome, setTipoAtracaoNome] = useState("")

  const [tipoatracaoId, setTipoAtracaoId] = useState("")

  const [tipoatracaoSelecionado, setTipoAtracaoSelecionado] = useState({
    id: '',
    nome: ''
  });


  const TipoAtracaoSet = (tipoatracao, opcao) => {
    setTipoAtracaoNome(tipoatracao.nome)
    setTipoAtracaoId(tipoatracao.id)
    setTipoAtracaoSelecionado(tipoatracao.id)

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
    delete tipoatracaoSelecionado.id
    await axios.post(baseUrl, { nome: tipoatracaoNome })
      .then(response => {
        setData(data.concat(response.data));
        abrirFecharModalInserir();
      }).catch(error => {
        console.log(error);
      })
  }

  async function pedidoAtualizar() {
    console.log("Id que chegou: ", tipoatracaoId);
    try {
      const response = await axios.put(`${baseUrl}/${tipoatracaoId}`, {
        nome: tipoatracaoNome
      });

      const updatedTipoAtracao = response.data;

      setData((prevData) => {
        return prevData.map((tipoatracao) => {
          if (tipoatracao.id === tipoatracaoId) {
            return updatedTipoAtracao;
          }
          return tipoatracao;
        });
      });

      abrirFecharModalEditar();
    } catch (error) {
      console.log(error);
    }
  }



  const pedidoDeletar = async () => {
    await axios.delete(baseUrl + "/" + tipoatracaoId)
      .then(response => {
        setData(data.filter(tipoatracao => tipoatracao.id !== response.data));
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

    <div className="App">
      <header className="App-header ">

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="bootstrap-4.0.0-dist/css/bootstrap-grid.css"></link>



        <div >
              <div className="h-screen flex">
                  <SidebarAdm />
                  <div className="flex-2 container-fluid">
                    <NavbarAdm />



                    <div className="Cadastro" style={{ width: 242, height: 37, color: 'black', fontSize: 40, fontFamily: 'Mulish', fontWeight: '500', wordWrap: 'break-word' }}>Cadastro</div>

                    <div className="App">
                      <br />
                      <hr class="linhaseparacao"></hr>
                      <div class="Atracao" style={{ width: 219, height: 37, color: 'black', fontSize: 32, fontFamily: 'Mulish', fontWeight: '600', wordWrap: 'break-word' }}>Atração</div>

                      <div class="container">
                        <div class="row">
                          <div class="col-7">
                            <div class="card cardcadastros">
                              <form class="row g-2">

                                <div class="col-md-7">
                                  <label for="inputName" class="labelformulario form-label" style={{ color: 'black', fontSize: 18, fontFamily: 'Mulish', fontWeight: '400', wordWrap: 'break-word' }}>*Nome:</label>
                                  <input type="name" class="form-control" id="inputName" />
                                </div>
                                <div class="col-7">
                                  <label for="inputDescricao" class="labelformulario form-label" style={{ color: 'black', fontSize: 18, fontFamily: 'Mulish', fontWeight: '400', wordWrap: 'break-word' }}>*Descrição:</label>
                                  <input type="text" class="form-control" id="inputDescricao" placeholder="Breve descrição" />
                                </div>


                              </form>
                            </div>
                          </div>
                          <br /><br /><br /><br />

                          <div class="col-5">
                            <div class="card cardtipo">
                              <div class="row row-cols-lg-auto g-3 align-items-center">
                                <form >

                                  <div class="col-12">

                                    <div class="row g-3 align-items-center">
                                      <div class="col-auto">
                                        <label for="inputPassword6" class="col-form-label">*Tipo</label>
                                      </div>
                                      <div class="col-auto">
                                        <select class="form-select" aria-label="Default select example">
                                          <option selected>Selecione tipo de Atração</option>
                                          <option value="1">        </option>
                                          <option value="2">        </option>
                                          <option value="3">        </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                                <div class="col-10">
                                  <button class="btn btnpesquisar p-2" type="submit"><img class="" src="./src/assets/search.svg" /> </button>
                                  <button className='btn btnadicionar p-2 m-1' onClick={() => abrirFecharModalInserir()}><img class="" src="./src/assets/adicionartipo.svg" /></button>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button class="btn btncancelar  me-md-2" type="button">Cancelar</button>
                        <button class="btn btnsalvar " type="button">Salvar</button>
                      </div>

                      <br />
                      <header>

                        <button className='btn btn-success' onClick={() => abrirFecharModalInserir()}>Adicionar</button>
                      </header>
                      <table className='table table-bordered'>
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Nome</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map(tipoatracao => (
                            <tr key={tipoatracao.id}>
                              <td>{tipoatracao.id}</td>
                              <td>{tipoatracao.nome}</td>
                              <td>
                                <button className="btn btn-primary" onClick={() => TipoAtracaoSet(tipoatracao, "Editar")}>Editar</button> {"  "}
                                <button className="btn btn-danger" onClick={() => TipoAtracaoSet(tipoatracao, "Excluir")}>Excluir</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <Modal isOpen={modalInserir}>
                        <ModalHeader>Incluir Tipo Atração</ModalHeader>
                        <ModalBody>
                          <div className="form-group">
                            <label>Nome: </label>
                            <br />
                            <input type="text" className="form-control" onChange={(e) => setTipoAtracaoNome(e.target.value)} />
                            <br />
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <button className="btn btn-primary" onClick={() => pedidoPost()}>Cadastrar</button>{"  "}
                          <button className="btn btn-danger" onClick={() => abrirFecharModalInserir()}>Cancelar</button>
                        </ModalFooter>
                      </Modal>
                      <Modal isOpen={modalEditar}>
                        <ModalHeader>Editar Tipo Atração</ModalHeader>
                        <ModalBody>
                          <div className="form-group">
                            <label>ID: </label><br />
                            <input type="text" className="form-control" readOnly value={tipoatracaoId} /> <br />

                            <label>Nome:</label>
                            <input type="text" className="form-control" name="tipoatracaoNome" onChange={(e) => setTipoAtracaoNome(e.target.value)}
                              value={tipoatracaoNome} />
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
                          <label>Confirma a exclusão deste tipo Atração : {tipoatracaoNome} ?</label>
                        </ModalBody>
                        <ModalFooter>
                          <button className='btn btn-primary' onClick={() => pedidoDeletar()}>Sim</button>
                          <button className='btn btn-danger' onClick={() => abrirFecharModalDeletar()}>Não</button>
                        </ModalFooter>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            

      </header>
    </div>

  );
}

export default TipoAtracao