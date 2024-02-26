import React, {useEffect, useState} from "react";
import {Container, Form, Button, Row, Col, FormGroup,Label,Input,Modal, ModalBody,ModalHeader,Spinner } from "reactstrap";
import AddTypeRoomForm from "./AddTypeRoomForm";
import Axios from "axios";
import { prefix_link } from "variables/globalesVar";


const UpdateRoomForm = ({selectedRoom}) => {
  const token = localStorage.getItem('accessToken');
  const user_id= localStorage.getItem('id');
  const urlUpdateR = prefix_link+"/room";
  const urlGetRT = prefix_link+"/room_categories/?page=1";
  
  const config = {
    headers: {
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     'Authorization': `Bearer ${token}`,
    },
  };

  const [roomType, setRoomType] = useState([]);
  const [ctrlSoumission, setCtrlSoumission] = useState("")
  const [save, setSave] = useState(true)
  // const initdataR = {
  //                   room_label: "",
  //                   room_amount: 0, 
  //                   room_category_id: "",
  //                   room_item_label: "",
  //                   user_id: user_id
  //                   }
  const [dataR, setdataR] = useState({
    id: selectedRoom.room.id,
    room_label: selectedRoom.room.room_label ,
    room_amount: selectedRoom.room.room_amount , 
    room_category_id: selectedRoom.room_category.id,
    user_id: user_id
  })


  useEffect ( () => {
    const token = localStorage.getItem('accessToken');

    const config = {
      headers: {
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': '*',
       'Authorization': `Bearer ${token}`,
      },
  };
    
    Axios.get(urlGetRT,config)
      .then( res => {
        setRoomType(res.data);
        console.log(res.data);
        console.log("selectedroom",selectedRoom)
      }).catch( err => {
          console.log("erreur attendue",err)           
    });

  }, [urlGetRT]);

  const handle = (e) =>  {
    const newdataR = {...dataR}
    newdataR[e.target.id] =  e.target.value;
    setdataR(newdataR)
    //console.log(newdataR)
  }

  const UpdateRoomSubmit = (e) => {
    e.preventDefault();

    console.log("CHAMBRE;",dataR)
    setSave(false)

    if (Ctrl_Soumission()) {
     

      const fetchUpdateRoom = async () => {
        
        try {
          const res = await Axios.put(urlUpdateR, dataR, config);
          console.log("réponse item ajouté :", res.data);
          setSave(true)

        } catch (error) {
          console.error('Erreur lors de la requête PUT', error);
          setSave(true)
        }
      }

      fetchUpdateRoom();      
      setCtrlSoumission("");
      setdataR({...dataR,
        room_item_label:"",
        room_amount:"",
        room_label:""
      });

    } else{
        setSave(true)
        return;
    }
    

  }

  //controler si les champs sont vides ou pas
  const Ctrl_Soumission = () =>  {

    if (!dataR.room_label  || !dataR.room_amount || !dataR.room_category_id    ) {
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
          <Form  onSubmit={(e)=> UpdateRoomSubmit(e)} >
            <Row>
            <Col sm={6}>
               <FormGroup >
                  <Label for="room_category_id">
                    Type
                  </Label>
                  <Input
                    id="room_category_id"
                    name="room_category_id"
                    onChange={(e) => handle(e)}
                    value={dataR?.room_category_id}
                    type="select"
                    size="sm"
                  >
                    {                   
                      roomType.data?.map((room)  => (
                        <option key={room.id} value={room.id}>
                          {room.room_category_label}
                        </option>
                      ))
                    } 
                  </Input>
                </FormGroup> 
              </Col>
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
                    size="sm"

                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
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
                    size="sm"
                  />
                </FormGroup>
              </Col>
              <Col sm={6}>
                <FormGroup >
                  {/* <Label
                    for="room_item_label"
                  >
                  Accessoires (Ex: Climatiseur,Télévision, ... )
                  </Label>
                  <Input
                    id="room_item_label"
                    name="room_item_label"
                    type="textarea"
                    onChange={(e) => handle(e)}
                    value={dataR?.room_item_label}
                  /> */}
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
  
  export default UpdateRoomForm;
