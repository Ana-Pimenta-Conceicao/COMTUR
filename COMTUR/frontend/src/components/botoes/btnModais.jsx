import React from "react";
import { tv } from "tailwind-variants";

const Acoes = {
    "Editar": { texto: "Editar" },
    "Excluir": { texto: "Excluir" },
    "Cancelar": { texto: "Cancelar" },
    "Cadastrar": { texto: "Cadastrar" }
};

const BtnModaisIMG = ({ funcao, acao }) => {
    const style = tv({
        base: "inline-flex text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center items-center",
        variants: {
            Editar: "bg-[#0F766E] px-[20px] py-[8px] hover:bg-teal-900 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800",
            Cancelar: "bg-gray-400 px-[12px] py-[8px]  hover:bg-gray-600 ml-2",
            Cadastrar: "bg-[#FFD121] px-[10px] py-[8px] hover:bg-[#E8BA0B]",
            Excluir: "bg-[#D30000]  px-[10px] py-[8px]  hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        }
    });

    const Acao = Acoes[acao];
    if (!Acao) return null;
    const Texto = Acao.texto;

    return (
        <button
            className={`${style.base} ${style.variants[acao]} relative`}
            onClick={funcao}
        >
            
            <span className="">{Texto}</span>
           
        </button>
    );
};

export default BtnModaisIMG;