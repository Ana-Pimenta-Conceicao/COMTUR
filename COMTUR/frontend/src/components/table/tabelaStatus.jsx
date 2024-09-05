import React, { useState } from "react";
import Paginacao from "./paginacao.jsx";
import axios from "axios";
import ModalStatus from "../modais/modalStatus.jsx";

function TabelaStatus({ object, currentPage, totalPages, goToPage, colunas, numColunas, onRowClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = async (id, entidade) => {
    try {
      const response = await axios.get(`https://localhost:7256/api/auditoria/historico-modificacoes/${id}/${entidade}`);
      setModalData(response.data); 
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar dados de auditoria:", error);
    }
  };

  const handleRowClick = (id) => {
    openModal(id, "TipoAtracao");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

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

  const renderTableBody = (data, numColumns) => {
    const colSpan = numColumns === 6 ? "grid-cols-11" : "grid-cols-7";

    return (
      <ul className="w-full">
        {data.map((item, rowIndex) => (
          <li
            key={rowIndex}
            className={`grid ${colSpan} w-full border-gray-100 cursor-pointer`}
            onClick={() => handleRowClick(item.id)}
          >
            {Object.values(item).map((value, colIndex) => (
              <span
                key={`${rowIndex}-${colIndex}`} // Ajuste da chave
                className={`flex justify-center items-center h-[45px] border-b-[1px] border-x-[1px] border-gray-100 ${colIndex === 0 ? 'col-span-1' : 'col-span-2'}`}
                onClick={colunas[colIndex] === 'Status' ? (e) => e.stopPropagation() : null}
              >
                {value}
              </span>
            ))}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px] max-w-full">
          {renderTableHeader(colunas, numColunas)}
          {renderTableBody(object, numColunas)}
          <Paginacao
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
          />
        </div>
      </div>

      {isModalOpen && (
        <ModalStatus
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          data={modalData}
        />
      )}
    </>
  );
}

export default TabelaStatus;