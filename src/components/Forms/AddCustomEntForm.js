import React from 'react';
import  { useState } from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Button , Spinner} from 'reactstrap';
import { prefix_link } from 'variables/globalesVar';

function MyFormEnt() {



  const [formData, setFormData] = useState({
    // Initial state of your form data
    first_name: '',
    ifu_number: '',
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
//verifier si le numero n'existe pas
      if (data== null) {
// ne rien faire , laisser le user remplir et oumettre le formulaire normalement
      }

//VERIFIER LE TYPE DU CLIENT
if (data.customer_type_id === "physique") {
// PRE-REMPLIRE LE FORMULAIRE SI LE CLIENT EST PHYSIQUE
setFormData((prevData) => ({
...prevData,
first_name: data.first_name,
last_name: data.last_name,
// Ajoutez d'autres champs à pré-remplir
}));
}

if (data.customer_type_id === "morale") { 
//RENVOYER UN MESSAGE SI LE CLIENT EST MORAL 
console.log('Le client est moral');

}





    } catch (error) {
      console.error('Error sending data to Flask API:', error.message);
    }finally {
      setLoading(false); // Mettre l'état de chargement à false après la réponse (qu'elle soit réussie ou non)
    }














    // Récupérer la valeur saisie


// Loguer la valeur dans la console
console.log(`${name}: ${value}`);

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
      disabled={loading}>
      {loading ? <Spinner size="sm" color="light"/> : 'ENREGISTRER'}
      </Button>
      </FormGroup>
      </Row>
      
    </Form>
  );
}

export default MyFormEnt;
