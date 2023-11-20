import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ButtonCustom from './ButtonCustom';

function ModalExample(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" className='bg-gradient-info' onClick={toggle}>
        Ajouter un nouveau client
      </Button>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle} style={{backgroundColor: 'blue'}} className='bg-gradient-info' color="primary">AJOUT CLIENT</ModalHeader>
        <ModalBody>
         <center><ButtonCustom></ButtonCustom></center> 
        </ModalBody>
        <ModalFooter>
          
          <Button color="secondary" onClick={toggle}>
            FERMER
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;