// PaymentModal.js
import React from 'react';
import { Modal, ModalBody, ModalHeader, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const PaymentModal = ({ isOpen, toggle }) => {
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique pour enregistrer le paiement
    console.log('Paiement enregistré !');
    toggle(); // Fermer le modal après enregistrement
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Formulaire de paiement</ModalHeader>
      <ModalBody>
        <Form onSubmit={handlePaymentSubmit}>
          <FormGroup>
            <Label for="amount">Montant à payer</Label>
            <Input type="text" name="amount" id="amount" required />
          </FormGroup>
          <FormGroup>
            <Label for="amount">
              Mode de paiement
            </Label>
            <Input type="text" name="type" id="type" required />
          </FormGroup>
          {/* Ajoutez d'autres champs du formulaire selon vos besoins */}
          <Button type="submit" color="primary">Payer</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default PaymentModal;
