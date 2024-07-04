import React from 'react';
import  { useState } from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Button , Spinner,Alert} from 'reactstrap';
import { prefix_link } from 'variables/globalesVar';

function MyFormEnt() {
  const token = localStorage.getItem('accessToken');
  const id= localStorage.getItem('id');
  const [isExistingMoralClient, setIsExistingMoralClient] = useState(false);
  const [alert, setAlert] = useState({ message: '', color: '' });


  const [formData, setFormData] = useState({
    // Initial state of your form data
    institute_name: '',
    ifu: '',
    email: '',
    address: '',
    phone_number:'',
    
    customer_type_id:'f3604013-67cf-45ab-b2e7-ed39c1c59fec',
    user_id : `${id}`
  });
  const [loading, setLoading] = useState(false);

  const validateBeninPhoneNumber = (phoneNumber) => {
    const beninPhoneRegex = /^(?:(?:\+229|00229)\s?)?(\d{2}\s?\d{2}\s?\d{2}\s?\d{2})$/;
    return beninPhoneRegex.test(phoneNumber);
  };
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const removeSpaces = (phoneNumber) => {
    return phoneNumber.replace(/\s+/g, '');
  };








  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateBeninPhoneNumber(formData.phone_number) || formData.phone_number ==='') {
     
      setAlert({ message: 'Veuillez entrer un numéro de telephone valide.', color: 'danger' });
      setTimeout(() => {
        setAlert({ message: '', color: '' });
        document.getElementById('institute_name').value = '';
        //document.getElementById('phone_number').value = '';
        document.getElementById('ifu').value = '';
        document.getElementById('email').value = '';
        document.getElementById('address').value = '';
       }, 2000);  
    //setVisitedFields({ ...visitedFields, email: true });
    return;
  }

  if (!validateEmail(formData.email)&& formData.email!=='') {
     
    setAlert({ message: 'Veuillez entrer une adresse email valide.', color: 'danger' });
    setTimeout(() => {
      setAlert({ message: '', color: '' });
     }, 2000);  
  //setVisitedFields({ ...visitedFields, email: true });
  return;
}





   

    try {
      setLoading(true);
      console.log('formData:',formData);
      const response = await fetch(prefix_link+'/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          
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
           document.getElementById('phone_number').value = '';
        document.getElementById('institute_name').value = '';
        document.getElementById('ifu').value = '';
        document.getElementById('email').value = '';
        document.getElementById('address').value = '';
        }, 5000);
        // vider les champs du formulaire
       
    
      }else{
        console.log('Response from Flask API:', response);
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
    const cleanedValue = name === 'phone_number' ? removeSpaces(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: cleanedValue,
    }));
  };











  const handleInputBlur = async (e) => {
    // Effectuer d'autres traitements avec la valeur saisie lorsque l'utilisateur quitte l'input


    e.preventDefault();
   // const { name, value } = e.target;



    const cleanedValue = removeSpaces(formData.phone_number);


    if (!validateBeninPhoneNumber(formData.phone_number)|| formData.phone_number==='') {
     
      setAlert({ message: 'Veuillez entrer un numéro de telephone valide.', color: 'danger' });
      setTimeout(() => {
        setAlert({ message: '', color: '' });
       }, 2000);  
    //setVisitedFields({ ...visitedFields, email: true });
    return;
  }




    try {
     
      const response = await fetch( prefix_link+'/client_by_phone/'+cleanedValue, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
       
      });
 const data = await response.json();
      if (response.status ===404) {
        //Aucun client avec ce numero de telephone
      // 
        //console.log(`Response from flask API: `, data);
document.getElementById('institute_name').value = '';
document.getElementById('ifu').value = '';
document.getElementById('email').value = '';
document.getElementById('address').value = '';
setIsExistingMoralClient(false);
      }

      if (response.status ===200) {
        //un client avec ce numero de telephone
       // const data = await response.json();
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
setAlert({ message:  `le client ${data.customer.institute_name} existe deja avec ce numero de telephone.Veuillez changer le numero de telephone` , color: 'danger' });
//
setTimeout(() => {
//setAlert({ message: '', color: '' });
}, 10000);
// desactiver le bouton enregistrer

setIsExistingMoralClient(true);

} else{
setIsExistingMoralClient(true);
setAlert({ message: 'Ce numero est deja enregistrer pour un client de type physique.Veuillez changer le numero de telephone', color: 'primary' });
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
         type='number'
         value={FormData.phone_number}
          name="phone_number"
          id="phone_number"
          placeholder=""
          onChange={handleInputChange} 
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}

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
          onKeyDown={handleKeyDown}

          
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
          onKeyDown={handleKeyDown}
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
          onKeyDown={handleKeyDown}

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
