import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import axios from 'axios'
import "../tipoturismo/index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';


function TipoTurismo() {

    const baseUrl = "https://localhost:7256/api/TipoTurismo";

    const [data, setData] = useState([])

    const [atualizarData, setAtualizarData] = useState(true)

    const [modalInserir, setModalInserir] = useState(false)

    const [modalEditar, setModalEditar] = useState(false)

    const [modalDeletar, setModalDeletar] = useState(false)

    const [tipoturismoNome, setTipoTurismoNome] = useState("")

    const [tipoturismoId, setTipoTurismoId] = useState("")

    const [tipoturismoSelecionado, setTipoTurismoSelecionado] = useState({
        id: '',
        nome: ''
    });


    const TipoTurismoSet = (tipoturismo, opcao) => {
        setTipoTurismoNome(tipoturismo.nome)
        setTipoTurismoId(tipoturismo.id)

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
        delete tipoturismoSelecionado.id
        await axios.post(baseUrl, { nome: tipoturismoNome })
            .then(response => {
                setData(data.concat(response.data));
                abrirFecharModalInserir();
            }).catch(error => {
                console.log(error);
            })
    }

    async function pedidoAtualizar() {
        console.log("Id que chegou: ", tipoturismoId);
        try {
            const response = await axios.put(`${baseUrl}/${tipoturismoId}`, {
                nome: tipoturismoNome
            });

            const updatedTipoTurismo = response.data;

            setData((prevData) => {
                return prevData.map((tipoturismo) => {
                    if (tipoturismo.id === tipoturismoId) {
                        return updatedTipoTurismo;
                    }
                    return tipoturismo;
                });
            });

            abrirFecharModalEditar();
        } catch (error) {
            console.log(error);
        }
    }


    const pedidoDeletar = async () => {
        await axios.delete(baseUrl + "/" + tipoturismoId)
            .then(response => {
                setData(data.filter(tipoturismo => tipoturismo.id !== response.data));
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
            <div className='h-screen flex'>
            <Sidebar />
            <div className='flex-2 container-fluid'>
            <Navbar/>
            
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
                <link rel="stylesheet" href="bootstrap-4.0.0-dist/css/bootstrap-grid.css"></link>
                <link href="https://fonts.googleapis.com/css?family=Bungee+Inline" rel="stylesheet"></link>
            
                        
                        
                        <div class="col py-3">

                            <div className="Cadastro" style={{ width: 242, height: 37, color: 'black', fontSize: 40, fontFamily: 'Mulish', fontWeight: '500', wordWrap: 'break-word' }}>Cadastro</div>

                            <br />
                            <hr class="linhaseparacao"></hr>
                            <div class="Turismo" style={{ width: 219, height: 37, color: 'black', fontSize: 32, fontFamily: 'Mulish', fontWeight: '600', wordWrap: 'break-word' }}>Turismo</div>


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
                                                <div class="col-7">
                                                    <label for="inputLocal" class="labelformulario form-label" style={{ color: 'black', fontSize: 18, fontFamily: 'Mulish', fontWeight: '400', wordWrap: 'break-word' }}>*Local:</label>
                                                    <input type="text" class="form-control" id="inputLocal" />
                                                </div>
                                                <div class="col-md-7">
                                                    <label for="inputDias" class="labelformulario form-label" style={{ color: 'black', fontSize: 18, fontFamily: 'Mulish', fontWeight: '400', wordWrap: 'break-word' }}>Dias de Funcionamento:</label>
                                                    <select id="inputDias" class="form-select">
                                                        <option selected>selecione</option>
                                                        <option selected>de segunda a sexta</option>
                                                        <option>terça a domingo</option>
                                                        <option>sexta- sabádo- domingo</option>
                                                        <option>quinta a domingo</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-7">
                                                    <label for="inputDias" class="labelformulario form-label" style={{ color: 'black', fontSize: 18, fontFamily: 'Mulish', fontWeight: '400', wordWrap: 'break-word' }}>Horários:</label>
                                                    <div class="row mb-3 ">
                                                        <label for="colFormLabelSm" class="labelformulario col-sm-2 col-form-label col-form-label-sm" style={{ color: 'black', fontSize: 18, fontFamily: 'Mulish', fontWeight: '400', wordWrap: 'break-word' }}>Das</label>
                                                        <div class="col-sm-3">
                                                            <input type="name" class="form-control form-control" id="colFormLabelSm" placeholder="   :   " />
                                                        </div>
                                                        <label for="colFormLabelSm" class="labelformulario col-sm-2 col-form-label col-form-label-sm" style={{ color: 'black', fontSize: 18, fontFamily: 'Mulish', fontWeight: '400', wordWrap: 'break-word' }}>às</label>
                                                        <div class="col-sm-3">
                                                            <input type="name" class="form-control form-control" id="colFormLabelSm" placeholder="   :   " />
                                                        </div>
                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    </div>

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
                                                                    <option selected>Selecione tipo de turismo</option>
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
                                                    <button className='btn btnadicionar p-2 m-1' onClick={() => abrirFecharModalInserir()}><img class="" src="./src/assets/edit.svg" /></button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="btn btncancelar  me-md-2" type="button">Cancelar</button>
                                    <button class="btn btnsalvar " type="button">Salvar</button>
                                </div>

                            </div>
                            
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nome</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(tipoturismo => (
                                        <tr key={tipoturismo.id}>
                                            <td>{tipoturismo.id}</td>
                                            <td>{tipoturismo.nome}</td>
                                            <td>
                                                <button className="btn btneditar" onClick={() => TipoTurismoSet(tipoturismo, "Editar")}>Editar</button> {"  "}
                                                <button className="btn btnexcluir" onClick={() => TipoTurismoSet(tipoturismo, "Excluir")}>Excluir</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
            </div>
                        <Modal isOpen={modalInserir}>
                            <ModalHeader>Incluir Tipo Turismo</ModalHeader>
                            <ModalBody>
                                <div className="form-group">
                                    <label>Nome: </label>
                                    <br />
                                    <input type="text" className="form-control" onChange={(e) => setTipoTurismoNome(e.target.value)} />
                                    <br />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <button className="btn btncadastrarmodal" onClick={() => pedidoPost()}>Cadastrar</button>{"  "}
                                <button className="btn btncancelarmodal" onClick={() => abrirFecharModalInserir()}>Cancelar</button>
                            </ModalFooter>
                        </Modal>
                        <Modal isOpen={modalEditar}>
                            <ModalHeader>Editar Tipo Turismo</ModalHeader>
                            <ModalBody>
                                <div className="form-group">
                                    <label>ID: </label><br />
                                    <input type="text" className="form-control" readOnly value={tipoturismoId} /> <br />

                                    <label>Nome:</label>
                                    <input type="text" className="form-control" name="tipoturismoNome" onChange={(e) => setTipoTurismoNome(e.target.value)}
                                        value={tipoturismoNome} />
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
                                <label> Confirma a exclusão deste tipo Turismo : {tipoturismoNome} ?</label>
                            </ModalBody>
                            <ModalFooter>
                                <button className='btn btn-primary' onClick={() => pedidoDeletar()}>Sim</button>
                                <button className='btn btn-danger' onClick={() => abrirFecharModalDeletar()}>Não</button>
                            </ModalFooter>
                        </Modal>

                    


    </div>





    );
}

export default TipoTurismo
