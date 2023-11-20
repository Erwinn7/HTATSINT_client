import React from 'react';
import  { useState } from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Button, Spinner, Alert } from 'reactstrap';
import { prefix_link } from "variables/globalesVar";

const  AddUserForm = () =>{
  
    const [formData, setFormData] = useState({
      // Initial state of your form data
      first_name: '',
      last_name: '',
      password: '',
      confirmpassword: '',
      type: '',
      email: ''
      
      // ...
    });
    const [loading, setLoading] = useState(false);
    const [Alert, setAlert] = useState({ message: '', color: '' });

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        setAlert({ message: 'Les mots de passe ne correspondent pas.', color: 'danger' });
        return;
      }
  
      try {
        setLoading(true);
        const response = await fetch( prefix_link+'/api/v1/clients', {
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
        setAlert({ message: 'Utilisateur créé avec succès.', color: 'success' });
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
    <div> 
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
              placeholder=""
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
              placeholder=""
              onChange={handleInputChange} 
              required
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
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
         
          required
        />
      </FormGroup>

      <FormGroup>
        <Label for="password">
         MOT DE PASSE
        </Label>
        <Input
        type='password'
         value={FormData.password}
          name="password"
          id="password"
          placeholder="entrez votre mot de passe"
          onChange={handleInputChange} 
         
          required
        />
      </FormGroup>

      <FormGroup>
        <Label for="confirmpassword">
         CONFIRMATION MOT DE PASSE
        </Label>
        <Input
        type='password'
         value={FormData.confirmpassword}
          name="confirmpassword"
          id="confirmpassword"
          placeholder="confirmez votre mot de passe"
          onChange={handleInputChange} 
         
          required
        />
      </FormGroup>
    <Label for="type">
      PROFIL
    </Label>
    <Input
    value={FormData.type}
      id="type"
      name="type"
      type="select"
      onChange={handleInputChange} 
    >
     <option value={'homme'}>ADMIN</option>
      <option value={'femme'}>RECEPTIONNISTE</option>
     
    </Input>
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
    {alert.message && <Alert color={alert.color}>{alert.message}</Alert>}
    </div>
  );
}

export default AddUserForm;
