import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ButtonCustom from './ButtonCustom';
function AjoutClient({butonTitle , onClick}) {
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Ajout client moral');
  const updateModalTitle = (title) => {
    setModalTitle(title);
  };

  const toggle = () =>{
    setModal(!modal);
   
  } 

  return (
    <div>
      <Button color="primary" className='bg-gradient-info' onClick={toggle} >
      Ajouter un nouveau client
      </Button>
      <Modal isOpen={modal} fade={true} toggle={toggle}>
      <ModalHeader toggle={toggle} style={{ backgroundColor: 'blue' }} className='bg-gradient-info' color="primary">
         <strong>{modalTitle} </strong> 
        </ModalHeader>
        <ModalBody>
         <center><ButtonCustom updateModalTitle={updateModalTitle}></ButtonCustom></center> 
        </ModalBody>
        <ModalFooter>
          
          <Button color="secondary" onClick={toggle }>
            FERMER
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AjoutClient;