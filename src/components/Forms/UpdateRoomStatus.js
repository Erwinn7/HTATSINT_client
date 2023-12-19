import  {React, useState }  from "react";
//reactstrap
import { Container,Form ,Row,Col,Input,Button,Spinner} from "reactstrap";
//axios
import  axios  from "axios";
import { prefix_link } from "variables/globalesVar";


const  UpdateRoomStatus = ({roomId, roomOccupationId })  => {
    const urlUpdateRS = prefix_link+"/api/v1/update_room";
    const [save, setSave] = useState(true)
    const [dataRS, setdataRS] = useState(
        {
            room_id: roomId,
            room_occupation_id: roomOccupationId,
            room_status: ""
        }
    )
    const config = {
         headers: {       
          'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': '*', 
         },
    };

    const handle = (e) =>  {
        const newdataRS = {...dataRS}
        //console.log("avant l'ajout",newdataRS)
        newdataRS[e.target.id] = e.target.value 
        setdataRS(newdataRS)
        console.log("apres l'ajout",newdataRS)

    }

    const Submit = (e) => {
       // console.log(dataRS)
       setSave(false)
       e.preventDefault();

       const fetchData = async () => {
        try {
          const res = await axios.post(urlUpdateRS,dataRS,config)
          // console.log(res.data) 
          setdataRS(res.data) 
          setSave(true)
           
        } catch (error) {
            console.error('Erreur lors de la requête Post', error);
            setSave(true);
        }
        };
        
        fetchData();

        refreshParent();

    }

    return (
        
        <Container fluid>
            <Form onSubmit={(e)=> Submit(e)} >
                <Row >
                    <Col md={8}>
                        <Input
                            id="room_status"
                            name="room_status"
                            placeholder="Select un Statut"
                            type="select"
                            size="sm"
                            onChange={(e) => handle(e)}
                            value={dataRS?.room_status}>

                            <option  value="">Sélectionnez un Statut</option>
                            <option  value="Available_and_clean">Disponible</option>
                            {/* <option  value="Occupied">Occupée</option>
                            <option  value="Out_of_order">Réservée</option> */}
                            <option  value="Available_and_dirty">Indisponible</option>
                            
                        </Input>
                    </Col>
                    <Col md={4}>
                        { save ? 
                            <Button  color="success" style={{ marginBottom: '1rem' }}size="sm" >
                            Enrégistrer
                            </Button>
                            :
                            <Button color="success" size="sm" disabled >
                                <Spinner size="sm">
                                    Loading...
                                </Spinner>
                                <span>
                                    {' '} En cours
                                </span>
                            </Button>
                        }
                    </Col>
               </Row>
            </Form>
        </Container>
    );

}

export default UpdateRoomStatus ;