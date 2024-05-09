import React from "react";
import Paginacao from "./Paginacao";

function Tabela({ object, currentPage, totalPages, goToPage, colunas, numColunas }) {
 
  const num = numColunas - 1 ;
  const x = num * 2;
  const colSpan = x + 1;
 
 

 return (
   <div className="w-full rounded-[10px]">
     {/* Cabeçalho da tabela */}
     <div className={`grid grid-cols-${colSpan} bg-gray-200/50 rounded-t-[6px] h-10 items-center text-base font-semibold text-gray-900`}>
       {colunas.map((coluna, index) => (
         <span key={index} className={`flex justify-center items-center ${index === 0 ? `col-span-1` : `col-span-2`}`}>
           {coluna}
         </span>
       ))}
     </div>

      {/* Corpo da tabela */}
      <ul className="w-full">
        {object.map((item, index) => (
          <li key={index} className={`grid grid-cols-${colSpan} w-full border-gray-100`}>
            {Object.values(item).map((value, index) => (
              <span
                key={index}
                className={`flex justify-center items-center border-t-[1px] border-x-[1px] border-gray-100 col-span-1 ${index === 0 ? `col-span-1` : 'col-span-2'}`}
            
              >
                {value}
              </span>
            ))}
          </li>
        ))}
      </ul>
      <Paginacao
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />
    </div>
  );
}

export default Tabela;