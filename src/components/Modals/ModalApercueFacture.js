import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const ModalApercueFacture = ({ ouvert, toggle }) => {
  return (
    <Modal isOpen={ouvert} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Aperçu de la facture</ModalHeader>
      <ModalBody>
        {/* Contenu de l'aperçu de la facture */}
      </ModalBody>
    </Modal>
  );
};

export default ModalApercueFacture;