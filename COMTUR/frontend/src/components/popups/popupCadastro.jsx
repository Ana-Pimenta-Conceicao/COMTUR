import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody } from 'reactstrap';
import { X } from '@phosphor-icons/react';
import Check from '../../assets/iconeCheck';

function PopupCadastrado({ isOpen, toggle, objeto }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered style={{ maxWidth: '450px' }}>
      <ModalBody>
        <div className="flex justify-end w-full">
          <button onClick={toggle} aria-label="Fechar">
            <X size={22} />
          </button>
        </div>
        <div className="flex justify-center w-full py-3">
          <Check />
        </div>
        <h1 className="flex w-full justify-center font-medium text-lg pb-2">
          {objeto} cadastrado(a) com sucesso!
        </h1>
      </ModalBody>
    </Modal>
  );
}

PopupCadastrado.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  objeto: PropTypes.string.isRequired,
};

export default PopupCadastrado;
