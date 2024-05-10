import React from "react";
import Cidadado from "../../assets/cidadao.png";

const TabelaDashboard = () => {
  return (
    <div className="w-full h-[400px] px-4 pt-9 bg-white rounded-[20px] border border-solid border-[#e7e6e6] ">
      <div className="font-semibold pb-3 text-[19px] text-gray-800 ">
        Últimas Avaliações
      </div>
      <div className="grid grid-cols-8 w-full mb-2 border-b-2 border-b-[#FFD121]">
        <div className="col-span-1 font-medium text-[#b5b7c0] text-[16px]">
          Perfil
        </div>
        <div className="col-span-3 font-medium text-[#b5b7c0] text-[14px]">
          Nome
        </div>
        <div className="col-span-4 font-medium text-[#b5b7c0] text-[14px]">
          Avaliação
        </div>
      </div>

      <div className="grid grid-cols-8 w-full">
        <div className="col-span-1 mr-8 h-8 bg-blue-700">
         
        </div>

        <div className="col-span-3 font-bold text-gray-700 text-[14px]">Ana Carolina Pimenta</div>

        <div className="col-span-4 font-medium text-gray-700 text-[14px]">Só tem comida boa no Restaurante da Ana Vitória, venero ela!</div>
      </div>
    </div>
  );
};

export default TabelaDashboard;
