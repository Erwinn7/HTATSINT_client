import {Modal, ModalBody, ModalHeader , Button , Input, Label  } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { prefix_link } from 'variables/globalesVar';
import ModalApercueFacture from './ModalApercueFacture';
import { useState, useEffect } from 'react';
//import {lesfactures } from 'variables/globalesVar';


const ModalPhysiqueFactures = ({ ouvert, toggle, factures , client, onPaymentSuccess}) => {
  const MySwal = withReactContent(Swal);
  
  const [showApercueModal, setShowApercueModal] = useState(false);
  const [payementSuccess, setPayementSuccess] = useState({});
 
  


  const [pourcentageReductionList, setPourcentageReductionList] = useState(Array(factures.length).fill('0'));
  const [montantNetList, setMontantNetList] = useState(Array(factures.length).fill('0'));
  const [montantNetList2, setMontantNetList2] = useState(Array(factures.length).fill('0'));

  const [selectedFacture, setSelectedFacture] = useState(null);
  const [selectedReductionType, setSelectedReductionType] = useState([]);
  //const [montantReduction, setMontantReduction] = useState('');
  const [montantReductionList, setMontantReductionList] = useState(Array(factures.length).fill(''));
  const [montantReductionSurpourcentage, setMontantReductionSurpourcentage] = useState(Array(factures.length).fill(''));
  const [motifReductionList, setMotifReductionList] = useState(Array(factures.length).fill(''));

  //const [reductionenfcfa, setReductionenfcfa] = useState(Array(factures.length).fill(''));


  const [formData, setFormData] = useState({
    
  });



  const handlePourcentageReductionChange = (event, index) => {

    const newPourcentageReductionList = [...pourcentageReductionList];
    let value = parseFloat(event.target.value);
    if (isNaN(value) || value < 0) {
      // Afficher un message d'erreur
      console.log('Valeur invalide');
      // donner la valeur 0 a value
     value = 0; 
     newPourcentageReductionList[index] = value;
    setPourcentageReductionList(newPourcentageReductionList);
    fmontantNetList2(event, index);
      return;
    }
  if (value > 100) {
    value = 100;
    newPourcentageReductionList[index] = value;
    setPourcentageReductionList(newPourcentageReductionList);
    fmontantNetList2(event, index);
    return;
  }
  
    newPourcentageReductionList[index] = value;
    setPourcentageReductionList(newPourcentageReductionList);
    fmontantNetList2(event, index); // Appel à la fonction de mise à jour
  };
  
  const fmontantNetList2 = (event, index) => {
    // Cloner la liste des factures pour éviter les mutations directes
    const updatedMontantNetList = factures.map((facture, index) => {
      const montantFacture = parseFloat(facture.invoice_amount);
      const tauxReduction = parseFloat(pourcentageReductionList[index]) || 0  ;
      console.log('mont:',tauxReduction);
     
      return montantFacture - tauxReduction*montantFacture/100;
  
    });
    const updatedMontantReduireSurpourcentage = factures.map((facture, index) => {
      const montantFacture = parseFloat(facture.invoice_amount);
      const tauxReduction = parseFloat(pourcentageReductionList[index]) || 0  ;
  
      return tauxReduction*montantFacture/100;
    })
    // Mettre à jour l'état du montant net
    setMontantReductionSurpourcentage(updatedMontantReduireSurpourcentage);
    setMontantNetList2(updatedMontantNetList);
    
  };
  
  
  
  
  const handleMontantReductionChange1 = (event, index) => {
    const newMontantReductionList = [...montantReductionList];
    let value = parseFloat(event.target.value);
    if (isNaN(value) || value < 0) {
      // Afficher un message d'erreur
      console.log('Valeur invalide');
      // donner la valeur 0 a value
     value = 0; 
     newMontantReductionList[index] = value;
    setMontantReductionList(newMontantReductionList);
    fmontantNetList(event, index);
      return;
    }
    newMontantReductionList[index] = value;
    setMontantReductionList(newMontantReductionList);
    fmontantNetList(event, index); // Appel à la fonction de mise à jour
  };
  
  
  
  
  const fmontantNetList = (event, index) => {
    // Cloner la liste des factures pour éviter les mutations directes
    const updatedMontantNetList = factures.map((facture, index) => {
      const montantFacture = parseFloat(facture.invoice_amount);
      const montantReduction = parseFloat(montantReductionList[index]) || 0  ;
      console.log('mont:',montantReduction);
      return montantFacture - montantReduction;
  
    });
    // Mettre à jour l'état du montant net
    setMontantNetList(updatedMontantNetList);
    
  };
  
  useEffect(() => {
    fmontantNetList();
    fmontantNetList2();
  }, [montantReductionList, pourcentageReductionList]);
  
  
  
  
  
  const resetForm1 = () => {
    setPourcentageReductionList(Array(factures.length).fill('0'));
    setMontantNetList(Array(factures.length).fill('0'));
    setMontantNetList2(Array(factures.length).fill('0'));
    //setSelectedFacture(null);
  //  setSelectedReductionType([]);
    setMontantReductionList(Array(factures.length).fill(''));
    setMontantReductionSurpourcentage(Array(factures.length).fill(''));
    setFormData({});
  };

  useEffect(() => {
    resetForm1();
  },[ selectedReductionType,selectedFacture]);



  const resetForm2 = () => {
    setPourcentageReductionList(Array(factures.length).fill('0'));
    setMontantNetList(Array(factures.length).fill('0'));
    setMontantNetList2(Array(factures.length).fill('0'));
    setSelectedFacture(null);
    setSelectedReductionType([]);
    setMontantReductionList(Array(factures.length).fill(''));
    setMontantReductionSurpourcentage(Array(factures.length).fill(''));
    setFormData({});
  };

  useEffect(() => {
    resetForm2();
  },[ouvert]);



  const handleSolder = async (facture, index ) => {
    const token = localStorage.getItem('accessToken');
    const id = localStorage.getItem('id');
    console.log("reduction:",montantReductionList);
    console.log("resteapayer:",montantNetList);
    console.log("reductionp:",montantReductionSurpourcentage);
    console.log("resteapayerp:",montantNetList2);

    // use sweetalert2 to Display confirmation dialog
    MySwal.fire({
      title: ' Etes vous sur de vouloir solder cette facture?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler',
    })
  
      
        
    .then( async (result) => {
      if (result.isConfirmed) {
        setSelectedFacture(facture);
function Form  (){
   if(selectedReductionType[index] === 'pourcentage') {

    const Data = {
      'payer_phone': client.phone_number,
      'payer_name': client.first_name,
      'customer_id': client.id,
      'payment_type_id': '433e2114-3cfc-4a7e-a865-b5d6af907616',
      'invoice_id': facture.id,
      'user_id': id,
      'discount_amount':  montantReductionSurpourcentage[index] ,
      'amount_paid':  montantNetList2[index] ,
      'discount_raison': motifReductionList[index]
     
    }
    console.log(Data);
    return Data;
    // mettre a jour formData
   // setFormData({...Data});
    
   
    
  }
  else {

    const Data =  {
      'payer_phone': client.phone_number,
      'payer_name': client.first_name,
      'customer_id': client.id,
      'payment_type_id': '433e2114-3cfc-4a7e-a865-b5d6af907616',
      'invoice_id': facture.id,
      'user_id': id,
      'discount_amount': (  montantReductionList[index]? montantReductionList[index] : 0), 
      'amount_paid':  (  montantNetList[index]? montantNetList[index] : facture.invoice_amount), 
      'discount_raison': motifReductionList[index]
     
    }
   // setFormData({...Data});
    console.log(Data);
    return Data;
  }
}
 

    // faire une requette pour ajouter le paiement avec fecth
    
      try {
        
        const Data = Form();
        console.log('here',selectedReductionType[0]);
        console.log('datasent:',Data);
        const response = await fetch(prefix_link +'/make_payment', {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(Data),
        });
    
        if (!response.ok) {
          console.log('Response from Flask API:', 'merde');
        }
        const data = await response.json();
        console.log(data);
        const payement= data.settlement;
        setPayementSuccess(payement);
        //fermer le modal des factures
        
        setShowApercueModal(true);

    


      } catch (error) {
        console.log('Errorrrrrrra:', error);
      }
     
        //setShowApercueModal(true);
      }
    })
     
    
  };
    if (!factures) {
        return null; // Ou renvoyer un autre contenu approprié si `factures` est indéfini
      }
    return (
      <Modal isOpen={ouvert} toggle={toggle} >
        <ModalHeader toggle={toggle}>Liste des factures</ModalHeader>
        <ModalBody>
        
          {factures.map((facture, index) => (
            <div style={{ padding: '10px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}   key={facture.id}>
              <h5>Facture Numero: <strong>{facture.invoice_number}</strong> </h5>
              <p>Nom: <strong>{client.last_name}</strong></p>
              <p>Prenom: <strong>{client.first_name}</strong></p>
              <p>Date: {facture.updated_at}</p>
              <p>Montant: {facture.invoice_amount}</p>
              
             




              {/* Afficher les autres détails de la facture */}
              <div className='row'>
              <div className='col-md-5'>
              <p>Faire  une reduction:</p>
              </div>
              <div className='col-md-3'>
              <Label style={{ marginRight: '10px' }}>
                Taux
                </Label>
                
                <input
                  type="radio"
                  value="pourcentage"
                  checked={selectedReductionType[index] === 'pourcentage'}
                  onChange={() => {
                    const newArray = [...selectedReductionType];
                    newArray[index] = 'pourcentage';
                    setPourcentageReductionList([]);
                    setMontantNetList2([]);
                    setMontantNetList([]);
                    setMontantReductionList([]);
                  //reinitialiser les champs de saisi ,les input



                    setSelectedReductionType(newArray);
                   

                    
                  }}
                />
             
              </div>
              <div className='col-md-3'>
              <Label style={{ marginRight: '10px' }}>
                Valeur
                </Label>
                <input
                  type="radio"
                  value="montant"
                  checked={selectedReductionType[index] === 'montant'}
                  onChange={() => {
                    const newArray = [...selectedReductionType];
                    newArray[index] = 'montant';
                    setMontantNetList([]);
                    setMontantReductionList([]);
                    setPourcentageReductionList([]);
                    setMontantNetList2([]);
                    setSelectedReductionType(newArray);
                    // Mettre à vide la valeur des input montantreduction et net
                   


                  }}
                />
             
              </div>
            </div>

            {selectedReductionType[index] === 'pourcentage' ? (
              <div className='row'> 
              <div className='col-md-3'>
              <Label>Taux(%):
              <Input
              id='tauxReduction'
                type="numeric"
                value={pourcentageReductionList[index]}
                disabled={selectedReductionType[index] !== 'pourcentage'}
           

                onChange={(e) => handlePourcentageReductionChange(e, index)}
                placeholder=""
                style={{ width: '80px' }}
    //Mettre une condition pour que le taux ne puisse pas depasser la valeur maximale de 100
                  
                
              />
              </Label>
              
              </div>

              <div className='col-md-3'>
              <Label>Valeur(fcfa):
              <Input
              id='reductionenfcfa'
                type="text"
                value={montantReductionSurpourcentage[index]}
               // disabled={selectedReductionType[index] !== 'pourcentage'}
           

                //onChange={(e) => handlePourcentageReductionChange(e, index)}
                placeholder=""
                style={{ width: '80px' }}
    //Mettre une condition pour que le taux ne puisse pas depasser la valeur maximale de 100
                  
                
              />
              </Label>

              
              </div>

              
              <div className='col-md-3'>
              <Label>Net (fcfa):
              <Input
              id='montantApayer1'
                type="text"
                value={montantNetList2[index]}
                //onChange={(e) => handleMontantReductionChange2(index, e.target.value)}
                placeholder=""
                style={{ width: '100px' }}
              />
              </Label>
              </div>
              <div className='col-md-3'>
              <Label>Motif:</Label>
  <textarea
  style={{ width: '80px', marginTop: '-7px' }}
    type="text"
    value={motifReductionList[index]}
    onChange={(e) => {
      const newMotifList = [...motifReductionList];
      newMotifList[index] = e.target.value;
      setMotifReductionList(newMotifList);
      
    }}
    placeholder="Le motif"
  />

              </div>
              <div className='row'>
              <Button size='md' color="primary" style={{ marginTop: '25px', marginLeft: '30px' }} onClick={( ) => {handleSolder(facture,index) }}>Payer</Button>

               </div>
              </div>
             
            ) : (
              <div className='row'> 
                   <div className='col-md-4'>
                   <Label>Valeur (fcfa):
                     <Input
                     id='montantAdeduire'
                          type="numeric"
                           value={montantReductionList[index]}
                           onChange={(e) => handleMontantReductionChange1(e, index)}
                           disabled={selectedReductionType[index] !== 'montant'}
                           placeholder=""
                           style={{ width: '100px' }}
                       />
                   </Label>
              </div>
              <div className='col-md-4'>
              <Label>Net (fcfa):
              <Input
              id='montantApayer2'
                type="text"
                value={montantNetList[index]}
                //disabled
               // onChange={(e) => handleResteApayerChange(index, e.target.value)}
                placeholder=""
                style={{ width: '100px' }}
              />
              </Label>
              </div>
          <div className='col-md-3'>
          <Label>Motif:</Label>
  <textarea
  style={{ width: '80px', marginTop: '-10px' }}
    type="text"
    value={motifReductionList[index]}
    onChange={(e) => {
      const newMotifList = [...motifReductionList];
      newMotifList[index] = e.target.value;
      setMotifReductionList(newMotifList);
      
    }}
    placeholder="Le motif"
  />
           </div>
           <div className='row'>
           <Button size='md' color="primary" style={{ marginTop: '25px',marginLeft: '30px' }} onClick={( ) => {handleSolder(facture, index) }}>Payer</Button>

            </div>

              </div>
            )}



 
             
           
            </div>
          ))}
        </ModalBody>
        {showApercueModal && (
        <ModalApercueFacture 
        facture={selectedFacture}
        client={client}
        payement={payementSuccess}
        ouvert={true} toggle={() => setShowApercueModal(false)} />
      )}
      </Modal>
      
    );
  };
  export default ModalPhysiqueFactures