import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarUsr from "../../components/user/navbarUsr.jsx";
import FooterUsr from "../../components/user/footerUsr.jsx";
import { useParams, useNavigate } from "react-router-dom";
import BtnAcao from "../../components/botoes/btnAcao.jsx";
import { CaretRight, CaretLeft, Star, MapPinLine, Clock, CalendarCheck, } from "@phosphor-icons/react";
import GaleriaAtracao from "../../components/cards/GaleriaAtracao";

export default function VisualizarTurismos() {
  const { id } = useParams();
  const [turismo, setTurismo] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const [outrosTurismos, setOutrosTurismos] = useState([]);

  const baseUrl = "https://localhost:7256/api/Turismo";

  useEffect(() => {
    const obterDetalhesTurismo = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${id}`);
        setTurismo(response.data);
      } catch (error) {
        console.error("Erro ao obter detalhes do turismo:", error);
      }
    };

    const obterOutrosTurismos = async () => {
      try {
        const response = await axios.get(baseUrl);
        setOutrosTurismos(
          response.data.filter((t) => t.id !== parseInt(id)).slice(0, 3)
        );
      } catch (error) {
        console.error("Erro ao obter outros turismos:", error);
      }
    };

    obterDetalhesTurismo();
    obterOutrosTurismos();
  }, [id]);

  const nextSlide = () => {
    if (turismo && turismo.imagemTurismo.length > 1) {
      setCurrentSlide((prev) =>
        prev === turismo.imagemTurismo.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevSlide = () => {
    if (turismo && turismo.imagemTurismo.length > 1) {
      setCurrentSlide((prev) =>
        prev === 0 ? turismo.imagemTurismo.length - 1 : prev - 1
      );
    }
  };

  const abrirGoogleMaps = (local) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${local}`,
      "_blank"
    );
  };

  return (
    <div>
      <NavbarUsr />
      <div className="flex flex-col ">
        {turismo ? (
          <>
            <h1 className="text-[#373636] text-lg font-bold pt-4 px-4 m:pt-14 sm:px-16 sm:text-4xl sm:pb-4">
              {turismo.nome}
            </h1>
            <div className=" px-4 sm:pl-24 sm:pr-24">
              <div className="container border mt-2 px-0">
                <div className="relative w-full h-[200px] sm:h-[400px] lg:h-[500px] mb-8">
                  {turismo.imagemTurismo.length > 1 && (
                    <button
                      className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2 text-white bg-[#58AFAE] p-2 m-2 rounded-full opacity-90 hover:opacity-100 focus:outline-none"
                      onClick={prevSlide}
                    >
                      <CaretLeft size={24} />
                    </button>
                  )}

                  {turismo.imagemTurismo.length > 1 && (
                    <button
                      className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 text-white bg-[#58AFAE] opacity-90 hover:opacity-100 p-2 m-2 rounded-full focus:outline-none"
                      onClick={nextSlide}
                    >
                      <CaretRight size={24} />
                    </button>
                  )}

                  {turismo.imagemTurismo.length > 0 && (
                    <>
                      <img
                        src={turismo.imagemTurismo[currentSlide].imagem}
                        alt={`Imagem ${currentSlide + 1}`}
                        className="object-cover w-full h-full"
                      />
                      <h3 className="text-xs sm:text-lg font-medium text-center italic pt-1">
                        {turismo.imagemTurismo[currentSlide].legendaImagem}
                      </h3>
                    </>
                  )}
                </div>

                <div className="flex flex-row w-full justify-start items-center text-[#ED7833] ml-6">
                  <Star size={20} />
                  <Star size={20} />
                  <Star size={20} />
                  <Star size={20} />
                  <Star size={20} />
                  <h3 className="text-gray-800 text-xs pl-2">14 avaliações</h3>
                </div>

                <div className="flex w-full justify-center items-center pt-2">
                  <hr className="w-11/12 mb-2 h-[1px] text-[#58AFAE] rounded" />
                </div>

                <div className="sm:px-16 ">
                  <div className="flex flex-row ml-6 gap-2 items-center text-sm text-white">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${turismo.local}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="flex justify-center items-center bg-[#064D56] w-[30px] h-6 rounded-md">
                        <MapPinLine size={18} />
                      </button>
                    </a>
                    <button
                      className="flex flex-start justify-start items-center text-gray-900 w-full h-6 text-xs pl-1"
                      onClick={() => abrirGoogleMaps(turismo.local)}
                    >
                      {turismo.local}
                    </button>
                  </div>

                  <div className="flex flex-row ml-6 pt-2 gap-2   text-white items-center">
                    <button className="flex justify-center items-center w-[30px]  bg-[#064D56] h-6 rounded-md">
                      <CalendarCheck size={18} />
                    </button>
                    <button className="flex flex-start justify-start text-gray-900 items-center w-full h-6 text-xs pl-1">
                      {turismo.diaFuncionamento}
                    </button>
                  </div>

                  <div className="flex flex-row ml-6 pt-2 gap-2 pb-4  text-white  items-center">
                    <button className="flex justify-center items-center w-[30px]  bg-[#064D56] h-6 rounded-md">
                      <Clock size={18} />
                    </button>
                    <button className="flex flex-start justify-start text-gray-900  items-center w-full h-6 text-xs pl-1">
                      {turismo.horario}
                    </button>
                  </div>
                </div>
                <hr className="flex float-right w-3/4 pb-4 text-[#58AFAE]  border-[1.5px]" />
                <h3 className="flex w-full mt-4 font-semibold sm:font-bold text-sm sm:text-lg pl-3 sm:pl-6">
                  Mais informações sobre o(a) {turismo.nome}{" "}
                </h3>
                <p className="pt-1 sm:pt-6 pl-4 sm:pl-8 pb-3 text-[#373636] text-xs sm:text-lg font-base  text-justify">
                  {turismo.descricao}
                </p>
              </div>
            </div>

            <div className="flex w-full justify-center items-center mt-3 mb-4 bg-[#064D56]  h-[330px]">
              <div className="flex flex-col w-full">
                <h2 className="text-white text-base font-bold text-center pb-3">
                  GALERIA DE ATRAÇÕES
                </h2>
                <GaleriaAtracao identi={turismo.id} />
              </div>
            </div>

            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-full h-1 my-8 opacity-100 bg-[#FFD121] border-0 rounded" />
              <div className="absolute justify-center items-center px-4 -translate-x-1/2 bg-white left-1/2">
                <h1 className="text-[#373636] text-2xl font-bold pl-6">MAIS</h1>
                <h1 className="text-[#373636] text-2xl font-bold">TURISMOS</h1>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div className="pt-5 pb-5 px-2 text-xs sm:pl-32 sm:pr-32 sm:min-w-[320px] lg:w-[90%] xl:w-[80%] 2xl:w-[70%]">
                {outrosTurismos.map((outroTurismo) => (
                  <div key={outroTurismo.id} className="p-4">
                    <div className="grid grid-cols-2 h-[140px] sm:h-[300px] border-2 border-[#DBDBDB]">
                      {outroTurismo.imagemTurismo[0] && (
                        <img
                          src={outroTurismo.imagemTurismo[0]?.imagem}
                          alt="Preview"
                          className="w-full h-[140px] sm:h-[296px] object-cover"
                        />
                      )}
                      <div className="pl-6 pt-3">
                        <h2 className="truncate pr-6 text-[#373636] text-ellipsis overflow-hidden font-semibold text-xs sm:text-base uppercase">
                          {outroTurismo.nome}
                        </h2>
                        <h2 className="truncate pr-6 pt-1 text-[#373636] font-normal text-xs sm:text-base">
                          {outroTurismo.descricao}
                        </h2>
                        <div className="flex">
                          <button
                            className="mt-6 bg-[#FFD121] text-xs sm:text-base text-[#373636] font-medium hover:bg-black hover:text-white w-20 h-6 sm:w-32 sm:h-10"
                            onClick={() =>
                              navigate(`/visualizarTurismo/${outroTurismo.id}`)
                            }
                          >
                            Leia Mais
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-center">
                  <BtnAcao
                    funcao={() => navigate("/todosTurismos")}
                    acao="VisualizarMais"
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
      <FooterUsr />
    </div>
  );
}
