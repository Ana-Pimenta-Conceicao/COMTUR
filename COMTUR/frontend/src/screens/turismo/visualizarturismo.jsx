import React from "react";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
import NavbarUsr from "../../components/user/navbarUsr";
import FooterUsr from "../../components/user/footerUsr";
// import { useParams, useNavigate } from "react-router-dom";
// import { CaretRight, CaretLeft } from "@phosphor-icons/react";
import BtnAcao from "../../components/botoes/btnAcao";

export default function VisualizarTurismos() {
  return (
    <div>
      <NavbarUsr />
      <div className="flex flex-col px-4 sm:pl-24 sm:pr-24">
        <h1 className="text-[#373636] text-lg font-extrabold pt-4 sm:pt-14 sm:px-16 sm:text-4xl">
          Praça da Fonte
        </h1>
      </div>

      <div className="relative w-full h-[200px] sm:h-[400px] lg:h-[500px] mb-2 bg-slate-500"></div>
        <h3 className="text-xs sm:text-lg font-medium text-justify italic px-4 mb-4 ">
            Foto da Praça - Retirada em 2023
          </h3>
      <div className="sm:px-16">
        <div className=" px-4 pb-10 text-[#373636] text-sm sm:text-lg font-base sm:pt-6 pt-0">
        <p className="sm:px-14 pt-1 text-justify">A praça é muito linda, composta por vários tijolos, pedras e pedregulhos.</p>
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
                funcao={() => VisualizarTodasNoticias()}
                acao="VisualizarMais"
              />
        </div>
      </div>
      <FooterUsr />
    </div>
  );
}
