import React from "react";
import { tv } from "tailwind-variants";
import { Pencil, Trash, Eye, FilePlus, Plus, PresentationChart } from "@phosphor-icons/react";

const Acoes = {
  "Editar": { icone: Pencil, texto: "Editar" },
  "Excluir": { icone: Trash, texto: "Excluir" },
  "Visualizar": { icone: Eye, texto: "Visualizar" },
  "Publicados": {icone: PresentationChart, texto: "Publicados"},
  "Cadastrar": { icone: FilePlus, texto: "Cadastrar" },
  "VisualizarMais": {icone: Plus, texto: "Visualizar Mais"}
};



const BtnAcao = ({ funcao, acao }) => {
  const style = tv({
    base: "inline-flex px-1 py-[6px] text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center items-center",
    variants: {
      Editar: "bg-[#085177] hover:bg-[#023F5F] dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800",
      Excluir: "bg-[#D30000] hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
      Visualizar: "bg-[#3F3F3F] hover:bg-[#222222] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
      Publicados: "bg-[#1F9D93] hover:bg-[#00847A]",
      Cadastrar:"bg-[#FFD121] hover:bg-[#EEBB4D] px-3 ",
      VisualizarMais: "bg-[#FFD121] hover:bg-[#EEBB4D] px-3  "
    }
  });

  const Acao = Acoes[acao];
  if (!Acao) return null;

  const Icone = Acao.icone;
  const Texto = Acao.texto;

  const isVisualizarMais = acao === "VisualizarMais";

  return (
    <button
      className={`${style.base} ${style.variants[acao]} sm:mr-2 xs:mr-2 lg:mr-2 xl:mr-2 2xl:mr-4 relative`}
      onClick={funcao}
    >
      {Icone && <Icone className="mr-1 " size={16} />}
      <span className={isVisualizarMais ? "xl:inline" : "hidden xl:inline"}>{Texto}</span>
      {!isVisualizarMais && (
        <span className="lg:hidden absolute inset-0 flex items-center justify-center">
          {Icone && <Icone className="mr-1" size={16} />}
        </span>
      )}
    </button>
  );
};

export default BtnAcao;