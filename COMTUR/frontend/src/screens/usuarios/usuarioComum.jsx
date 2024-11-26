import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import InputMask from "react-input-mask";
import SidebarAdm from "../../components/admin/sidebarAdm.jsx";
import NavBarAdm from "../../components/admin/navbarAdm.jsx";
import { useNavigate } from "react-router-dom";
import BtnAcao from "../../components/botoes/btnAcao.jsx";
import Tabela from "../../components/table/tabela.jsx";
import { Eye, EyeSlash, Funnel } from "@phosphor-icons/react";
import PopupCadastrado from "../../components/popups/popupCadastro.jsx";
import BtnModais from "../../components/botoes/btnModais.jsx";
import PopupExcluido from "../../components/popups/popupExcluido.jsx";
import PopupEditado from "../../components/popups/popupEditado.jsx";

export default function Usuario() {
  const baseUrl = "https://localhost:7256/api/Usuario";

  const [data, setData] = useState([]);
  //estado do filtro
  const [filtroTipoUsuario, setFiltroTipoUsuario] = useState("");
  const [userType, setUserType] = useState(null);
  const [atualizarData, setAtualizarData] = useState(true);

  const [modalInserir, setModalInserir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);

  const [modalCadastrado, setModalCadastrado] = useState(false);
  const [modalExcluido, setModalExcluido] = useState(false);
  const [modalEditado, setModalEditado] = useState(false);

  const toggleModalCadastro = () => setModalCadastrado(!modalCadastrado);

  const toggleModalEdita = () => setModalEditado(!modalEditado);

  const toggleModalExclui = () => setModalExcluido(!modalExcluido);

  const [nomeUser, setNome] = useState("");
  const [telefoneUser, setTelefone] = useState("");
  const [emailUser, setEmail] = useState("");
  const [senhaUser, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [imagemUser, setImagemUser] = useState("");
  const [idUser, setId] = useState("");
  const [editImage, setEditImage] = useState(false); // Estado para controlar se a imagem está sendo editada
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [idUsuario, setIdUsuario] = useState("");
  

  const navigate = useNavigate();

  // Adicione uma função para atualizar o filtro de tipo de usuário
  const handleFiltroTipoUsuarioChange = (e) => {
    setFiltroTipoUsuario(e.target.value);
  };

  const limparDados = () => {
    setNome("");
    setTelefone("");
    setEmail("");
    setSenha("");
    setTipoUsuario("");
    setImagemUser("");
    setId("");
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
    setId(user.id);
    setNome(user.nome);
    setTelefone(user.telefone);
    setEmail(user.emailUsuario);
    setSenha(user.senhaUsuario);
    setTipoUsuario(user.tipoUsuario);
    setImagemUser(user.imagemUsuario);

    if (opcao === "Editar") {
      abrirFecharModalEditar();
    } else if (opcao === "Excluir") {
      abrirFecharModalDeletar();
    } else {
      navigate(`/perfilUsuario/${user.id}`);
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
    formData.append("nome", nomeUser);
    formData.append("telefone", telefoneUser);
    formData.append("emailUsuario", emailUser);
    formData.append("senhaUsuario", senhaUser);
    formData.append("tipoUsuario", 1);
    formData.append("idUsuario", idUsuario);

    // Verificar se o campo de imagem está vazio
    if (imagemUser instanceof File) {
      const base64Image = await convertImageToBase64(imagemUser);
      formData.append("imagemPerfilUsuario", base64Image);
    } else {
      // Se estiver vazio, fornecer uma imagem padrão
      const defaultImage = await fetch("./src/assets/userpadrao.png");
      const blob = await defaultImage.blob();
      const base64Image = await convertImageToBase64(blob);
      formData.append("imagemPerfilUsuario", base64Image);
    }

    try {
      const response = await axios.post(baseUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newUser = response.data;
      setData([...data, newUser]);

      abrirFecharModalInserir();
      limparDados();
      toggleModalCadastro();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserTypeChange = (e) => {
    setUserType(parseInt(e.target.value));
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

    formData.append("nome", nomeUser);
    formData.append("telefone", telefoneUser);
    formData.append("emailUsuario", emailUser);
    formData.append("senhaUsuario", senhaUser);
    formData.append("tipoUsuario", 1);
    formData.append("idUsuario", idUsuario);

    if (imagemUser instanceof File) {
      // Converter a imagem para base64 antes de enviar
      const base64Image = await convertImageToBase64(imagemUser);
      formData.append("imagemPerfilUsuario", base64Image);
    } else {
      formData.append("imagemPerfilUsuario", imagemUser);
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
      toggleModalEdita();
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
        toggleModalExclui();
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
  const itemsPerPage = 9;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getCurrentPageItems = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    let filteredData = data;

    // Aplicar filtro de tipo de usuário, se selecionado
    if (filtroTipoUsuario !== "") {
      filteredData = filteredData.filter(
        (user) => user.tipoUsuario === parseInt(filtroTipoUsuario)
      );
    }

    return filteredData.slice(startIndex, endIndex).map((user) => {
      if (user.imagemPerfilUsuario instanceof File) {
        return {
          ...user,
          imagemPerfilUsuario: URL.createObjectURL(user.imagemPerfilUsuario),
        };
      }
      return user;
    });
  };

  // Renderiza os itens da página atual
  const currentItems = getCurrentPageItems(currentPage);

  useEffect(() => {
    const userTypeFromLocalStorage = localStorage.getItem("tipoUsuario");
    const idTipoUsuarioAPI = localStorage.getItem("id");
    setUserType(userTypeFromLocalStorage);
    setIdUsuario(idTipoUsuarioAPI);
  }, []);   

  const statusOptions = [
    { value: '', label: 'Todos' },
    { value: '1', label: 'Em Análise' },
    { value: '2', label: 'Aprovado' },
    { value: '3', label: 'Reprovado' },
    { value: '4', label: 'Desativado' }
  ];

  const statusColors = {
    1: "bg-gray-800 text-white", // cinza para Em Análise
    2: "bg-[#009688] text-white", // verde escuro para Aprovado
    3: "bg-[#FF6B6B] text-white", // Vermelho claro para Reprovado
    4: "bg-gray-400 text-white", // Cinza claro para Desativado
  };
  
  const apresentaDados = Array.isArray(currentItems)
  ? currentItems
      .filter((usuario) => usuario.tipoUsuario === 1) // Filtrar apenas os usuários com tipo de usuário igual a 2
      .map((usuario) => {
        const tipoUsuarioNome = obterNomeTipoUsuario(usuario.tipoUsuario);

        const descricao = usuario.emailUsuario && typeof usuario.emailUsuario === 'string'
        ? (usuario.emailUsuario.length > 20 
          ? `${usuario.emailUsuario.slice(0, 20)}...` 
          : usuario.emailUsuario)
        : '';

        const nome = usuario.nome && typeof usuario.nome === 'string'
        ? (usuario.nome.length > 20 
          ? `${usuario.nome.slice(0, 15)}...` 
          : usuario.nome)
        : '';
        
        return {
          id: usuario.id,
          nome: nome,
          descricao: descricao,
          tipoUsuario: tipoUsuarioNome,
          status: (
            <div className={`px-3 py-1 rounded-md ${statusColors[usuario.status]}`}>
              {statusOptions.find(option => option.value === usuario.status.toString())?.label}
            </div>
          ),
          acoes: (
            <div className="flex items-center justify-center border-t-[1px] gap-2 border-gray-100 py-2">
              <BtnAcao
                funcao={() => UserSet(usuario, "Editar")}
                acao="Editar"
              />
              <BtnAcao
                funcao={() => UserSet(usuario, "Excluir")}
                acao="Excluir"
              />
            </div>
          ),
        };
      })
  : [];


  // Função auxiliar para obter o nome do tipo de usuário com base no enum
  function obterNomeTipoUsuario(tipoUsuario) {
    switch (tipoUsuario) {
      case 1:
        return "Usuário";
      case 2:
        return "Funcionário";
      case 3:
        return "Empresário";
      case 4:
        return "Administrador";
      default:
        return "Tipo não encontrado";
    }
  }

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
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-semibold">Lista de Usuários Comuns</h1>
            </div>

            <hr className="pb-4 border-[2.5px] border-gray-300" />
            <Tabela
              object={apresentaDados}
              colunas={["ID", "Nome", "Email", "Tipo", "Status", "Ações"]}
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={setCurrentPage}
              numColunas={6}
            />

            <div className="float-right flex-auto py-6">
              <BtnAcao
                funcao={() => abrirFecharModalInserir("Cadastrar")}
                acao="Cadastrar"
              />
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
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome "
              />
              <br />
              <label>Telefone:</label>
              <br />
              <InputMask
                mask="(99) 99999-9999"
                maskPlaceholder="(99) 99999-9999"
                type="text "
                className="form-control text-sm"
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="Digite apenas números"
              />
              <br />
              <label>Email:</label>
              <br />
              <input
                type="text "
                className="form-control text-sm"
                onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setSenha(e.target.value)}
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
              <label>Tipo Usuário:</label>
              <div>
                <select
                  className="form-control"
                  id="userTypeSelect"
                  value={userType}
                  onChange={handleUserTypeChange}
                >
                  <option value={1}>Usuário Comum</option>
                  </select>
              </div>

              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <BtnModais funcao={() => pedidoPost()} acao="Cadastrar" />
            <BtnModais
              funcao={() => abrirFecharModalInserir()}
              acao="Cancelar"
            />
          </ModalFooter>
        </Modal>
        <PopupCadastrado
          isOpen={modalCadastrado}
          toggle={toggleModalCadastro}
          objeto="Usuário"
        />
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
                onChange={(e) => setNome(e.target.value)}
                value={nomeUser}
              />
              <br />
              <label>Telefone:</label>
              <br />
              <InputMask
                mask="(99) 99999-9999"
                maskPlaceholder="(99) 99999-9999"
                type="text "
                className="form-control  text-sm"
                onChange={(e) => setTelefone(e.target.value)}
                value={telefoneUser}
              />

              <br />
              <label>Email:</label>
              <br />
              <input
                type="text "
                className="form-control  text-sm"
                onChange={(e) => setEmail(e.target.value)}
                value={emailUser}
              />
              <br />
              <label>Senha:</label>
              <br />
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control text-sm"
                  onChange={(e) => setSenha(e.target.value)}
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
              <label>Tipo Usuário:</label>
              <div>
                <select
                  className="form-control"
                  id="userTypeSelect"
                  value={userType}
                  onChange={handleUserTypeChange}
                >
                  <option value={1}>Usuário Comum</option>
                </select>
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
                  ></button>
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
            <BtnModais funcao={() => pedidoAtualizar()} acao="Editar" />
            <BtnModais
              funcao={() => abrirFecharModalEditar()}
              acao="Cancelar"
            />
          </ModalFooter>
        </Modal>
        <PopupEditado
          isOpen={modalEditado}
          toggle={toggleModalEdita}
          objeto="Usuário"
        />

        <Modal isOpen={modalDeletar}>
          <ModalBody>Confirma a exclusão do(a) "{nomeUser}" ?</ModalBody>
          <ModalFooter>
            <BtnModais funcao={() => pedidoDeletar()} acao="Excluir" />
            <BtnModais
              funcao={() => abrirFecharModalDeletar()}
              acao="Cancelar"
            />
          </ModalFooter>
        </Modal>

        <PopupExcluido
          isOpen={modalExcluido}
          toggle={toggleModalExclui}
          objeto="Usuário"
        />
      </div>
    );
  }
}
