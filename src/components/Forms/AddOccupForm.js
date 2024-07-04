import React, {useEffect, useState} from "react";
import {Container, Form, Button, Row, Col, FormGroup,Label,Input,Spinner } from "reactstrap";
import 'assets/css/roomDesign.css'
import DataTable from "react-data-table-component";
import axios from "axios";
import { prefix_link } from "variables/globalesVar";



const AddOccupForm = ({room_id_occupation,dateArrivee, dateDepart,number_of_place}) => {

  const token = localStorage.getItem('accessToken');
  const user_id= localStorage.getItem('id'); 

const urlGetCustomer = prefix_link+"/clients";
const urlPostOccupant = prefix_link+"/occupant";
const urlPostInvoice = prefix_link+"/invoice";
const urlGetBookingByRoom = prefix_link + "/booking_by_room";

const [save, setSave] = useState(null)
const [num_occupant, setNum_occupant] = useState(0)
const [roomBookings, setRoomBookings] = useState({})
const [customers, setCustomers] = useState([])
const [ctrlSoumission, setCtrlSoumission] = useState("")
const  [thisDay, setThisDay] =  useState(new Date());
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
        booking_id : "",
        user_id : user_id
      }


const [unOccupant, setUnOccupant] = useState({...initOccupants})
const [occupants, setOccupants] = useState([])
const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', 
      'Authorization': `Bearer ${token}`,
    },
  };


  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0, donc ajoutez 1
    const year = date.getFullYear();
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    console.log(formattedDate);
  
    return formattedDate;
  };

  const formatDateWithhours = (dateString) => {
    return dateString + 'T00:00:01';
  };

