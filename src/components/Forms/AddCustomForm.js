
import  { useState,React  } from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Button, Spinner , Alert } from 'reactstrap';
import { prefix_link } from "variables/globalesVar";

function MyForm() {
  const [isExistingPhysiqueClient, setIsExistingPhysiqueClient] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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
      customer_type_id:'fd26597d-6a0a-4497-81b2-1612e7fa07c4'
     
      // ...
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', color: '' });
    
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        setLoading(true);
        const response = await fetch( prefix_link+'/api/v1/client', {
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
          //mettre une logique pour que la page soit rafraichie avec useEffect
         setPaymentSuccess(true);


          //
          setTimeout(() => {
            setAlert({ message: '', color: '' });
          }, 5000);
          // vider les champs du formulaire
          document.getElementById('phone_number').value = '';
          document.getElementById('first_name').value = '';
          document.getElementById('last_name').value = '';
          document.getElementById('gender').value = '';
          document.getElementById('ifu').value = '';
          document.getElementById('email').value = '';
          document.getElementById('date_of_birth').value = '';
          document.getElementById('address').value = '';
// fermer la modal
          

        }else{
          setAlert({ message:  `Erreur!Contacter le service technique` , color: 'danger' });
          //
          setTimeout(() => {
            setAlert({ message: '', color: '' });
          }, 5000);
        }
       // const data = await response.json();
       // console.log('Response from Flask API:', data);

        
      } catch (error) {
        setAlert({ message:  `Erreur Serveur` , color: 'danger' });
//
setTimeout(() => {
  setAlert({ message: '', color: '' });
}, 5000);
        console.error('Error sending data to Flask API:', error.message);
         // vider les champs du formulaire
         document.getElementById('phone_number').value = '';
         document.getElementById('first_name').value = '';
         document.getElementById('last_name').value = '';
         document.getElementById('gender').value = '';
         document.getElementById('ifu').value = '';
         document.getElementById('email').value = '';
         document.getElementById('date_of_birth').value = '';
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
          document.getElementById('first_name').value = '';
  document.getElementById('last_name').value = '';
  document.getElementById('gender').value = '';
  document.getElementById('ifu').value = '';
  document.getElementById('email').value = '';
  document.getElementById('date_of_birth').value = '';
  document.getElementById('address').value = '';
  setIsExistingPhysiqueClient(false);
        }

        if (response.status ===200) {
          //un client avec ce numero de telephone
          const data = await response.json();
          console.log('Response from Flask API:', data);
          console.log(`${name}: ${value}`);
if (data.type_customer.type_custormer=== "Physique") {
// PRE-REMPLIRE LE FORMULAIRE
 
  document.getElementById('first_name').value = data.customer.first_name;
  document.getElementById('last_name').value = data.customer.last_name;
  //document.getElementById('gender').value = data.customer.gender;
  document.getElementById('ifu').value = data.customer.ifu;
  document.getElementById('email').value = data.customer.email;
  //document.getElementById('date_of_birth').value = data.customer.date_of_birth;
  document.getElementById('address').value = data.customer.address;
  // ENVOI D'ALERTE
  setAlert({ message:  `le client ${data.customer.last_name} ${data.customer.first_name} existe deja avec ce numero de telephone` , color: 'danger' });
//
setTimeout(() => {
  setAlert({ message: '', color: '' });
}, 10000);
// desactiver le bouton enregistrer

setIsExistingPhysiqueClient(true);

} else{
  setIsExistingPhysiqueClient(true);
  setAlert({ message: 'Ce numero est deja enregistrer pour un client de type moral.', color: 'primary' });

}

        }

      } catch (error) {
        console.error('Error sending dataaaa to Flask API:', error.message);
        setAlert({ message: 'Erreur serveur.Contacter le service technique.', color: 'danger' });
        document.getElementById('phone_number').value = '';
        setTimeout(() => {
          setAlert({ message: '', color: '' });
        }, 5000);
        console.log(`${name}: ${value}`);
        setFormData ({
    
          first_name: '',
          last_name: '',
         gender: '',
          ifu: '',
          email:'',
          date_of_birth: '',
          address: ''
          
        })
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
            <Label for="email">
              EMAIL
            </Label>
            <Input
              value={FormData.email}
              name="email"
              id="email"
              placeholder=""
              onChange={handleInputChange} 
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
