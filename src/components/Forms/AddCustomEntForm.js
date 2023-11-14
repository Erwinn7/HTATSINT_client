import React from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';

function MyFormEnt() {
  return (
    <Form>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="nom">
              NOM DE L'INSTITUT
            </Label>
            <Input
              
              name="nom"
              id="nom"
              placeholder="..."
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="numeroIfu">
              NUMERO IFU
            </Label>
            <Input
              
              name="numeroIfu"
              id="numeroIfu"
              placeholder="123456789"
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="telephone">
          NUMERO DE TELEPHONE
        </Label>
        <Input
        
          name="telephone"
          id="telephone"
          placeholder=""
        />
      </FormGroup>

     

      <FormGroup>
        <Label for="email">
          ADRESSE ELECTRONIQUE
        </Label>
        <Input
        type='email'
          name="email"
          id="email"
          placeholder="example@gmail.com"
        />
      </FormGroup>

      <FormGroup>
        <Label for="adresse">
          ADRESSE SIEGE
        </Label>
        <Input
        
          name="pays"
          id="pays"
          placeholder=""
        />
      </FormGroup>



      <FormGroup>
        <Label for="raisonSocial">
          RAISON SOCIAL
        </Label>
        <Input
        
          name="raisonSocial"
          id="raisonSocial"
          placeholder=""
        />
      </FormGroup>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="pays">
              A VOIR
            </Label>
            <Input
              name="city"
              id="pays"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="ville">
              A VOIR
            </Label>
            <Input
              name="ville"
              id="ville"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="contact_urgence">
              A VOIR
            </Label>
            <Input
              name="contact_urgence"
              id="contact_urgence"
            />
          </FormGroup>
        </Col>
      </Row>
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
      type='submit'>
         ENREGISTRER
      </Button>
      </FormGroup>
      </Row>
      
    </Form>
  );
}

export default MyFormEnt;
