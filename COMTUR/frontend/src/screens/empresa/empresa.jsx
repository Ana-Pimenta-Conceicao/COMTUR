import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import InputMask from "react-input-mask";
import BtnAcao from "../../components/botoes/btnAcao";
import BtnModais from "../../components/botoes/btnModais";
import BtnModaisIMG from "../../components/botoes/btnModaisIMG";
import SidebarAdm from "../../components/admin/sidebarAdm";
import NavBarAdm from "../../components/admin/navbarAdm";
import { Navigate, useNavigate } from "react-router-dom";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import PopupCadastrado from "../../components/popups/popupCadastro";
import PopupExcluido from "../../components/popups/popupExcluido";
import PopupEditado from "../../components/popups/popupEditado";

export default function Empresa() {
  const baseUrl = "https://localhost:7256/api/Empresa";
  const baseUrlImagem = "https://localhost:7256/api/ImagemEmpresa";
  const baseUrlUsuario = "https://localhost:7256/api/Usuario";

  const [data, setData] = useState([]);
  const [atualizarData, setAtualizarData] = useState(true);
  const [dataUsuario, setDataUsuario] = useState([])

  const [modalCadastrado, setModalCadastrado] = useState(false);
  const [modalExcluido, setModalExcluido] = useState(false);
  const [modalInserir, setModalInserir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);
  const [modalEditado, setModalEditado] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [empresaNome, setNome] = useState("");
  const [empresaCNPJ, setCNPJ] = useState("");
  const [empresaEndereco, setEndereco] = useState("");
  const [imagensEmpresa, setImagensEmpresa] = useState([]);
  const [empresaLegendaImagem, setEmpresaLegendaImagem] = useState([]);
  const [empresaDescricao, setDescricao] = useState([]);
  const [empresaId, setEmpresaId] = useState("");
  const [userType, setUserType] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(3);
  const [usuarioId, setUsuarioId] = useState("")
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [usuarioOptions, setUsuarioOptions] = useState([]);



  const navigate = useNavigate();

  const limparDados = () => {
    setNome("");
    setCNPJ("");
    setEndereco("");
    setImagensEmpresa("");
    setEmpresaLegendaImagem("");
    setDescricao("");
    setEmpresaId("");
    setTipoUsuario("");
  };

  const EmpresaSet = (empresa, opcao) => {
    console.log("Empresa que foi passada: ", empresa);
    setEmpresaId(empresa.id);
    setNome(empresa.nome);
    setCNPJ(empresa.cnpj);
    setEndereco(empresa.endereco);
    setDescricao(empresa.descricao);
    setEmpresaLegendaImagem(empresa.legendaImagem);
    setImagensEmpresa(empresa.imagemEmpresa);
    setUsuarioSelecionado(empresa.idUsuario);
    setUsuarioId(empresa.idUsuario);
    console.log(empresa.imagemEmpresa);

    if (opcao === "Editar") {
      abrirFecharModalEditar(/*empresa.id*/);
    } else if (opcao === "Excluir") {
      abrirFecharModalDeletar();
    } else {
      navigate(`/visualizarEmpresa/${empresa.id}`);
    }
  };

  const VisualizarTodasEmpresas = () => {
    navigate(`/todasempresas`);
  };

  const abrirFecharModalInserir = () => {
    modalInserir ? limparDados() : null;
    setModalInserir(!modalInserir);
  };

  const abrirModalCadastrado = () => {
    setModalCadastrado(true);
  };

  const fecharModalCadastrado = () => {
    setModalCadastrado(false);
  };

  const abrirModalExcluido = () => {
    setModalExcluido(true);
  };

  const fecharModaExcluido = () => {
    setModalExcluido(false);
  };

  const abrirModalEditado = () => {
    setModalEditado(true);
  };

  const fecharModaEditado = () => {
    setModalEditado(false);
  };

  const abrirFecharModalEditar = async (id) => {
    modalEditar ? limparDados() : null;
    setModalEditar(!modalEditar);
  };

  const abrirFecharModalDeletar = () => {
    modalDeletar ? limparDados() : null;
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

  const pedidoGetUsuario = async () => {
    await axios.get(baseUrlUsuario)
      .then(response => {

        setDataUsuario(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const pedidoPost = async () => {
    const formData = new FormData();
    formData.append("nome", empresaNome);
    formData.append("cnpj", empresaCNPJ);
    formData.append("endereco", empresaEndereco);
    formData.append("descricao", empresaDescricao);
    formData.append("idUsuario", parseInt(usuarioSelecionado));

    try {
      const response = await axios.post(baseUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData(data.concat(response.data));
      if (imagensEmpresa) await pedidoPostImagens(response.data.id);
      abrirFecharModalInserir();
      limparDados();
      setAtualizarData(true);
      abrirModalCadastrado();
    } catch (error) {
      console.log(error);
    }
  };

  const pedidoPostImagens = async (idEmpresa) => {
    const formData = new FormData();
    imagensEmpresa.forEach((imagem) => {
      formData.append("imagem", imagem.imagem);
      formData.append("legendaImagem", imagem.legendaImagem);
    });

    try {
      const response = await axios.post(
        baseUrlImagem + `/${idEmpresa}/CadastrarImagensEmpresa`,
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
  };

  async function pedidoAtualizar() {
    const formData = new FormData();
    formData.append("id", empresaId);
    formData.append("nome", empresaNome);
    formData.append("cnpj", empresaCNPJ);
    formData.append("endereco", empresaEndereco);
    formData.append("descricao", empresaDescricao);
    formData.append("idUsuario", parseInt(usuarioSelecionado));

    try {
      const response = await axios.put(`${baseUrl}/${empresaId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedEmpresa = response.data;

      setData((prevData) => {
        return prevData.map((empresa) => {
          if (empresa.id === empresaId) {
            return updatedEmpresa;
          }
          return empresa;
        });
      });

      abrirFecharModalEditar();
      await pedidoPutImagens();
      limparDados();
      setAtualizarData(true);
      abrirModalEditado();
    } catch (error) {
      console.log(error);
    }
  }

  const pedidoPutImagens = async () => {
    const formData = new FormData();
    imagensEmpresa.forEach((imagem) => {
      formData.append("imagem", imagem.imagem);
      formData.append("legendaImagem", imagem.legendaImagem);
    });

    try {
      const response = await axios.put(
        baseUrlImagem + `/${empresaId}/AtualizarImagensEmpresa`,
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
  };

  const removeImagemByIndex = (indexToRemove) => {
    setImagensEmpresa((prevImagens) =>
      prevImagens.filter((_, index) => index !== indexToRemove)
    );
  };

  const pedidoDeletar = async () => {
    await axios
      .delete(baseUrl + "/" + empresaId)
      .then((response) => {
        const newEmpresas = data.filter(
          (empresa) => empresa.id !== response.data
        );
        setData(newEmpresas);
        abrirFecharModalDeletar();
        limparDados();
        setAtualizarData(true);
        abrirModalExcluido();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (atualizarData) {
      pedidoGet();
      pedidoGetUsuario();
      setAtualizarData(false);
    }
  }, [atualizarData]);

  useEffect(() => {
    if (dataUsuario) {
      const options = dataUsuario
        .filter((usuario) => usuario.tipoUsuario === 3)
        .map((usuario) => ({ value: usuario.id, label: usuario.nome }));

      setUsuarioOptions(options);

      if (options.length > 0) {
        setUsuarioSelecionado(options[0].value);
        setUsuarioId(options[0].value);
      }
    }
  }, [dataUsuario]);

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

  // Funções para navegar entre as páginas
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const userTypeFromLocalStorage = localStorage.getItem("tipoUsuario");
    setUserType(userTypeFromLocalStorage);
  }, []);

  // Estado para armazenar o termo de pesquisa
  const [termoPesquisa, setTermoPesquisa] = useState("");

  // Função para filtrar as opções de usuário com base no termo de pesquisa
  const filtrarUsuarios = () => {
    return usuarioOptions.filter((option) => {
      return option.label.toLowerCase().includes(termoPesquisa.toLowerCase());
    });
  };

  // Função para lidar com alterações no campo de pesquisa
  const handlePesquisaChange = (e) => {
    setTermoPesquisa(e.target.value);
  };

  // Lista de opções de usuário filtradas com base no termo de pesquisa
  const usuariosFiltrados = filtrarUsuarios();




  // if (userType === null) {
  //   return <div>Carregando...</div>;
  // } else if (userType === "1" || userType === "3") {
  //   return <Navigate to="/notfound" />;
  // } else {
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
          <h1 className="text-3xl font-semibold pb-2">Lista de Empresas</h1>
          <hr className="pb-4 border-[2.5px] border-[#DBDBDB]" />
          <div className="w-full rounded-[10px]  border-[#DBDBDB] ">
            <div className="grid grid-cols-7 w-full bg-[#DFDFDF] rounded-t-[8px] h-10 items-center text-base font-semibold text-black">
              <span className="flex col-span-1 ml-5 items-center">ID</span>
              <span className="flex col-span-3 justify-center items-center">
                Empresa
              </span>
              <span className="flex justify-center items-center">CNPJ</span>
              <span className="flex col-span-2 justify-center items-center">
                Ações
              </span>
            </div>
            <ul className="w-full">
              {currentItems.map((empresa) => (
                <React.Fragment key={empresa.id}>
                  <li className="grid grid-cols-7 w-full bg-[#F5F5F5]">
                    <span
                      scope="row"
                      className="flex pl-5 border-r-[1px] border-t-[1px] border-[#DBDBDB] pt-[12px] pb-[12px] text-gray-700"
                    >
                      {empresa.id}
                    </span>
                    <span className="flex col-span-3 justify-left items-center pl-2 border-t-[1px] border-r-[1px] border-[#DBDBDB] text-gray-700 ">
                      {empresa.nome}
                    </span>
                    <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#DBDBDB] text-gray-700">
                      {empresa.cnpj}
                    </span>
                    <span className="flex col-span-2 items-center justify-center border-t-[1px] gap-2 border-[#DBDBDB]">
                      <BtnAcao
                        funcao={() => EmpresaSet(empresa, "Editar")}
                        acao="Editar"
                      />
                      <BtnAcao
                        funcao={() => EmpresaSet(empresa, "Excluir")}
                        acao="Excluir"
                      />
                      <BtnAcao
                        funcao={() => EmpresaSet(empresa, "Visualizar")}
                        acao="Visualizar"
                      />
                    </span>
                  </li>
                </React.Fragment>
              ))}
            </ul>
            <div className="pt-4 pb-4 flex justify-center gap-2 border-t-[1px] border-[#DBDBDB]">
              <button className="" onClick={() => goToPage(currentPage - 1)}>
                <CaretLeft size={22} className="text-[#DBDBDB]" />
              </button>
              <select
                className="rounded-sm hover:border-[#DBDBDB] select-none"
                value={currentPage}
                onChange={(e) => goToPage(Number(e.target.value))}
              >
                {[...Array(totalPages)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <button className="" onClick={() => goToPage(currentPage + 1)}>
                <CaretRight size={22} className="text-[#DBDBDB]" />
              </button>
            </div>
          </div>
          <div className="float-right flex-auto py-6">
            <BtnAcao
              funcao={() => VisualizarTodasEmpresas()}
              acao="Publicados"
            />

            <BtnAcao
              funcao={() => abrirFecharModalInserir("Cadastrar")}
              acao="Cadastrar"
            />
          </div>
        </div>
      </div>
      <Modal
        className="modal-xl-gridxl"
        isOpen={modalInserir}
        style={{ maxWidth: "1000px" }}
      >
        <ModalHeader className="">Cadastrar Empresa</ModalHeader>
        <ModalBody className="">
          <div className="grid grid-cols-2 ">
            <div className="form-group  ">
              <div className="flex flex-col col-span-1 pr-6">
                <label>Nome Fantasia: </label>
                <input
                  type="text"
                  className="form-control text-sm"
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite o Nome Fantasia"
                />
                <br />


                <label>CNPJ:</label>
                <textarea
                  className="form-control text-sm"
                  onChange={(e) => setCNPJ(e.target.value)}
                  placeholder="Digite o CNPJ"
                />
                <br />

                <label>Endereço:</label>
                <textarea
                  className="form-control text-sm"
                  onChange={(e) => setEndereco(e.target.value)}
                  placeholder="Digite o Endereço"
                />
                <br />
                <label>Descrição:</label>
                <textarea
                  className="form-control text-sm"
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descrição Empresa"
                />
                <br />

                <label className="mr-2">Pesquisar Usuário:</label>
                <input
                  type="text"
                  className="form-control"
                  value={termoPesquisa}
                  onChange={handlePesquisaChange}
                  placeholder="Digite para pesquisar usuário..."
                />

                <select
                  className="form-control text-sm"
                  value={usuarioSelecionado}
                  onChange={(e) => setUsuarioSelecionado(e.target.value)}
                >
                  {/* Renderize as opções filtradas */}
                  {usuariosFiltrados.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>


                {/* <label>Usuario: </label>
                <br />
                <select className="form-control text-sm"
                  value={usuarioSelecionado}
                  onChange={(e) => setUsuarioSelecionado(e.target.value)}
                >
                  {usuarioOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select> */}
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
                        setImagensEmpresa((prevImagens) => [
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

                {(Array.isArray(imagensEmpresa) ? imagensEmpresa : []).map(
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
                              imagensEmpresa.length - index
                            ),
                          },
                          (_, i) => (
                            <div key={index} className="flex flex-col  pr-5 ">
                              <div className="flex w-[140px] justify-end">
                                <img
                                  className="w-min-[140px] h-[100px] mr-2 mt-2 justify-center rounded-md"
                                  src={imagensEmpresa[index + i].imagem}
                                  alt={`Imagem ${index}`}
                                />
                                <div className="flex flex-col pl-3 justify-end">
                                  <label>Legenda:</label>
                                  <input
                                    type="text"
                                    className="form-control text-sm w-[286px] mb-0 "
                                    onChange={(e) =>
                                      setImagensEmpresa((prevImagens) => {
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
          <div className="flex justify-between items-center px-[405px] pt-5">
            <BtnModais funcao={() => pedidoPost()} acao="Cadastrar" />
            <BtnModais
              funcao={() => abrirFecharModalInserir()}
              acao="Cancelar"
            />
          </div>
        </ModalBody>
      </Modal>
      <PopupCadastrado
        isOpen={modalCadastrado}
        toggle={fecharModalCadastrado}
        objeto="Empresa"
      />
      <PopupExcluido
        isOpen={modalExcluido}
        toggle={fecharModaExcluido}
        objeto="Empresa"
      />
      <PopupEditado
        isOpen={modalEditado}
        toggle={fecharModaEditado}
        objeto="Empresa"
      />
      <Modal
        className="modal-xl-gridxl"
        isOpen={modalEditar}
        style={{ maxWidth: "1000px" }}
      >
        <ModalHeader>Editar Empresa</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 ">
            <div className="form-group  ">
              <div className="flex flex-col pr-6">
                <label>Nome Fantasia: </label>
                <input
                  type="text"
                  className="form-control text-sm"
                  onChange={(e) => setNome(e.target.value)}
                  value={empresaNome}
                />
                <br />
                <label>CNPJ:</label>
                <textarea
                  className="form-control  text-sm"
                  name="empresaCNPJ"
                  onChange={(e) => setCNPJ(e.target.value)}
                  value={empresaCNPJ}
                />
                <br />
                <label>Endereço:</label>
                <textarea
                  className="form-control  text-sm"
                  name="empresaEndereco"
                  onChange={(e) => setEndereco(e.target.value)}
                  value={empresaEndereco}
                />
                <br />
                <label>Descrição:</label>
                <textarea
                  className="form-control  text-sm"
                  name="empresaEndereco"
                  onChange={(e) => setDescricao(e.target.value)}
                  value={empresaDescricao}
                />
                <br />
                <label>Usuario: </label>
                <br />
                <select className="form-control text-sm"
                  value={usuarioSelecionado}
                  onChange={(e) => setUsuarioSelecionado(e.target.value)}
                >
                  {usuarioOptions.map((option) => (
                    <option key={option.value} value={option.value} >
                      {option.label}
                    </option>
                  ))}
                </select>
                <br />
              </div>
            </div>

            <div className="flex flex-col col-span-1  pl-4  border-l-[1px]">
              <label>Imagem:</label>
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
                        setImagensEmpresa((prevImagens) => [
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
                  {(Array.isArray(imagensEmpresa) ? imagensEmpresa : []).map(
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
                                imagensEmpresa.length - index
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
                                    src={imagensEmpresa[index + i].imagem}
                                  />
                                  <div className="flex flex-col pl-3 justify-end">
                                    <label>Legenda:</label>
                                    <input
                                      type="text"
                                      className="form-control  text-sm w-[286px]"
                                      onChange={(e) =>
                                        setImagensEmpresa((prevImagens) => {
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
                                        imagensEmpresa[index + i]
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
          <div className="flex justify-between items-center px-[395px] pt-5">
            <BtnModaisIMG
              funcao={() => pedidoAtualizar(empresaId)}
              acao="Editar"
            />
            <BtnModaisIMG
              funcao={() => abrirFecharModalEditar()}
              acao="Cancelar"
            />
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={modalDeletar}>
        <ModalBody>
          Confirma a exclusão de empresa "{empresaNome}" ?
        </ModalBody>
        <ModalFooter>
          <BtnModais funcao={() => pedidoDeletar()} acao="Excluir" />
          <BtnModais
            funcao={() => abrirFecharModalDeletar()}
            acao="Cancelar"
          />
        </ModalFooter>
      </Modal>
    </div>
  );
}