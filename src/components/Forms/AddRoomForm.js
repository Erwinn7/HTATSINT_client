import React, {useEffect, useState} from "react";
import {Container, Form, Button, Row, Col, FormGroup,Label,Input,Modal, ModalBody,ModalHeader,Spinner } from "reactstrap";
import AddTypeRoomForm from "./AddTypeRoomForm";
import Axios from "axios";



const AddRoomForm = () => {

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const urlAddR = "https://b6cc-197-234-221-187.ngrok-free.app/api/v1/room_item";
  const urlGetRT = "https://b6cc-197-234-221-187.ngrok-free.app/api/v1/room_categories/?page=1";
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', 
    },
  };

  const [roomType, setRoomType] = useState([]);
  const [ctrlSoumission, setCtrlSoumission] = useState("")
  const [save, setSave] = useState(true)
  const initdataR = {
                    room_label: "",
                    room_amount: 0, 
                    room_category_id: "",
                    room_item_label: ""
                    }
  const [dataR, setdataR] = useState({...initdataR})


  useEffect ( () => {
    Axios.get(urlGetRT)
      .then( res => {
        setRoomType(res.data);
        //console.log(res.data);
      }).catch( err => {
          console.log(err)           
    });
  }, [modal]);

  const handle = (e) =>  {
    const newdataR = {...dataR}
    //newdataR[e.target.id] = e.target.id === "room_amount" ? parseFloat(e.target.value) : e.target.value;
    newdataR[e.target.id] = e.target.value;

    setdataR(newdataR)
    //console.log(newdataR)

  }

  const roomSubmit = (e) => {
    console.log(dataR)
    setSave(false)
    e.preventDefault();

    if (Ctrl_Soumission()) {

        Axios.post(urlAddR,dataR,config)
        .then( res => {
          console.log(res.data)
          setSave(true)
        })
        .catch( err => {
          console.log(err)   
          setSave(true)        
        });

        setCtrlSoumission("");
        setdataR(initdataR)

    } else{
        setSave(true)
        return;
    }
    

  }

  const Ctrl_Soumission = () =>  {

    if (!dataR.room_label  || !dataR.room_amount || !dataR.room_category_id  ||!dataR.room_item_label  ) {
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
          <Form  onSubmit={(e)=> roomSubmit(e)} >
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="room_label">
                    Nom
                  </Label>
                  <Input
                    id="room_label"
                    name="room_label"
                    onChange={(e) => handle(e)}
                    value={dataR?.room_label}
                    placeholder="Nom de la chambre"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="room_amount">
                  Prix (FCFA)
                </Label>
                <Input
                  id="room_amount"
                  name="room_amount"
                  onChange={(e) => handle(e)}
                  value={dataR?.room_amount}
                  placeholder="Prix de la chambre"
                  type="number"
                />
              </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
               <FormGroup >
                  <Label for="room_category_id">
                    Type
                  </Label>
                  <Button color="primary" onClick={toggleModal} size="sm" className="ml-9" >
                    NOUVEAU TYPE
                  </Button>
                  <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Créer un nouveau "Type" de chambre </ModalHeader>
                    <ModalBody>
                    < AddTypeRoomForm />
                    </ModalBody>
                  </Modal>
                  <Input
                    id="room_category_id"
                    name="room_category_id"
                    onChange={(e) => handle(e)}
                    // value={dataR?.room_category_id}
                    type="select"
                  >
                    <option value="" >Sélectionnez un type</option>
                    {                   
                      roomType.data?.map((room)  => (
                        <option key={room.id} value={room?.id}>
                          {room?.room_category_label}
                        </option>
                      ))
                    } 
                  </Input>
                </FormGroup> 
              </Col>
              <Col sm={6}>
                <FormGroup >
                  <Label
                    for="room_item_label"
                  >
                  Accessoires (Ex: Climatiseur,Télévision, ... )
                  </Label>
                  <Input
                    id="room_item_label"
                    name="room_item_label"
                    type="textarea"
                    onChange={(e) => handle(e)}
                    // value={dataR?.room_item_label}
                  />
                </FormGroup>
              </Col>
            </Row>           
            { ctrlSoumission === "" ? <span></span> : <p  style={{ color: 'red' , fontSize: '12px'}}>{ctrlSoumission}</p> }
                
                { save ? 
                    <Button color="success" >
                       Enrégistrer
                    </Button>
                    :
                    <Button color="success" disabled >
                        <Spinner size="sm">
                            Loading...
                        </Spinner>
                        <span>
                            {' '} En cours
                        </span>
                  </Button>
                }
          </Form>
        </Container>
      </>
    );
  };
  
  export default AddRoomForm;