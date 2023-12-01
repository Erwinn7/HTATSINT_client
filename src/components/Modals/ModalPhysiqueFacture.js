import {Modal, ModalBody, ModalHeader , Button , Alert  } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { prefix_link } from 'variables/globalesVar';
import ModalApercueFacture from './ModalApercueFacture';
import { useState } from 'react';
//import {lesfactures } from 'variables/globalesVar';


const ModalPhysiqueFactures = ({ ouvert, toggle, factures , client}) => {
  const MySwal = withReactContent(Swal);
  const [showApercueModal, setShowApercueModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);


  const handleSolder = async (facture ) => {
    // use sweetalert2 to Display confirmation dialog
  
      
        
      const userConfirmed = window.confirm('Êtes-vous sûr de vouloir solder la facture?');
      setConfirmation(userConfirmed);
      if(userConfirmed){
  
        const formData = {
            'payer_phone': client.phone_number,
            'payer_name': client.first_name,
            'customer_id': client.id,
            'payment_type_id': '4cbe4bda-84c7-489e-97b0-cd6cdd933c76',
    'invoice_id': facture.id,
          }
          console.log(formData);
      // faire une requette pour ajouter le paiement avec fecth
      
        try {
          const response = await fetch(prefix_link +'/api/v1/make_payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'

            },
            body: JSON.stringify(formData),
          });
      
          if (!response.ok) {
            console.log('Response from Flask API:', 'merde');
          }
          const data = await response.json();
          console.log(formData);
         /* setAlert({ message:  `Client enregistrer avec succes` , color: 'success' });
          //
          setTimeout(() => {
            setAlert({ message: '', color: '' });
          }, 5000);*/
          setShowApercueModal(true);

console.log('Response frommmmm Flask API:', data);


         



        } catch (error) {
          console.log('Errorrrrrrra:', error);
        }
    
//console.log(formData);

       // use sweetalert2 to Display success dialog
     /* MySwal.fire({
         title: 'La facture N:' + facture.id+ ' de '+ facture.last_name +' a bien ete soldee',

         icon: 'success',
       });*/
       //fermer le modal
     //  toggle();
     }
    ;
  };
    if (!factures) {
        return null; // Ou renvoyer un autre contenu approprié si `factures` est indéfini
      }
    return (
      <Modal isOpen={ouvert} toggle={toggle} >
        <ModalHeader toggle={toggle}>Liste des factures</ModalHeader>
        <ModalBody>
        
          {factures.map((facture) => (
            <div style={{ padding: '10px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}   key={facture.id}>
              <h5>Facture Numero: <strong>{facture.invoice_number}</strong> </h5>
              <p>Nom: <strong>{client.last_name}</strong></p>
              <p>Prenom: <strong>{client.first_name}</strong></p>
              <p>Date: {facture.updated_at}</p>
              <p>Montant: {facture.invoice_amount}</p>
              
              {/* Afficher les autres détails de la facture */}
              <Button  color="primary" style={{ marginTop: '10px' }} onClick={( ) => {handleSolder(facture) }}>Payer</Button>
            </div>
          ))}
        </ModalBody>
        {showApercueModal && (
        <ModalApercueFacture ouvert={true} toggle={() => setShowApercueModal(false)} />
      )}
      </Modal>
      
    );
  };
  export default ModalPhysiqueFactures