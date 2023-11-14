import React from 'react';
import  { useState } from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';

function MyForm() {
  
    const [formData, setFormData] = useState({
      // Initial state of your form data
      first_name: '',
      last_name: '',
      gender: '',
      ifu: '',
      phone_number: '',
      
      address: '',
      
      customer_type_id:'45e12cdf-a6ea-4760-8a0a-d7cc37461d7b'
     
      // ...
    });
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        setLoading(true);
        const response = await fetch('https://ae94-41-79-217-130.ngrok-free.app/api/v1/client', {
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
  


  return (
    <Form>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="firt_name">
              NOM
            </Label>
            <Input
            type='text'
              value={FormData.first_name}
              name="first_name"
              id="first_name"
              placeholder="..."
              onChange={handleInputChange} 
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
               value={FormData.last_name}
              name="last_name"
              id="last_name"
              placeholder="..."
              onChange={handleInputChange} 
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
    >
     <option value={'homme'}>HOMME</option>
      <option value={'femme'}>FEMME</option>
     
    </Input>
  </FormGroup>
  <FormGroup>
            <Label for="ifu">
              NUMERO IFU
            </Label>
            <Input
              value={FormData.ifu}
              name="ifu"
              id="ifu"
              placeholder=""
              onChange={handleInputChange} 
            />
          </FormGroup>
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
          required
        />
      </FormGroup>

     

     

      <FormGroup>
        <Label for="date_of_birth">
          DATE DE NAISSANCE
        </Label>
        <Input
        type='date'
         value={FormData.date_of_birth}
          name="date_of_birth"
          id="date_of_birth"
          placeholder=""
          onChange={handleInputChange} 
        />
      </FormGroup>

      

      <FormGroup>
        <Label for="address">
          ADRESSE
        </Label>
        <Input
         value={FormData.address}
          name="address"
          id="address"
          placeholder=""
          onChange={handleInputChange} 
          required
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
      disabled={loading}>
         {loading ? <Spinner size="sm" color="light" /> : 'ENREGISTRER'}
      </Button>
      </FormGroup>
      </Row>
      
    </Form>
  );
}

export default MyForm;
