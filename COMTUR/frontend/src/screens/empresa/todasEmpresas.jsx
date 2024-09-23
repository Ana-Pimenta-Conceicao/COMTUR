import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarUsr from "../../components/user/navbarUsr.jsx";
import FooterUsr from "../../components/user/footerUsr.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { Funnel } from "@phosphor-icons/react";

export default function TodasEmpresas() {
  const { id } = useParams();
  const [outrasEmpresas, setOutrasEmpresas] = useState([]);
  const [tiposTurismo, setTiposTurismo] = useState([]);
  const [tipoTurismoSelecionado, setTipoTurismoSelecionado] = useState("");
  const navigate = useNavigate();
  const baseUrl = "https://localhost:7256/api/Empresa";
  const baseUrlTipoTurismo = "https://localhost:7256/api/TipoTurismo";

  useEffect(() => {
    const obterOutrasEmpresas = async () => {
      try {
        const response = await axios.get(`${baseUrl}`);
        setOutrasEmpresas(
          response.data.filter(
            (outraEmpresa) => outraEmpresa.id !== parseInt(id) && outraEmpresa.status === 2
          )
        );
      } catch (error) {
        console.error("Erro ao obter outras empresas:", error);
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

    obterOutrasEmpresas();
    obterTiposTurismo();
  }, [id]);

  // Função para encontrar o nome do tipo de turismo pelo ID
  const obterNomeTipoTurismo = (idTipoTurismo) => {
    const tipo = tiposTurismo.find((tipo) => tipo.id === idTipoTurismo);
    return tipo ? tipo.nome : "Tipo não encontrado";
  };

  // Obter tipos de turismo que têm empresas associadas
  const tiposComEmpresas = new Set(
    outrasEmpresas.map((empresa) => empresa.idTipoTurismo)
  );

  // Filtrar tipos de turismo para mostrar apenas aqueles que têm empresas associadas
  const tiposTurismoFiltrados = tiposTurismo.filter((tipo) =>
    tiposComEmpresas.has(tipo.id)
  );

  return (
    <div>
      <NavbarUsr />
      <div className="flex flex-col px-4 sm:pl-24 sm:pr-24">
        <h1 className="text-[#373636] mb-3 text-lg font-extrabold pt-4 sm:pt-14 sm:px-16 sm:text-4xl">Empresas</h1>
      </div>

      <hr className="pb-4 border-[1.5px] border-black w-75 ml-auto" />

      <div className="container">
        {/* Contêiner flexível para filtro e botão de cadastro */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center space-x-4">
            <div className="inline-flex items-center">
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
                  <option value="">Tipo Empresa</option>
                  {tiposTurismoFiltrados.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-outline-warning rounded-none h-10 w-40 text-black"
              style={{ borderColor: '#DEE2E6', fontWeight: 'normal' }}
            >
              Cadastre Empresa
            </button>
          </div>
        </div>

        <div className="container">
          <div className="flex justify-center pb-2 pt-4 items-center">
            <div className="pb-2 px-2 text-xs sm:pl-32 sm:pr-32 sm:min-w-[320px] lg:w-[90%] xl:w-[80%] 2xl:w-[70%]">
              {outrasEmpresas
                .filter((outraEmpresa) =>
                  tipoTurismoSelecionado
                    ? outraEmpresa.idTipoTurismo === parseInt(tipoTurismoSelecionado)
                    : true
                )
                .map((outraEmpresa) => (
                  <div key={outraEmpresa.id} className="pb-3 px-4">
                    <div className="grid grid-cols-2 h-[140px] sm:h-[300px] border-2 border-[#DBDBDB]">
                      {outraEmpresa.imagemEmpresa[0] && (
                        <img
                          src={outraEmpresa.imagemEmpresa[0]?.imagem}
                          alt="Preview"
                          className="flex w-full h-[136px] sm:h-[290px]"
                        />
                      )}
                      <div className="pl-6 pt-2"> 
                        <h2 className="truncate pr-6 text-[#373636] text-ellipsis overflow-hidden font-semibold text-xs sm:text-base uppercase">
                          {outraEmpresa.nome}
                        </h2>
                        <h2 className="truncate pr-6 pt-1 text-[#373636] font-normal text-xs sm:text-base">
                          {outraEmpresa.endereco}
                        </h2>

                        <div className="flex mt-6">
                          <button
                            className="border border-black rounded-none h-8 w-24 sm:w-32 sm:h-10 sm:text-base text-[#373636] font-medium hover:bg-black hover:text-white text-xs sm:text-bas"
                            onClick={() => {
                              navigate(`/visualizarEmpresa/${outraEmpresa.id}`);
                              window.location.reload();
                            }}
                          >
                            Saiba mais
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute bottom-0 right-0">
                        <div
                          className="flex justify-center items-center text-[10px] sm:text-xs text-[#373636] font-medium bg-[#FFD121] w-20 h-4 sm:w-32 sm:h-8"
                        >
                          {obterNomeTipoTurismo(outraEmpresa.idTipoTurismo)}
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
