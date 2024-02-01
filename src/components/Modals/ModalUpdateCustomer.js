import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Button, FormGroup, Label, Input,Alert, Spinner } from 'reactstrap';
import { prefix_link } from "variables/globalesVar";

const ModalForm = ({ ouvert, toggle, selectedClient }) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', color: '' });
 // console.log('selectedClient', selectedClient);
  // Créer un état local pour les champs du formulaire
  const [formData, setFormData] = useState({
    phone_number: selectedClient?.customer.phoneNumber || '',
    first_name: selectedClient?.customer.firstName || '',
    last_name: selectedClient?.customer.lastName || '',
    gender: selectedClient?.customer.gender || 'homme',
    ifu: selectedClient?.customer.ifu || '',
    email: selectedClient?.customer.email || '',
    date_of_birth: selectedClient?.customer.dateOfBirth || '',
    address: selectedClient?.customer.address || '',
    id: selectedClient?.customer.id || '',
  });



  function convertirFormatDate(dateString) {
    const date = new Date(dateString);
    const annee = date.getFullYear();
    const mois = (date.getMonth() + 1).toString().padStart(2, '0'); // Ajoute un zéro devant si nécessaire
    const jour = date.getDate().toString().padStart(2, '0'); // Ajoute un zéro devant si nécessaire
  
    const dateFormatee = `${annee}-${mois}-${jour}`;
    return dateFormatee;
  }
 
  // Mettre à jour les champs du formulaire lorsque selectedClient change
  useEffect(() => {
    setFormData({
      phone_number: selectedClient?.customer.phoneNumber || '',
      first_name: selectedClient?.customer.firstName || '',
      last_name: selectedClient?.customer.lastName || '',
      gender: selectedClient?.customer.gender || 'homme',
      ifu: selectedClient?.customer.ifu || '',
      email: selectedClient?.customer.email || '',
      // utiliser la fonction convertirFormatDate pour formater la date
      date_of_birth: convertirFormatDate(selectedClient?.customer.dateOfBirth) || '',
     // //date_of_birth: selectedClient?.customer.dateOfBirth || '',
      address: selectedClient?.customer.address || '',
      id : selectedClient?.customer.id || '',
    });
  }, [selectedClient]);

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
   
    async function updateClientData   ()  {
      console.log('formData', formData);
      const token = localStorage.getItem('accessToken');
     try {
      setLoading(true);
       const response = await fetch(prefix_link+'/customer', {
         method: 'PUT',
         headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
         body: JSON.stringify(formData),
       });

       if (!response.ok) {
         throw new Error('Failed to update client data');
         //setLoading(false);
       }

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

   
   updateClientData();
  };

  return (
    <Modal isOpen={ouvert} toggle={toggle}>
     {alert.message && <Alert color={alert.color}>{alert.message}</Alert>}
      <ModalHeader toggle={toggle}>Modifier un  client physique</ModalHeader>
     
      <ModalBody>
        {/* Formulaire avec les champs pré-remplis */}
        <FormGroup>
          <Label for="phone_number">NUMERO DE TELEPHONE**</Label>
          <Input
            type="number"
            value={formData.phone_number}
            name="phone_number"
            id="phone_number"
            placeholder=""
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="first_name">NOM</Label>
              <Input
                type="text"
                value={formData.first_name}
                name="first_name"
                id="first_name"
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="last_name">PRENOM</Label>
              <Input
                type="text"
                value={formData.last_name}
                name="last_name"
                id="last_name"
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="gender">GENRE</Label>
          <Input
            value={formData.gender}
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
          <Label for="ifu">NUMERO IFU</Label>
          <Input
            value={formData.ifu}
            name="ifu"
            id="ifu"
            placeholder=""
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="email">EMAIL</Label>
          <Input
            value={formData.email}
            name="email"
            id="email"
            placeholder=""
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="date_of_birth">DATE DE NAISSANCE</Label>
          <Input
            type="date"
            value={formData.date_of_birth}
            name="date_of_birth"
            id="date_of_birth"
            placeholder=""
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="address">ADRESSE</Label>
          <Input
            value={formData.address}
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
            type="hidden"
            value={'id_type'}
          />
        </FormGroup>

        <Row>
          <FormGroup>
            <Button type="reset" name="annuler" id="">
              ANNULER
            </Button>
          </FormGroup>
          <FormGroup>
            <Button onClick={handleSubmit} type="submit">
            {loading ? <Spinner size="sm" color="light" /> : 'ENREGISTRER'}
            </Button>
          </FormGroup>
        </Row>
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
