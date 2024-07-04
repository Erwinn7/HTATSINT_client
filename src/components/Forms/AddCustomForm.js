
import  { useState,React  } from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Button, Spinner , Alert } from 'reactstrap';
import 'assets/css/customerDesign.css';

import { prefix_link } from "variables/globalesVar";
//import GetClient from 'components/views/examples/Clients';
function MyForm() {
  const token = localStorage.getItem('accessToken');
  const id= localStorage.getItem('id');
  const [isExistingPhysiqueClient, setIsExistingPhysiqueClient] = useState(false);
  //const [paymentSuccess, setPaymentSuccess] = useState(false);
  //const [clients, setClients] = useState([]);
  

 

    const [formData, setFormData] = useState({
      // Initial state of your form data
      first_name: '',
      last_name: '',
      date_of_birth:'',
      gender: '',
      ifu: '',
      phone_number: '',
      email:'',
      address: '',
      customer_type_id:'c144bd80-fddd-4372-9836-833fa8f9d0c6',
       user_id : `${id}`
      // ...
    });

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
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', color: '' });
    
    const handleSubmit = async (e) => {
      e.preventDefault();
console.log(formData);

      if (!validateBeninPhoneNumber(formData.phone_number) || formData.phone_number ==='') {
     
        setAlert({ message: 'Veuillez entrer un numéro de telephone valide.', color: 'danger' });
        setTimeout(() => {
          setAlert({ message: '', color: '' });
          document.getElementById('first_name').value = '';
          document.getElementById('phone_number').value = '';
          document.getElementById('last_name').value = '';
          document.getElementById('gender').value = '';
          document.getElementById('email').value = '';

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
        const response = await fetch( prefix_link+'/client', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
           
          },
          body: JSON.stringify(formData),
        });
  
        if (response.status===201) {
          const data = await response.json();
          console.log('Response from Flask API:', data);
          setAlert({ message:  `Client enregistrer avec succes` , color: 'success' });
          //mettre une logique pour que la page soit rafraichie avec useEffect
         // Mise à jour de la liste des clients après l'ajout réussi
        

          //
          setTimeout(() => {
            setAlert({ message: '', color: '' });
          document.getElementById('phone_number').value = '';
          document.getElementById('first_name').value = '';
          document.getElementById('last_name').value = '';
          document.getElementById('gender').value = '';
          document.getElementById('email').value = '';
          }, 2000);
          
          

        }else{
          setAlert({ message:  `Erreur!Contacter le service technique` , color: 'danger' });
          //
          setTimeout(() => {
            setAlert({ message: '', color: '' });
          }, 2000);
        }
       // const data = await response.json();
       // console.log('Response from Flask API:', data);

        
      } catch (error) {
        setAlert({ message:  `Erreur Serveur` , color: 'danger' });
//
setTimeout(() => {
  setAlert({ message: '', color: '' });
  document.getElementById('phone_number').value = '';
  document.getElementById('first_name').value = '';
  document.getElementById('last_name').value = '';
  document.getElementById('gender').value = '';
  document.getElementById('email').value = '';
  
}, 2000);
        console.error('Error sending data to Flask API:', error.message);
         // vider les champs du formulaire
        
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

      const { name, value } = e.target;
      // enlever les espace du numero
      const cleanedValue = removeSpaces(formData.phone_number);
  // verifier si le numero de telephone est renseigner dans le champ
  console.log(formData.phone_number);
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
  
        if (response.status ===404) {
          //Aucun client avec ce numero de telephone
          //const data = await response.json();
          
  document.getElementById('first_name').value = '';
  document.getElementById('last_name').value = '';
  document.getElementById('gender').value = '';
  document.getElementById('email').value = '';
  setIsExistingPhysiqueClient(false);
        }

        if (response.status ===200) {
          //un client avec ce numero de telephone
          const data = await response.json();
          console.log('Response from Flask API:', data);
        //  console.log(`${name}: ${value}`);
if (data.type_customer.type_custormer=== "Physique") {
// PRE-REMPLIRE LE FORMULAIRE
 
  document.getElementById('first_name').value = data.customer.first_name;
  document.getElementById('last_name').value = data.customer.last_name;
  //document.getElementById('gender').value = data.customer.gender;
  document.getElementById('email').value = data.customer.email;

  // ENVOI D'ALERTE
  setAlert({ message:  `le client ${data.customer.last_name} ${data.customer.first_name} existe deja avec ce numero de telephone` , color: 'danger' });

  setTimeout(() => {
    setAlert({ message: '', color: '' });
   }, 2000);
//

// desactiver le bouton enregistrer

setIsExistingPhysiqueClient(true);

} else{
  setIsExistingPhysiqueClient(true);
 
  setAlert({ message: 'Ce numero est deja enregistrer pour un client de type moral.', color: 'primary' });

  setTimeout(() => {
    setAlert({ message: '', color: '' });
   }, 2000);

}

        }

      } catch (error) {
        console.error('Error sending dataaaa to Flask API:', error.message);
        setAlert({ message: 'Verifiez si vous avez bien renseigner le numero de telephone. Si le probleme persiste, contacter le service technique.', color: 'danger' });
        document.getElementById('phone_number').value = '';
        setTimeout(() => {
          setAlert({ message: '', color: '' });
          // vider le formulaire
          document.getElementById('phone_number').value = '';
          document.getElementById('first_name').value = '';
          document.getElementById('last_name').value = '';
          document.getElementById('gender').value = '';
          document.getElementById('email').value = '';
         

        }, 5000);
       
      
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
         NUMERO DE TELEPHONE**
        </Label>
        <Input
        type='numeric'
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
            <Label for="firt_name">
              NOM
            </Label>
            <Input
            type='text'
              value={FormData?.first_name}
              name="first_name"
              id="first_name"
              //placeholder="..."
              onChange={handleInputChange} 
              onKeyDown={handleKeyDown}

              required
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="last_name">
              PRENOM
            </Label>
            <Input
            type='text'
               value={FormData?.last_name}
              name="last_name"
              id="last_name"
             // placeholder="..."
              onChange={handleInputChange} 
              onKeyDown={handleKeyDown}
              required
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
    <Label for="gender">
      GENRE
    </Label>
    <Input
    value={FormData.gender}
      id="gender"
      name="gender"
      type="select"
      onChange={handleInputChange} 
      onKeyDown={handleKeyDown}

    >
     <option value={'HOMME'}>HOMME</option>
      <option value={'FEMME'}>FEMME</option>
     
    </Input>
  </FormGroup>
     
      
     
          <FormGroup>
            <Label for="email">
              EMAIL
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
            
            <Input
              name="type"
              id="type"
              type='hidden'
              value={'id_type'}
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
      disabled={loading || (isExistingPhysiqueClient )}
>
         {loading ? <Spinner size="sm" color="light" /> : 'ENREGISTRER'}
      </Button>
      </FormGroup>
      </Row>
      {alert.message && <Alert color={alert.color}>{alert.message}</Alert>}

    </Form>

  );
}

export default MyForm;
