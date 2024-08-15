import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SidebarAdm from "../../components/admin/sidebarAdm.jsx";
import NavBarAdm from "../../components/admin/navbarAdm.jsx";
import { useParams } from "react-router-dom";
import { Camera, Eye, EyeSlash } from "@phosphor-icons/react";

export default function VisualizarPerfil() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState("");
  const baseUrl = "https://localhost:7256/api/Usuario";
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [nomeUser, setNome] = useState("");
  const [telefoneUser, setTelefone] = useState("");
  const [emailUser, setEmail] = useState("");
  const [senhaUser, setSenha] = useState("");
  const [imagemUser, setImagemUser] = useState("");
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputFileRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function convertImageToBase64(imageFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleEditarPerfil = () => {
    setEditing(true);
  };

  const handleSalvarPerfil = async () => {
    const formData = new FormData();

    formData.append("nome", nomeUser);
    formData.append("telefone", telefoneUser);
    formData.append("emailUsuario", emailUser);
    formData.append("senhaUsuario", senhaUser);
    formData.append("tipoUsuario", tipoUsuario);

    if (imagemUser instanceof File) {
      const base64Image = await convertImageToBase64(imagemUser);
      formData.append("imagemPerfilUsuario", base64Image);
    } else {
      formData.append("imagemPerfilUsuario", imagemUser);
    }

    try {
      const response = await axios.put(`${baseUrl}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Perfil atualizado com sucesso:", response.data);
      setUsuario(response.data);
      setEditing(false);
    } catch (error) {
      console.error("Erro ao salvar perfil", error);
    }
  };

  const handleImageClick = () => {
    inputFileRef.current.click();
  };

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${id}`);
        const userData = response.data;
        setUsuario(userData);
        setTipoUsuario(userData.tipoUsuario);
        setNome(userData.nome);
        setTelefone(userData.telefone);
        setEmail(userData.emailUsuario);
        setSenha(userData.senhaUsuario);
        setImagemUser(userData.imagemPerfilUsuario);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    buscarUsuario();
  }, [id]);

  if (!usuario) {
    return <p>Carregando...</p>;
  }

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
          <h1 className="text-2xl font-semibold pb-2">
            Bem Vindo, {usuario.nome}!
          </h1>
          <hr className="pb-[30px] border-[2.5px] border-[#DBDBDB]" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 justify-center">
          <div className="flex flex-col justify-center items-center lg:items-start lg:pl-28 col-span-2 max-w-[500px]">
            <div className="flex relative justify-center sm:justify-center w-full">
              {imagemUser ? (
                <img
                  className="flex justify-center w-[200px] h-[200px] rounded-full cursor-pointer"
                  src={imagemUser instanceof File ? URL.createObjectURL(imagemUser) : imagemUser}
                  alt="Imagem do usuário"
                  onClick={handleImageClick}
                />
              ) : (
                <div
                  className="flex justify-center items-center w-[225px] h-[225px] rounded-full bg-slate-300 text-gray-700"
                  title="Imagem não disponível"
                />
              )}
              <div
                className="absolute flex justify-center items-center cursor-pointer translate-x-[70px] translate-y-[150px] w-[50px] h-[50px] text-[#FFD121] bg-black border-2 border-white dark:border-gray-800 rounded-full"
                onClick={handleImageClick}
              >
                <Camera size={28} />
                <div>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={inputFileRef}
                    onChange={(e) => setImagemUser(e.target.files[0])}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center w-full px-5">
              <h2 className="flex pt-2 justify-center lg:justify-start text-lg font-bold pb-2">
                {usuario.nome}
              </h2>
              {!editing ? (
                <button
                  className="flex bg-black text-[#f5f5f5] justify-center items-center hover:scale-105 text-base font-semibold rounded-md w-full h-8"
                  onClick={handleEditarPerfil}
                >
                  Editar Perfil
                </button>
              ) : (
                <button
                  className="flex bg-gray-300 justify-center items-center hover:bg-black hover:text-white hover:scale-105 text-base font-semibold rounded-md w-full h-8"
                  onClick={handleSalvarPerfil}
                >
                  Salvar
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col col-span-3 lg:pl-20 form-group items-center lg:items-start">
            <label className="text-sm font-semibold">ID: </label>
            <input
              type="text"
              className="form-control text-sm mb-2 w-full lg:w-[300px] pointer-events-none"
              readOnly
              value={usuario.id}
            />
            <label className="text-sm font-semibold">Nome: </label>
            <input
              type="text"
              className="form-control text-sm mb-2 w-full lg:w-[300px]"
              readOnly={!editing}
              onChange={(e) => setNome(e.target.value)}
              value={nomeUser}
            />
            <label className="text-sm font-semibold">Telefone: </label>
            <input
              type="text"
              className="form-control text-sm mb-2 w-full lg:w-[300px]"
              readOnly={!editing}
              onChange={(e) => setTelefone(e.target.value)}
              value={telefoneUser}
            />
            <label className="text-sm font-semibold">E-mail:</label>
            <input
              type="email"
              className="form-control text-sm mb-2 w-full lg:w-[300px]"
              readOnly={!editing}
              onChange={(e) => setEmail(e.target.value)}
              value={emailUser}
            />
            <label className="text-sm font-semibold">Senha:</label>
            <div className="input-group h-8 w-full lg:w-[300px]">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control text-sm mb-4 h-8"
                readOnly={!editing}
                onChange={(e) => setSenha(e.target.value)}
                value={senhaUser}
              />
              <button
                className="btn btn-outline-secondary bg-[#DBDBDB] border-[#DBDBDB] hover:bg-gray-300 hover:border-gray-300 h-8"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <label className="text-sm font-semibold mt-2">Tipo de Usuário:</label>
            <input
              type="text"
              className="form-control text-sm mb-2 w-full lg:w-[300px] pointer-events-none"
              readOnly
              value={
                tipoUsuario === 4
                  ? "Administrador"
                  : tipoUsuario === 3
                    ? "Empresário"
                    : tipoUsuario === 2
                      ? "Funcionário"
                      : tipoUsuario === 1
                        ? "Usuário"
                        : "Tipo de usuário inválido"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
