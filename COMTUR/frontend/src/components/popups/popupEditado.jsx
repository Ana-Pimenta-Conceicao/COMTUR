import React from 'react';
import { Modal, ModalBody } from 'reactstrap'; // Importe o Modal e ModalBody do Reactstrap ou de outra biblioteca que você esteja utilizando
import { X } from '@phosphor-icons/react'; // Importe os ícones X e Check, ou substitua-os pelos ícones que você está utilizando
import IconeEdit from "../../assets/iconeEdit"

function PopupEditado ({ isOpen, toggle, objeto }) {
  return (
    <Modal isOpen={isOpen} centered style={{ maxWidth: "450px" }}>
      <ModalBody>
        <div className="flex justify-end w-full">
          <button onClick={toggle}>
            <X size={22} />
          </button>
        </div>
        <div className="flex justify-center w-full py-3">
          <IconeEdit />
        </div>
        <h1 className="flex w-full justify-center font-medium text-lg pb-2">
          {objeto} alterado(a) com sucesso!
        </h1>
      </ModalBody>
    </Modal>
  );
};

export default PopupEditado