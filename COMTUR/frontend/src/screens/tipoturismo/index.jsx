import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import axios from 'axios'
import "../tipoturismo/index.css"
import "bootstrap/dist/css/bootstrap.min.css"

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
        setTipoTurismoNome(tipoturismo.id)
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
        delete tipoturismoSelecionado.id

        const dadosAtualizados = {
            id: tipoturismoId,
            nome: tipoturismoNome,
        };

        try {
            const response = await axios.put(baseUrl, dadosAtualizados)

            const dadosResposta = response.data;

            const index = data.findIndex(tipoturismo => tipoturismo.id === tipoturismoId);

            if (index !== -1) {
                data[index] = dadosResposta;
            }

            abrirFecharModalEditar();
            // .then(response => {
            // var answer = response.data
            // var aux = data
            // aux.map(tipoturismo => {
            //   if (tipoturismo.id === tipoturismoSelecionado.id) {
            //     tipoturismo.nome = answer.tipoturismoNome
            //   }
            // })
        } catch (error) {
            console.log(error)
        }
    }

    const pedidoDeletar = async () => {
        await axios.delete(baseUrl + "/" + tipoturismoSelecionado.id)
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
        <div className="App">
            <br />
            <h1>Cadastro Ponto Turistico</h1>
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
                    {data.map(tipoturismo => (
                        <tr key={tipoturismo.id}>
                            <td>{tipoturismo.id}</td>
                            <td>{tipoturismo.nome}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => TipoTurismoSet(tipoturismo, "Editar")}>Editar</button> {"  "}
                                <button className="btn btn-danger" onClick={() => TipoTurismoSet(tipoturismo, "Excluir")}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
                    <button className="btn btn-primary" onClick={() => pedidoPost()}>Cadastrar</button>{"  "}
                    <button className="btn btn-danger" onClick={() => abrirFecharModalInserir()}>Cancelar</button>
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
                    Confirma a exclusão deste tipo Turismo : {tipoturismoSelecionado && tipoturismoSelecionado.nome} ?
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