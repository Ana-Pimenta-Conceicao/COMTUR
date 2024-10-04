import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarUsr from "../../components/user/navbarUsr.jsx";
import FooterUsr from "../../components/user/footerUsr.jsx";
import { useParams, useNavigate } from "react-router-dom";

export default function TodosMembros() {
  const { id } = useParams();
  const [outrosMembros, setOutrosMembros] = useState([]);
  const navigate = useNavigate();
  const baseUrl = "https://localhost:7256/api/Membro";

  useEffect(() => {
    const obterOutrosMembros = async () => {
      try {
        const response = await axios.get(`${baseUrl}`);
        setOutrosMembros(response.data);
      } catch (error) {
        console.error("Erro ao obter outras empresas:", error);
      }
    };

    obterOutrosMembros();
  }, [id]);

  return (
    <div>
      <NavbarUsr />
      <div className="flex flex-col px-4 sm:pl-24 sm:pr-24">
        <h1 className="text-[#373636] mb-3 text-lg font-extrabold pt-4 sm:pt-14 sm:px-16 sm:text-4xl">Membros</h1>
      </div>

      <hr className="pb-4 border-[1.5px] border-black w-75 ml-auto" />

      <div className="container">
        <div className="flex flex-wrap justify-center pb-2 pt-4 items-center">
          <div className="pb-2 px-2 text-xs sm:pl-32 sm:pr-32 sm:min-w-[320px] lg:w-[90%] xl:w-[80%] 2xl:w-[70%] flex flex-wrap justify-center">
            {outrosMembros.length === 0 ? (
              <p>Nenhum membro encontrado.</p>
            ) : (
              outrosMembros.map((outroMembro) => (
                <div key={outroMembro.id} className="card rounded-none w-[352px] m-2">
                  <div className="w-[352px] h-[367px]">
                    {outroMembro.imagem && (
                      <img
                        src={outroMembro.imagem}
                        className="card-img-top h-full w-full object-cover"
                        alt="Preview"
                      />
                    )}
                  </div>
                  <div className="card-body flex flex-col justify-center items-center h-full relative pt-0">
                    <h2 className="m-3 text-[#373636] text-xs sm:text-lg font-semibold text-center">
                      {outroMembro.nome}
                    </h2>

                    <div className="absolute bottom-0 right-0 left-0 flex justify-center">
                      <div className="flex justify-center items-center text-[10px] sm:text-xs text-[#373636] font-medium bg-[#FFD121] w-20 h-4 sm:w-32 sm:h-8">
                        {outroMembro.cargo}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
  

      <FooterUsr />
    </div>
  );
}
