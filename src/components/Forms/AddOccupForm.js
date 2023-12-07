import React, {useEffect, useState} from "react";
import {Container, Form, Button, Row, Col, FormGroup,Label,Input,Spinner } from "reactstrap";
import 'assets/css/roomDesign.css'
import DataTable from "react-data-table-component";
import axios from "axios";
import { prefix_link } from "variables/globalesVar";




const AddOccupForm = ({room_id_occupation,dateArrivee, dateDepart}) => {

const urlGetCustomer = prefix_link+"/api/v1/clients";
const urlPostOccupant = prefix_link+"/api/v1/occupant";
const urlPostInvoice = prefix_link+"/api/v1/invoice";

const [save, setSave] = useState(null)
const [customers, setCustomers] = useState([])
const [ctrlSoumission, setCtrlSoumission] = useState("")
const initOccupants = {
        room_id: room_id_occupation,
        occupation_id: "",
        customer_id : "",
        start_date : dateArrivee,
        end_date : dateDepart,
        first_name : "",
        last_name : "",
        phone_number : "",
        address : "",
        date_of_birth : "",
        profession : "",
        type_of_document : "",
        document_number : "",
        motif : "",
      }


const [unOccupant, setUnOccupant] = useState({...initOccupants})
const [occupants, setOccupants] = useState([])
const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', 
    },
  };


