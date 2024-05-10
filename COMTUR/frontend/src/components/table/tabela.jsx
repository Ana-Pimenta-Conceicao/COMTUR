import React from "react";
import Paginacao from "./Paginacao";

function Tabela({ object, currentPage, totalPages, goToPage, colunas, numColunas }) {
  const renderTableHeader = (columns, numColumns) => {
    const colSpan = numColumns === 6 ? "grid-cols-11" : "grid-cols-7";

    return (
      <div className={`grid ${colSpan} bg-gray-200/50 rounded-t-[6px] h-10 items-center text-base font-semibold text-gray-900`}>
        {columns.map((coluna, index) => (
          <span key={index} className={`flex justify-center items-center ${index === 0 ? 'col-span-1' : 'col-span-2'}`}>
            {coluna}
          </span>
        ))}
      </div>
    );
  };

  // Função para renderizar o corpo da tabela
  const renderTableBody = (data, numColumns) => {
    const colSpan = numColumns === 6 ? "grid-cols-11" : "grid-cols-7";

    return (
      <ul className="w-full">
        {data.map((item, rowIndex) => (
          <li key={rowIndex} className={`grid ${colSpan} w-full border-gray-100`}>
            {Object.values(item).map((value, colIndex) => (
              <span
                key={colIndex}
                className={`flex justify-center items-center border-t-[1px] border-x-[1px] border-gray-100 ${colIndex === 0 ? 'col-span-1' : 'col-span-2'}`}
              >
                {value}
              </span>
            ))}
          </li>
        ))}
      </ul>
    );
  };

  // Renderização principal
  if (numColunas === 6 || numColunas === 4) {
    return (
      <div className="w-full rounded-[10px]">
        {renderTableHeader(colunas, numColunas)}
        {renderTableBody(object, numColunas)}
        <Paginacao
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </div>
    );
  } else {
    return <div>COMtUR</div>;
  }
}

export default Tabela;