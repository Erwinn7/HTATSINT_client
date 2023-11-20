import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Alert } from 'reactstrap';

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [alert, setAlert] = useState({ message: '', color: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification si les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
      setAlert({ message: 'Les mots de passe ne correspondent pas.', color: 'danger' });
      return;
    }

    // Appel à votre API pour enregistrer l'utilisateur (remplacez cela par votre propre logique)
    // Exemple : api.createUser(formData)
    // .then(response => {
    //   setAlert({ message: 'Utilisateur créé avec succès.', color: 'success' });
    // })
    // .catch(error => {
    //   setAlert({ message: 'Erreur lors de la création de l\'utilisateur.', color: 'danger' });
    // });

    // Réinitialisation du formulaire et de l'alerte après l'enregistrement réussi
    setFormData({
        first_name: '',
        last_name: '',
        email:'',
        password:'',
      confirmPassword: '',
    });

    setAlert({ message: 'Utilisateur créé avec succès.', color: 'success' });
  };

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
              name="password"
              id="password"
              placeholder="Entrez le mot de passe"
              value={formData.password}
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
            PROFIL
          </Label> <br></br>
          <>
          <Input
    value={FormData.type}
      id="type"
      name="type"
      type="select"
      onChange={handleChange} 
    >
     <option value={'homme'}>ADMIN</option>
      <option value={'femme'}>RECEPTIONNISTE</option>
     
    </Input>
          </>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button color="primary" type="submit">
              Créer l'utilisateur
            </Button>
          </Col>
        </FormGroup>
      </Form>
      {alert.message && <Alert color={alert.color}>{alert.message}</Alert>}
    </div>
  );
};

export default CreateUserForm;
