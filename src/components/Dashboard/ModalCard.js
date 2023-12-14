import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';



const ModalCard1 = ({ isOpen, toggleModal, cardTitle }) => {
    const [modal, setModal] = useState(false);
    const handleCloseModal = () => {
        setModal(false);
        toggleModal(); // Appellez la fonction fournie pour mettre à jour le state du parent
      };
    return (
        <Modal isOpen={modal} toggle={handleCloseModal}>
        <ModalHeader>1223</ModalHeader>
<ModalBody>
  {/* Contenu du modal */}
  <h5>Détails de la carte 1</h5>
  {/* Ajoutez ici les détails spécifiques à afficher dans le modal */}
</ModalBody>
</Modal>
    )
};

const ModalCard2 = ({ isOpen, toggleModal, cardTitle, cardDetails }) => {
    const [modal, setModal] = useState(false);
    const toggleModalInternal = () => setModal(!modal);
    return (
        <Modal isOpen={modal} toggle={toggleModalInternal}>
<ModalBody>
  {/* Contenu du modal */}
  <h5>Détails de la carte 2</h5>
  {/* Ajoutez ici les détails spécifiques à afficher dans le modal */}
</ModalBody>
</Modal>
    )
};

//exporter les composants
export { ModalCard1 };