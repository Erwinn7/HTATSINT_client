import React, { useState } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Container,Row,Col } from 'reactstrap';
import ButtonCustom from './ButtonCustom.js';
function AjoutClient() {
    const [modal, setModal] = useState(false);
  
    const toggle = () => {
      setModal(!modal);
    };
  
    return (
      <div>
        <Button className='bg-gradient-info'  color="primary" onClick={toggle}>
          Ajouter un nouveau client
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader>
          <Container fluid>
  <Row>
    <Col md={10}>
      <h1>Ajouter un client</h1>
    </Col>
    <Col md={2} className=" justify-content-end">
      <Button size="sm" color="secondary" onClick={toggle}>
        X
      </Button>
    </Col>
  </Row>
</Container>
          </ModalHeader>
          <ButtonCustom></ButtonCustom>
          <ModalBody>
            <form>
              {/* le formulaire est fourni par le composant AddCustomForm */}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Fermer
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  
  export default AjoutClient;
  