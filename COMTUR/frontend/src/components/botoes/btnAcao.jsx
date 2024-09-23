import React from "react";
import { tv } from "tailwind-variants";
import { Pencil, Trash, Eye, FilePlus, Plus, PresentationChart, FileText } from "@phosphor-icons/react";

const BtnAcao = ({ funcao, acao, objeto }) => {
  const style = tv({
    base: "inline-flex px-1 py-[6px] text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-[12px] text-center items-center relative group",
    variants: {
      Editar: "bg-[#085177] hover:bg-[#023F5F] dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800",
      Excluir: "bg-[#D30000] hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
      Visualizar: "bg-[#3F3F3F] hover:bg-[#222222] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
      Publicados: "bg-[#1F9D93] hover:bg-[#00847A]",
      Cadastrar: "bg-[#FFD121] hover:bg-[#EEBB4D] px-3",
      VisualizarMais: "bg-[#FFD121] hover:bg-[#EEBB4D] px-3",
      CadastrarTipo: "bg-black hover:bg-[#EEBB4D] px-3"
    }
  });

  const Acoes = {
    "Editar": { icone: Pencil, texto: "Editar" },
    "Excluir": { icone: Trash, texto: "Excluir" },
    "Visualizar": { icone: Eye, texto: "Visualizar" },
    "Publicados": { icone: PresentationChart, texto: "Publicados" },
    "Cadastrar": { icone: FilePlus, texto: "Cadastrar" },
    "VisualizarMais": { icone: Plus, texto: "Visualizar Mais" },
    "CadastrarTipo": { icone: FileText, texto: "" }
  };

  const Acao = Acoes[acao];
  if (!Acao) return null;

  const Icone = Acao.icone;
  const Texto = objeto ? `Cadastrar ${objeto}` : Acao.texto;

  const isVisualizarMais = acao === "VisualizarMais";

  return (
    <div className="relative group">
      <button
        className={`${style.base} ${style.variants[acao]} mr-2`}
        onClick={funcao}
      >
        {Icone && <Icone className="mr-1" size={16} />}
        <span className={isVisualizarMais ? "2xl:inline" : "hidden 2xl:inline"}>{Texto}</span>
        {!isVisualizarMais && (
          <span className="lg:hidden absolute  flex items-center justify-center">
            {Icone && <Icone size={16} />}
          </span>
        )}
      </button>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-no-wrap">
        {Texto}
      </div>
    </div>
  );
};

export default BtnAcao;