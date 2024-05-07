import React from 'react';

const Table = ({ totalColunas, data, cabecalho, paginaAtual, totalPaginas, paginacao }) => {
  return (
    <div className="w-full rounded-[10px]">
        <div className={`grid grid-cols-${totalColunas} w-full bg-gray-200/50  rounded-t-[6px] h-10 items-center text-base font-semibold text-gray-900`}>
            {cabecalho.map((titulo, index) => {
                <div key={index} className='flex justify-center items-center'>
                    {titulo}
                </div>
            })}
        </div>
    </div>
  );
};

export default Table;
