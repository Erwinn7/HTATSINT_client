import {Modal, ModalBody, ModalHeader , Button   } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
//import {lesfactures } from 'variables/globalesVar';


const ModalPhysiqueFactures = ({ ouvert, toggle, factures , client}) => {
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
      // faire une requette pour ajouter le paiement avec fecth
      
console.log(facture);

       // use sweetalert2 to Display success dialog
       MySwal.fire({
         title: 'La facture N:' + facture.id+ ' de '+ facture.last_name +' a bien ete soldee',

         icon: 'success',
       });
       //fermer le modal
       toggle();
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
              <p>Nom: <strong>{client.last_name}</strong></p>
              <p>Prenom: <strong>{client.first_name}</strong></p>
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
  export default ModalPhysiqueFactures