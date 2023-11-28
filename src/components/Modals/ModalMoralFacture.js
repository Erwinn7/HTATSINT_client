import {Modal, ModalBody, ModalHeader , Button   } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { prefix_link } from 'variables/globalesVar';
//import {lesfactures } from 'variables/globalesVar';


const ModalMoralFactures = ({ ouvert, toggle, factures, client }) => {
  const MySwal = withReactContent(Swal);
  const handleSolder = (facture ) => {
    // use sweetalert2 to Display confirmation dialog
  MySwal.fire({
     title: 'Etes-vous sur de vouloir solder la facture?',
     icon: 'warning',
     showCancelButton: true,
     confirmButtonText: 'Oui',
     cancelButtonText: 'Non',
   })
   // handle confirm button click
   .then((result) => {
     if (result.isConfirmed) {
      //CREER UN ETAT POUR GARDER TOUTES LES INFORMATIONS DE LA FACTURE ET LE CLIENT
      const formData = {
        'payer_phone': client.phone_number,
        'payer_name': client.institute_name,
        'customer_id': client.customer_id,
        'payement_id': '4cbe4bda-84c7-489e-97b0-cd6cdd933c76',

      }
      // faire une requette pour ajouter le paiement avec fecth
      const fetchData = async () => {
        try {
          const response = await fetch(prefix_link + '/api/v1/make_payment', {
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
          
      console.log('Response from Flask API:', data);
         // return data;
          
        } catch (error) {
          // emettre une alerte d'erreur
          console.error('Une erreur s\'est produite : ', error);
        }
      };




console.log(facture);

       // use sweetalert2 to Display success dialog
       MySwal.fire({
         title: 'La facture N:' + facture.id+ ' de '+ facture.last_name +' a bien ete soldee',

         icon: 'success',
       });
       //fermer le modal
       
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
      </Modal>
    );
  };
  export default ModalMoralFactures