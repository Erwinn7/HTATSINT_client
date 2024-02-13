import  {React,useState,useEffect} from "react";

import {Container, Button, 
  Modal, ModalBody, Col, Row,
  Alert,
  Input
} from "reactstrap";

//  components
import Header from "components/Headers/Header.js";
import CustomLoader from 'components/CustomLoader/CustomLoader';
import "assets/css/roomDesign.css";
import DataTable from "react-data-table-component";
import { prefix_link } from "variables/globalesVar";
import ModalsNoRecFound from "components/Modals/ModalsNoRecFound";
import axios from "axios";


const ApprouveBooking = () => {
  const token = localStorage.getItem('accessToken');
  const user_id= localStorage.getItem('id');

  const urlGetRoomBooked = prefix_link + "/room_booked";
  const urlConfirmBooking = prefix_link + "/confirmed";
  const urlDeleteBooking = prefix_link + "/canceled_booking";

  const [room, setRoom] = useState([]);
  const [bookingObj, setBookingObj] = useState({
    booking_id: '',
    percentage: '25',
    booking_amount: '0',
  });
  const [pending, setPending] = useState(true);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    },
  };

  const [filterRoom, setfilterRoom] = useState({});
  const [alert, setAlert] = useState({ message: '', color: '' });
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpenSup, setModalOpenSup] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const cols = [

    {
      name : "CLIENT",
      selector : row  => ( 
          <div  className="text-center"  >
            { row.customer.institute_name ? row.customer.institute_name + " - " + row.customer.phone_number  : row.customer.first_name +" "+ row.customer.last_name +" - "+ row.customer.phone_number}
          </div>
        )  ,
      sortable : true 
    },
    {
      name : "CHAMBRE",
      selector : row  => row.room.room_label,
      sortable : true
    },
    {
      name : "PERIODE DE RESERVATION",
      selector : row  => (<div>
        <div className="text-center mt-3" >{formatDate(row.booking.start_date)}</div> 
        <div className="text-center" ><strong>-</strong></div>
        <div className="text-center mb-3" >{formatDate(row.booking.end_date)}</div>
      </div> ),
      sortable : true
    },
    {
      name : "TYPE DE CHAMBRE",
      selector : row  => row.room_category.room_category_label,
      sortable : true
    },
    {
      name : "PRIX (FCFA)", 
      selector : row  => row.room.room_amount,
      sortable : true
    },
    {
      name: 'SUPPRIMER',
      cell: (row) => (
        <Button color="danger" size="sm"  onClick={() => handleButtonClick(row)}>Supprimer</Button>
      ),
      allowOverflow: true,
      button: true,
    },
  ]


  const handleButtonClick = async (row) => {
    setModalOpenSup(true);
    setSelectedRow(row);

  };


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

