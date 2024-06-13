import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody } from 'reactstrap';
import { X } from '@phosphor-icons/react';
import IconeUsrCheck from '../../assets/iconeUsrCheck';

function PopupCadLogin({ isOpen, toggle }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered style={{ maxWidth: '400px' }}>
      <ModalBody>
        <div>
        <div className="flex justify-end w-full">
            
          <button onClick={toggle} aria-label="Fechar">
            <X size={22} />
          </button>
        </div>
        <div className="flex justify-center w-full">
          <IconeUsrCheck size={20} />
        </div>
        <div className="flex justify-center text-center w-full font-semibold ">
          Seu cadastrado foi realizado com sucesso! Agora, você já pode efetuar seu login.
        </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

PopupCadLogin.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default PopupCadLogin;
