import  {React, useState }  from "react";
//reactstrap
import { Container,Form ,Row,Col,Input,FormGroup,Label,Button,Spinner} from "reactstrap";
//axios
import  Axios  from "axios";
import { prefix_link } from "variables/globalesVar";


const  AddTypeRoomForm = ()  => {

    const token = localStorage.getItem('accessToken');
    const user_id= localStorage.getItem('id');
    const urlAddRT = prefix_link+"/room_category";
    const [ctrlSoumission, setCtrlSoumission] = useState("")
    const [save, setSave] = useState(true)
    const initdataRT = {room_category_label:"",place_number:"",user_id:user_id}
    const [dataRT, setdataRT] = useState({...initdataRT})
    const config = {
         headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${token}`,
         },
    };

    const handle = (e) =>  {
        const newdataRT = {...dataRT}
        newdataRT[e.target.id] = e.target.id === "place_number" ? parseInt(e.target.value) : e.target.value.toUpperCase();
        setdataRT(newdataRT)
        //console.log(newdataRT)

    }

    const Submit = (e) => {
       // console.log(dataRT)
       setSave(false)
        e.preventDefault();

        if (Ctrl_Soumission()) {
            Axios.post(urlAddRT,dataRT,config)
                .then( res => {
                    console.log(res.data)  
                    setSave(true)
                })
                .catch( err => {
                setSave(true)
                console.log(err)           
            });

            setCtrlSoumission("");
            setdataRT(initdataRT)

        } else{
            setSave(true)
            return;
        }
        
    }

    const Ctrl_Soumission =() =>  {

        if (!dataRT.room_category_label) {
            setCtrlSoumission("Veuiller remplir le Type");
            return false;
        } else if (!dataRT.place_number){
            setCtrlSoumission("Veuiller remplir le Nombre de Place");
            return false;
        } else{
            return true;
        }

    }




    return (
        
        <Container className="mt-1 " fluid>
            <Form onSubmit={(e)=> Submit(e)} >
                <Row>
                <Col md={6}>
                    <FormGroup>
                    <Label for="room_category_label">
                        Libellé Type
                    </Label>
                    <Input
                        id="room_category_label"
                        placeholder="Nom de la chambre"
                        onChange={(e) => handle(e)}
                        value={dataRT?.room_category_label}
                        type ='text'
                    />
                    </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label for="place_number">
                    Nombre de places
                    </Label>
                    <Input
                    id="place_number"
                    placeholder="01"
                    onChange={(e) => handle(e)}
                    value={dataRT?.place_number}
                    type ='number'
                    />
                </FormGroup>
                </Col>
                </Row>
                { ctrlSoumission === "" ? <span></span> : <p  style={{ color: 'red' , fontSize: '12px'}}>{ctrlSoumission}</p>  }
                
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
    );

}

export default AddTypeRoomForm ;