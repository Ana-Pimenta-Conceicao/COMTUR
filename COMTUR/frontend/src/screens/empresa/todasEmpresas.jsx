import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarUsr from "../../components/user/navbarUsr.jsx";
import FooterUsr from "../../components/user/footerUsr.jsx";
import { useParams, useNavigate } from "react-router-dom";

export default function TodasEmpresas() {
  const { id } = useParams();
  const [outrasEmpresas, setOutrasEmpresas] = useState([]);
  const [tiposTurismo, setTiposTurismo] = useState([]);
  const navigate = useNavigate();
  const baseUrl = "https://localhost:7256/api/Empresa";
  const baseUrlTipoTurismo = "https://localhost:7256/api/TipoTurismo";

  useEffect(() => {
    const obterOutrasEmpresas = async () => {
      try {
        const response = await axios.get(`${baseUrl}`);
        setOutrasEmpresas(
          response.data.filter(
            (outraEmpresa) => outraEmpresa.id !== parseInt(id)
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
    const tipo = tiposTurismo.find(tipo => tipo.id === idTipoTurismo);
    return tipo ? tipo.nome : "Tipo não encontrado";
  };

  return (
    <div>
      <NavbarUsr />

      <div className="inline-flex items-center justify-center w-full pt-4">
        <hr className="w-full h-1 my-8 opacity-100 bg-[#FFD121] border-0 rounded" />
        <div className="absolute justify-center items-center px-4 -translate-x-1/2 bg-white left-1/2">
          <h1 className="text-[#373636] text-2xl font-bold">EMPRESAS</h1>
        </div>
      </div>

      <div className="container">
        <div className="flex justify-center pb-2 pt-4 items-center">
          <div className="pb-2 px-2 text-xs sm:pl-32 sm:pr-32 sm:min-w-[320px] lg:w-[90%] xl:w-[80%] 2xl:w-[70%]">
            {outrasEmpresas.map((outraEmpresa) => (
              <div key={outraEmpresa.id} className="pb-3 px-4">
                <div className="grid grid-cols-2 h-[140px] sm:h-[300px] border-2 border-[#DBDBDB]">
                  {outraEmpresa.imagemEmpresa[0] && (
                    <img
                      src={outraEmpresa.imagemEmpresa[0]?.imagem}
                      alt="Preview"
                      className="flex w-full h-[136px] sm:h-[290px]"
                    />
                  )}

                  <div className="pl-6 pt-3">
                    <h2 className="truncate pr-6 text-[#373636] text-ellipsis overflow-hidden font-semibold text-xs sm:text-base uppercase">
                      {outraEmpresa.nome}
                    </h2>
                    <h2 className="truncate pr-6 pt-1 text-[#373636] font-normal text-xs sm:text-base">
                      {outraEmpresa.descricao}
                    </h2>

                    <div className="flex items-center justify-between mt-auto">
                      <button
                        className="bg-[#FFD121] text-xs sm:text-base text-[#373636] font-medium hover:bg-black hover:text-white w-20 h-6 sm:w-32 sm:h-10"
                        onClick={() => {
                          navigate(`/visualizarEmpresa/${outraEmpresa.id}`);
                          window.location.reload();
                        }}
                      >
                        Saiba Mais
                      </button>

                      <div className="bg-[#FFD121] py-2 px-4 font-semibold text-sm">
                        {obterNomeTipoTurismo(outraEmpresa.idTipoTurismo)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterUsr />
    </div>
  );
}
