import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import axios from 'axios'
import "../tipoatracao/index.css"
import "bootstrap/dist/css/bootstrap.min.css"

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
    // delete tipoatracaoSelecionado.id
    await axios.put(baseUrl, { id: tipoatracaoId, nome: tipoatracaoNome })

      .then(response => {
        var answer = response.data
        var aux = data
        aux.map(tipoatracao => {
          if (tipoatracao.id === tipoatracaoSelecionado.id) {
            tipoatracao.nome = answer.nome
          }
        })
        abrirFecharModalEditar();
      }).catch(error => {
        console.log(error)
      })
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

        <body class="col-12">
          <div class="container-fluid">
            <div class="row flex-nowrap">
              <div class="menulateral col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">


                <div style={{ width: 100, height: 100, left: 80, top: 130, borderRadius: '50px', position: 'absolute', border: '2px white solid' }} />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <hr class="hr"></hr>

                <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                  <a href="/" class="d-flex align-items-center pb-5 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline px-2">Rodrigo Favaro</span>
                  </a>


                  <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                    <li class="w-100">

                      <a href="#" class="nav-link px-2 fs-6"> <div><img className="Image57" style={{ width: 18, height: 16 }} src="imgusuario.png" /><span class="d-none d-sm-inline"> Usuarios</span></div></a>
                    </li>
                    <li>
                      <a href="#" class="nav-link px-2"> <div><img className="Image57" style={{ width: 18, height: 16 }} src="imgponto.png" /><span class="d-none d-sm-inline"> Ponto Turístico</span></div></a>
                    </li>

                    <li>
                      <a href="#" class="nav-link px-2"> <div><img className="Image57" style={{ width: 18, height: 16 }} src="imgevento.png" /><span class="d-none d-sm-inline"> Eventos</span></div></a>
                    </li>

                    <li>
                      <a href="#" class="nav-link px-2"> <div><img className="Image57" style={{ width: 18, height: 16 }} src="imgatracao.png" /><span class="d-none d-sm-inline"> Atrações</span></div></a>
                    </li>

                    <li>
                      <a href="#" class="nav-link px-2"> <div><img className="Image57" style={{ width: 18, height: 16 }} src="imgnoticia.png" /><span class="d-none d-sm-inline"> Notícias</span></div></a>
                    </li>
                    <li>
                      <a href="#" class="nav-link px-2"> <div><img className="Image57" style={{ width: 18, height: 16 }} src="imgDashboard.png" /><span class="d-none d-sm-inline"> Dashboard</span></div></a>
                    </li>

                  </ul>



                  <hr></hr>

                  <div class="dropdown pb-4">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle"></img>
                      <span class="d-none d-sm-inline mx-1">loser</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                      <li><a class="dropdown-item" href="#">New project...</a></li>
                      <li><a class="dropdown-item" href="#">Settings</a></li>
                      <li><a class="dropdown-item" href="#">Profile</a></li>
                      <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col py-3">
                <div class="nav">

                  <ul class="nav nav-pills">
                    <li class="nav-item">
                      <a class="itemacessibi nav-link active m-1" aria-current="page" href="#"><img className="Image57" style={{ width: 29.50, height: 29.50 }} src="imgTema.png" /></a>
                    </li>
                    <li class="nav-item">
                      <a class="itemacessibi nav-link active m-1" aria-current="page" href="#"><img className="Image57" style={{ width: 29.50, height: 29.50 }} src="imgDaltonico.png" /></a>
                    </li>
                    <li class="nav-item">
                      <a style={{ width: 61.5, height: 45.5 }} class="itemacessibi nav-link active m-1" aria-current="page" href="#"><img src="imgAumLetra.png" style={{ fontSize: 40, paddingBlockEnd: 100, paddingright: 20 }} /></a>
                    </li>
                    <li class="nav-item">
                      <a class="itemacessibi nav-link active m-1" aria-current="page" href="#"><img src="imgDimLetra.png" /></a>
                    </li>
                  </ul>

                  <nav class="pesquisar navbar ">
                    <div class="container-fluid">
                      <form class="d-flex" role="search">
                        <input class="campopesquisa form-control me-2" type="search" placeholder="pesquisar" aria-label="Search"></input>
                        <button class="btn btn-outline-light" type="submit"><img class="" src="lupa.png" /> </button>
                      </form>
                    </div>
                  </nav>

                  <img class=" d-flex logocomtur" src="../assets/Comtur.svg" alt='não tem imagem' />
                </div>
                <br /><br />

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

                      <div class="col-5 w-250">
                        <div class="card cardtipo">

                          <form class="row row-cols-lg-auto g-3 align-items-center">
                            <label for="inputDescricao" class="labelformulario form-label" style={{ color: 'black', fontSize: 18, fontFamily: 'Mulish', fontWeight: '400', wordWrap: 'break-word' }}>*Tipo:</label>
                            <div class="col-12">
                              <label class="visually-hidden" for="inlineFormInputGroupUsername">Pesquisar</label>
                              <div class="input-group">
                                <input type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="Pesquisar" />
                              </div>
                            </div>

                            <div class="col-10">
                              <button class="btn btn-outline-light" type="submit"><img class="" src="../assets/search.svg" /> </button>
                              <button className='btn btnadicionar' onClick={() => abrirFecharModalInserir()}>+</button>
                            </div>

                            

                          </form>
                        </div>
                      </div>
                      
                    </div>
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
        </body>
      </header>
    </div>

  );
}

export default TipoAtracao