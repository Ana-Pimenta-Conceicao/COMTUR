import { useState, useEffect } from "react";
import axios from "axios";
import NavbarUsr from "../../components/user/navbarUsr.jsx";
import FooterUsr from "../../components/user/footerUsr.jsx";
import { useParams } from "react-router-dom";
import "../atracao/index.css";

export default function VisualizarTipoAtracao() {
  const { id } = useParams();
  const [tipoatracao, setTipoAtracao] = useState(null);
  const baseUrl = "https://localhost:7256/api/TipoAtracao";

  useEffect(() => {
    const buscarTipoAtracao = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${id}`);
        setTipoAtracao(response.data);
      } catch (error) {
        console.error("Erro ao buscar atração:", error);
      }
    };
    buscarTipoAtracao();
  }, [id]);

  if (!tipoatracao) {
    return <h2>Carregando...</h2>;
  }

  return (
    <div className="h-full">
      <NavbarUsr />
      <div className="container h-[565px] pt-6 pb-6">
        <h1 className="text-6xl pb-5">{tipoatracao.nome}</h1>
        <p className="text-4xl">Esse tipo de atração foi cadastrado pelo usuário: {tipoatracao.id}</p>
        {/* Adicione aqui outros detalhes da atração */}
      </div>
      <FooterUsr />
    </div>
  );
}
