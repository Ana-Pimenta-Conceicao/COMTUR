import NavbarAdm from "../../components/admin/navbarAdm";
import SidebarAdm from "../../components/admin/sidebarAdm";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import InputMask from "react-input-mask";
import { Eye, EyeSlash, Camera } from "@phosphor-icons/react";

export default function PerfilAdministrador() {
  const { id } = useParams();
  const [administrador, setAdministrador] = useState(null);
  const [editing, setEditing] = useState(false);
  const [nomeAdmin, setNomeAdmin] = useState("");
  const [cargoAdmin, setCargoAdmin] = useState("");
  const [cpfAdmin, setCpfAdmin] = useState("");
  const [telefoneAdmin, setTelefoneAdmin] = useState("");
  const [emailAdmin, setEmailAdmin] = useState("");
  const [senhaAdmin, setSenhaAdmin] = useState("");
  const [imagemPerfilAdmin, setImagemPerfilAdmin] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const inputFileRef = useRef(null); // Referência para o input de arquivo

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const obterDetalhesPerfil = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7256/api/Administrador/${id}`
        );
        setAdministrador(response.data);
        setNomeAdmin(response.data.nomeAdministrador);
        setCargoAdmin(response.data.cargoAdministrador);
        setCpfAdmin(response.data.cpfAdministrador);
        setTelefoneAdmin(response.data.telefoneAdministrador);
        setEmailAdmin(response.data.emailAdministrador);
        setSenhaAdmin(response.data.senhaAdministrador);
        setImagemPerfilAdmin(response.data.imagemPerfilAdministrador);
      } catch (error) {
        console.error("Erro ao obter detalhes do perfil", error);
      }
    };
    obterDetalhesPerfil();
  }, [id]);

  const handleEditarPerfil = () => {
    setEditing(true);
  };

  const handleSalvarPerfil = async () => {
    const formData = new FormData();
    const baseUrl = "https://localhost:7256/api/Administrador";

    formData.append("nomeAdministrador", nomeAdmin);
    formData.append("cpfAdministrador", cpfAdmin);
    formData.append("cargoAdministrador", cargoAdmin);
    formData.append("telefoneAdministrador", telefoneAdmin);
    formData.append("emailAdministrador", emailAdmin);
    formData.append("senhaAdministrador", senhaAdmin);
    
    if (imagemPerfilAdmin instanceof File) {
        // Converter a imagem para base64 antes de enviar
        const base64Image = await convertImageToBase64(imagemPerfilAdmin);
        formData.append("imagemPerfilAdministrador", base64Image);
      } else {
        formData.append("imagemPerfilAdministrador", imagemPerfilAdmin);
      }

    try {
      const response = await axios.put(`${baseUrl}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Perfil atualizado com sucesso:", response.data);
      setAdministrador(response.data);
      setEditing(false);
    } catch (error) {
      console.error("Erro ao salvar perfil", error);
    }
  };

  const handleImageClick = () => {
    inputFileRef.current.click(); // Clique no input de arquivo quando a imagem for clicada
  };

  if (!administrador) {
    return <p>Carregando...</p>;
  }

  function convertImageToBase64(imageFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  return (
    <div className="h-screen flex">
      <SidebarAdm />
      <div className="flex-2 container-fluid">
        <NavbarAdm />
        <div className="pl-8 pr-8 pt-[16px]">
          <h1 className="text-2xl font-semibold pb-2">
            Bem vindo(a), {nomeAdmin}!
          </h1>
          <hr className="pb-[30px] border-[2.5px] border-[#DBDBDB]" />
        </div>
        <div className="grid grid-cols-4 justify-center">
          <div className="pl-28 col-span-1 justify-center ">
            <div>
              <input
                type="file"
                style={{ display: "none" }}
                ref={inputFileRef} // Referência para o input de arquivo
                onChange={(e) => setImagemPerfilAdmin(e.target.files[0])}
              />
            </div>
            <div className="relative rounded-full">
              <img
                className="flex w-40 h-40 rounded-full cursor-pointer"
                src={imagemPerfilAdmin instanceof File ? URL.createObjectURL(imagemPerfilAdmin) : imagemPerfilAdmin}
                alt="Imagem"
                onClick={handleImageClick} // Manipulador de clique na imagem
              />
              
                <button
                  className="flex w-10 h-10 bottom-[-4px] left-28 absolute bg-[#FDE964] hover:bg-black hover:text-white border-2
                   border-white dark:border-gray-800 rounded-full  justify-center items-center"
                  onClick={handleImageClick}
                >
                  <Camera className="text-gray-700 hover:text-white" size={20} />
                </button>
             
              
            </div>
            <h2 className="flex pt-2 justify-left text-lg font-bold pb-2">
              {administrador.nomeAdministrador}
            </h2>
            {!editing ? (
              <button
                className="flex bg-[#f5f5f5] justify-center hover:bg-black hover:text-white  text-base font-semibold rounded-md w-[192px] "
                onClick={handleEditarPerfil}
              >
                Editar Perfil
              </button>
            ) : (
              <button
                className="flex bg-[#f5f5f5] justify-center hover:bg-[#FDE964] text-base font-semibold rounded-md w-[192px] "
                onClick={handleSalvarPerfil}
              >
                Salvar
              </button>
            )}
          </div>

          <div className="flex flex-col col-span-3 pl-20 form-group ">
            <label className="text-sm font-semibold">ID: </label>
            <input
              type="text"
              className="form-control text-sm mb-2 w-[300px] pointer-events-none"
              readOnly
              value={administrador.id}
            />
            <label className="text-sm font-semibold">Nome: </label>
            <input
              type="text"
              className="form-control text-sm mb-2  w-[300px] pointer-events-none"
              readOnly={!editing}
              onChange={(e) => setNomeAdmin(e.target.value)}
              value={nomeAdmin}
            />
            <label className="text-sm font-semibold">Cargo:</label>
            <input
              type="text"
              className="form-control text-sm mb-2 w-[300px]"
              readOnly={!editing}
              onChange={(e) => setCargoAdmin(e.target.value)}
              value={cargoAdmin}
            />
            <label className="text-sm font-semibold">CPF:</label>
            <InputMask
              mask="999.999.999-99"
              type="text"
              className="form-control text-sm mb-2  w-[300px]"
              readOnly={!editing}
              onChange={(e) => setCpfAdmin(e.target.value)}
              value={cpfAdmin}
            />
            <label className="text-sm font-semibold">Telefone:</label>
            <InputMask
              mask="(99) 99999-9999"
              type="text"
              className="form-control text-sm mb-2 w-[300px]"
              readOnly={!editing}
              onChange={(e) => setTelefoneAdmin(e.target.value)}
              value={telefoneAdmin}
            />
            <label className="text-sm font-semibold">Email:</label>
            <input
              type="text"
              className="form-control text-sm mb-2 w-[300px]"
              readOnly={!editing}
              onChange={(e) => setEmailAdmin(e.target.value)}
              value={emailAdmin}
            />
            <label className="text-sm font-semibold">Senha:</label>
            <div className="input-group h-8 w-[300px]">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control text-sm mb-4 h-8"
                readOnly={!editing}
                onChange={(e) => setSenhaAdmin(e.target.value)}
                value={senhaAdmin}
              />
              <button
                className="btn btn-outline-secondary bg-[#DBDBDB] border-[#DBDBDB]
                                 hover:bg-gray-300 hover:border-gray-300 h-8"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
