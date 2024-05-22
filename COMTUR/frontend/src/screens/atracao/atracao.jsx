import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import SidebarAdm from "../../components/admin/sidebarAdm";
import NavBarAdm from "../../components/admin/navbarAdm";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Tabela from "../../components/table/tabela";
import BtnAcao from "../../components/botoes/btnAcao";
import { Navigate, useNavigate } from "react-router-dom";

function Atracao() {
  const baseUrl = "https://localhost:7256/api/Atracao";
  const baseUrlTipoAtracao = "https://localhost:7256/api/TipoAtracao";
  const baseUrlImagem = "https://localhost:7256/api/ImagemAtracao";
  const baseUrlTurismo = "https://localhost:7256/api/Turismo";
  const [userType, setUserType] = useState(null);
  const [data, setData] = useState([]);
  const [dataTipoAtracao, setDataTipoAtracao] = useState([]);
  const [dataTurismo, setDataTurismo] = useState([]);

  const [atualizarData, setAtualizarData] = useState(true);
  const [modalInserir, setModalInserir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);
  const [atracaoNome, setAtracaoNome] = useState("");
  const [atracaoDescricao, setAtracaoDescricao] = useState("");
  const [atracaoQrCode, setAtracaoQrCode] = useState("");
  const [tipoatracaoId, setTipoAtracaoId] = useState("");
  const [atracaoId, setAtracaoId] = useState("");
  const [imagensAtracao, setImagensAtracao] = useState([]);
  const [turismoId, setTurismoId] = useState("");
  const [atracaoLegendaImagem, setAtracaoLegendaImagem] = useState([]);

  const [tipoAtracaoSelecionada, setTipoAtracaoSelecionada] = useState(null);
  const [tipoAtracaoOptions, setTipoAtracaoOptions] = useState([]);
  const [turismoSelecionado, setTurismoSelecionado] = useState(null);
  const [turismoOptions, setTurismoOptions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const limparDados = () => {
    setAtracaoNome("");
    setAtracaoDescricao("");
    setAtracaoQrCode("");
    setImagensAtracao("");
    setAtracaoLegendaImagem("");
    setAtracaoId("");
  };

  const AtracaoSet = (atracao, opcao) => {
    console.log("Atracao que foi passada: ", atracao);
    setAtracaoId(atracao.id);
    setAtracaoNome(atracao.nome);
    setAtracaoDescricao(atracao.descricao);
    setAtracaoQrCode(atracao.qrCode);
    setTipoAtracaoId(atracao.tipoatracaoId);
    setTurismoId(atracao.turismoId);

    setImagensAtracao(atracao.imagemAtracao);
    console.log(atracao.imagemAtracao);

    if (opcao === "Editar") {
      abrirFecharModalEditar();
    }
    else if (opcao === "Excluir") {
      abrirFecharModalDeletar();
    } else {
      navigate(`/visualizarAtracao/${atracao.id}`);
    }
  }

  const abrirFecharModalInserir = () => {
    setModalInserir(!modalInserir);
    limparDados();
  };

  const abrirFecharModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirFecharModalDeletar = () => {
    setModalDeletar(!modalDeletar);
  };

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

  function convertImageToBase64(imageFile, callback) {
    if (!imageFile) {
      callback(false);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result;
      callback(base64String);
    };

    reader.onerror = () => {
      callback(false);
    };

    reader.readAsDataURL(imageFile);
  }

  const pedidoGetTipoAtracao = async () => {
    await axios
      .get(baseUrlTipoAtracao)
      .then((response) => {
        setDataTipoAtracao(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pedidoGetTurismo = async () => {
    await axios
      .get(baseUrlTurismo)
      .then((response) => {
        setDataTurismo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const atualizarListaAtracao = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pedidoPost = async () => {
    const formData = new FormData();
    formData.append("nome", atracaoNome);
    formData.append("descricao", atracaoDescricao);
    formData.append("qrCode", atracaoQrCode);
    formData.append("idtipoatracao", tipoAtracaoSelecionada);
    formData.append("idturismo", turismoSelecionado);

    try {
      const response = await axios.post(baseUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(data.concat(response.data));
      await pedidoPostImagens(response.data.id);
      abrirFecharModalInserir();
      limparDados();
      setAtualizarData(true);
    } catch (error) {
      console.log(error);
    }
  };

  const pedidoPostImagens = async (idAtracao) => {
    if (imagensAtracao) {
      const formData = new FormData();
      imagensAtracao?.forEach((imagem) => {
        formData.append("imagens", imagem.imagem);
        formData.append("legendas", imagem.legendaImagem);
      });

      try {
        const response = await axios.post(
          baseUrlImagem + `/${idAtracao}/CadastrarImagensAtracao`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function pedidoAtualizar() {
    const formData = new FormData();
    formData.append("id", atracaoId);
    formData.append("nome", atracaoNome);
    formData.append("descricao", atracaoDescricao);
    formData.append("qrCode", atracaoQrCode);
    formData.append("idtipoatracao", tipoAtracaoSelecionada);
    formData.append("idturismo", turismoSelecionado);

    try {
      const response = await axios.put(`${baseUrl}/${atracaoId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data.idTipoAtracao);

      const updatedAtracao = response.data;

      setData((prevData) => {
        return prevData.map((atracao) => {
          if (atracao.id === atracaoId) {
            return updatedAtracao;
          }
          return atracao;
        });
      });

      abrirFecharModalEditar();
      await pedidoPutImagens();
      setAtualizarData(true);
    } catch (error) {
      console.log(error);
    }
  }

  const pedidoPutImagens = async () => {
    if (imagensAtracao) {
      const formData = new FormData();
      imagensAtracao.forEach((imagem) => {
        formData.append("imagens", imagem.imagem);
        formData.append("legendas", imagem.legendaImagem);
      });

      try {
        const response = await axios.put(
          baseUrlImagem + `/${atracaoId}/AtualizarImagensAtracao`, // Correção aqui
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const CadastrarNovoTipo = () => {
    navigate(`/tipoatracao`);
  };

  const removeImagemByIndex = (indexToRemove) => {
    setImagensAtracao((prevImagens) =>
      prevImagens.filter((_, index) => index !== indexToRemove)
    );
  };

  const pedidoDeletar = async () => {
    await axios
      .delete(baseUrl + "/" + atracaoId)
      .then((response) => {
        setData(data.filter((atracao) => atracao.id !== response.data));
        atualizarListaAtracao();
        abrirFecharModalDeletar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (atualizarData) {
      pedidoGet();
      pedidoGetTipoAtracao();
      pedidoGetTurismo();
      setAtualizarData(false);
    }
  }, [atualizarData]);

  useEffect(() => {
    if (dataTipoAtracao) {
      const options = dataTipoAtracao.map((tipoatracao) => {
        return { value: tipoatracao.id, label: tipoatracao.nome };
      });
      setTipoAtracaoOptions(options);

      // Verificar se o tipoAtracaoSelecionada ainda é válido, se não for, atualizá-lo
      if (!options.some((option) => option.value === tipoAtracaoSelecionada)) {
        const atracaoPadrao = options.length > 0 ? options[0].value : "";

        setTipoAtracaoSelecionada(atracaoPadrao);
        setTipoAtracaoId(atracaoPadrao);
      }
    }
  }, [dataTipoAtracao]);

  useEffect(() => {
    if (dataTurismo) {
      const options = dataTurismo.map((turismo) => {
        return { value: turismo.id, label: turismo.nome };
      });
      setTurismoOptions(options);

      // Verificar se o tipoAtracaoSelecionada ainda é válido, se não for, atualizá-lo
      if (!options.some((option) => option.value === turismoSelecionado)) {
        const atracaoPadrao = options.length > 0 ? options[0].value : "";

        setTurismoSelecionado(atracaoPadrao);
        setTurismoId(atracaoPadrao);
      }
    }
  }, [dataTurismo]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
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

  useEffect(() => {
    const userTypeFromLocalStorage = localStorage.getItem("tipoUsuario");
    setUserType(userTypeFromLocalStorage);
  }, []);

  const apresentaDados = Array.isArray(currentItems)
    ? currentItems.map((atracao) => {
        const tipoAtracao = dataTipoAtracao.find(
          (tipo) => tipo.id === atracao.idTipoAtracao
        );
        const tipoAtracaoNome = tipoAtracao
          ? tipoAtracao.nome
          : "Tipo não encontrado";

        return {
          id: atracao.id,
          nome: atracao.nome,
          tipoAtracao: tipoAtracaoNome,
          descricao: atracao.descricao,
          status: "teste",
          acoes: (
            <div className="flex items-center justify-center border-t-[1px] gap-2 border-gray-100 py-2">
              <BtnAcao
                funcao={() => AtracaoSet(atracao, "Editar")}
                acao="Editar"
              />
              <BtnAcao
                funcao={() => AtracaoSet(atracao, "Excluir")}
                acao="Excluir"
              />
              <BtnAcao
                funcao={() => AtracaoSet(atracao, "Visualizar")}
                acao="Visualizar"
              />
            </div>
          ),
        };
      })
    : [];

  if (userType === "1" || userType === "3") {
    return <Navigate to="/notfound" />;
  } else {
    return (
      <div className="home">
        <div className="h-screen flex fixed">
          <SidebarAdm setOpen={setSidebarOpen} open={sidebarOpen} />
        </div>
        <div
          className="flex-1 container-fluid"
          style={{ paddingLeft: sidebarOpen ? 200 : 100 }}
        >
          <NavBarAdm />
          <div className="pl-8 pr-8 pt-[20px]">
            <h1 className="text-3xl font-semibold pb-2">Lista de Atrações</h1>
            <hr className="pb-4 border-[2.5px] border-gray-300" />
            <Tabela
              object={apresentaDados}
              colunas={["ID", "Nome", "Tipo", "Descrição", "Status", "Ações"]}
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={setCurrentPage}
              formatarData={""}
              numColunas={6}
            />

            <div className="float-right flex-auto py-6">
              <BtnAcao funcao={""} acao="Publicados" />

              <BtnAcao
                funcao={() => abrirFecharModalInserir("Cadastrar")}
                acao="Cadastrar"
              />

              <BtnAcao
                funcao={() => CadastrarNovoTipo()}
                acao="CadastrarTipo"
              />
            </div>
          </div>
        </div>
        <Modal
          className="modal-xl-gridxl"
          isOpen={modalInserir}
          style={{ maxWidth: "1000px" }}
        >
          <ModalHeader>Incluir Tipo Atração</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 ">
              <div className="form-group">
                <div>
                  <label>Nome: </label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setAtracaoNome(e.target.value)}
                  />
                  <br />
                  <label>Descrição: </label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setAtracaoDescricao(e.target.value)}
                  />
                  <br />
                  <label>QrCode: </label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setAtracaoQrCode(e.target.value)}
                  />
                  <br />
                  <label>Tipo atração: </label>
                  <br />
                  <select
                    className="form-control"
                    value={tipoAtracaoSelecionada}
                    onChange={(e) => setTipoAtracaoSelecionada(e.target.value)}
                  >
                    {tipoAtracaoOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <br />
                  <label>Turismo: </label>
                  <br />
                  <select
                    className="form-control"
                    value={turismoSelecionado}
                    onChange={(e) => setTurismoSelecionado(e.target.value)}
                  >
                    {turismoOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <br />
                </div>
              </div>
              <div className="flex flex-col col-span-1 pl-4  border-l-[1px]">
                <label>Imagem:</label>
                <div>
                  {/* Campo para seleção de imagem */}
                  <input
                    type="file"
                    className="form-control "
                    onChange={(e) => {
                      convertImageToBase64(e.target.files[0], (result) => {
                        if (result) {
                          const objetoImagem = {
                            imagem: result,
                            legendaImagem: "",
                          };
                          setImagensAtracao((prevImagens) => [
                            ...prevImagens,
                            objetoImagem,
                          ]);
                        }
                        // Limpa o campo de entrada de arquivo após a seleção
                        e.target.value = null;
                      });
                    }}
                    multiple
                  />

                  {(Array.isArray(imagensAtracao) ? imagensAtracao : []).map(
                    (imagem, index) =>
                      index % 1 === 0 && (
                        <div
                          className="flex pt-3 justify-end "
                          key={`row-${index}`}
                        >
                          {Array.from(
                            {
                              length: Math.min(
                                1,
                                imagensAtracao.length - index
                              ),
                            },
                            (_, i) => (
                              <div key={index} className="flex flex-col  pr-5 ">
                                <div className="flex w-[140px] justify-end">
                                  <img
                                    className="w-min-[140px] h-[100px] mr-2 mt-2 justify-center rounded-md"
                                    src={imagensAtracao[index + i].imagem}
                                    alt={`Imagem ${index}`}
                                  />
                                  <div className="flex flex-col pl-3 justify-end">
                                    <label>Legenda:</label>
                                    <input
                                      type="text"
                                      className="form-control text-sm w-[286px] mb-0 "
                                      onChange={(e) =>
                                        setImagensAtracao((prevImagens) => {
                                          const novasImagens = [...prevImagens];
                                          novasImagens[
                                            index + i
                                          ].legendaImagem = e.target.value;
                                          return novasImagens;
                                        })
                                      }
                                      placeholder="Digite a legenda"
                                    />
                                    <br />
                                    <button
                                      className="w-[140px] rounded-md text-md text-white  bg-red-800 hover:bg-red-900"
                                      onClick={() => removeImagemByIndex(index)}
                                    >
                                      Remover
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btncadastrarmodal"
              onClick={() => pedidoPost()}
            >
              Cadastrar
            </button>
            {"  "}
            <button
              className="btn btncancelarmodal"
              onClick={() => abrirFecharModalInserir()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal
          className="modal-xl-gridxl"
          isOpen={modalEditar}
          style={{ maxWidth: "1000px" }}
        >
          <ModalHeader>Editar Atração</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2">
              <div className="form-group">
                <div>
                  <label>Nome: </label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setAtracaoNome(e.target.value)}
                    value={atracaoNome}
                  />
                  <br />
                  <label>Descrição: </label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setAtracaoDescricao(e.target.value)}
                    value={atracaoDescricao}
                  />
                  <br />
                  <label>QrCode: </label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setAtracaoQrCode(e.target.value)}
                    value={atracaoQrCode}
                  />
                  <br />
                  <label>Tipo atração: </label>
                  <br />
                  <select
                    className="form-control"
                    value={tipoAtracaoSelecionada}
                    onChange={(e) => setTipoAtracaoSelecionada(e.target.value)}
                  >
                    {tipoAtracaoOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <br />
                </div>
              </div>

              <div className="flex flex-col col-span-1 pl-4 border-l-[1px]">
                <label>Imagem:</label>
                <div>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => {
                      Array.from(e.target.files).forEach((file) => {
                        convertImageToBase64(file, (result) => {
                          if (result) {
                            const objetoImagem = {
                              imagem: result,
                              legendaImagem: "",
                            };
                            // Agora você precisa adicionar imagens à variável imagensAtracao
                            setImagensAtracao((prevImagens) => [
                              ...prevImagens,
                              objetoImagem,
                            ]);
                          }
                        });
                      });
                      // Limpa o campo de entrada de arquivo após a seleção
                      e.target.value = null;
                    }}
                    multiple
                  />

                  {modalEditar && (
                    <div>
                      {(Array.isArray(imagensAtracao)
                        ? imagensAtracao
                        : []
                      ).map(
                        (imagem, index) =>
                          index % 1 === 0 && (
                            <div
                              className="flex pt-3 justify-end "
                              key={`row-${index}`}
                            >
                              {Array.from(
                                {
                                  length: Math.min(
                                    1,
                                    imagensAtracao.length - index
                                  ),
                                },
                                (_, i) => (
                                  <div
                                    key={index + i}
                                    className="flex flex-col items-start pr-5"
                                  >
                                    <div className="flex w-[140px] justify-end">
                                      <img
                                        className="w-min-[140px] h-[100px] mr-2 mt-2 justify-center rounded-md"
                                        src={imagensAtracao[index + i].imagem}
                                      />
                                      <div className="flex flex-col pl-3 justify-end">
                                        <label>Legenda:</label>
                                        <input
                                          type="text"
                                          className="form-control  text-sm w-[286px]"
                                          onChange={(e) =>
                                            setImagensAtracao((prevImagens) => {
                                              const novasImagens = [
                                                ...prevImagens,
                                              ];
                                              novasImagens[
                                                index + i
                                              ].legendaImagem = e.target.value;
                                              return novasImagens;
                                            })
                                          }
                                          value={
                                            imagensAtracao[index + i]
                                              .legendaImagem
                                          }
                                        />
                                        <br />

                                        <button
                                          className="w-[140px] rounded-md  mt-[2px] mb-3 text-md text-white p-[0.2px]  bg-red-800 hover:bg-red-900"
                                          onClick={() =>
                                            removeImagemByIndex(index + i)
                                          }
                                        >
                                          Remover
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btnmodalverde"
              onClick={() => pedidoAtualizar(atracaoId)}
            >
              Alterar
            </button>
            {"  "}
            <button
              className="btn btnmodalcinza"
              onClick={() => abrirFecharModalEditar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalDeletar}>
          <ModalBody>
            <label>Confirma a exclusão desta Atração : {atracaoNome} ?</label>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btnmodalverde"
              onClick={() => pedidoDeletar()}
            >
              Sim
            </button>
            <button
              className="btn btnmodalcinza"
              onClick={() => abrirFecharModalDeletar()}
            >
              Não
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Atracao;
