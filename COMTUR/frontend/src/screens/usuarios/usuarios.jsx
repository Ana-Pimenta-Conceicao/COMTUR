import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import InputMask from "react-input-mask";
import SidebarAdm from "../../components/admin/sidebarAdm";
import NavBarAdm from "../../components/admin/navbarAdm";
import { useNavigate } from "react-router-dom";
import {
  CaretLeft,
  CaretRight,
  Eye,
  EyeSlash,
  Trash,
  FilePlus,
  Pencil,
} from "@phosphor-icons/react";

export default function Usuario() {
  const baseUrl = "https://localhost:7256/api/Usuario";

  const [data, setData] = useState([]);

  const [atualizarData, setAtualizarData] = useState(true);

  const [modalInserir, setModalInserir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);

  const [nomeUser, setNomeUser] = useState("");
  const [cargoUser, setCargoUser] = useState("");
  const [cpfUser, setCpfUser] = useState("");
  const [telefoneUser, setTelefoneUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [senhaUser, setSenhaUser] = useState("");
  const [imagemUser, setImagemUser] = useState("");
  const [idUser, setIdUser] = useState("");

  const navigate = useNavigate();

  const limparDados = () => {
    setNomeUser("");
    setCargoUser("");
    setCpfUser("");
    setTelefoneUser("");
    setEmailUser("");
    setSenhaUser("");
    setImagemUser("");
    setIdUser("");
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

  const UserSet = (user, opcao) => {
    console.log("User que foi passado: ", user);
    setIdUser(user.id);
    setNomeUser(user.nomeUseristrador);
    setCargoUser(user.cargoUseristrador);
    setCpfUser(user.cpfUseristrador);
    setTelefoneUser(user.telefoneUseristrador);
    setEmailUser(user.emailUseristrador);
    setSenhaUser(user.senhaUseristrador);
    setImagemUser(user.imagemPerfilUseristrador);

    if (opcao === "Editar") {
      abrirFecharModalEditar();
    } else if (opcao === "Excluir") {
      abrirFecharModalDeletar();
    } else {
      navigate(`/perfilUseristrador/${user.id}`);
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

  const pedidoPost = async () => {
    const formData = new FormData();
    formData.append("nomeUsuario", nomeUser);
    formData.append("cpfUseristrador", cpfUser);
    formData.append("cargoUseristrador", cargoUser);
    formData.append("telefoneUseristrador", telefoneUser);
    formData.append("emailUseristrador", emailUser);
    formData.append("senhaUseristrador", senhaUser);

    const base64Image = await convertImageToBase64(imagemUser);
    formData.append("imagemPerfilUseristrador", base64Image);

    try {
      const response = await axios.post(baseUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newUser = response.data; // Ensure the response contains the newly registered user data
      setData([...data, newUser]); // Add the new user to the existing data

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

    formData.append("nomeUseristrador", nomeUser);
    formData.append("cpfUseristrador", cpfUser);
    formData.append("cargoUseristrador", cargoUser);
    formData.append("telefoneUseristrador", telefoneUser);
    formData.append("emailUseristrador", emailUser);
    formData.append("senhaUseristrador", senhaUser);

    if (imagemUser instanceof File) {
      // Converter a imagem para base64 antes de enviar
      const base64Image = await convertImageToBase64(imagemUser);
      formData.append("imagemPerfilUseristrador", base64Image);
    } else {
      formData.append("imagemPerfilUseristrador", imagemUser);
    }

    try {
      const response = await axios.put(`${baseUrl}/${idUser}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updateUser = response.data;

      setData((prevData) => {
        return prevData.map((user) => {
          if (user.id === idUser) {
            return updateUser;
          }
          return user;
        });
      });

      abrirFecharModalEditar();
      limparDados();
    } catch (error) {
      console.log(error);
    }
  }

  const atualizarListaUser = async () => {
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
    setImagemUser("");
  };

  const pedidoDeletar = async () => {
    await axios
      .delete(baseUrl + "/" + idUser)
      .then((response) => {
        const newUser = data.filter((user) => user.id !== response.data);
        setData(newUser);
        atualizarListaUser();
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
    return data.slice(startIndex, endIndex).map((user) => {
      if (user.imagemPerfilUseristrador instanceof File) {
        return {
          ...user,
          imagemPerfilUseristrador: URL.createObjectURL(
            user.imagemPerfilUseristrador
          ),
        };
      }
      return user;
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

  const [userType, setUserType] = useState(4); // Valor padrão é 4
  const [users, setUsers] = useState([4]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7256/api/Usuarios/porTipoUsuario/${userType}`);
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados dos usuários:', error);
      }
    };

    fetchData();
  }, [userType]);

  const handleUserTypeChange = (e) => {
    setUserType(parseInt(e.target.value));
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
                Cargo
              </span>
              <span className="flex col-span-3 justify-center items-center">
                Ações
              </span>
            </div>
            <ul className="w-full">
              {currentItems.map((user) => (
                <React.Fragment key={user.id}>
                  <li className="grid grid-cols-11 w-full bg-[#F5F5F5]">
                    <span
                      scope="row"
                      className="flex pl-5 border-r-[1px] border-t-[1px] border-[#DBDBDB] pt-[12px] pb-[12px] text-gray-700"
                    >
                      {user.id}
                    </span>
                    <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#DBDBDB] text-gray-700">
                      {user.imagemPerfilUseristrador ? (
                        <img
                          className="flex w-10 h-10 rounded "
                          src={user.imagemPerfilUseristrador}
                          alt="Preview"
                        />
                      ) : (
                        <div>No image</div>
                      )}
                    </span>
                    <span className="flex col-span-3 justify-left items-center pl-2 border-t-[1px] border-r-[1px] border-[#DBDBDB] text-gray-700 ">
                      {user.nomeUseristrador}
                    </span>
                    <span className="flex col-span-3 justify-left items-center pl-2 border-t-[1px] border-r-[1px] border-[#DBDBDB] text-gray-700">
                      {user.cargoUseristrador}
                    </span>
                    <span className="flex col-span-3 justify-center items-center border-t-[1px] gap-[3px] 
                    border-[#DBDBDB]">
                      <button
                        className="inline-flex text-white bg-teal-800 hover:bg-teal-900 focus:ring-4 
                        focus:outline-none font-medium rounded-lg text-sm p-2 text-center 
                         items-center mr-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                        onClick={() => UserSet(user, "Editar")}
                      >
                        {" "}
                        <Pencil className="flex mr-1" size={16} />
                        Editar
                      </button>

                      <button
                        className="inline-flex text-white bg-red-800 hover:bg-red-900 focus:ring-4 
                        focus:outline-none font-medium rounded-lg text-sm p-2 text-center 
                         items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        onClick={() => UserSet(user, "Excluir")}
                      >
                        {" "}
                        <Trash className="mr-1" size={16} />
                        Excluir
                      </button>

                      <button
                        className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none
                         font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => UserSet(user, "Visualizar")}
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
        <ModalHeader>Cadastrar Usuario</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome: </label>
            <br />
            <input
              type="text "
              className="form-control text-sm"
              onChange={(e) => setNomeUser(e.target.value)}
              placeholder="Digite o nome "
            />
            <br />
            <label>Cargo:</label>
            <br />
            <input
              type="text "
              className="form-control text-sm"
              onChange={(e) => setCargoUser(e.target.value)}
              placeholder="Digite o cargo"
            />
            <br />

            <label>CPF:</label>
            <br />
            <InputMask
              mask="999.999.999-99"
              maskPlaceholder="999.999.999-99"
              type="text "
              className="form-control text-sm"
              onChange={(e) => setCpfUser(e.target.value)}
              placeholder="Digite apenas números"
            />
            <br />
            <label>Telefone:</label>
            <br />
            <InputMask
              mask="(99) 99999-9999"
              maskPlaceholder="(99) 99999-9999"
              type="text "
              className="form-control text-sm"
              onChange={(e) => setTelefoneUser(e.target.value)}
              placeholder="Digite apenas números"
            />
            <br />
            <label>Email:</label>
            <br />
            <input
              type="text "
              className="form-control text-sm"
              onChange={(e) => setEmailUser(e.target.value)}
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
                onChange={(e) => setSenhaUser(e.target.value)}
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
            {/* select para selecionar o usuario*/}

            <div>
              <label htmlFor="userTypeSelect">Selecione o tipo de usuário:</label>
              <select id="userTypeSelect" value={userType} onChange={handleUserTypeChange}>
                <option value={4}>Admiistardor</option>
                <option value={3}>Empresário</option>
                <option value={2}>Funcionário</option>
                <option value={1}>Usuário</option>
              </select>

              <h2>Usuários do Tipo {userType}:</h2>
              <ul>
                {users.map((user) => (
                  <li key={user.id}>{user.nomeUser}</li> // Substitua "name" pelo campo que deseja exibir
                ))}
              </ul>
            </div>


            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control text-sm"
                onChange={(e) => setSenhaUser(e.target.value)}
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
            {imagemUser && modalEditar && (
              <div
                className="bg-[#DBDBDB]   border-[#DBDBDB] hover:bg-gray-300 hover:border-gray-300"
                style={{ position: "relative", display: "inline-block" }}
              >
                {typeof imagemUser === "string" ? (
                  <img
                    src={base64ToImage(imagemUser)}
                    alt="Preview"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(imagemUser)}
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
              onChange={(e) => setImagemUser(e.target.files[0])}
              value={imagemUser === "" ? "" : undefined}
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
        <ModalHeader>Alterar Usuario</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label>
            <br />
            <input
              type="text"
              className="form-control  text-sm"
              readOnly
              value={idUser}
            />
            <br />
            <label>Nome: </label>
            <br />
            <input
              type="text"
              className="form-control  text-sm"
              onChange={(e) => setNomeUser(e.target.value)}
              value={nomeUser}
            />
            <br />
            <label>Cargo:</label>
            <br />
            <input
              type="text"
              className="form-control  text-sm"
              onChange={(e) => setCargoUser(e.target.value)}
              value={cargoUser}
            />
            <br />
            <label>CPF:</label>
            <br />
            <InputMask
              mask="999.999.999-99"
              maskPlaceholder="999.999.999-99"
              type="text "
              className="form-control  text-sm"
              onChange={(e) => setCpfUser(e.target.value)}
              value={cpfUser}
            />

            <br />
            <label>Telefone:</label>
            <br />
            <InputMask
              mask="(99) 99999-9999"
              maskPlaceholder="(99) 99999-9999"
              type="text "
              className="form-control  text-sm"
              onChange={(e) => setTelefoneUser(e.target.value)}
              value={telefoneUser}
            />

            <br />
            <label>Email:</label>
            <br />
            <input
              type="text "
              className="form-control  text-sm"
              onChange={(e) => setEmailUser(e.target.value)}
              value={emailUser}
            />
            <br />
            <label>Senha:</label>
            <br />
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control text-sm"
                onChange={(e) => setSenhaUser(e.target.value)}
                value={senhaUser}
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
            {imagemUser && modalEditar && (
              <div style={{ position: "relative", display: "inline-block" }}>
                {typeof imagemUser === "string" ? (
                  <img
                    src={imagemUser}
                    alt="Preview"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(imagemUser)}
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
              onChange={(e) => setImagemUser(e.target.files[0])}
              value={imagemUser === "" ? "" : undefined}
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
          Confirma a exclusão do Usuario: "{nomeUser}" ?
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
