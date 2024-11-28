import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarUsr from "../../components/user/navbarUsr.jsx";
import FooterUsr from "../../components/user/footerUsr.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { Funnel } from "@phosphor-icons/react";

export default function TodosTurismos() {
  const { id } = useParams();
  const [OutrosTurismos, setOutrosTurismos] = useState([]);
  const [tiposTurismo, setTiposTurismo] = useState([]);
  const [tipoTurismoSelecionado, setTipoTurismoSelecionado] = useState("");
  const [turismo, setTurismo] = useState([]);
  const navigate = useNavigate();
  const baseUrl = "https://localhost:7256/api/Turismo";
  const baseUrlTipoTurismo = "https://localhost:7256/api/TipoTurismo";
  const [currentTurismoIndex, setCurrentTurismoIndex] = useState(0);
  const [atualizarData, setAtualizarData] = useState(true);

  const [filtrarPorId, setFiltrarPorId] = useState(false);

  useEffect(() => {
    const obterOutrosTurismos = async () => {
      try {
        const response = await axios.get(`${baseUrl}`);
        setOutrosTurismos(
          response.data.filter(
            (OutrosTurismos) => OutrosTurismos.status === 2
          )
        );
      } catch (error) {
        console.error("Erro ao obter outros turismos:", error);
      }
    };
  
    const obterTiposTurismo = async () => {
      try {
        const response = await axios.get(`${baseUrlTipoTurismo}`);
        setTiposTurismo(response.data);
      } catch (error) {
        console.error("Erro ao obter tipos de turismo:", error);
      }
    };
  
    obterOutrosTurismos();
    obterTiposTurismo();
  }, [id]);

  useEffect(() => {
    const obterTurismosPorTipo = async () => {
      try {
        const response = await axios.get(`${baseUrl}`);
        const turismosFiltrados = response.data.filter(
          (turismo) => turismo.status === 2 && turismo.idTipoTurismo === parseInt(id)
        );
        setTurismo(turismosFiltrados);
        setFiltrarPorId(true);
      } catch (error) {
        console.error("Erro ao obter turismos:", error);
      }
    };
    if (id && !filtrarPorId) obterTurismosPorTipo();
  }, [id]);

  useEffect(() => {
    if (id && !filtrarPorId) {
      setTipoTurismoSelecionado(id);
      setFiltrarPorId(true);
    } }, [id]); // Dependência do ID para refazer a consulta

  

  // Função para encontrar o nome do tipo de turismo pelo ID
  const obterNomeTipoTurismo = (idTipoTurismo) => {
    const tipo = tiposTurismo.find((tipo) => tipo.id === idTipoTurismo);
    return tipo ? tipo.nome : "Tipo não encontrado";
  };

  const pedidoGet = async () => {
    try {
      const response = await axios.get(baseUrl);
      const turismosFiltrados = response.data.filter(
        (turismo) => turismo.status === 2
      );
      console.log("API response:", response.data);
      setTurismo(turismosFiltrados);
    } catch (error) {
      console.log("API error:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTurismoIndex((prevIndex) =>
        prevIndex === turismo.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [turismo]);
  useEffect(() => {
    if (atualizarData) {
      console.log("useEffect executed"); // Log para verificar se o useEffect está sendo executado
      pedidoGet();
      setAtualizarData(false);
    }
  }, [atualizarData]);

  return (
    <div>
      <NavbarUsr />
      <div className="flex flex-col px-4 sm:pl-24 sm:pr-24">
        <h1 className="text-[#373636] mb-3 text-lg font-extrabold pt-4 sm:pt-14 sm:px-16 sm:text-4xl">
          Pontos Turísticos
        </h1>
      </div>

      <hr className="pb-4 border-[1.5px] text-[#58AFAE]   w-75 ml-auto" />
      <div className="">
        {turismo.length > 0 && (
          <div
            className="flex relative items-center bg-black"
            onClick={() => {
              navigate(`/visualizarTurismo/${turismo[currentTurismoIndex].id}`);
            }}
          >
            {turismo.length > 0 && (
              <div className="flex h-48 sm:h-[450px]">
                <div
                  className={`absolute inset-0 w-full h-full bg-cover bg-center opacity-50`}
                  style={{
                    backgroundImage: `url(${turismo[currentTurismoIndex].imagemTurismo[0].imagem})`,
                  }}
                ></div>
              </div>
            )}
          </div>
        )}
        {turismo.length > 0 && (
          <h3 className="gap-0 text-sm sm:text-lg text-gray-800 italic font-semibold pb-4 text-center">
            {turismo[currentTurismoIndex].nome}
          </h3>
        )}
      </div>
      <div className="inline-flex items-center justify-center w-full p-4">
          <hr className="w-full h-1 my-6 opacity-100 bg-[#58AFAE] border-0 rounded" />
          <div className="absolute justify-center items-center px-4 -translate-x-1/2 bg-white left-1/2">
            <h1 className="text-[#373636] sm:text-2xl text-sm font-bold px-6">
              PONTOS TURÍSTICOS
            </h1>
          </div>
        </div>
      <div className="">
        <div className="flex items-center space-x-4">
          <div className="ml-auto inline-flex items-center">
            <label htmlFor="filtroTipoTurismo" className="mr-2"></label>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                <Funnel size={18} />
              </span>
              <select
                className="form-select rounded-none h-10 w-40"
                value={tipoTurismoSelecionado}
                onChange={(e) => setTipoTurismoSelecionado(e.target.value)}
              >
                <option value="">Tipo Turismo</option>
                {tiposTurismo.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="flex justify-center pb-2 pt-4 items-center">
            <div className=" pb-2 px-2 text-xs sm:pl-32 sm:pr-32 sm:min-w-[320px] lg:w-[90%] xl:w-[80%] 2xl:w-[70%]">
              {OutrosTurismos.filter((OutrosTurismos) =>
                tipoTurismoSelecionado
                  ? OutrosTurismos.idTipoTurismo ==
                    parseInt(tipoTurismoSelecionado)
                  : true
              ).map((OutrosTurismos) => (
                <div key={OutrosTurismos.id} className="pb-3 px-4">
                  <div className="grid grid-cols-2 h-[140px] sm:h-[300px] border-2 border-[#DBDBDB]">
                    {OutrosTurismos.imagemTurismo[0] && (
                      <img
                        src={OutrosTurismos.imagemTurismo[0]?.imagem}
                        alt="Preview"
                        className="flex w-full h-[136px] sm:h-[290px]"
                      />
                    )}
                    <div className="pl-6 pt-2">
                      <h2 className=" truncate pr-6 text-[#373636] text-ellipsis overflow-hidden font-semibold text-xs sm:text-base uppercase">
                        {OutrosTurismos.nome}
                      </h2>
                      <h2 className="truncate pr-6 pt-1 text-[#373636] font-normal text-xs sm:text-bas">
                        {OutrosTurismos.endereco}
                      </h2>

                      <div className="flex">
                        <button
                          className="mt-6 bg-[#FFD121] text-xs sm:text-bas text-[#373636]
                     font-medium hover:bg-black hover:text-white w-20 h-6 sm:w-32 sm:h-10"
                          onClick={() => {
                            navigate(`/visualizarTurismo/${OutrosTurismos.id}`);
                            window.location.reload();
                          }}
                        >
                          Leia Mais
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute bottom-0 right-0">
                      <div
                        className="flex justify-center items-center text-[10px]
                   sm:text-xs text-[#373636] font-medium bg-[#FFD121]
                   w-20 h-4 sm:w-32 sm:h-8"
                      >
                        {obterNomeTipoTurismo(OutrosTurismos.idTipoTurismo)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterUsr />
    </div>
  );
}
