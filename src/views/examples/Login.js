import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Alert,
  Spinner
  
} from "reactstrap";
import { useState } from "react";
import { useNavigate, navigate } from 'react-router-dom';
import { prefix_link } from "variables/globalesVar";
import { timers } from "jquery";


const Login = () => {
  const navigate = useNavigate();

  const [alert, setAlert] = useState({ message: '', color: '' });
  const [formData, setFormData] = useState({
    // Initial state of your form data
    email: '',
    hashed_password: ''
   
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [loading, setLoading] = useState(false);
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    try {
      setLoading(true);
      const response = await fetch( prefix_link+'/api/v1/connexion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status===200) {
        const data_logger = await response.json();
        console.log('Response from Flask API:', data_logger);
  
          navigate('/admin/index');
        


      }else{
        //throw new Error('Network response was not ooook');
        const status = response.status;
        const errorMessage = await response.text();

        console.error('La requête a échoué avec le statut:', status);
        setAlert({ message: 'La connexion a echouer.Verifier votre email et le mot de passe puis reesayer.', color: 'danger' });
        setFormData((prevData) => ({
          email: '',
          hashed_password: ''
        }));
        setTimeout(() => {
          window.location.reload();
        }, 5000);
       // window.alert(`La connexion a echoue.Verifier votre email et/ou le mot de passe.Merci`);
  
      }

  


     
        //setAlert({ message: 'Les mots de passe ne correspondent pas.', color: 'danger' })

      
    } catch (error) {
      console.error('Error sending data to Flask API:', error.message);
      setAlert({ message: 'Erreur serveur. Reesayer ou contacter le service technique', color: 'danger' });
      setFormData((prevData) => ({
        email: '',
  hashed_password: ''
      }));
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }finally {
      setLoading(false); // Mettre l'état de chargement à false après la réponse (qu'elle soit réussie ou non)
    }
  };



  



















  return (
    <>
     <Row className="py-7">
     <div className="col-md-7 col-lg-6">
     <Card className="border-1 border-white shadow rounded-6">
         
          <div className="m-1">
           
            <img src={
                      require("assets/img/background/room.jpg")
                       
                    }
       className="img-fluid" alt=""/>
          </div>
        </Card>
     
     </div>
      <div className="col-md-7 col-lg-5 offset-lg-1">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent mt--1 pb-1">
          <div className="text-center text-primary text-uppercase">
            <h1>Connectez-vous</h1>
            </div>
            
          </CardHeader>
          <CardBody className="px-lg-2 py-lg-5">
           
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                  name="email"
                  onChange={handleInputChange} 
                    placeholder="votre email"
                    type="email"
                    autoComplete="new-email"
                    value={FormData.email}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                  name="hashed_password"
                  onChange={handleInputChange} 
                    placeholder="Mot de passe"
                    type="password"
                    autoComplete="new-password"
                    value={FormData.hashed_password}
                  />
                </InputGroup>
              </FormGroup>
            
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit"
                 onClick={handleSubmit}
                 disabled={loading}

                >
                {loading ? <Spinner size="sm" color="light" /> : 'CONNEXION'}
                </Button>
              </div>

            </Form>
            {alert.message && <Alert color={alert.color}>{alert.message}</Alert>}

          </CardBody>
        </Card>
       
      </div>
      </Row>
    </>
  );
};

export default Login;
