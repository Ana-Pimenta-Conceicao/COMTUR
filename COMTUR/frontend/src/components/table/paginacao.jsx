import React from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import PropTypes from 'prop-types';

const Paginacao = ({ currentPage, totalPages, goToPage }) => {
  return (
    <div className="pt-4 pb-4 flex justify-center gap-2 border-t-[1px] border-gray-100">
      <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}>
        <CaretLeft size={22} className="text-[#DBDBDB]" />
      </button>
      <select
        className="rounded-sm hover:border-[#DBDBDB] select-none"
        value={currentPage}
        onChange={(e) => goToPage(Number(e.target.value))}
      >
        {[...Array(totalPages)].map((_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= totalPages}>
        <CaretRight size={22} className="text-[#DBDBDB]" />
      </button>
    </div>
  );
};

Paginacao.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired,
};

export default Paginacao;