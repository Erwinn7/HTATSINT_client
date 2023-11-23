import React from 'react';
import  { useState } from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Button , Spinner,Alert} from 'reactstrap';
import { prefix_link } from 'variables/globalesVar';

function MyFormEnt() {

  const [isExistingPhysiqueClient, setIsExistingPhysiqueClient] = useState(false);
  const [alert, setAlert] = useState({ message: '', color: '' });


  const [formData, setFormData] = useState({
    // Initial state of your form data
    institute_name: '',
    ifu: '',
    email: '',
    adress: '',
    
    
    customer_type_id:'45e12cdf-a6ea-4760-8a0a-d7cc37461d7b'
   
    // ...
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(prefix_link+'/api/v1/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response from Flask API:', data);
    } catch (error) {
      console.error('Error sending data to Flask API:', error.message);
    }finally {
      setLoading(false); // Mettre l'état de chargement à false après la réponse (qu'elle soit réussie ou non)
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };











  const handleInputBlur = async (e) => {
    // Effectuer d'autres traitements avec la valeur saisie lorsque l'utilisateur quitte l'input


    e.preventDefault();
    const { name, value } = e.target;

    try {
     
      const response = await fetch( prefix_link+'/api/v1/client_by_phone/'+value, {
        method: 'GET'
       
      });

      if (response.status ===404) {
        //Aucun client avec ce numero de telephone
        const data = await response.json();
        console.log(`Response from flask API: `, data);
        document.getElementById('first_name').value = '';
document.getElementById('last_name').value = '';
document.getElementById('gender').value = '';
document.getElementById('ifu').value = '';
document.getElementById('email').value = '';
document.getElementById('date_of_birth').value = '';
document.getElementById('address').value = '';
setIsExistingPhysiqueClient(false);
      }

      if (response.status ===200) {
        //un client avec ce numero de telephone
        const data = await response.json();
        console.log('Response from Flask API:', data);
        console.log(`${name}: ${value}`);
if (data.type_customer.type_custormer=== "Physique") {
// PRE-REMPLIRE LE FORMULAIRE

document.getElementById('first_name').value = data.customer.first_name;
document.getElementById('last_name').value = data.customer.last_name;
//document.getElementById('gender').value = data.customer.gender;
document.getElementById('ifu').value = data.customer.ifu;
document.getElementById('email').value = data.customer.email;
//document.getElementById('date_of_birth').value = data.customer.date_of_birth;
document.getElementById('address').value = data.customer.address;
// ENVOI D'ALERTE
setAlert({ message:  `le client ${data.customer.last_name} ${data.customer.first_name} existe deja avec ce numero de telephone` , color: 'danger' });
//
setTimeout(() => {
setAlert({ message: '', color: '' });
}, 10000);
// desactiver le bouton enregistrer

setIsExistingPhysiqueClient(true);

} else{
setIsExistingPhysiqueClient(true);
setAlert({ message: 'Ce numero est deja enregistrer pour un client de type moral.', color: 'primary' });

}

      }

    } catch (error) {
      console.error('Error sending dataaaa to Flask API:', error.message);
      setAlert({ message: 'Erreur serveur.Contacter le service technique.', color: 'danger' });
      document.getElementById('phone_number').value = '';
      setTimeout(() => {
        setAlert({ message: '', color: '' });
      }, 5000);
      console.log(`${name}: ${value}`);
      setFormData ({
  
        first_name: '',
        last_name: '',
       gender: '',
        ifu: '',
        email:'',
        date_of_birth: '',
        address: ''
        
      })
    }finally {
      setLoading(false); // Mettre l'état de chargement à false après la réponse (qu'elle soit réussie ou non)
    }



    // Ajoutez ici le code pour effectuer d'autres traitements avec la valeur saisie
  }; 

  return (
    <Form>
    <FormGroup>
        <Label for="phone_number">
          NUMERO DE TELEPHONE
        </Label>
        <Input
         type='numeric'
         value={FormData.phone_number}
          name="phone_number"
          id="phone_number"
          placeholder=""
          onChange={handleInputChange} 
          onBlur={handleInputBlur}
          required
        
    
        />
      </FormGroup>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="first_name">
              NOM DE L'INSTITUT
            </Label>
            <Input
              
              type='text'
         value={FormData.first_name}
          name="first_name"
          id="first_name"
          placeholder=""
          onChange={handleInputChange} 
          
          required
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="numeroIfu">
              NUMERO IFU
            </Label>
            <Input
              
              type='numeric'
         value={FormData.ifu_number}
          name="ifu_number"
          id="ifu_number"
          placeholder=""
          onChange={handleInputChange} 
            />
          </FormGroup>
        </Col>
      </Row>
      

     

      <FormGroup>
        <Label for="email">
          ADRESSE ELECTRONIQUE
        </Label>
        <Input
        type='email'
        value={FormData.email}
          name="email"
          id="email"
          placeholder=""
          onChange={handleInputChange} 
        />
      </FormGroup>

      <FormGroup>
        <Label for="adresse">
          ADRESSE SIEGE
        </Label>
        <Input
        type='text'
        value={FormData.adress}
          name="adress"
          id="adress"
          placeholder=""
          onChange={handleInputChange} 
        
        />
      </FormGroup>



      
      
      <Row>
      <FormGroup >
        <Button
          type="reset"
          name="annuler"
          id=""
        >
            ANNULER
        </Button>
        
      </FormGroup>
      <FormGroup>  
      <Button
       onClick={handleSubmit}
      type='submit'
      disabled={loading || (isExistingPhysiqueClient )}>
      {loading ? <Spinner size="sm" color="light"/> : 'ENREGISTRER'}
      </Button>
      </FormGroup>
      </Row>
      {alert.message && <Alert color={alert.color}>{alert.message}</Alert>}
    </Form>


  );

}

export default MyFormEnt;
