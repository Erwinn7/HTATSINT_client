import {React, useState, useEffect} from "react";
import "assets/css/roomDesign.css";
import Header from "components/Headers/Header";
import AddOccupForm from "components/Forms/AddOccupForm";
import { FormGroup,Label,Input,Col,Row, Container,Button,Spinner,Modal,ModalBody,ModalHeader,ModalFooter} from "reactstrap";
import DataTable from "react-data-table-component";
import {lesChambres} from "variables/globalesVar";


  
  const Occupation = () => {
    const [save, setSave] = useState(true)
    const [ctrlSoumission, setCtrlSoumission] = useState("")
    const [room, setRoom] = useState(lesChambres);
    const [selectedRow, setSelectedRow] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const roomWithNum = room.map((item, index) => {
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
        selector : row  => row.nom,
        sortable : true
      },
      {
        name : "PLACE",
        selector : row  => row.nbPlace,
        sortable : true
      },
      {
        name : "TYPE",
        selector : row  => row.type,     
        sortable : true
      },
      {
        name : "PRIX (FCFA)",
        selector : row  => row.price,
        sortable : true
      },
      {
        name : "STATUT",
        selector : row  => row.statut,
        sortable : true
      }
    ]

    const [datesRoom, setDatesRoom] = useState({
      startDate: '',
      endDate: '',
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
      
      //lancer la requete pour les la récupération des chambres

    }, []); 
  
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
    

    return (
      <div  className="backgroundImgChambre">
        <Header menuTitle = "OCCUPATIONS" />
        <Container className="pb-5" fluid>
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
  