import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardHome from "../../components/cards/cardHome.jsx";
import Layout from "../../components/admin/layout.jsx";
import BtnAcao from "../../components/botoes/btnAcao.jsx";
import ModalParametros from "../../components/modais/modalParametros.jsx";
import PopupEditado from "../../components/popups/popupEditado.jsx"; // Importando o popup
import axios from "axios"; // Importando axios para requisições

const Home = () => {
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [parametroSelecionado, setParametroSelecionado] = useState(null);
  const [modalEditadoOpen, setModalEditadoOpen] = useState(false); // Estado para o PopupEditado
  const baseUrl = "https://localhost:7256/api/Parametro"; // Ajuste conforme necessário

  useEffect(() => {
    const storedUserName = localStorage.getItem("nome");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    const userTypeFromLocalStorage = localStorage.getItem("tipoUsuario");
    setUserType(userTypeFromLocalStorage);
  }, []);

  const toggleModal = () => setModalOpen(!modalOpen);
  const togglePopupEditado = () => setModalEditadoOpen(!modalEditadoOpen); // Função para abrir/fechar o popup

  const handleEdit = async () => {
    const response = await axios.get(`${baseUrl}/1`); // Buscando o parâmetro pelo ID 1
    setParametroSelecionado(response.data);
    toggleModal();
  };

  const handleSubmit = async (data) => {
    if (data.id) {
      // Se já existir um ID, atualiza
      await axios.put(`${baseUrl}/${data.id}`, data);
    } else {
      // Caso contrário, cria um novo
      await axios.post(baseUrl, data);
    }
    toggleModal(); 
    togglePopupEditado(); 
  };

  return (
    <Layout>
      <h1 className="text-[18px] md:text-2xl font-semibold truncate">
        Bem Vindo, {userName || "Usuário"}!
      </h1>
      <hr className="pb-4 border-[2.5px] border-gray-300" />
      <div className="flex">
        <CardHome />
      </div>
      <div className="fixed -right-4 justify-end bottom-28">
        <BtnAcao
          funcao={handleEdit} 
          acao="Parametros"
        />
        <BtnAcao
          funcao={() => {
            setParametroSelecionado(null); 
            toggleModal();
          }}
          acao="Adicionar Parâmetros"
        />
      </div>

      <ModalParametros
        isOpen={modalOpen}
        toggle={toggleModal}
        onSubmit={handleSubmit}
        parametro={parametroSelecionado}
      />
      
      <PopupEditado
        isOpen={modalEditadoOpen}
        toggle={togglePopupEditado}
        objeto="Parâmetros"
      />
    </Layout>
  );
};

export default Home;