useEffect(() => {

    const fetchCustomer = async () => {
      try {
        const response = await axios.get(urlGetCustomer);

        setCustomers(response.data);
        console.log(response.data) ;
        setSave(true);        
      } catch (error) {
        console.error('Erreur lors de la requête GET', error);
        setSave(true);
      }
    };

    fetchCustomer();


    }, [urlGetCustomer]); 



  const handleChange = (e) => {
    const newdata = {...unOccupant}
    newdata[e.target.id] =  e.target.value;
    setUnOccupant(newdata)
    console.log(newdata)
  };

  const columns = [                                                      
    {
      name : "Nom",
      selector : row  => row.last_name,
      sortable : true
    },
    {
      name : "Prénom",
      selector : row  => row.first_name,
      sortable : true
    },
    {
      name : "Tel",
      selector : row  => row.phone_number,     
      sortable : true
    }
  ]

  const Submit = (e) => {
    e.preventDefault();
    if (Ctrl_Soumission()) {
      const newOccupant = [...occupants,unOccupant]
      setOccupants(newOccupant)
      console.log(newOccupant);
      setUnOccupant({...initOccupants})
    } else{
      return;
    }
    
  }

  const handleAllSubmit = async (e) => {
    setSave(false)
    e.preventDefault();
    var occupation_id_from_dtb = "";

    if (occupants.length > 0) {

      // envoice d'un occupant vers la base pour creation de facture 
      const sendUnOccupant = async () => {
        try {

          const response = await  axios.post(urlPostInvoice,occupants[0],config);
          console.log('Facture créer',response.data);
          occupation_id_from_dtb = response.data.room_occupation.id
          setSave(true);
          
        } catch (error) {
          console.error('Erreur lors de la requête POST', error);
          setSave(true); 
        }
      }
      sendUnOccupant();
     
    setTimeout(() => {

      // envoie de l'objet occupants vers la base de donnée
      occupants.forEach(async (itemToSend) => {

        itemToSend.occupation_id = occupation_id_from_dtb

        const sendOccupant = async () => {
          try {
            
            console.log(itemToSend)
            const res = await  axios.post(urlPostOccupant,itemToSend,config);
            console.log("les occupants: ",res.data);
            setSave(true); 

          } catch (error) {
            console.error('Erreur lors de la requête POST', error);
            setSave(true);
          }
        };
    
        sendOccupant();

      });

    }, 2000); // Attendre 2 secondes
 

      
     setOccupants([])
     setSave(true)

    } else {
      setCtrlSoumission("Veuiller ajouter au moins un Occupant");
      setSave(true)
    }

  };


  const Ctrl_Soumission = () =>  {
    if ( !unOccupant.room_id || !unOccupant.customer_id || !unOccupant.start_date || !unOccupant.end_date || !unOccupant.first_name || !unOccupant.last_name || !unOccupant.phone_number || !unOccupant.address || !unOccupant.date_of_birth || !unOccupant.profession || !unOccupant.type_of_document || !unOccupant.document_number || !unOccupant.motif   ){
        setCtrlSoumission("Veuiller remplir le tout les champs");
        return false;
    } else {
        setCtrlSoumission("");
        return true;
    }
  }

  return (
      <>
        {/* Page content */}
        <Container className="mt-1 " fluid>
          <Form onSubmit={(e)=> Submit(e)}  >
            <Row>
            <Col sm={12}>
                <FormGroup >
                  <Label for="customer_id">
                    Client : 
                  </Label>
                  <Input
                    id="customer_id"
                    name="customer_id"
                    value={unOccupant?.customer_id}
                    onChange={(e) => handleChange(e)} 
                    type="select"
                  >
                    <option value="" >Sélectionnez un Client</option>
                    {                   
                      customers.data?.map((customer)  => (
                        <option key={customer.customer.id} value={customer.customer.id}>
                          {customer.customer.institute_name ? customer.customer.institute_name : customer.customer.last_name + " "+ customer?.customer.first_name }  - {customer.customer.phone_number}
                        </option>
                      ))
                    } 
                  </Input>
                </FormGroup> 
            </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <FormGroup >
                    <Label for="start_date" bsSize="sm" >
                        Arrivée : 
                    </Label>
                    <Input bsSize="sm" 
                        id="start_date"
                        name="start_date"
                        type="datetime-local"
                        value={unOccupant?.start_date}
                        onChange={(e) => handleChange(e)} 
                        disabled/>
                    </FormGroup>
                </Col>

                <Col sm={6}>
                <FormGroup >
                <Label for="end_date" bsSize="sm" >
                     Départ :
                </Label>
                <Input bsSize="sm" 
                    id="end_date"
                    name="end_date"
                    type="datetime-local"
                    value={unOccupant?.end_date}
                    onChange={(e) => handleChange(e)} 
                    disabled/>
                </FormGroup>
                </Col>
                </Row>
            <p > Information de l'occupant  </p>
            <div  className="p-3 mb-5" style={{border: '1px solid black'}}>
                <Row>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="last_name" bsSize="sm" >
                            Nom
                        </Label>
                        <Input bsSize="sm" 
                            id="last_name"
                            name="last_name"
                            placeholder="Nom "
                            type="text"
                            value={unOccupant?.last_name}
                            onChange={(e) => handleChange(e)} 
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="first_name" bsSize="sm" >
                            Prénom
                        </Label>
                        <Input bsSize="sm" 
                            id="first_name"
                            name="first_name"
                            placeholder="Prénom"
                            type="text"
                            value={unOccupant?.first_name}
                            onChange={(e) => handleChange(e)} 
                            />
                        </FormGroup>
                    </Col>
                </Row>  
                <Row>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="phone_number" bsSize="sm" >
                            Tel : 
                        </Label>
                        <Input bsSize="sm" 
                            id="phone_number"
                            name="phone_number"
                            placeholder="+229 00 00 00 00"
                            type="text"
                            value={unOccupant?.phone_number}
                            onChange={(e) => handleChange(e)} 
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="address" bsSize="sm" >
                            Addresse
                        </Label>
                        <Input bsSize="sm" 
                            id="address"
                            name="address"
                            placeholder="Dassa"
                            type="text"
                            value={unOccupant?.address}
                            onChange={(e) => handleChange(e)} 
                            />
                        </FormGroup>
                    </Col>
                </Row> 
                <Row>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="date_of_birth" bsSize="sm" >
                            Date de naissance : 
                        </Label>
                        <Input bsSize="sm" 
                            id="date_of_birth"
                            name="date_of_birth"
                            type="datetime-local"
                            value={unOccupant?.date_of_birth}
                            onChange={(e) => handleChange(e)} 
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="profession" bsSize="sm" >
                        Profession
                        </Label>
                        <Input bsSize="sm" 
                            id="profession"
                            name="profession"
                            placeholder="Commerçant"
                            type="text"
                            value={unOccupant?.profession}
                            onChange={(e) => handleChange(e)} 
                            />
                        </FormGroup>
                    </Col>
                </Row> 
                <Row>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="type_of_document" bsSize="sm" >
                            Type de Pièce : 
                        </Label>
                        <Input bsSize="sm" 
                            id="type_of_document"
                            name="type_of_document"
                            placeholder="Select un type"
                            type="select"
                            value={unOccupant?.type_of_document}
                            onChange={(e) => handleChange(e)} 
                            >
                        <option value="" >Sélectionnez un Type</option>
                        <option value="CIP" >CIP</option>
                        <option value="ID_Card" >Carte d'identite</option>
                        <option value="ID_Card_CEDAO" >Carte d'identite biométrique</option>
                        <option value="PASSPORT" >Passport</option>

                        </Input>
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="document_number" bsSize="sm" >
                        N° de la piece :
                        </Label>
                        <Input bsSize="sm" 
                            id="document_number"
                            name="document_number"
                            placeholder="0123456789"
                            type="number"
                            value={unOccupant?.document_number}
                            onChange={(e) => handleChange(e)} 
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <FormGroup >
                        <Label for="motif" bsSize="sm" >
                            Motif : 
                        </Label>
                        <Input bsSize="sm" 
                            id="motif"
                            name="motif"
                            type="textarea"
                            value={unOccupant?.motif}
                            onChange={(e) => handleChange(e)} 
                            >
                        </Input>
                        </FormGroup>
                    </Col>
                </Row>
                { (ctrlSoumission !== "" && save === true) ? <p style={{ color: 'red', fontSize: '12px' }}>{ctrlSoumission}</p> : null }

                <Button color="success" bsSize="sm">
                  Ajouter
                </Button>
            </div>
          </Form>

          {/* liste des occupants */}

        {
            occupants && (
            <DataTable 
                title="Occupants"
                columns={columns}
                data={occupants}
                keyField="Tel"
                pagination > 
            </DataTable>)
        }
         { (ctrlSoumission !== "" && save === false) ? <p style={{ color: 'red', fontSize: '12px' }}>{ctrlSoumission}</p> : null }

        { 
                  
          save ? 
          <Button color="primary" onClick={(e) => handleAllSubmit(e)} >
            Enrégistrer
          </Button>
          :
          <Button color="primary" disabled >
              <Spinner bsSize="sm">
                  Loading...
              </Spinner>
              <span>
                  {' '} En cours
              </span>
          </Button>
        }
        </Container>
      </>
    );
  };
  
  export default AddOccupForm;