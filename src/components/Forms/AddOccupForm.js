import React, {useEffect, useState} from "react";
import {Container, Form, Button, Row, Col, FormGroup,Label,Input,Spinner } from "reactstrap";
import 'assets/css/roomDesign.css'
import DataTable from "react-data-table-component";




const AddOccupForm = () => {

// Obtenir la date d'aujourd'hui au format 'YYYY-MM-DD'
const today = new Date().toISOString().split('T')[0];

const [save, setSave] = useState(true)
const [ctrlSoumission, setCtrlSoumission] = useState("")
const [initoccupants, setInitOccupants] = useState([
    {
        room_id: "",
        client_name : "",
        startDate : "",
        endDate : "",
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
])
const [unOccupant, setUnOccupant] = useState([...initoccupants])
const [occupants, setOccupants] = useState([...initoccupants])




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
const [dates, setDates] = useState({
    startDate: '',
    endDate: '',
  });

useEffect(() => {

    // Obtenir la date d'aujourd'hui au format 'YYYY-MM-DD'
    const today = new Date().toISOString().split('T')[0];
    
    // Obtenir la date de demain au format 'YYYY-MM-DD'
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

    // Mettre à jour les dates dans l'état local
    setDates({
      startDate: today,
      endDate: tomorrowFormatted,
    });
    

  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDates((prevDates) => ({
      ...prevDates,
      [name]: value,
    }));
    //console.log(dates)
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
    setSave(false)
    e.preventDefault();

    if (Ctrl_Soumission()) {
      setOccupants([...occupants, {
        unOccupant
      }])
        
      setCtrlSoumission("");
    } else{
        setSave(true)
        return;
    }
    
  }

  const Ctrl_Soumission = () =>  {
    if ( !unOccupant.client_name || !unOccupant.startDate || !unOccupant.endDate || !unOccupant.firstname || !unOccupant.lastname || !unOccupant.Telephone || !unOccupant.Addresse || !unOccupant.birthday || !unOccupant.profession || !unOccupant.pieceType || !unOccupant.pieceNumber || !unOccupant.motif   ){
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
                    value={dates?.client_name}
                    onChange={handleChange}
                    type="select"
                  >
                    <option value="" >Sélectionnez un Client</option>
                    <option value="" >Client 1</option>
                    <option value="" >Client 2</option>

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
                    <Label for="startDate" size="sm" >
                        Arrivée : 
                    </Label>
                    <Input size="sm" 
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={dates?.startDate}
                        onChange={handleChange}
                        min={today}
                    />
                    </FormGroup>
                </Col>

                <Col sm={6}>
                <FormGroup >
                <Label for="endDate" size="sm" >
                     Départ :
                </Label>
                <Input size="sm" 
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={dates?.endDate}
                    onChange={handleChange}
                    min={today}

                />
                </FormGroup>
                </Col>
                </Row>
            <p > Information de l'occupant  </p>
            <div  className="p-3 mb-5" style={{border: '1px solid black'}}>
                <Row>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="firstname" size="sm" >
                            Nom
                        </Label>
                        <Input size="sm" 
                            id="firstname"
                            name="firstname"
                            placeholder="Nom "
                            type="text"
                            value={dates?.lastname}
                            onChange={handleChange}
                        />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="lastname" size="sm" >
                            Prénom
                        </Label>
                        <Input size="sm" 
                            id="lastname"
                            name="lastname"
                            placeholder="Prénom"
                            type="text"
                            value={dates?.firstname}
                            onChange={handleChange}
                        />
                        </FormGroup>
                    </Col>
                </Row>  
                <Row>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="Telephone" size="sm" >
                            Tel : 
                        </Label>
                        <Input size="sm" 
                            id="Telephone"
                            name="Telephone"
                            placeholder="+229 00 00 00 00"
                            type="text"
                            value={dates?.Telephone}
                            onChange={handleChange}
                        />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="Addresse" size="sm" >
                            Addresse
                        </Label>
                        <Input size="sm" 
                            id="Addresse"
                            name="Addresse"
                            placeholder="Calavi"
                            type="text"
                            value={dates?.Addresse}
                            onChange={handleChange}
                        />
                        </FormGroup>
                    </Col>
                </Row> 
                <Row>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="birthday" size="sm" >
                            Date de naissance : 
                        </Label>
                        <Input size="sm" 
                            id="birthday"
                            name="birthday"
                            placeholder="birthday"
                            type="date"
                            value={dates?.birthday}
                            onChange={handleChange}
                        />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="profession" size="sm" >
                        Profession
                        </Label>
                        <Input size="sm" 
                            id="profession"
                            name="profession"
                            placeholder="Banquier"
                            type="text"
                            value={dates?.profession}
                            onChange={handleChange}
                        />
                        </FormGroup>
                    </Col>
                </Row> 
                <Row>
                    <Col sm={6}>
                        <FormGroup >
                        <Label for="pieceType" size="sm" >
                            Type de Piece : 
                        </Label>
                        <Input size="sm" 
                            id="pieceType"
                            name="pieceType"
                            placeholder="Select un type"
                            type="select"
                            value={dates?.pieceType}
                            onChange={handleChange}
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
                        <Label for="pieceNum" size="sm" >
                        N° de la piece :
                        </Label>
                        <Input size="sm" 
                            id="pieceNum"
                            name="pieceNum"
                            placeholder="000000000"
                            type="text"
                            value={dates?.pieceNumber}
                            onChange={handleChange}
                        />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <FormGroup >
                        <Label for="motif" size="sm" >
                            Motif : 
                        </Label>
                        <Input size="sm" 
                            id="motif"
                            name="motif"
                            type="textarea"
                            value={dates?.motif}
                            onChange={handleChange}
                        >
                        </Input>
                        </FormGroup>
                    </Col>
                </Row>
                    {/* { ctrlSoumission === "" ? <span></span> : <p  style={{ color: 'red' , fontSize: '12px'}}>{ctrlSoumission}</p> } */}
                <Button color="success" size="sm">
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

           { save ? 
                <Button color="primary" >
                    Enrégistrer
                </Button>
                :
                <Button color="primary" disabled >
                    <Spinner size="sm">
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