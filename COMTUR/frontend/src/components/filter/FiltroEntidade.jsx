import React from "react";
import { Funnel } from "@phosphor-icons/react";

function FiltroEntidade({ entities, selectedEntity, onSelectEntity }) {
  return (
    <div className="input-group mb-1 w-fit">
      <span className="input-group-text">
        <Funnel size={18} />
      </span>
      <select
        value={selectedEntity}
        onChange={(e) => onSelectEntity(e.target.value)}
        className="form-control form-select"
      >
        <option value="">Todas as Entidades</option>
        {entities.map((entity) => (
          <option key={entity} value={entity}>
            {entity}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FiltroEntidade;