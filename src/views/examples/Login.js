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
  
} from "reactstrap";

const Login = () => {
  return (
    <>
     <Row className="py-7">
     <div className="col-md-7 col-lg-6">
     <Card className="border-1 border-white shadow rounded-6">
         
          <div className="m-1">
           
            <img src={
                      require("../../assets/img/theme/img3.jpg")
                       
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
                    placeholder="Nom d'utilisateur"
                    type="email"
                    autoComplete="new-email"
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
                    placeholder="Mot de passe"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
            
              <div className="text-center">
                <Button className="mt-4" color="primary" type="button">
                 Connexion
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
       
      </div>
      </Row>
    </>
  );
};

export default Login;
