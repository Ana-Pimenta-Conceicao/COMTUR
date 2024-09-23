import React, { useState } from "react";
import Paginacao from "./paginacao.jsx";
import axios from "axios";
import ModalStatus from "../modais/modalStatus.jsx";

function TabelaStatus({ object, currentPage, totalPages, goToPage, colunas, numColunas, onRowClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = async ( id, entidade ) => {
    try {
      const response = await axios.get(`https://localhost:7256/api/auditoria/historico-modificacoes/${id}/${entidade}`);
      setModalData(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar dados de auditoria:", error);
    }
  };

  // Função que captura o clique na linha
  const handleRowClick = (id, entidade) => {
    console.log("ID clicado:", id, "Entidade:", entidade);
    onRowClick(id, entidade);
    openModal( id, entidade ); // Passa um objeto
  };

  // Fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  // Renderização do cabeçalho da tabela
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

  // Renderização do corpo da tabela
  const renderTableBody = (data, numColumns) => {
    const colSpan = numColumns === 6 ? "grid-cols-11" : "grid-cols-7";
    return (
      <ul className="w-full">
        {data.map((item, rowIndex) => (
          <li
            key={rowIndex}
            className={`grid ${colSpan} w-full border-gray-100 cursor-pointer`}
            // Passando o `id` e `entidade` corretamente para o clique
            onClick={() => handleRowClick(item.id, item.entidade)}  // Certifique-se de que `item.entidade` existe
          >
            {Object.values(item).map((value, colIndex) => (
              <span
                key={`${rowIndex}-${colIndex}`} // Ajuste da chave
                className={`flex justify-center items-center h-[45px] border-b-[1px] border-x-[1px] border-gray-100 ${colIndex === 0 ? 'col-span-1' : 'col-span-2'}`}
                onClick={colunas[colIndex] === 'Status' ? (e) => e.stopPropagation() : null} // Evitar propagação no status
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
          entidade={modalData?.entidade} // Certifique-se de passar a entidade correta aqui
        />
      )}
    </>
  );
}

export default TabelaStatus;