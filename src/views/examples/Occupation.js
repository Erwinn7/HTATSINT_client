import { React, useState, useEffect } from "react";
import "assets/css/roomDesign.css";
import Header from "components/Headers/Header";
import AddOccupForm from "components/Forms/AddOccupForm";
import { Form, Alert, FormGroup, Label, Input, Col, Row, Container, Button, Spinner, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { prefix_link,status } from "variables/globalesVar";


const Occupation = () => {
  const urlGetRoombyDate = prefix_link + "/api/v1/occupation";
  const [room, setRoom] = useState([]);
  const [save, setSave] = useState(true)
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [alert, setAlert] = useState({ message: '', color: '' });
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  // const roomWithNum = room.data?.map((item, index) => {
  //   return { ...item, Num: index + 1 };
  // });

  const [thisDay, setThisDay] = useState(new Date());

  const cols = [
    // {
    //   name: "N°",
    //   selector: row => row.Num,
    //   sortable: true

    // },
    {
      name: "CHAMBRE",
      selector: row => row.room.room_label,
      sortable: true
    },
    {
      name: "NOMBRE DE PLACE",
      selector: row => row.room_category.place_number,
      sortable: true
    },
    {
      name: "TYPE DE CHAMBRE",
      selector: row => row.room_category.room_category_label,
      sortable: true
    },
    {
      name: "PRIX JOURNALIER (FCFA)",
      selector: row => row.room.room_amount,
      sortable: true
    },
    {
      name: "STATUT",
      selector: row => row.room.room_status,
      sortable: true
    }
  ]

  const [datesRoom, setDatesRoom] = useState({
    dateArrivee: '',
    dateDepart: '',
  });

  const customStyles = {
    rows: {
      style: {

      },
    },
    headCells: {
      style: {
        color: "#8898aa",
        backgroundColor: "#f6f9fc",
        borderColor: "#e9ecef",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {

      },
    },
  };


  // gestion de coloration au passage de la souris sur la ligne
  const handleMouseEnter = (row) => {
    setHoveredRow(row);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  // Fonction pour appliquer le style différent à la ligne lorsque la souris passe dessus
  const conditionalRowStyles = [
    {
      when: (row) => row === hoveredRow, // Appliquer le style lorsque la ligne est égale à la ligne survolée
      style: {
        backgroundColor: "#f2f2f2", // Changer la couleur de fond de la ligne
      },
    },
  ];


  useEffect(() => {

    // Obtenir la date d'aujourd'hui au format 'YYYY-MM-DDTHH:mm:ss'
    const today = new Date();
    const todayFormatted = `${today.getFullYear()}-${formatNumber(today.getMonth() + 1)}-${formatNumber(today.getDate())}T${formatNumber(today.getHours())}:${formatNumber(today.getMinutes())}:${formatNumber(today.getSeconds())}`;
    setThisDay(todayFormatted)
    // Obtenir la date de demain au format 'YYYY-MM-DDTHH:mm:ss'
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowFormatted = `${tomorrow.getFullYear()}-${formatNumber(tomorrow.getMonth() + 1)}-${formatNumber(tomorrow.getDate())}T${formatNumber(tomorrow.getHours())}:${formatNumber(tomorrow.getMinutes())}:${formatNumber(tomorrow.getSeconds())}`;

    // Mettre à jour les dates dans l'état local
    setDatesRoom({
      dateArrivee: todayFormatted,
      dateDepart: tomorrowFormatted,
    });


  }, [thisDay]);

  const formatNumber = (number) => (number < 10 ? `0${number}` : number);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDatesRoom((prevDates) => ({
      ...prevDates,
      [name]: value,
    }));
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
          start_date: datesRoom.dateArrivee,
          end_date: datesRoom.dateDepart,
        }, config);

        setRoom(response.data);
        console.log(response.data);
        setAlert({ message: "", color: '' });
        setSave(true);
      } catch (error) {
        console.error('Erreur lors de la requête GET', error);
        setAlert({ message: "Impossible de joindre le serveur.Contactez l'administrateur", color: 'danger' });
        setSave(true);
      }
    };

    fetchData();

  }


  return (
    <div className="backgroundImgChambre">
      <Header menuTitle="OCCUPATION" />
      {alert.message && <Alert className="mb-0 m-auto text-center center" color={alert.color}>{alert.message}</Alert>}
      <Container className="pb-5" fluid>
        <Form onSubmit={(e) => Submit(e)} >
          <FormGroup className="p-3 centered-container-occup">
            <Row style={{ margin: "auto" }}>
              <Col sm={5}>
                <Label for="dateArrivee">
                  Arrivée
                </Label>
                <Input
                  id="dateArrivee"
                  name="dateArrivee"
                  placeholder="Arrivée"
                  type="datetime-local"
                  value={datesRoom.dateArrivee}
                  onChange={handleDateChange}
                  min={thisDay}

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
                  type="datetime-local"
                  value={datesRoom.dateDepart}
                  onChange={handleDateChange}
                  min={datesRoom.dateArrivee}
                />
              </Col>
              <Col sm={2} style={{ marginTop: "30px" }}>
                {save ?
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
              title="Liste des chambres disponibles"
              columns={cols}
              data={room}
              keyField="CHAMBRE"
              onRowClicked={handleRowClick}
              customStyles={customStyles}
              onRowMouseEnter={handleMouseEnter}
              onRowMouseLeave={handleMouseLeave}
              conditionalRowStyles={conditionalRowStyles}
              pagination >
            </DataTable>)
        }

        <Modal isOpen={modalOpen} toggle={closeModal} size="lg">
          <ModalHeader toggle={(e) => { closeModal(); Submit(e); }} >{selectedRow?.room.room_label.toUpperCase()}</ModalHeader>
          <ModalBody>
            {selectedRow && (
              <AddOccupForm room_id_occupation={selectedRow?.room.id} dateArrivee={datesRoom.dateArrivee} dateDepart={datesRoom.dateDepart} />
            )}

          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={(e) => { closeModal(); Submit(e); }}>
              Fermer
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
};

export default Occupation;
