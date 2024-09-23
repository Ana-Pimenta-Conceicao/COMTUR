import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Collapse } from "reactstrap";
import axios from "axios";

export default function ModalStatus({ isOpen, data, onRequestClose, entidade }) {
    if (!data || data.length === 0) return null;

    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);
    const [usuarioInfo, setUsuarioInfo] = useState({});

    const ultimoRegistro = data.find(item => item.entidade === entidade); // Busca o registro com a entidade correta
    if (!ultimoRegistro) return null; // Caso não encontre, retorna null

    const { nomeEntidade, novosValores, data: dataUltimaMod, hora: horaUltimaMod, operacao: ultimaOperacao } = ultimoRegistro;
    const novosValoresParsed = novosValores ? JSON.parse(novosValores) : null;

    const fetchUsuario = async (idUsuario) => {
        if (!usuarioInfo[idUsuario]) {
            try {
                const response = await axios.get(`https://localhost:7256/api/Usuario/${idUsuario}`);
                setUsuarioInfo((prev) => ({
                    ...prev,
                    [idUsuario]: response.data.nome,
                }));
            } catch (error) {
                console.error(`Erro ao buscar o usuário com ID ${idUsuario}:`, error);
                setUsuarioInfo((prev) => ({
                    ...prev,
                    [idUsuario]: "Usuário desconhecido",
                }));
            }
        }
    };

    useEffect(() => {
        data.forEach((registro) => {
            const { novosValores } = registro;
            const novosValoresParsed = novosValores ? JSON.parse(novosValores) : null;
            if (novosValoresParsed?.IdUsuario) {
                fetchUsuario(novosValoresParsed.IdUsuario);
            }
        });
    }, [data]);

    return (
        <Modal isOpen={isOpen} toggle={onRequestClose} centered>
            <ModalHeader
                toggle={onRequestClose}
                className="bg-black text-white font-bold rounded-t-lg"
            >
                Histórico de Alterações
            </ModalHeader>
            <ModalBody className="bg-gray-50 text-black rounded-b-lg p-6">
                <div className="pb-4">
                    <h5 className="text-gray-700 font-semibold mb-2">Registro Atual</h5>
                    {novosValoresParsed && (
                        <div className="bg-slate-100 p-3 rounded-md shadow-md">
                            <p><span className="font-semibold">Id:</span> {novosValoresParsed.Id}</p>
                            <p><span className="font-semibold">Nome:</span> {novosValoresParsed.Nome}</p>
                            <p>
                                <span className="font-semibold">Status:</span>
                                {novosValoresParsed.Status === 1 ? 'Em análise' :
                                    novosValoresParsed.Status === 2 ? 'Aprovado' :
                                        novosValoresParsed.Status === 3 ? 'Reprovado' :
                                            novosValoresParsed.Status === 4 ? 'Desativado' :
                                                'Status desconhecido'}
                            </p>
                        </div>
                    )}
                    <p className="mt-3 text-sm text-gray-600"><strong>Data da última alteração:</strong> {dataUltimaMod} às {horaUltimaMod}</p>
                    <p className="text-sm text-gray-600"><strong>Operação:</strong> {ultimaOperacao}</p>
                    <hr className="border-t-2 border-[#FFD121] mt-3" />
                </div>

                <h4 className="font-semibold text-lg text-gray-700">Histórico</h4>
                {data.slice(0, -1).reverse().map((registro, index) => {
                    const { novosValores, data: dataRegistro, hora, operacao } = registro;
                    const novosValoresParsed = novosValores ? JSON.parse(novosValores) : null;
                    const idUsuario = novosValoresParsed?.IdUsuario;
                    const nomeUsuario = usuarioInfo[idUsuario] || "Carregando...";

                    return (
                        <div className="py-2" key={index}>
                            <p className="pb-2 text-sm text-gray-600">
                                - {nomeUsuario}{" "}
                                {operacao === "Adicionado" ? "adicionou" : "modificou"}{" "}
                                esse registro no dia {dataRegistro} às {hora}.
                                <Button color="link" onClick={toggleCollapse} className="text-[#FFD121] p-0">
                                    {isCollapsed ? "Esconder" : "Mostrar"} detalhes
                                </Button>
                            </p>
                            <Collapse isOpen={isCollapsed}>
                                {novosValoresParsed && (
                                    <div className="bg-white p-4 rounded-md shadow-md mt-2">
                                        <h5 className="font-semibold">Dados detalhados:</h5>
                                        <div className="text-black">
                                            <p><span className="font-semibold">Id:</span> {novosValoresParsed.Id}</p>
                                            <p><span className="font-semibold">Id Usuário:</span> {novosValoresParsed.IdUsuario}</p>
                                            <p><span className="font-semibold">Nome:</span> {novosValoresParsed.Nome}</p>
                                            <p><span className="font-semibold">Status:</span> {novosValoresParsed.Status === 1 ? 'Em análise' : 'Outro status'}</p>
                                        </div>
                                    </div>
                                )}
                            </Collapse>
                        </div>
                    );
                })}
            </ModalBody>
            <ModalFooter className="rounded-b-lg">
                <Button className="bg-black text-white text-sm hover:bg-gray-800 transition-colors rounded-md px-3 py-2" onClick={onRequestClose}>
                    Fechar
                </Button>
            </ModalFooter>
        </Modal>
    );
}