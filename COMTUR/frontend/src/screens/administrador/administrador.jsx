import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import InputMask from "react-input-mask";
import SidebarAdm from "../../components/admin/sidebarAdm";
import NavBarAdm from "../../components/admin/navbarAdm";
import BtnAcao from "../../components/botoes/btnAcao";
import BtnModais from "../../components/botoes/btnModais";
import { useNavigate } from "react-router-dom";
import { CaretLeft, CaretRight, EyeSlash, Eye } from "@phosphor-icons/react";

export default function Administrador() {
  const baseUrl = "https://localhost:7256/api/Administrador";

  const [data, setData] = useState([]);

  const [atualizarData, setAtualizarData] = useState(true);

  const [modalInserir, setModalInserir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);

  const [nomeAdmin, setNomeAdmin] = useState("");
  const [cargoAdmin, setCargoAdmin] = useState("");
  const [cpfAdmin, setCpfAdmin] = useState("");
  const [telefoneAdmin, setTelefoneAdmin] = useState("");
  const [emailAdmin, setEmailAdmin] = useState("");
  const [senhaAdmin, setSenhaAdmin] = useState("");
  const [imagemAdmin, setImagemAdmin] = useState("");
  const [idAdmin, setIdAdmin] = useState("");

  const navigate = useNavigate();

  const limparDados = () => {
    setNomeAdmin("");
    setCargoAdmin("");
    setCpfAdmin("");
    setTelefoneAdmin("");
    setEmailAdmin("");
    setSenhaAdmin("");
    setImagemAdmin("");
    setIdAdmin("");
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

  const AdminSet = (admin, opcao) => {
    console.log("Admin que foi passado: ", admin);
    setIdAdmin(admin.id);
    setNomeAdmin(admin.nomeAdministrador);
    setCargoAdmin(admin.cargoAdministrador);
    setCpfAdmin(admin.cpfAdministrador);
    setTelefoneAdmin(admin.telefoneAdministrador);
    setEmailAdmin(admin.emailAdministrador);
    setSenhaAdmin(admin.senhaAdministrador);
    setImagemAdmin(admin.imagemPerfilAdministrador);

    if (opcao === "Editar") {
      abrirFecharModalEditar();
    } else if (opcao === "Excluir") {
      abrirFecharModalDeletar();
    } else {
      navigate(`/perfilAdministrador/${admin.id}`);
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

    formData.append("nomeAdministrador", nomeAdmin);
    formData.append("cpfAdministrador", cpfAdmin);
    formData.append("cargoAdministrador", cargoAdmin);
    formData.append("telefoneAdministrador", telefoneAdmin);
    formData.append("emailAdministrador", emailAdmin);
    formData.append("senhaAdministrador", senhaAdmin);

    const base64Image = await convertImageToBase64(imagemAdmin);
    formData.append("imagemPerfilAdministrador", base64Image);

    try {
      const response = await axios.post(baseUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newAdmin = response.data; // Ensure the response contains the newly registered admin data
      setData([...data, newAdmin]); // Add the new admin to the existing data

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

    formData.append("nomeAdministrador", nomeAdmin);
    formData.append("cpfAdministrador", cpfAdmin);
    formData.append("cargoAdministrador", cargoAdmin);
    formData.append("telefoneAdministrador", telefoneAdmin);
    formData.append("emailAdministrador", emailAdmin);
    formData.append("senhaAdministrador", senhaAdmin);

    if (imagemAdmin instanceof File) {
      // Converter a imagem para base64 antes de enviar
      const base64Image = await convertImageToBase64(imagemAdmin);
      formData.append("imagemPerfilAdministrador", base64Image);
    } else {
      formData.append("imagemPerfilAdministrador", imagemAdmin);
    }

    try {
      const response = await axios.put(`${baseUrl}/${idAdmin}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updateAdmin = response.data;

      setData((prevData) => {
        return prevData.map((admin) => {
          if (admin.id === idAdmin) {
            return updateAdmin;
          }
          return admin;
        });
      });

      abrirFecharModalEditar();
      limparDados();
    } catch (error) {
      console.log(error);
    }
  }

  const atualizarListaAdmin = async () => {
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
    setImagemAdmin("");
  };

  const pedidoDeletar = async () => {
    await axios
      .delete(baseUrl + "/" + idAdmin)
      .then((response) => {
        const newAdmin = data.filter((admin) => admin.id !== response.data);
        setData(newAdmin);
        atualizarListaAdmin();
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
    return data.slice(startIndex, endIndex).map((admin) => {
      if (admin.imagemPerfilAdministrador instanceof File) {
        return {
          ...admin,
          imagemPerfilAdministrador: URL.createObjectURL(
            admin.imagemPerfilAdministrador
          ),
        };
      }
      return admin;
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
            Lista de Administradores
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
              {currentItems.map((admin) => (
                <React.Fragment key={admin.id}>
                  <li className="grid grid-cols-11 w-full bg-[#F5F5F5]">
                    <span
                      scope="row"
                      className="flex pl-5 border-r-[1px] border-t-[1px] border-[#DBDBDB] pt-[12px] pb-[12px] text-gray-700"
                    >
                      {admin.id}
                    </span>
                    <span className="flex justify-center items-center border-t-[1px] border-r-[1px] border-[#DBDBDB] text-gray-700">
                      {admin.imagemPerfilAdministrador ? (
                        <img
                          className="flex w-10 h-10 rounded "
                          src={admin.imagemPerfilAdministrador}
                          alt="Preview"
                        />
                      ) : (
                        <div>No image</div>
                      )}
                    </span>
                    <span className="flex col-span-3 justify-left items-center pl-2 border-t-[1px] border-r-[1px] border-[#DBDBDB] text-gray-700 ">
                      {admin.nomeAdministrador}
                    </span>
                    <span className="flex col-span-3 justify-left items-center pl-2 border-t-[1px] border-r-[1px] border-[#DBDBDB] text-gray-700">
                      {admin.cargoAdministrador}
                    </span>
                    <span className="flex col-span-3 justify-center items-center border-t-[1px] gap-[3px] 
                    border-[#DBDBDB]">
                      <BtnAcao funcao={() => AdminSet(admin, "Editar")} acao="Editar" />
                      <BtnAcao funcao={() => AdminSet(admin, "Excluir")} acao="Excluir" />
                      <BtnAcao funcao={() => AdminSet(admin, "Visualizar")} acao="Visualizar" />
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
          <BtnAcao funcao={() => abrirFecharModalInserir("Cadastrar")} acao="Cadastrar" />
          </div>
        </div>
      </div>

      <Modal isOpen={modalInserir}>
        <ModalHeader>Cadastrar Administrador</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome: </label>
            <br />
            <input
              type="text "
              className="form-control text-sm"
              onChange={(e) => setNomeAdmin(e.target.value)}
              placeholder="Digite o nome "
            />
            <br />
            <label>Cargo:</label>
            <br />
            <input
              type="text "
              className="form-control text-sm"
              onChange={(e) => setCargoAdmin(e.target.value)}
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
              onChange={(e) => setCpfAdmin(e.target.value)}
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
              onChange={(e) => setTelefoneAdmin(e.target.value)}
              placeholder="Digite apenas números"
            />
            <br />
            <label>Email:</label>
            <br />
            <input
              type="text "
              className="form-control text-sm"
              onChange={(e) => setEmailAdmin(e.target.value)}
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
                onChange={(e) => setSenhaAdmin(e.target.value)}
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
            {imagemAdmin && modalEditar && (
              <div
                className="bg-[#DBDBDB]   border-[#DBDBDB] hover:bg-gray-300 hover:border-gray-300"
                style={{ position: "relative", display: "inline-block" }}
              >
                {typeof imagemAdmin === "string" ? (
                  <img
                    src={base64ToImage(imagemAdmin)}
                    alt="Preview"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(imagemAdmin)}
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
              onChange={(e) => setImagemAdmin(e.target.files[0])}
              value={imagemAdmin === "" ? "" : undefined}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
        <BtnModais funcao={() => pedidoPost()} acao="Cadastrar" />
        <BtnModais funcao={() => abrirFecharModalInserir()} acao="Cancelar" />
                  
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalEditar}>
        <ModalHeader>Alterar Administrador</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label>
            <br />
            <input
              type="text"
              className="form-control  text-sm"
              readOnly
              value={idAdmin}
            />
            <br />
            <label>Nome: </label>
            <br />
            <input
              type="text"
              className="form-control  text-sm"
              onChange={(e) => setNomeAdmin(e.target.value)}
              value={nomeAdmin}
            />
            <br />
            <label>Cargo:</label>
            <br />
            <input
              type="text"
              className="form-control  text-sm"
              onChange={(e) => setCargoAdmin(e.target.value)}
              value={cargoAdmin}
            />
            <br />
            <label>CPF:</label>
            <br />
            <InputMask
              mask="999.999.999-99"
              maskPlaceholder="999.999.999-99"
              type="text "
              className="form-control  text-sm"
              onChange={(e) => setCpfAdmin(e.target.value)}
              value={cpfAdmin}
            />

            <br />
            <label>Telefone:</label>
            <br />
            <InputMask
              mask="(99) 99999-9999"
              maskPlaceholder="(99) 99999-9999"
              type="text "
              className="form-control  text-sm"
              onChange={(e) => setTelefoneAdmin(e.target.value)}
              value={telefoneAdmin}
            />

            <br />
            <label>Email:</label>
            <br />
            <input
              type="text "
              className="form-control  text-sm"
              onChange={(e) => setEmailAdmin(e.target.value)}
              value={emailAdmin}
            />
            <br />
            <label>Senha:</label>
            <br />
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control text-sm"
                onChange={(e) => setSenhaAdmin(e.target.value)}
                value={senhaAdmin}
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
            {imagemAdmin && modalEditar && (
              <div style={{ position: "relative", display: "inline-block" }}>
                {typeof imagemAdmin === "string" ? (
                  <img
                    src={imagemAdmin}
                    alt="Preview"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(imagemAdmin)}
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
              onChange={(e) => setImagemAdmin(e.target.files[0])}
              value={imagemAdmin === "" ? "" : undefined}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
        <BtnModais funcao={() => pedidoAtualizar()} acao="Editar" />
        <BtnModais funcao={() => abrirFecharModalEditar()} acao="Cancelar" />
                  
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDeletar}>
        <ModalBody>
          Confirma a exclusão do administrador: "{nomeAdmin}" ?
        </ModalBody>
        <ModalFooter>
        <BtnModais funcao={() => pedidoDeletar()} acao="Excluir" />
        <BtnModais funcao={() => abrirFecharModalDeletar()} acao="Cancelar" />
                  
        </ModalFooter>
      </Modal>
    </div>
  );
}
