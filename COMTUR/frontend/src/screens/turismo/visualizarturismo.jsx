import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarUsr from "../../components/user/navbarUsr";
import FooterUsr from "../../components/user/footerUsr";
import { useParams } from "react-router-dom";
import BtnAcao from "../../components/botoes/btnAcao";
import { CaretRight, CaretLeft, Star, MapPinLine, Clock, CalendarCheck } from "@phosphor-icons/react";

export default function VisualizarTurismos() {
  const { id } = useParams();
  const [turismo, setTurismo] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const baseUrl = "https://localhost:7256/api/Turismo";

  useEffect(() => {
    const obterDetalhesTurismo = async () => {
      try {
        const response = await axios.get(baseUrl + `/${id}`);
        setTurismo(response.data);
      } catch (error) {
        console.error("Erro ao obter detalhes do turismo:", error);
      }
    };

    obterDetalhesTurismo();
  }, [id]);

  const nextSlide = () => {
    if (turismo.imagemTurismo.length > 1) {
      setCurrentSlide((prev) =>
        prev === turismo.imagemTurismo.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevSlide = () => {
    if (turismo.imagemTurismo.length > 1) {
      setCurrentSlide((prev) =>
        prev === 0 ? turismo.imagemTurismo.length - 1 : prev - 1
      );
    }
  };

  return (
    <div>
      <NavbarUsr />
      <div className="flex flex-col px-4 sm:pl-24 sm:pr-24">
        {turismo && (
          <div>
            <h1 className="text-[#373636] text-lg font-extrabold pt-4 sm:pt-14 sm:px-16 sm:text-4xl sm:pb-4">
              {turismo.nome}
            </h1>
          </div>
        )}
      </div>
      {turismo && (
        <div className="relative w-full h-[200px] sm:h-[400px] lg:h-[500px] mb-8">
          {turismo.imagemTurismo.length > 1 && (
            <button
              className="absolute top-1/2 z-10 transform -translate-y-1/2 text-white bg-[#FFD121] p-2 px-2 m-2 rounded-full opacity-90 hover:opacity-100 focus:outline-none"
              onClick={prevSlide}
            >
              <CaretLeft size={14} />
            </button>
          )}

          {turismo.imagemTurismo.length > 1 && (
            <button
              className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 text-white bg-[#FFD121] opacity-90 hover:opacity-100  p-2 px-2 m-2 rounded-full  focus:outline-none"
              onClick={nextSlide}
            >
              <CaretRight size={14} />
            </button>
          )}

          {turismo.imagemTurismo.length > 0 && (
            <>
              <img
                src={turismo.imagemTurismo[currentSlide].imagem}
                alt={`Imagem ${currentSlide + 1}`}
                className="object-cover w-full h-full sm:h-full"
              />
              <h3 className="text-xs sm:text-lg font-medium text-center italic pt-1">
                {turismo.imagemTurismo[currentSlide].legendaImagem}
              </h3>
            </>
          )}
        </div>
      )}
      <div className="flex flex-row w-full justify-start items-center text-[#FFD121] ml-6">
        <Star size={20} /> <Star size={20} />
        <Star size={20} />
        <Star size={20} />
        <Star size={20} />
        <h3 className="text-gray-800 text-xs pl-2">14 avaliações</h3>
      </div>

      <div className="flex w-full justify-center items-center pt-2">
        <hr className="w-11/12 mb-2 h-[1px] bg-gray-200  rounded" />
      </div>

      {/* <h3>
        <a
          href={`https://www.google.com/maps/place/${turismo.local.replace(
            /\s/g,
            ""
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-black font-light text-xs"
        >
          Localização
        </a>
      </h3> */}

      {turismo && (
        <div className="sm:px-16">
          <div className=" px-4 pb-3 text-[#373636] text-sm sm:text-lg font-base sm:pt-6 pt-0">
            <p className="sm:px-14 pt-1 text-justify">{turismo.descricao}</p>
          </div>

          <div className="flex flex-row ml-6 gap-0">
            <button className="flex justify-center items-center w-[30px] h-6 bg-black text-sm text-[#FFD121] rounded-md ">
              <MapPinLine size={18} />
            </button>
            <button className="flex flex-start justify-start items-center w-full h-6 text-xs pl-1 ">
             {turismo.local}
            </button>
          </div>
          <div className="flex flex-row ml-6 pt-2 gap-0">
            <button className="flex justify-center items-center w-[30px] h-6 bg-black text-sm text-[#FFD121] rounded-md ">
            <CalendarCheck size={18} />
            </button>
            <button className="flex flex-start justify-start items-center w-full h-6 text-xs pl-1 ">
              {turismo.diaFuncionamento}
            </button>
          </div>
          <div className="flex flex-row ml-6 pt-2 gap-0">
            <button className="flex justify-center items-center w-[30px] h-6 bg-black text-sm text-[#FFD121] rounded-md ">
            <Clock size={18} />
            </button>
            <button className="flex flex-start justify-start items-center w-full h-6 text-xs pl-1 ">
              {turismo.horario}
            </button>
          </div>
          
          
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-full h-1 my-8 opacity-100 bg-[#FFD121] border-0 rounded" />
            <div className="absolute justify-center items-center px-4 -translate-x-1/2 bg-white left-1/2">
              <h1 className="text-[#373636] text-2xl font-bold px-8">MAIS</h1>
              <h1 className="text-[#373636] text-2xl font-bold">TURISMOS</h1>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <BtnAcao
              funcao={() => VisualizarTodosTurismos()}
              acao="VisualizarMais"
            />
          </div>
        </div>
      )}

      <FooterUsr />
    </div>
  );
}
