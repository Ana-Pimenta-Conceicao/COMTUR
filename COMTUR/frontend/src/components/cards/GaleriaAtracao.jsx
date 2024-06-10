import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { CaretDoubleLeft, CaretDoubleRight } from "@phosphor-icons/react";

const GaleriaAtracao = (identi) => {
  const baseUrl = "https://localhost:7256/api";
  const [atracoes, setAtracoes] = useState([]);
  const [tiposAtracao, setTiposAtracao] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const obterAtracoesRelacionadas = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Atracao/${parseInt(identi.identi)}/AtracoesRelacionadas`);
        setAtracoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar atração:", error);
      }
    };

    const obterTiposAtracao = async () => {
      try {
        const response = await axios.get(`${baseUrl}/TipoAtracao`);
        setTiposAtracao(response.data);
      } catch (error) {
        console.error("Erro ao buscar tipo atração:", error);
      }
    };

    obterAtracoesRelacionadas();
    obterTiposAtracao();
  }, [identi]);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? atracoes.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === atracoes.length - 1 ? 0 : prev + 1));
  };

  const getVisibleItemsCount = useCallback(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 1024) {
      return 3; // Desktop: Show 3 items
    } else {
      return 1; // Mobile: Show 1 item
    }
  }, []);

  const visibleItemsCount = getVisibleItemsCount();

  const startItemIndex = currentSlide;
  const endItemIndex = (startItemIndex + visibleItemsCount - 1) % atracoes.length;

  const visibleAtracoes = [];

  if (atracoes.length > 0) {
    if (startItemIndex <= endItemIndex) {
      for (let i = startItemIndex; i <= endItemIndex; i++) {
        visibleAtracoes.push(atracoes[i]);
      }
    } else {
      for (let i = startItemIndex; i < atracoes.length; i++) {
        visibleAtracoes.push(atracoes[i]);
      }
      for (let i = 0; i <= endItemIndex; i++) {
        visibleAtracoes.push(atracoes[i]);
      }
    }
  }

  return (
    <div className="flex flex-row justify-center gap-3 w-full overflow-hidden">
      {atracoes.length > 0 && (
        <button className="text-[#FFD121] hover:text-white" onClick={prevSlide}>
          <CaretDoubleLeft size={32} />
        </button>
      )}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12">
        {visibleAtracoes.map((atracao, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center bg-white w-60 h-60 rounded-md p-4 transition-transform transform ${index === 0 ? "translate-x-0" : ""
              }`}
          >
            <h2 className="text-base font-semibold">{tiposAtracao.find(tipoAtracao => tipoAtracao.id === atracao.idTipoAtracao)?.nome || "Tipo Atração não encontrada"}</h2>
            <h2 className="text-sm font-semibold">{atracao.nome}</h2>
            <button className="mt-2 px-4 py-1 border-2 border-[#FFD121] text-xs font-medium text-[#373636] bg-transparent hover:bg-[#FFD121] transition-colors duration-300 rounded-sm">
              Leia Mais
            </button>
          </div>
        ))}
      </div>
      {atracoes.length > 0 && (
        <button className="text-[#FFD121] hover:text-white" onClick={nextSlide}>
          <CaretDoubleRight size={32} />
        </button>
      )}
    </div>
  );
};

export default GaleriaAtracao;
