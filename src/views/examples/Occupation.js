import {React, useState, useEffect} from "react";
import "assets/css/roomDesign.css";
import Header from "components/Headers/Header";
import AddOccupForm from "components/Forms/AddOccupForm";
import {Form, FormGroup,Label,Input,Col,Row, Container,Button,Spinner,Modal,ModalBody,ModalHeader,ModalFooter} from "reactstrap";
import DataTable from "react-data-table-component";
// import {lesChambres} from "variables/globalesVar";
import axios from "axios";
import { prefix_link } from "variables/globalesVar";


  
  const Occupation = () => {
    const urlGetRoombyDate = prefix_link+"/api/v1/occupation";
    const [room, setRoom] = useState([]);
    const [save, setSave] = useState(true)
    const [selectedRow, setSelectedRow] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
      },
    };

    const roomWithNum = room.data?.map((item, index) => {
      return { ...item, Num: index + 1 };
    });

      // Obtenir la date d'aujourd'hui au format 'YYYY-MM-DD'
     const today = new Date().toISOString().split('T')[0];

    const cols = [
      {
        name : "N°",
        selector : row  => row.Num,
        sortable : true
  
      },
      {
        name : "CHAMBRE",
        selector : row  => row.room.room_label,
        sortable : true
      },
      {
        name : "PLACE",
        selector : row  => row.room_category.place_number,
        sortable : true
      },
      {
        name : "TYPE",
        selector : row  => row.room_category.room_category_label,
        sortable : true
      },
      {
        name : "PRIX (FCFA)",
        selector : row  => row.room.room_amount,
        sortable : true
      },
      {
        name : "STATUT",
        selector : row  => row.room.room_status,
        sortable : true
      }
    ]

    const [datesRoom, setDatesRoom] = useState({
      dateArrivee: '',
      dateDepart: '',
    });


  
    useEffect(() => {
  
      // Obtenir la date de demain au format 'YYYY-MM-DD'
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
  
      // Mettre à jour les dates dans l'état local
      setDatesRoom({
        dateArrivee: today,
        dateDepart: tomorrowFormatted,
      });


    }, [today]); 
  
    const handleDateChange = (e) => {
      const { name, value } = e.target;
      setDatesRoom((prevDates) => ({
        ...prevDates,
        [name]: value,
      }));
      //console.log(dates)
    };
  
    const handleRowClick = (row) => {
      setSelectedRow(row);
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };


  const Submit = (e) => {
    setSave(false)
    e.preventDefault();

     //lancer la requete pour les la récupération des chambres en fonction des dates 

     const fetchData = async () => {
      console.log(datesRoom)
      try {
        const response = await axios.post(urlGetRoombyDate, {
            startdate: datesRoom.dateArrivee,
            enddate: datesRoom.dateDepart,
        },config);
  
        setRoom(response.data);
        console.log(response.data) ;
        setSave(true);        
      } catch (error) {
        console.error('Erreur lors de la requête GET', error);
        setSave(true);
      }
    };
    
    fetchData();

  }
    

    return (
      <div  className="backgroundImgChambre">
        <Header menuTitle = "OCCUPATIONS" />
        <Container className="pb-5" fluid>
        <Form  onSubmit={(e)=> Submit(e)} > 
        <FormGroup className="p-3 centered-container-occup">
            <Row style={{margin:"auto"}}> 
              <Col sm={5}>
                  <Label for="dateArrivee">
                    Arrivée
                  </Label>
                  <Input
                    id="dateArrivee"
                    name="dateArrivee"
                    placeholder="Arrivée"
                    type="date"
                    value={datesRoom.dateArrivee}
                    onChange={handleDateChange}
                    min={today}

                  />
                </Col>
                <Col sm={5}>
                  <Label for="dateDepart">
                    Départ
                  </Label>
                  <Input
                    id="dateDepart"
                    name="dateDepart"
                    placeholder="Départ"
                    type="date"
                    value={datesRoom.dateDepart}
                    onChange={handleDateChange}
                    min={today}
                  />
                </Col>
                <Col sm={2} style={{marginTop:"30px"}}>
                { save ? 
                    <Button color="primary" >
                      Rechercher
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
                </Col>
            </Row>    
          </FormGroup>          
        </Form>
          
          {
            room && (
            <DataTable 
              title="Chambres disponibles"
              columns={cols}
              data={roomWithNum}
              keyField="Num"
              onRowClicked={handleRowClick}
              pagination > 
           </DataTable>)
          }

          <Modal isOpen={modalOpen} toggle={closeModal}>
            <ModalHeader toggle={closeModal}  >{selectedRow?.nom.toUpperCase()}</ModalHeader>
            <ModalBody>
              {selectedRow && (
                <AddOccupForm roomSelected = {selectedRow?.nom.toUpperCase()} dateArrivee = {datesRoom.dateArrivee} dateDepart = {datesRoom.dateDepart}/>
              )}

            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={closeModal}>
                Fermer
              </Button>
            </ModalFooter>
          </Modal>

        </Container>
      </div>
    );
  };
  
  export default Occupation;
  