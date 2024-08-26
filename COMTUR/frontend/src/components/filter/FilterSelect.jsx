import React from 'react';
import { Funnel } from "@phosphor-icons/react";

const FilterSelect = ({ id, label, options, value, onChange }) => {
  return (
    <div className="input-group mb-1 w-fit">
      <span className="input-group-text" id={`${id}-addon`}>
        <Funnel size={18} />
      </span>
      <select
        id={id}
        className="form-control form-select"
        aria-label={label}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;
