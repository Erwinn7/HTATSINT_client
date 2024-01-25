import {Modal, ModalBody, ModalHeader , Button, Alert   } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { prefix_link } from 'variables/globalesVar';
import ModalApercueFacture from './ModalApercueFacture';
import { useState } from 'react';
//import {lesfactures } from 'variables/globalesVar';


const ModalMoralFactures = ({ ouvert, toggle, factures, client }) => {
  const [alert, setAlert] = useState({ message: '', color: '' });
  const [showApercueModal, setShowApercueModal] = useState(false);
 
  const [selectedFacture, setSelectedFacture] = useState(null);

  
  const MySwal = withReactContent(Swal);
  const handleSolder =  (facture ) => {
   const token = localStorage.getItem('accessToken');
   const id = localStorage.getItem('id');
    // use sweetalert2 to Display confirmation dialog
  MySwal.fire({
    title: ' Etes-vous sur de vouloir solder cette facture?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui',
    cancelButtonText: 'Annuler',
   })
   // handle confirm button click
   .then( async(result) => {
     if (result.isConfirmed) {
      setSelectedFacture(facture);
    console.log('la facture:',facture);
    console.log('la client:',client);
      //CREER UN ETAT POUR GARDER TOUTES LES INFORMATIONS DE LA FACTURE ET LE CLIENT
      const formData = {
        'payer_phone': client.phone_number,
        'payer_name': client.institute_name,
        'customer_id': client.id,
        'payment_type_id': '433e2114-3cfc-4a7e-a865-b5d6af907616',
        'invoice_id': facture.id,
        'user_id': id
      };
      // faire une requette pour ajouter le paiement avec fecth
      console.log(formData);
        try {
          const response = await fetch(prefix_link +'/make_payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify(formData),
          });
      
          if (!response.ok) {
           // console.log('Response from Flask APIiiiii:', 'merde');
           //setShowApercueModal(true);
          }
      
          const data = await response.json();
          console.log('Response frommmm Flask API:', data);
          
          setShowApercueModal(true);


          
      console.log('Response frommmmm Flask API:', data);
         // return data;
          
        } catch (error) {
          // emettre une alerte d'erreur
          //setShowApercueModal(true);

          console.error('Une erreur s\'est produiteeeeeee : ', error);
        }
      ;

//console.log(facture);
       
     }
   });
  };
    if (!factures) {
        return null; // Ou renvoyer un autre contenu approprié si `factures` est indéfini
      }
    return (
      
      <Modal isOpen={ouvert} toggle={toggle} >
        <ModalHeader toggle={toggle}>Liste des factures</ModalHeader>
        <ModalBody>
        {alert.message && <Alert color={alert.color}>{alert.message}</Alert>}
          {factures.map((facture) => (
            <div style={{ padding: '10px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}   key={facture.id}>
              <h5>Facture Numero: <strong>{facture.invoice_number}</strong> </h5>
              <p>Nom de la société: <strong>{client.institute_name}</strong> </p>
              <p>Date: {facture.updated_at}</p>
              <p>Montant: {facture.invoice_amount}</p>
              {/* Afficher les autres détails de la facture */}
              <Button  color="primary" style={{ marginTop: '10px' }} onClick={( ) => {handleSolder(facture) }}>Payer</Button>
            </div>
          ))}
        </ModalBody>
        {showApercueModal && (
        <ModalApercueFacture  client={client} 
        //la facture concerner par le paiement
        facture={selectedFacture}
         ouvert={true}  toggle={() => setShowApercueModal(false)} />
      )}
      </Modal>
    );
  };
  export default ModalMoralFactures