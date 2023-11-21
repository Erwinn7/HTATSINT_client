//import AddRoomForm from 'components/Forms/AddRoomForm';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import  CreateUserForm from 'components/Forms/AddUsers';
const MonComposant = () => {
  // Utilisez l'état pour contrôler si le modal est ouvert ou fermé
  const [modalOpen, setModalOpen] = useState(false);

  // Fonction pour ouvrir le modal
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div>
      {/* Bouton qui ouvre le modal au clic */}
      <Button color="primary" onClick={toggleModal}>
        Ajouter un utilisateur
      </Button>

      {/* Modal */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Ajout utilisateur</ModalHeader>
        <ModalBody>
          {/* Contenu du modal */}
          <Container>
      <CreateUserForm/>
          </Container>
          
        </ModalBody>
        <ModalFooter>
          {/* Boutons ou actions dans le pied du modal */}
          <Button color="secondary" onClick={toggleModal}>
            Fermer
          </Button>
         
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MonComposant;
