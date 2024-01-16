import { React, useState, useEffect } from "react";
import "assets/css/roomDesign.css";
import Header from "components/Headers/Header";
import { Form, Alert, FormGroup, Label, Input, Col, Row, Container, Button, Spinner, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { prefix_link } from "variables/globalesVar";
import CustomLoader from 'components/CustomLoader/CustomLoader';


const Booking = () => {
  const token = localStorage.getItem('accessToken');
  const user_id= localStorage.getItem('id');

  const urlGetFreeRoom = prefix_link + "/api/v1/booking";
  const urlGetCustomer = prefix_link+"/api/v1/clients";

  
  const [customers, setCustomers] = useState([])
  const [currentCustomer, setCurrentCustomer] = useState({
    customer_id: '',
  })
  const [room, setRoom] = useState([]);
  const [save, setSave] = useState(true)
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [alert, setAlert] = useState({ message: '', color: '' });
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`,

    },
  };


  const [thisDay, setThisDay] = useState(new Date());

  const cols = [

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




  useEffect(() => {

    const token = localStorage.getItem('accessToken');

     const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`,

    },
  };
  
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



    const fetchCustomer = async () => {
      try {
        const response = await axios.get(urlGetCustomer,config);

        setCustomers(response.data);
        setSave(true);        
      } catch (error) {
        console.error('Erreur lors de la requête GET', error);
        setSave(true);
      }
    };

    fetchCustomer();


  }, [thisDay, urlGetFreeRoom,urlGetCustomer]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCustomer((previews) => ({
      ...previews,
      [name]: value,
    }));
  };


  const Submit = (e) => {
    setSave(false)
    setPending(true);
    e.preventDefault();

    //lancer la requete pour les la récupération des chambres en fonction des dates 

    const fetchData = async () => {
      console.log(datesRoom)
      try {
        const response = await axios.post(urlGetFreeRoom, {
          start_date: datesRoom.dateArrivee,
          end_date: datesRoom.dateDepart,
          user_id : user_id
        }, config);

        setRoom(response.data.data);
        console.log("la reponse",response.data);
        setAlert({ message: "", color: '' });
        setPending(false);
        setSave(true);
      } catch (error) {
        console.error('Erreur lors de la requête post', error);
        setAlert({ message: "Impossible de joindre le serveur. Contactez l'administrateur", color: 'danger' });
        setPending(false);
        setSave(true);
      }
    };

    fetchData();  
  }


// booking_key = {"booking_status", "booking_price", "room_id", "start_date", "end_date", "invoice_id",
//                    "user_id","created_at","updated_at","is_deleted"}
  const handleReservedRoom = (e) => {
    console.log(datesRoom , currentCustomer, selectedRow.room)
  }



  return (
    <div className="backgroundImgChambre">
      <Header menuTitle="RESERVATION" />
      {alert.message && <Alert className="mb-0 m-auto text-center center" color={alert.color}>{alert.message}</Alert>}
      <Container className="pb-5" fluid>
        <Form onSubmit={(e) => Submit(e)} >
          <FormGroup className="p-3 centered-container-occup">
            <Row style={{ margin: "auto" }}>
              <Col sm={3}>
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
              <Col sm={3}>
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
              <Col sm={3}>
                <Label for="customer_id">
                    Client : 
                </Label>
                <Input
                  id="customer_id"
                  name="customer_id"
                  value={currentCustomer?.customer_id}
                  onChange={(e) => handleChange(e)} 
                  type="select"
                >
                  <option value="" >Sélectionnez un Client</option>
                  {                   
                    customers.data?.map((customer)  => (
                      <option key={customer.customer.id} value={customer.customer.id}>
                        {customer.customer.institute_name ? customer.customer.institute_name : customer.customer.last_name + " "+ customer?.customer.first_name }  - {customer.customer.phone_number}
                      </option>
                    ))
                  } 
                </Input>

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
              highlightOnHover
              progressPending={pending}
              progressComponent={<CustomLoader/>}
              pagination >
            </DataTable>)
        }

        <Modal isOpen={modalOpen} toggle={closeModal} size="lg">
          <ModalHeader toggle={(e) => { closeModal()}} >{selectedRow?.room.room_label.toUpperCase()}</ModalHeader>
          <ModalBody>
            {selectedRow && (
              <div>
                <p>Voulez vous reserver cette chambre pour le client {currentCustomer.institute_name ? currentCustomer.institute_name : currentCustomer.last_name + " "+ currentCustomer.first_name }  - {currentCustomer.phone_number} ?
                </p>

                <Button color="success" onClick={(e) => { closeModal(); handleReservedRoom(e) }}>
                  Oui
                </Button>
                <Button color="danger" onClick={(e) => { closeModal() }}>
                  Non
                </Button>
                          
              </div>
                )}

          </ModalBody>
        </Modal>
      </Container>
    </div>
  );
};

export default Booking;
