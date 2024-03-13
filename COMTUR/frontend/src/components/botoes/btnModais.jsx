import React from "react";
import { tv } from "tailwind-variants";

const Acoes = {
    "Editar": { texto: "Editar" },
    "Excluir": { texto: "Excluir" },
    "Cancelar": { texto: "Cancelar" },
    "Cadastrar": { texto: "Cadastrar" }
};

const BtnModais = ({ funcao, acao }) => {
    const style = tv({
        base: "inline-flex p-2 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center items-center",
        variants: {
            Editar: "bg-teal-800 hover:bg-teal-900 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800",
            Excluir: "bg-red-800 hover:bg-red-900 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
            Cancelar: "bg-gray-400 hover:bg-gray-600",
            Cadastrar: "bg-[#FFD121] hover:bg-yellow-500"
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

export default BtnModais;