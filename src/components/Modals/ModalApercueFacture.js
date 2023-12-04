import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const ModalApercueFacture = ({ ouvert, toggle }) => {
  return (
    <Modal isOpen={ouvert} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Aperçu de la facture</ModalHeader>
      <ModalBody>
        {/* Contenu de l'aperçu de la facture */}
        <p>Facture payer avec succes</p>
      </ModalBody>
    </Modal>
  );
};

export default ModalApercueFacture;