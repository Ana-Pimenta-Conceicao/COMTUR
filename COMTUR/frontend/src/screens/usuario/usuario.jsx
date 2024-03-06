import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import InputMask from "react-input-mask";
import SidebarAdm from "../../components/sidebarAdm"
import NavBarAdm from "../../components/navbarAdm";
import { useNavigate } from "react-router-dom";
import { CaretLeft, CaretRight, EyeSlash, Eye, FilePlus, Pencil, Trash } from "@phosphor-icons/react"


export default function Usuario() {
  const baseUrl = "https://localhost:7256/api/Usuario";

  const [data, setData] = useState([]);
  const [atualizarData, setAtualizarData] = useState(true);

  const [modalInserir, setModalInserir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);

  // IdleDeadline, nome, emailUsuario, senhaUsuario

  const [nomeUsr, setNomeUsr] = useState("");
  const [emailUsr, setEmailUsr] = useState("");
  const [senhaUsr, setSenhaUsr] = useState("");
  const [imagemUsr, setImagemUsr] = useState("");
  const [idUsr, setIdUsr] = useState("");


  const navigate = useNavigate();

  const limparDados = () => {
    setNomeUsr("");
    setEmailUsr("");
    setSenhaUsr("");
    setImagemUsr("");
    setIdUsr("");
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    // Expressão regular para validar e-mails
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = regex.test(email);
    if (!isValidEmail) {
      alert("Por favor, insira um e-mail válido.");
      // Você também pode definir uma mensagem de erro no estado, se preferir
      // setErrorMessage("Por favor, insira um e-mail válido.");
    }
  };


  const UsrSet = (usr, opcao) => {
    console.log("Usuário que foi passado: ", usr);
    setIdUsr(usr.id);
    setNomeUsr(usr.nome);
    setEmailUsr(usr.emailUsuario);
    setSenhaUsr(usr.senhaUsuario);
    setImagemUsr(usr.imagemPerfilUsuario);

    if (opcao === "Editar") {
      abrirFecharModalEditar();
    } else if (opcao === "Excluir") {
      abrirFecharModalDeletar();
    } else {
      navigate(`/perfilUsuario/${usr.id}`);
    }
  };

  const abrirFecharModalInserir = () => {
    modalInserir ? limparDados() : null;
    setModalInserir(!modalInserir);
  };

  const abrirFecharModalEditar = () => {
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


  // IdleDeadline, nome, emailUsuario, senhaUsuario
  const pedidoPost = async () => {
    const formData = new FormData();
    formData.append("nome", nomeUsr);
    formData.append("emailUsuario", emailUsr);
    formData.append("senhaUsuario", senhaUsr)

    const base64Image = await convertImageToBase64(imagemUsr);
    formData.append("imagemPerfilUsuario", base64Image);

    try {
      const response = await axios.post(baseUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const newUsr = response.data;
      setData([...data, newUsr]);

      abrirFecharModalInserir();
      limparDados();
    } catch (error) {
      console.log(error);
    }
  };

  function base64ToImage(base64String) {
    return `data:image/jpeg;base64,${base64String}`;
  }

  function convertImageToBase64(imageFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }


  async function pedidoAtualizar() {
    const formData = new FormData();

    formData.append("nome", nomeUsr);
    formData.append("emailUsuario", emailUsr);
    formData.append("senhaUsuario", senhaUsr);
    formData.append("imagemPerfilUsuario", imagemUsr);

    if (imagemUsr instanceof File) {
      // Converter a imagem para base64 antes de enviar
      const base64Image = await convertImageToBase64(imagemUsr);
      formData.append("imagemPerfilUsuario", base64Image);
    } else {
      formData.append("imagemPerfilUsuario", imagemUsr);
    }

    try {
      const response = await axios.put(`${baseUrl}/${idUsr}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updateUsr = response.data;

      setData((prevData) => {
        return prevData.map((usr) => {
          if (usr.id === idUsr) {
            return updateUsr;
          }
          return usr;
        });
      });

      abrirFecharModalEditar();
      limparDados();
    } catch (error) {
      console.log(error);
    }

  }

  const atualizarListaUsr = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const pedidoRemoverImagem = () => {
    // Método para limpar a constante (não limpa o campo)
    setImagemUsr("");
  };

  const pedidoDeletar = async () => {
    await axios
      .delete(baseUrl + "/" + idUsr)
      .then((response) => {
        const newUsr = data.filter((usr) => usr.id !== response.data);
        setData(newUsr);
        atualizarListaUsr();
        abrirFecharModalDeletar();
        limparDados();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (atualizarData) {
      pedidoGet();
      setAtualizarData(false);
    }
  }, [atualizarData]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Função para pegar uma parte específica da lista
  const getCurrentPageItems = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex).map((usr) => {
      if (usr.imagemPerfilUsuario instanceof File) {
        return {
          ...usr,
          imagemPerfilUsuario: URL.createObjectURL(
            usr.imagemPerfilUsuario
          ),
        };
      }
      return usr;
    });
  };



  // Renderiza os itens da página atual
  const currentItems = getCurrentPageItems(currentPage);

  // Funções para navegar entre as páginas
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  return (
    <div className="h-screen flex">
      <SidebarAdm />
      <div className="flex-2 container-fluid">
        <NavBarAdm />
        <div className="pl-8 pr-8 pt-[20px]">
          <h1 className="text-3xl font-semibold pb-2">
            Lista de Usuários
          </h1>
          <hr className="pb-4 border-[2.5px] border-[#DBDBDB]" />
          <div className="w-full rounded-[10px]  border-[#DBDBDB] ">
            <div className="grid grid-cols-11 w-full border-0 bg-[#DBDBDB] rounded-t-[8px] h-10 items-center text-base font-semibold text-black">
              <span className="flex ml-5 items-center">ID</span>
              <span className="flex justify-center items-center">Imagem</span>
              <span className="flex col-span-3 justify-center items-center">
                Nome
              </span>
              <span className="flex col-span-3 justify-center items-center">
                Email
              </span>
              <span className="flex col-span-3 justify-center items-center">
                Ações
              </span>
            </div>
            <ul className="w-full">
              {currentItems.map((usr) => (
                <React.Fragment key={usr.id}>
                  <li className="grid grid-cols-11 w-full bg-[#F5F5F5]">
                    <span
                      scope="row"
                      className="flex pl-5 border-r-[1px] border-t-[1px] border-[#DBDBDB] pt-[12px] pb-[12px] text-gray-700"
                    >
                      {usr.id}
                    </span>
                    <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#DBDBDB] text-gray-700">
                      {usr.imagemPerfilUsuario ? (
                        <img
                          className="flex w-10 h-10 rounded "
                          src={usr.imagemPerfilUsuario}
                          alt="Preview"
                        />
                      ) : (
                        <div>No image</div>
                      )}
                    </span>
                    <span className="flex col-span-3 justify-left items-center pl-2 border-t-[1px] border-r-[1px] border-[#DBDBDB] text-gray-700 ">
                      {usr.nome}
                    </span>
                    <span className="flex col-span-3 justify-left items-center pl-2 border-t-[1px] border-r-[1px] border-[#DBDBDB] text-gray-700">
                      {usr.emailUsuario}
                    </span>
                    <span className="flex col-span-3 justify-center items-center border-t-[1px] gap-[3px] 
                        border-[#DBDBDB]">
                      <button
                        className="inline-flex text-white bg-teal-800 hover:bg-teal-900 focus:ring-4 
                            focus:outline-none font-medium rounded-lg text-sm p-2 text-center 
                             items-center mr-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                        onClick={() => UsrSet(usr, "Editar")}
                      >
                        {" "}
                        <Pencil className="flex mr-1" size={16} />
                        Editar
                      </button>

                      <button
                        className="inline-flex text-white bg-red-800 hover:bg-red-900 focus:ring-4 
                            focus:outline-none font-medium rounded-lg text-sm p-2 text-center 
                             items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={() => UsrSet(usr, "Excluir")}
                      >
                        {" "}
                        <Trash className="mr-1" size={16} />
                        Excluir
                      </button>

                      <button
                        className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none
                             font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => UsrSet(usr, "Visualizar")}
                      >
                        <Eye className="mr-1" size={16} />
                        Visualizar
                      </button>
                    </span>
                  </li>
                </React.Fragment>
              ))}
            </ul>
            <div className="pt-4 pb-4 flex justify-center gap-2">
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
            <button
              className="text-white bg-yellow-400 hover:bg-yellow-500 
                   rounded-xl text-lg px-3 font-semibold py-1.5 text-center"
              onClick={() => abrirFecharModalInserir()}
            >
              <span className="inline-flex items-center">
                <FilePlus className="mr-1" size={24} />
                Cadastrar
              </span>
            </button>
          </div>
        </div>
      </div>


      <Modal isOpen={modalInserir}>
        <ModalHeader>Cadastrar Usuário</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome: </label>
            <br />
            <input type="text " className="form-control text-sm"
              onChange={(e) => setNomeUsr(e.target.value)}
              placeholder="Digite o nome " />
            <br />
            <label>Email:</label>
            <br />
            <input
              type="text "
              className="form-control text-sm"
              onChange={(e) => setEmailUsr(e.target.value)}
              onBlur={(e) => validateEmail(e.target.value)}
              placeholder="Exemplo: email@gmail.com"
            />
            <br />
            <label>Senha:</label>
            <br />
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control text-sm"
                onChange={(e) => setSenhaUsr(e.target.value)}
                placeholder="Digite a senha"
              />
              <button
                className="btn btn-outline-secondary bg-[#DBDBDB]  border-[#DBDBDB] hover:bg-gray-300 hover:border-gray-300"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeSlash size={24} /> : <Eye size={24} />}
              </button>
            </div>

            <br />
            <label>Imagem:</label>
            {imagemUsr && modalEditar && (
              <div
                className="bg-[#DBDBDB]   border-[#DBDBDB] hover:bg-gray-300 hover:border-gray-300"
                style={{ position: "relative", display: "inline-block" }}
              >
                {typeof imagemUsr === "string" ? (
                  <img
                    src={base64ToImage(imagemUsr)}
                    alt="Preview"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(imagemUsr)}
                    alt="Preview"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                )}
                <button
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "5px",
                    width: "30px",
                    height: "30px",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    borderRadius: "50%",
                    border: "none",
                    padding: "0",
                    cursor: "pointer",
                  }}
                  onClick={() => pedidoRemoverImagem()}
                >
                  X
                </button>
                <br />
              </div>
            )}
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImagemUsr(e.target.files[0])}
              value={imagemUsr === "" ? "" : undefined}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn bg-yellow-400 text-white hover:bg-yellow-500"
            onClick={() => pedidoPost()}
          >
            Cadastrar
          </button>
          {"  "}
          <button
            className="btn bg-gray-400 hover:bg-gray-600 text-white"
            onClick={() => abrirFecharModalInserir()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Alterar Usuário</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label>
            <br />
            <input
              type="text"
              className="form-control  text-sm"
              readOnly
              value={idUsr}
            />
            <br />
            <label>Nome: </label>
            <br />
            <input
              type="text"
              className="form-control  text-sm"
              onChange={(e) => setNomeUsr(e.target.value)}
              value={nomeUsr}
            />
            <br />
            <label>Email:</label>
            <br />
            <input
              type="text "
              className="form-control  text-sm"
              onChange={(e) => setEmailUsr(e.target.value)}
              value={emailUsr}
            />
            <br />
            <label>Senha:</label>
            <br />
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control text-sm"
                onChange={(e) => setSenhaUsr(e.target.value)}
                value={senhaUsr}
              />
              <button
                className="btn btn-outline-secondary bg-[#DBDBDB]  border-[#DBDBDB] hover:bg-gray-300 hover:border-gray-300"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeSlash size={24} /> : <Eye size={24} />}
              </button>
            </div>

            <br />
            <label>Imagem:</label>
            {imagemUsr && modalEditar && (
              <div style={{ position: "relative", display: "inline-block" }}>
                {typeof imagemUsr === "string" ? (
                  <img
                    src={imagemUsr}
                    alt="Preview"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(imagemUsr)}
                    alt="Preview"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                )}
                <button
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "5px",
                    width: "30px",
                    height: "30px",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    borderRadius: "50%",
                    border: "none",
                    padding: "0",
                    cursor: "pointer",
                  }}
                  onClick={() => pedidoRemoverImagem()}
                >
                  X
                </button>
                <br />
              </div>
            )}
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImagemUsr(e.target.files[0])}
              value={imagemUsr === "" ? "" : undefined}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn bg-yellow-400 text-white hover:bg-yellow-500"
            onClick={() => pedidoAtualizar()}
          >
            Editar
          </button>
          {"  "}
          <button
            className="btn bg-gray-400 hover:bg-gray-600 text-white"
            onClick={() => abrirFecharModalEditar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalDeletar}>
        <ModalBody>
          Confirma a exclusão do usuário: "{nomeUsr}" ?
        </ModalBody>
        <ModalFooter>
          <button
            className="btn bg-red-800 hover:bg-red-900 text-white"
            onClick={() => pedidoDeletar()}
          >
            Sim
          </button>
          <button
            className="btn bg-gray-400 hover:bg-gray-600 text-white"
            onClick={() => abrirFecharModalDeletar()}
          >
            Não
          </button>
        </ModalFooter>
      </Modal>

    </div>

  );









}