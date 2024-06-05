import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios"; 
import AtracaoEstatica from "../../assets/atracaoEstatica";

const GaleriaAtracao = () => {
  const { id } = useParams();
  const [atracao, setAtracao] = useState(null);
  const [tipoAtracao, setTipoAtracao] = useState(null); // Defina o estado para o tipo de atração
  const [outrasAtracoes, setOutrasAtracoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarAtracoes = async () => {
        try {
            const response = await axios.get(`https://localhost:7256/api/Atracao/${id}`);
            setAtracao(response.data);
            console.log("Atração recebida:", response.data);

            // Buscar detalhes do tipo de atração
            const tipoAtracaoResponse = await axios.get(`https://localhost:7256/api/TipoAtracao/${response.data.idTipoAtracao}`);
            setTipoAtracao(tipoAtracaoResponse.data);
        } catch (error) {
            console.error("Erro ao buscar atração:", error);
        }
    };
    buscarAtracoes();
}, [id]);

  const renderizarAtracoes = () => {
   

    if (window.innerWidth >= 768) {
      return outrasAtracoes.slice(0, 3).map((outraAtracao, index) => ( // Use outraAtracao em vez de atracao
        <div key={index} className="flex flex-col bg-white h-[155px]">
          <AtracaoEstatica />
          <h2 className="text-[12px] px-1 font-semibold pt-2">
            {outraAtracao.nome} {/* Use 'outraAtracao.nome' para evitar conflito de nomes */}
          </h2>
          <h2 className="text-[8px] px-1 font-medium pt-2 pb-2">{tipoAtracao.nome}</h2>
          <div className="flex w-full justify-center">
            <button className="border-[#FFD121] border-[1.5px] w-[100px] h-[20px] text-[8px] sm:text-base text-[#373636] font-medium hover:bg-black hover:text-white ">
              Leia Mais
            </button>
          </div>
        </div>
      ));
    } else {
      if (atracao) {
        return (
          <div className="flex flex-col bg-white h-[155px]">
            <AtracaoEstatica />
            {/* <h2 className="text-[12px] px-1 font-semibold pt-2">
              {atracao.nome}
            </h2>
            <h2 className="text-[8px] px-1 font-medium pt-2 pb-2">{atracao.idTipoAtracao}</h2> */}
            <h2 className="text-[12px] px-1 font-semibold pt-2">
            {atracao.nome} {/* Use 'atracao.nome' para evitar conflito de nomes */}
          </h2>
          <h2 className="text-[8px] px-1 font-medium pt-2 pb-2">{tipoAtracao.nome}</h2>
            <div className="flex w-full justify-center">
              <button className="border-[#FFD121] border-[1.5px] w-[100px] h-[20px] text-[8px] sm:text-base text-[#373636] font-medium hover:bg-black hover:text-white ">
                Leia Mais
              </button>
            </div>
          </div>
        );
      } else {
        return null;
      }
    }
  };

  return (
    <div className="flex flex-row w-full justify-between px-8">
      renderizarAtracoes()
    </div>
  );
};

export default GaleriaAtracao;
