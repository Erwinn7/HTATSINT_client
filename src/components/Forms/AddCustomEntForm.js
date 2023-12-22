import React from 'react';
import  { useState } from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Button , Spinner,Alert} from 'reactstrap';
import { prefix_link } from 'variables/globalesVar';

function MyFormEnt() {

  const [isExistingMoralClient, setIsExistingMoralClient] = useState(false);
  const [alert, setAlert] = useState({ message: '', color: '' });


  const [formData, setFormData] = useState({
    // Initial state of your form data
    institute_name: '',
    ifu: '',
    email: '',
    address: '',
    phone_number:'',
    
    customer_type_id:'111f9b06-0037-4147-b820-3f7361e4d111'
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

      if (response.status===201) {
        const data = await response.json();
        console.log('Response from Flask API:', data);
        setAlert({ message:  `Client enregistrer avec succes` , color: 'success' });
        //
        setTimeout(() => {
          setAlert({ message: '', color: '' });
        }, 5000);
        // vider les champs du formulaire
        document.getElementById('phone_number').value = '';
        document.getElementById('institute_name').value = '';
        document.getElementById('ifu').value = '';
        document.getElementById('email').value = '';
        document.getElementById('address').value = '';
    
      }else{
        setAlert({ message:  `Erreur!Contacter le service technique` , color: 'danger' });
        //
        setTimeout(() => {
          setAlert({ message: '', color: '' });
        }, 5000);
        setLoading(false);

      }
      
    } catch (error) {
      console.error('Error sending data to Flask API:', error.message);
      setAlert({ message:  `Erreur Serveur` , color: 'danger' });
      //
      setTimeout(() => {
        setAlert({ message: '', color: '' });
      }, 5000);
              console.error('Error sending data to Flask API:', error.message);
               // vider les champs du formulaire
               document.getElementById('phone_number').value = '';
               document.getElementById('institute_name').value = '';
               document.getElementById('ifu').value = '';
               document.getElementById('email').value = '';
               document.getElementById('address').value = '';
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
        document.getElementById('institute_name').value = '';
document.getElementById('ifu').value = '';
document.getElementById('email').value = '';
document.getElementById('address').value = '';
setIsExistingMoralClient(false);
      }

      if (response.status ===200) {
        //un client avec ce numero de telephone
        const data = await response.json();
        //console.log('Response from Flask API:', data);
        //console.log(`${name}: ${value}`);
if (data.type_customer.type_custormer=== "Morale") {
// PRE-REMPLIRE LE FORMULAIRE

document.getElementById('institute_name').value = data.customer.institute_name;
//document.getElementById('phone_number').value = data.customer.phone_number;
document.getElementById('ifu').value = data.customer.ifu;
document.getElementById('email').value = data.customer.email;
document.getElementById('address').value = data.customer.address;
// ENVOI D'ALERTE
setAlert({ message:  `le client ${data.customer.institute_name} existe deja avec ce numero de telephone` , color: 'danger' });
//
setTimeout(() => {
setAlert({ message: '', color: '' });
}, 10000);
// desactiver le bouton enregistrer

setIsExistingMoralClient(true);

} else{
setIsExistingMoralClient(true);
setAlert({ message: 'Ce numero est deja enregistrer pour un client de type physique.', color: 'primary' });
setTimeout(() => {
  setAlert({ message: '', color: '' });
  }, 10000);

}

      }

    } catch (error) {
      console.error('Error sending dataaaa to Flask API:', error.message);
      setAlert({ message: 'Erreur serveur.Contacter le service technique.', color: 'danger' });
      document.getElementById('institute_name').value = '';
document.getElementById('phone_number').value = '';
document.getElementById('ifu').value = '';
document.getElementById('email').value = '';
document.getElementById('address').value = '';
      setTimeout(() => {
        setAlert({ message: '', color: '' });
      }, 5000);
      //console.log(`${name}: ${value}`);
     
    }finally {
      setLoading(false); // Mettre l'état de chargement à false après la réponse (qu'elle soit réussie ou non)
    }



    // Ajoutez ici le code pour effectuer d'autres traitements avec la valeur saisie
  }; 

  return (
    <Form>
          {alert.message && <Alert color={alert.color}>{alert.message}</Alert>}

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
            <Label for="institute_name">
              NOM DE L'INSTITUT
            </Label>
            <Input
              
              type='text'
         value={FormData.institute_name}
          name="institute_name"
          id="institute_name"
          placeholder=""
          onChange={handleInputChange} 
          
          required
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="ifu">
              NUMERO IFU
            </Label>
            <Input
              
              type='numeric'
         value={FormData.ifu}
          name="ifu"
          id="ifu"
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
        <Label for="address">
          ADRESSE SIEGE
        </Label>
        <Input
        type='text'
        value={FormData.address}
          name="address"
          id="address"
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
      disabled={loading || (isExistingMoralClient )}>
      {loading ? <Spinner size="sm" color="light"/> : 'ENREGISTRER'}
      </Button>
      </FormGroup>
      </Row>
      {alert.message && <Alert color={alert.color}>{alert.message}</Alert>}
    </Form>


  );

}

export default MyFormEnt;
