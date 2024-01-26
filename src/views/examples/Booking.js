import { React, useState, useEffect } from "react";
import "assets/css/roomDesign.css";
import Header from "components/Headers/Header";
import { Form, Alert, FormGroup,Badge, Label, Input, Col, Row, Container, Button, Spinner, Modal, ModalBody, ModalHeader } from "reactstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { prefix_link } from "variables/globalesVar";
import CustomLoader from 'components/CustomLoader/CustomLoader';


const Booking = () => {
  const token = localStorage.getItem('accessToken');
  const user_id= localStorage.getItem('id');

  const urlGetFreeRoom = prefix_link + "/booking";
  const urlGetCustomer = prefix_link+"/clients";
  const urlMakeBooking = prefix_link + "/reserved";


  
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
      selector : (row)  => {
        let leStatus = "";
        let leStyle = "";
      
        if (row.room.room_status === "Available_and_clean") {
          leStatus = "Disponible";
          leStyle = "bg-success";
        }else if (row.room.room_status === "Occupied"){
          leStatus = "Occupée";
          leStyle = "bg-danger";
        }else if (row.room.room_status === "Out_of_order"){
          leStatus = "Réservée";
          leStyle = "bg-primary";
        }else if(row.room.room_status === "Available_and_dirty"){
          leStatus = "Indisponible";
          leStyle = "bg-dark";
        }else if(row.room.room_status === "Reserved"){
          leStatus = "Réservée";
          leStyle = "bg-danger";
        }else if(row.room.room_status === "Reserved_and_confirmed" ){
          leStatus = "Reservé et Confirmé";
          leStyle = "bg-danger";
        }
      
        return (
          <Badge color="dark" className="badge-dot mr-4" >
            <i className={leStyle} />
            {leStatus}
          </Badge>
        );
      },      sortable: true
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


  }, [thisDay, urlGetFreeRoom,urlGetCustomer,modalOpen]);

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

    setAlert({ message: "", color: '' });

  };


  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  
  const fetchData = async () => {

   // Convertir les dates actuelles en objets Date
    const startDate = new Date(datesRoom.dateArrivee);
    const endDate = new Date(datesRoom.dateDepart);

    // Ajouter un jour à la date départ 
    startDate.setDate(startDate.getDate() - 1);

    // Retrancher un jour à la date de d'arrivée
    endDate.setDate(endDate.getDate() + 1);

    // Formater les dates modifiées au format souhaité
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

console.log(formattedStartDate)
console.log(formattedEndDate)


    try {
      const response = await axios.post(urlGetFreeRoom, {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
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

  const Submit = (e) => {
    setSave(false)
    setPending(true);
    e.preventDefault();

    //lancer la requete pour les la récupération des chambres en fonction des dates 
    fetchData();  
  }


  const handleReservedRoom = async (e) => {
    e.preventDefault();

    if (!currentCustomer.customer_id) {
      setAlert({ message: "Veuillez choisir un client", color: 'danger' });
      return;
    }

    if (selectedRow.room.room_status === 'Occupied') {
      setAlert({ message: "Cette chambre est en dépassement. Veuillez la libérer", color: 'danger' });
      return;
    }else{

      try {

        const response = await axios.post(urlMakeBooking, {
          start_date: datesRoom.dateArrivee,
          end_date: datesRoom.dateDepart,
          user_id: user_id,
          room_id: selectedRow.room.id,
          customer_id: currentCustomer.customer_id
        }, config);
  
        console.log("la reponse", response.data);
        setAlert({ message: "", color: '' });
        setPending(false);
        setSave(true);
      } catch (error) {
        console.error('Erreur lors de la requête post', error);
        setAlert({ message: "Impossible de joindre le serveur. Contactez l'administrateur", color: 'danger' });
        setPending(false);
        setSave(true);
      }
        // Fermer le modal après avoir effectué les actions nécessaires
        closeModal();
        // Relancer l'effet pour mettre à jour le tableau
        fetchData();
    }


    // console.log(datesRoom )
    // console.log(selectedRow.room.id)
    // console.log(currentCustomer.customer_id) 
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

        <Modal isOpen={modalOpen} toggle={closeModal} >
          <ModalHeader toggle={(e) => { closeModal()}} >{selectedRow?.room.room_label.toUpperCase()}</ModalHeader>
          <ModalBody>
            {selectedRow && (
              <div >
                <div className="text-center mb-5">Voulez vous reserver cette chambre ?
                  {/* {customers.customer.institute_name ? customers.customer.institute_name : customers.customer.last_name + " "+ customers?.customer.first_name }  - {customers.customer.phone_number} ? */}
                </div>

                <div className="text-center">
                  <Button color="success" className=" mr-9" onClick={(e) => {handleReservedRoom(e);closeModal()}}>
                  Oui
                </Button>
                <Button color="danger" onClick={(e) => { closeModal() }}>
                  Non
                </Button>
                          
                </div>
                
              </div>
                )}

          </ModalBody>
        </Modal>
      </Container>
    </div>
  );
};

export default Booking;