const fetchData = async () => {
      setPending(true);

      try {
        const res = await axios.get(urlGetRoomBooked, config);
        setRoom(res.data.data);
        setfilterRoom(res.data.data);
        setPending(false);
        console.log('rooom : ',res.data.data)
        setAlert({ message: "", color: '' });
      } catch (error) {
        console.error('Erreur lors de la requête GET', error);
        setAlert({ message: "Impossible de joindre le serveur.Contactez l'administrateur", color: 'danger' });
        setPending(false);
      }
    };


  useEffect ( () => {

    const token = localStorage.getItem('accessToken');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`
      },
    };
    const fetchData = async () => {
      setPending(true);

      try {
        const res = await axios.get(urlGetRoomBooked, config);
        setRoom(res.data.data);
        setfilterRoom(res.data.data);
        setPending(false);
        console.log('rooom : ',res.data.data)
        setAlert({ message: "", color: '' });
      } catch (error) {
        console.error('Erreur lors de la requête GET', error);
        setAlert({ message: "Impossible de joindre le serveur.Contactez l'administrateur", color: 'danger' });
        setPending(false);
      }
    };

    fetchData();

  }, [urlGetRoomBooked]);

const handleFilter = (e) => {
  const newRoom = filterRoom?.filter(row => row.room?.room_label.toLowerCase().includes(e.target.value.toLowerCase()));
  setRoom(newRoom);
}


const handleRowClick = async (row) => {
  setSelectedRow(row);
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
};

const closeModalSup = () => {
  setModalOpenSup(false);
};

const handleConfirmBooking = async (e) => {
  e.preventDefault();


     try {
      const response = await axios.put(urlConfirmBooking, {
        booking_id: selectedRow.booking.id,
        user_id: user_id,
        percentage: bookingObj.percentage,
        payment_type_id: '433e2114-3cfc-4a7e-a865-b5d6af907616',
      }, config);

      console.log("la reponse", response.data);
      setAlert({ message: "", color: '' });
      setPending(false);

      // Mettre à jour le tableau après confirmation de la réservation
      fetchData();
    } catch (error) {
      console.error('Erreur lors de la requête put', error);
      setAlert({ message: "Impossible de joindre le serveur. Contactez l'administrateur", color: 'danger' });
      setPending(false);
    }

    closeModal();
  console.log(selectedRow.booking.id)
  console.log(bookingObj.percentage)

  }



const handleDeleteBooking = async (e) => {
  e.preventDefault();

    try {
      const response = await axios.put(urlDeleteBooking, {booking_id: selectedRow.booking.id},config);
      console.log("la reponse",response.data);
      setAlert({ message: "", color: '' });
      setPending(false);
      fetchData();
    } catch (error) {
      console.error('Erreur lors de la requête put', error);
      setAlert({ message: "Impossible de joindre le serveur. Contactez l'administrateur", color: 'danger' });
      setPending(false);    
    }

    closeModalSup();
  // console.log(selectedRow.booking.id)

  }
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
  
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Les mois commencent à 0, donc ajoutez 1
    const year = date.getUTCFullYear();
  
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  
    return formattedDate;
  };;



const handleChange = (e) => {
  const { name, value } = e.target;

  setBookingObj((previews) => ({
    ...previews,
    [name]: value,
  }));

  setBookingObj((previews) => ({
    ...previews,
    booking_amount: (room?.room_amount*bookingObj?.percentage)/ 100,
  }))

  setAlert({ message: "", color: '' });

};



function formatAmount(amount) {
  // Convertir le montant en nombre
  const numericAmount = parseFloat(amount);

  // Vérifier si le montant est un nombre
  if (isNaN(numericAmount)) {
    return "Montant invalide";
  }

  // Utiliser la fonction toLocaleString pour ajouter des séparateurs de milliers
  const formattedAmount = numericAmount.toLocaleString("fr-FR", { style: "currency", currency: "XOF" });

  return formattedAmount;
}


return (
      <div  className="backgroundImgChambre">
      <Header menuTitle = "CONFIRMATION" />
      {alert.message && <Alert className="mb-0 m-auto text-center center" color={alert.color}>{alert.message}</Alert>}

      {/* Page content */}
      <Container fluid className="pt-4">
        {/* liste des chambres  */}
        {/* table dynamique  */}
          <div className="float-right col-md-12 col-12 pb-2  " style={{width:"22%",display:"flex",justifyContent:"left",right:"0"}}>
              <Input type="text" placeholder="Recherchez une chambre..." onChange={(e)=> handleFilter(e)} />
          </div>
          <div>
          {
            room.length ===0 ? 
            <div className="mt-7 mb-9">
              <ModalsNoRecFound text="Aucune réservation en attente de confirmation"   />
            </div>
            :
             (
              <DataTable
              title="Liste des chambres réservés"
              columns={cols}
              data={room}
              keyField="CHAMBRE"
              onRowClicked={handleRowClick}
              customStyles={customStyles}
              progressPending={pending}
              progressComponent={<CustomLoader/>}
              highlightOnHover
              pagination >
            </DataTable>  )
          }

          </div>

        <Modal isOpen={modalOpen} toggle={closeModal} >
         <ModalBody >
            <div className="text-center mb-3 " > <strong>CONFIRMER  LA RESERVATION</strong></div>
            <div className="mb-6">
              <p><strong>CHAMBRE</strong> : {selectedRow?.room.room_label} </p>
              <p><strong>PRIX JOURNALIER</strong> : { formatAmount(selectedRow?.room.room_amount)}</p>
              <p><strong>NOMBRE DE JOUR</strong> : {selectedRow?.number_of_day} jours</p>

              <Row>
                <Col sm={2}> <p> <strong>TAUX</strong> : </p></Col>
                <Col sm={4} >
                     <Input
                      id="percentage"
                      name="percentage"
                      value={bookingObj?.percentage}
                      onChange={(e) => handleChange(e)} 
                      type="select"
                      bsSize="sm"
                    >
                    <option value="25" >25%</option>
                    <option value="50" >50%</option>
                    <option value="75" >75%</option>
                  </Input> 
                </Col>
              </Row>
             
              <p> <strong>MONTANT A PAYER</strong> : <span className="text-success font-weight-bold" >{formatAmount((selectedRow?.room.room_amount * selectedRow?.number_of_day * bookingObj?.percentage )/100 )}</span></p>

            </div>
            <div className="text-center">
                  <Button 
                  color="success" 
                  className=" mr-9" 
                  onClick={(e) => { 
                    handleConfirmBooking(e);
                    closeModal(); 
                  }}>
                  CONFIRMER
                </Button>
                <Button color="dark" onClick={(e) => { closeModal() }}>
                  FERMER
                </Button>
            </div>
         </ModalBody>
        </Modal>


        <Modal isOpen={modalOpenSup} toggle={closeModalSup} >
         <ModalBody >
            <div className="text-center mb-5 " fontWeight="bold" >Voulez vous <strong color="danger" >SUPPRIMER</strong> cette réservation ?</div>
            <div className="text-center">
              <Button
                color="success"
                className="mr-9"
                onClick={(e) => {
                  handleDeleteBooking(e); 
                  closeModalSup();

                }}
                >
                OUI
              </Button>

              <Button color="danger" onClick={(e) => { closeModalSup() }}>
                NON
              </Button>
            </div>
         </ModalBody>
        </Modal>
        <p className="pb-5" > </p>
      </Container>
    </div>
  );

}



export default ApprouveBooking;
