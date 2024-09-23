import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { CaretDown } from "@phosphor-icons/react";
import BtnModais from "../../components/botoes/btnModais.jsx";

const StatusDropdown = ({ currentStatus, onUpdateStatus }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [pendingStatus, setPendingStatus] = useState(null); // Status que será confirmado
  const [modalOpen, setModalOpen] = useState(false);

  const statusOptions = {
    1: "Analisando",
    2: "Aprovado",
    3: "Reprovado",
    4: "Desativado",
  };

  const statusColors = {
    1: "bg-gray-800 text-white", // cinza para Analisando
    2: "bg-[#009688] text-white", // verde escuro para Aprovado
    3: "bg-[#FF6B6B] text-white", // Vermelho claro para Reprovado
    4: "bg-gray-400 text-white", // Cinza claro para Desativado
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  const handleStatusChange = (newStatus) => {
    setPendingStatus(newStatus);
    closeDropdown(); // Fecha o dropdown após seleção
    setModalOpen(true); // Abre a modal de confirmação
  };

  const confirmStatusChange = () => {
    if (pendingStatus) {
      setSelectedStatus(pendingStatus);
      onUpdateStatus(pendingStatus); // Aqui você pode adicionar o ID e a entidade se necessário
    }
    setModalOpen(false);
    setPendingStatus(null);
  };

  const cancelStatusChange = () => {
    setPendingStatus(null); // Limpa o status pendente
    setModalOpen(false); // Fecha a modal
  };

  return (
    <div className="relative">
      <div
        onClick={toggleDropdown}
        className={`cursor-pointer inline-block px-3 py-1 border border-gray-300 rounded-md ${statusColors[selectedStatus]} flex items-center`}
      >
        {statusOptions[selectedStatus]} <CaretDown size={20} className="ml-2" />
      </div>
      {dropdownOpen && (
        <div className="fixed bg-white border border-gray-200 rounded-md mt-2 shadow-lg z-50 max-h-20 overflow-y-auto">
          {Object.entries(statusOptions).map(([value, label]) => (
            <div
              key={value}
              onClick={() => handleStatusChange(value)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-700"
            >
              {label}
            </div>
          ))}
        </div>
      )}


      <Modal isOpen={modalOpen} toggle={cancelStatusChange}>
        <ModalBody>
          Tem certeza de que deseja alterar o status para{" "}
          {statusOptions[pendingStatus]}?
        </ModalBody>
        <ModalFooter>
          <BtnModais funcao={confirmStatusChange} acao="Confirmar" />
          <BtnModais funcao={cancelStatusChange} acao="Cancelar" />
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default StatusDropdown;