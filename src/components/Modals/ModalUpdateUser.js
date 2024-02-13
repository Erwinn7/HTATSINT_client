import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Col, ModalFooter, Button, FormGroup, Label, Input,Alert, Spinner } from 'reactstrap';
import { prefix_link } from "variables/globalesVar";

const ModalForm = ({ ouvert, toggle, selectedUser }) => {
    console.log('selectedUser', selectedUser);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', color: '' });
 // console.log('selectedUser', selectedUser);
  // Créer un état local pour les champs du formulaire
  const [formData, setFormData] = useState({
    
    first_name: selectedUser?.first_name || '',
    last_name: selectedUser?.last_name || '',
    role_name: selectedUser?.role || '',
    email: selectedUser?.email || '',
   
    id_employee: selectedUser?.id_employee || '',
    id_user: selectedUser?.id_user || '',
    id_role: selectedUser?.id_role || '',
  });



 /* function convertirFormatDate(dateString) {
    const date = new Date(dateString);
    const annee = date.getFullYear();
    const mois = (date.getMonth() + 1).toString().padStart(2, '0'); // Ajoute un zéro devant si nécessaire
    const jour = date.getDate().toString().padStart(2, '0'); // Ajoute un zéro devant si nécessaire
  
    const dateFormatee = `${annee}-${mois}-${jour}`;
    return dateFormatee;
  }*/
 
  // Mettre à jour les champs du formulaire lorsque selectedUser change
  useEffect(() => {
    setFormData({
     
      first_name: selectedUser?.first_name || '',
      last_name: selectedUser?.last_name || '',
      
      email: selectedUser?.email || '',
      // utiliser la fonction convertirFormatDate pour formater la date
     
     // //date_of_birth: selectedUser?.dateOfBirth || '',
      role_name: selectedUser?.role || '',
      id_employee: selectedUser?.id_employee || '',
      id_user: selectedUser?.id_user || '',
      id_role: selectedUser?.id_role || '',
    });
  }, [selectedUser]);

  // Gérer les modifications des champs du formulaire
  const handleInputChange = (e) => {
    

    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async () => {
   
    async function updateUser    ()  {
      console.log('formData544545', formData);
      const token = localStorage.getItem('accessToken');
     try {
        console.log('formDataugvk', formData);
      setLoading(true);
       const response = await fetch(prefix_link+'/user', {
         method: 'PUT',
         headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
         body: JSON.stringify(formData),
       });

      
if (response.status===200) {
       const data = await response.json();
       console.log('Response from API:', data);
       //afficher une alerte de succes
       // Afficher une alerte de succès
       setLoading(false);
       setAlert({ message: 'Mise a jour réussie !', color: 'success' });
       setTimeout(() => {
          setAlert({ message: '', color: '' });
           toggle();
       }, 5000);
      
      }
      if (response.status===409){
        setAlert({ message: 'Mise a jour echouée ! Email existe deja', color: 'danger' });
        setTimeout(() => {
          setAlert({ message: '', color: '' });
           toggle();
       }, 5000);
        setLoading(false);
        // Gérer l'erreur
      }
       // fermer le modal en mettant les donnees des tablaux

       
     } catch (error) {
       console.error('Error updating client data:', error);
       setAlert({ message: 'Mise a jour echouée !', color: 'danger' });
       setTimeout(() => {
        setAlert({ message: '', color: '' });
         toggle();
     }, 5000);
       setLoading(false);
       // Gérer l'erreur
     }
   };

   
   updateUser();
  };

  return (
    <Modal isOpen={ouvert} toggle={toggle}>
     {alert.message && <Alert color={alert.color}>{alert.message}</Alert>}
      <ModalHeader toggle={toggle}>Modifier un  utilisateur </ModalHeader>
     
      <ModalBody>
        {/* Formulaire avec les champs pré-remplis */}
     
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              required
            />
          </>
        </FormGroup>
       
        
        <FormGroup >
          <Label for="namee" >
            PROFIL
          </Label> <br></br>
          <>
          <Input
    value={formData.role_name}
      id="role_name"
      name="role_name"
      type="select"
      onChange={handleInputChange} 
    >
    <option value={''}>CHOISIR UN PROFIL...</option>
     <option value={'admin'}>ADMIN</option>
      <option value={'receptionniste'}>RECEPTIONNISTE</option>
     
    </Input>
          </>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button color="primary" type="submit"  onClick={handleSubmit} disabled={loading}>
            {loading ? <Spinner size="sm" color="light" /> : 'ENREGISTRER'}

            </Button>
          </Col>
        </FormGroup>
      
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Fermer
        </Button>
      </ModalFooter>  
          {alert.message && <Alert color={alert.color}>{alert.message}</Alert>}

    </Modal>
  );
};

export default ModalForm;
