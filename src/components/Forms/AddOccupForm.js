import React, {useEffect, useState} from "react";
import {Container, Form, Button, Row, Col, FormGroup,Label,Input,Spinner } from "reactstrap";
import 'assets/css/roomDesign.css'
import DataTable from "react-data-table-component";




const AddOccupForm = ({roomSelected,dateArrivee, dateDepart}) => {

// Obtenir la date d'aujourd'hui au format 'YYYY-MM-DD'
const thisDay = new Date().toISOString().split('T')[0];

const [save, setSave] = useState(true)
const [ctrlSoumission, setCtrlSoumission] = useState("")
const initOccupants = {
        room_id: roomSelected,
        client_name : "",
        startDate : dateArrivee,
        endDate : dateDepart,
        firstname : "",
        lastname : "",
        Telephone : "",
        Addresse : "",
        birthday : "",
        profession : "",
        pieceType : "",
        pieceNumber : "",
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

//   const [roomType, setRoomType] = useState([]);
//   const [ctrlSoumission, setCtrlSoumission] = useState("")
//   const [save, setSave] = useState(true)
//   const initdataR = {
//                     room_label: "",
//                     room_amount: 0, 
//                     room_category_id: "",
//                     room_item_label: ""
//                     }
//   const [dataR, setdataR] = useState({...initdataR})


useEffect(() => {
 console.log("r")

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
      selector : row  => row.lastname,
      sortable : true
    },
    {
      name : "Prénom",
      selector : row  => row.firstname,
      sortable : true
    },
    {
      name : "Tel",
      selector : row  => row.Telephone,     
      sortable : true
    }
  ]

  const Submit = (e) => {
    e.preventDefault();

    if (Ctrl_Soumission()) {
      console.log(occupants);

      const newOccupant = [...occupants,unOccupant]
      setOccupants(newOccupant)
      console.log(newOccupant);
      setUnOccupant({...initOccupants})
      setCtrlSoumission("");
    } else{
      return;
    }
    
  }

  const handleAllSubmit = (e) => {
    setSave(false)
    e.preventDefault();

    if (occupants.length > 0) {
      // envoie de l'objet occupants vers la base de donnée


     setSave(true)
    } else {
      setCtrlSoumission("Veuiller Ajouter au moins un Occupant");
      setSave(true)
    }





  };


  const Ctrl_Soumission = () =>  {
    if ( !unOccupant.room_id || !unOccupant.client_name || !unOccupant.startDate || !unOccupant.endDate || !unOccupant.firstname || !unOccupant.lastname || !unOccupant.Telephone || !unOccupant.Addresse || !unOccupant.birthday || !unOccupant.profession || !unOccupant.pieceType || !unOccupant.pieceNumber || !unOccupant.motif   ){
        setCtrlSoumission("Veuiller remplir le tout les champs");
        return false;
    } else {
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
                  <Label for="client_name">
                    Client : 
                  </Label>
                  <Input
                    id="client_name"
                    name="client_name"
                    value={unOccupant?.client_name}
                    onChange={(e) => handleChange(e)} 
                    type="select"
                  >
                    <option value="" >Sélectionnez un Client</option>
                    <option value="Client1" >Client 1</option>
                    <option value="Client2" >Client 2</option>

                    {/* {                   
                      roomType.data?.map((room)  => (
                        <option key={room.id} value={room?.id}>
                          {room?.room_category_label}
                        </option>
                      ))
                    }  */}
                  </Input>
                </FormGroup> 
            </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <FormGroup >
                    <Label for="startDate" bsSize="sm" >
                        Arrivée : 
                    </Label>
                    <Input bsSize="sm" 
                        id="startDate"
                        name="startDate"
                        type="datetime-local"
                        value={unOccupant?.startDate}
                        onChange={(e) => handleChange(e)} 
                        min={thisDay}
                        disabled/>
                    </FormGroup>
                </Col>

                <Col sm={6}>
                <FormGroup >
                <Label for="endDate" bsSize="sm" >
                     Départ :
                </Label>
                <Input bsSize="sm" 
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    value={unOccupant?.endDate}
                    onChange={(e) => handleChange(e)} 
                    min={thisDay}
                    disabled/>
                </FormGroup>
                </Col>
                </Row>
            <p > Information de l'occupant  </p>
            <div  className="p-3 mb-5" style={{border: '1px solid black'}}>
                <Row>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="lastname" bsSize="sm" >
                            Nom
                        </Label>
                        <Input bsSize="sm" 
                            id="lastname"
                            name="lastname"
                            placeholder="Nom "
                            type="text"
                            value={unOccupant?.lastname}
                            onChange={(e) => handleChange(e)} 
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="firstname" bsSize="sm" >
                            Prénom
                        </Label>
                        <Input bsSize="sm" 
                            id="firstname"
                            name="firstname"
                            placeholder="Prénom"
                            type="text"
                            value={unOccupant?.firstname}
                            onChange={(e) => handleChange(e)} 
                            />
                        </FormGroup>
                    </Col>
                </Row>  
                <Row>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="Telephone" bsSize="sm" >
                            Tel : 
                        </Label>
                        <Input bsSize="sm" 
                            id="Telephone"
                            name="Telephone"
                            placeholder="+229 00 00 00 00"
                            type="text"
                            value={unOccupant?.Telephone}
                            onChange={(e) => handleChange(e)} 
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="Addresse" bsSize="sm" >
                            Addresse
                        </Label>
                        <Input bsSize="sm" 
                            id="Addresse"
                            name="Addresse"
                            placeholder="Calavi"
                            type="text"
                            value={unOccupant?.Addresse}
                            onChange={(e) => handleChange(e)} 
                            />
                        </FormGroup>
                    </Col>
                </Row> 
                <Row>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="birthday" bsSize="sm" >
                            Date de naissance : 
                        </Label>
                        <Input bsSize="sm" 
                            id="birthday"
                            name="birthday"
                            placeholder="birthday"
                            type="date"
                            value={unOccupant?.birthday}
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
                            placeholder="Banquier"
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
                        <Label for="pieceType" bsSize="sm" >
                            Type de Piece : 
                        </Label>
                        <Input bsSize="sm" 
                            id="pieceType"
                            name="pieceType"
                            placeholder="Select un type"
                            type="select"
                            value={unOccupant?.pieceType}
                            onChange={(e) => handleChange(e)} 
                            >
                        <option value="" >Sélectionnez un Type</option>
                        <option value="CIP" >CIP</option>
                        <option value="ID_card" >Carte d'identite</option>
                        <option value="ID_card_CEDAO" >Carte d'identite biométrique</option>
                        <option value="PASSPORT" >Passport</option>

                        </Input>
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="pieceNumber" bsSize="sm" >
                        N° de la piece :
                        </Label>
                        <Input bsSize="sm" 
                            id="pieceNumber"
                            name="pieceNumber"
                            placeholder="000000000"
                            type="number"
                            value={unOccupant?.pieceNumber}
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
                    { (ctrlSoumission === "" && save === true) ? <span></span> : <p  style={{ color: 'red' , fontSize: '12px'}}>{ctrlSoumission}</p> }
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
        { (ctrlSoumission === "" && save === false) ? <span></span> : <p  style={{ color: 'red' , fontSize: '12px'}}>{ctrlSoumission}</p> }

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