useEffect(() => {
  const token = localStorage.getItem('accessToken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', 
      'Authorization': `Bearer ${token}`,
    },
  };
  const queryObj ={
    room_id: room_id_occupation,
    start_date: dateArrivee,
    end_date: dateDepart
  }
  
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(urlGetCustomer,config);

        setCustomers(response.data);
       //  console.log(response.data) ;
        setSave(true);        
      } catch (error) {
        console.error('Erreur lors de la requête GET', error);
        setSave(true);
      }
    };

    const fetchBookingByRoom = async () => {

      try {
        const response = await axios.post(urlGetBookingByRoom,queryObj , config);
        setRoomBookings(response.data);  
        setUnOccupant(
          {...unOccupant, 
          booking_id : response.data[0].booking?.id,
          customer_id : response.data[0].customer?.id,
        }
        )
            
        console.log("les reservation de la room",response.data);
        setSave(true);
      } catch (error) {
        console.error('Erreur lors de la requête GET', error);
        setSave(true);
      }
    }


    fetchCustomer();
    fetchBookingByRoom();


    }, []); 



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
           

    if (Ctrl_Soumission() && num_occupant < number_of_place) {
      setUnOccupant({...unOccupant,
        start_date : roomBookings.booking?.start_date,
        end_date : roomBookings.booking?.end_date,
        date_of_birth : formatDateWithhours(unOccupant.date_of_birth),
      })
      const newOccupant = [...occupants,unOccupant]
      setOccupants(newOccupant)
      console.log(newOccupant);
      setUnOccupant({
        ...unOccupant,
        occupation_id: "",
        first_name : "",
        last_name : "",
        phone_number : "",
        address : "",
        date_of_birth : "",
        profession : "",
        type_of_document : "",
        document_number : "",
        motif : "",
      })
      setNum_occupant(num_occupant+1)
    } else{
      return;
    }
    
  }

  const handleAllSubmit = async (e) => {
    setSave(false)
    e.preventDefault();
    // var occupation_id_from_dtb = null;

    if (occupants.length > 0) {

   

    var occupation_id_from_dtb = null;

    const createInvoiceAndOccupants = async () => {
      try {

         // Envoie d'un occupant vers la base pour créer une facture
         console.log('objet envoyé pour invoice',occupants);
        const invoiceResponse = await axios.post(urlPostInvoice, occupants[0], config);
        console.log('Facture créée', invoiceResponse.data);
        
        // Récupérer l'id d'occupation
        occupation_id_from_dtb = invoiceResponse?.data.room_occupation.id;

        // Mise à jour de occupation_id dans tous les occupants
        occupants.forEach((itemToSend) => {
          itemToSend.occupation_id = occupation_id_from_dtb;
         });

        // Envoi de tous les occupants vers la base de données
        await Promise.all(occupants.map(async (itemToSend) => {
          try {
            console.log("itemToSend:", itemToSend);
            const res = await axios.post(urlPostOccupant, itemToSend, config);
            console.log("réponse occupant ajouté :", res.data);
          } catch (error) {
            console.error('Erreur lors de la requête POST', error);
          }
        }));

        setSave(true);
      } catch (error) {
        console.error('Erreur lors de la requête POST pour la facture', error);
        setSave(true);
      }
    };
      createInvoiceAndOccupants();
          
     setOccupants([])
    //  setCtrlSoumission("Les Occupants ont bien été enrégistrés");
     setSave(true)

    } else {
      setCtrlSoumission("Veuiller ajouter au moins un Occupant.");
      setSave(true)
    }

  };


  const Ctrl_Soumission = () =>  {

    if(roomBookings.length === 0){
      if ( !unOccupant.room_id || !unOccupant.customer_id || !unOccupant.start_date || !unOccupant.end_date || !unOccupant.first_name || !unOccupant.last_name || !unOccupant.phone_number || !unOccupant.address || !unOccupant.date_of_birth || !unOccupant.profession || !unOccupant.type_of_document || !unOccupant.document_number || !unOccupant.motif   ){
        setCtrlSoumission("Veuiller remplir le tout les champs");
        return false;
    } else {
        setCtrlSoumission("");
        return true;
    }
    }else{
      if ( !unOccupant.room_id || !unOccupant.start_date || !unOccupant.end_date || !unOccupant.first_name || !unOccupant.last_name || !unOccupant.phone_number || !unOccupant.address || !unOccupant.date_of_birth || !unOccupant.profession || !unOccupant.type_of_document || !unOccupant.document_number || !unOccupant.motif   ){
        setCtrlSoumission("Veuiller remplir le tout les champs");
        return false;
    } else {
        setCtrlSoumission("");
        return true;
    }
    }
    
    
  }

       return ( 
        <>
        {/* Page content */}
        <Container className="mt-1 " fluid>
          <Form onSubmit={(e)=> Submit(e)}  >
            <Row>
            <Col sm={12}>
                {
                  
                    roomBookings?.length > 0 ?
                      roomBookings.map((booking) => (
                        <FormGroup key={booking.booking_id} className="text-center" >
                          <Label for="booking_id">
                            RESERVATION  : 
                          </Label>
                          <div style={{color:"green", fontWeight:"bold"}} >
                          {
                            booking.customer?.institute_name ?
                            `${booking.customer?.institute_name.toUpperCase()} (${booking.customer?.phone_number}) Du ${formatDate(booking.booking?.start_date)} au ${formatDate(booking.booking?.end_date)}`
                            :
                            `${booking.customer?.last_name.toUpperCase()} ${booking.customer?.first_name.toUpperCase()} (${booking.customer?.phone_number}) Du ${formatDate(booking.booking?.start_date)} au ${formatDate(booking.booking?.end_date)}`
                          }
                          </div>
                        </FormGroup>
                      ))
                    :
                      <FormGroup>
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
                            customers.data?.map((customer) => (
                              <option key={customer.customer.id} value={customer.customer.id}>
                                {customer.customer.institute_name ? customer.customer.institute_name : `${customer.customer.last_name} ${customer.customer.first_name}`} - {customer.customer.phone_number}
                              </option>
                            ))
                          } 
                        </Input>
                      </FormGroup>
                }

                 
            </Col>
            </Row>
            <Row>

              {
                roomBookings?.length > 0 ?
                roomBookings.map((booking) => (
                    <>
                      <Col sm={6}>
                      <FormGroup >
                      <Label for="start_date" bsSize="sm" >
                          Arrivée : 
                      </Label>
                      <Input bsSize="sm" 
                          id="start_date"
                          name="start_date"
                          type="datetime-local"
                          value={booking?.booking.start_date}
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
                      value={booking?.booking.end_date}
                      disabled/>
                  </FormGroup>
                  </Col>
                
                    </>         
                 ))

                  :
                 <>
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
                      disabled/>
                  </FormGroup>
                  </Col>
                 </>
              }
                
              </Row>
            <div className="mb-2" color="red" > Information de l'occupant <strong className={num_occupant === number_of_place ? "text-danger" : "text-success"}> ({num_occupant}/{number_of_place}) </strong></div>
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
                            // placeholder="Nom "
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
                            // placeholder="Prénom"
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
                            //placeholder="+229 00 00 00 00"
                            type="number"
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
                            //placeholder="Dassa"
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
                            type="date"
                            value={unOccupant?.date_of_birth}
                            onChange={(e) => handleChange(e)} 
                            max = {thisDay}
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
                            // placeholder="Commerçant"
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
                            //placeholder="Select un type"
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
                            //placeholder="0123456789"
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

                {num_occupant === number_of_place ? 
                
                <Button color="gray" bsSize="sm"  onClick={(e) => Submit(e)} disabled>
                  Ajouter
                </Button>
                : 
                <Button color="success" bsSize="sm"  onClick={(e) => Submit(e)} >
                  Ajouter
                </Button>
                }                
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
         { (ctrlSoumission !== "" && save === false) ? <p style={{ color: 'red', fontSize: '12px' }}>{ctrlSoumission}</p> : <p style={{ color: 'green', fontSize: '12px' }}>{ctrlSoumission}</p>  }      

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