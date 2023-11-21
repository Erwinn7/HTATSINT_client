import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Alert , Spinner} from 'reactstrap';
import { prefix_link } from "variables/globalesVar";

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    name:'',
    hashed_password: '',
    email: '',
  });

  const [alert, setAlert] = useState({ message: '', color: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [loading, setLoading] = useState(false);

 
    
  

    // Appel à votre API pour enregistrer l'utilisateur (remplacez cela par votre propre logique)
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (formData.hashed_password !== formData.confirmPassword) {
        setAlert({ message: 'Les mots de passe ne correspondent pas.', color: 'danger' });
        return;
      };
  
      try {
        setLoading(true);
        const response = await fetch( prefix_link+'/api/v1/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.status === 201) {
          const users_data = await response.json();
          setAlert({ message: 'Utilisateur créé avec succès.', color: 'success' });
          setFormData({
            first_name: '',
    last_name: '',
    name:'',
    hashed_password: '',
    email: '',
          });
          console.log('Response from Flask API:', users_data);
         //throw new Error('Network response was not ok');
        } else{
          setFormData({
            first_name: '',
    last_name: '',
    name:'',
    hashed_password: '',
    email: '',
          });
        }
        setAlert({ message: 'Cet utilisateur existe deja . ', color: 'danger' });
        //setTimeout(() => {
         // window.location.reload();
      //  }, 10000);
        const status = response.status;
        console.error('La requête a échoué avec le statut:', response);
       // console.error('Error sending data to Flask API:', response.message);
       
      }catch (error) {
        setFormData({
          first_name: '',
  last_name: '',
  name:'',
  hashed_password: '',
  email: '',
        });
        setAlert({ message: 'Defaut de connexion au serveur.Contacter service technique ', color: 'danger' });
       // setTimeout(() => {
        //  window.location.reload();
       // }, 10000);
     //  const status = response.status;
       //console.error('La requête a échoué avec le statut:', status);
        console.error('Error sending data to Flask API:', error.message);
      }finally {
        setLoading(false); // Mettre l'état de chargement à false après la réponse (qu'elle soit réussie ou non)
      }
    };
    // Réinitialisation du formulaire et de l'alerte après l'enregistrement réussi
  


return (
      <div>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup >
          <Label for="first_name">
            NOM
          </Label> <br></br>
          <>
            <Input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="Entrez votre nom"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </>
        </FormGroup>
        <FormGroup >
          <Label for="last_name" >
            PRENOMS
          </Label> <br></br>
          < >
            <Input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Entrez votre prenom "
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </>
        </FormGroup>
        <FormGroup >
          <Label for="email" >
            EMAIL
          </Label> <br></br>
          <>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Entrez votre adresse email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </>
        </FormGroup>
        <FormGroup >
          <Label for="password" >
            Mot de passe
          </Label> <br></br>
          <>
            <Input
              type="password"
              name="hashed_password"
              id="password"
              placeholder="Entrez le mot de passe"
              value={formData.hashed_password}
              onChange={handleChange}
              required
            />
          </>
        </FormGroup>
        <FormGroup >
          <Label for="confirmPassword" >
            Confirmer le mot de passe
          </Label> <br></br>
          <>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirmez le mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </>
        </FormGroup>
        <FormGroup >
          <Label for="username" >
            Profil
          </Label> <br></br>
          <>
          <Input
    value={FormData.name}
      id="type"
      name="type"
      type="select"
      onChange={handleChange} 
    >
     <option value={'admin'}>ADMIN</option>
      <option value={'admin'}>RECEPTIONNISTE</option>
     
    </Input>
          </>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button color="primary" type="submit"  onClick={handleSubmit} disabled={loading}>
            {loading ? <Spinner size="sm" color="light" /> : 'CREER UN UTILISATEUR'}

            </Button>
          </Col>
        </FormGroup>
      </Form>
      {alert.message && <Alert color={alert.color}>{alert.message}</Alert>}
    </div>
  );
};

export default CreateUserForm;
