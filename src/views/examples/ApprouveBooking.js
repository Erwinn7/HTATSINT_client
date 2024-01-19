import  {React,useState,useEffect} from "react";

import {Container, Button, 
  Modal, ModalBody, Col, Row,
  Badge,
  Alert,
  Input
} from "reactstrap";

//  components
import Header from "components/Headers/Header.js";
import CustomLoader from 'components/CustomLoader/CustomLoader';
import "assets/css/roomDesign.css";
import DataTable from "react-data-table-component";
import { prefix_link } from "variables/globalesVar";
import axios from "axios";


const ApprouveBooking = () => {
  const token = localStorage.getItem('accessToken');
  const user_id= localStorage.getItem('id');

  const urlGetRoomBooked = prefix_link + "/api/v1/room_booked";
  const urlConfirmBooking = prefix_link + "/api/v1/confirmed";
  const urlDeleteBooking = prefix_link + "/api/v1/canceled_booking";

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
      name : "CHAMBRE",
      selector : row  => row.room.room_label,
      sortable : true
    },
    {
      name : "PERIODE DE RESERVATION",
      selector : row  => (<div>
        <div className="text-center mt-3" >Du {formatDate(row.booking.start_date)}</div> 
        <div className="text-center" >au</div>
        <div className="text-center mb-3" >{formatDate(row.booking.end_date)}</div>
      </div> ),
      sortable : true
    },
    // {
    //   name : "NOMBRE DE PLACE",
    //   selector : row  => row.room_category.place_number,
    //   sortable : true 
    // },
    {
      name : "TYPE DE CHAMBRE",
      selector : row  => row.room_category.room_category_label,
      sortable : true
    },
    {
      name : "PRIX JOURNALIER (FCFA)", 
      selector : row  => row.room.room_amount,
      sortable : true
    },
    {
      name : "STATUT",
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
        }
      
        return (
          <Badge color="dark" className="badge-dot mr-4" >
            <i className={leStyle} />
            {leStatus}
          </Badge>
        );
      },
      sortable : true
    },
    {
      name: 'ACTIONS',
      cell: (row) => (
        <Button color="danger"  onClick={() => handleButtonClick(row)}>Annuler</Button>
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

  }, [urlGetRoomBooked,modalOpen]);

const handleFilter = (e) => {
  const newRoom = filterRoom?.filter(row => row.room?.room_label.toLowerCase().includes(e.target.value.toLowerCase()));
  setRoom(newRoom);
}


const handleRowClick = (row) => {
  setSelectedRow(row);
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
};

const closeModalSup = () => {
  setModalOpenSup(false);
};

const handleConfirmBooking = (e) => {
  e.preventDefault();


    const confirmBooking = async () => {
      try {
        const response = await axios.put(urlConfirmBooking, {
          booking_id: selectedRow.booking.id,
          user_id : user_id,
          percentage: bookingObj.percentage
        }, config);

        console.log("la reponse",response.data);
        setAlert({ message: "", color: '' });
        setPending(false);
      } catch (error) {
        console.error('Erreur lors de la requête put', error);
        setAlert({ message: "Impossible de joindre le serveur. Contactez l'administrateur", color: 'danger' });
        setPending(false);
      }
    };

    confirmBooking(); 
  console.log(selectedRow.booking.id)
  console.log(bookingObj.percentage)

  }



const handleDeleteBooking = (e) => {
  e.preventDefault();

  const deleteBooking = async () => {
    try {
      const response = await axios.put(urlDeleteBooking, {booking_id: selectedRow.booking.id},config);
      console.log("la reponse",response.data);
      setAlert({ message: "", color: '' });
      setPending(false);
    } catch (error) {
      console.error('Erreur lors de la requête put', error);
      setAlert({ message: "Impossible de joindre le serveur. Contactez l'administrateur", color: 'danger' });
      setPending(false);    }
  };

  deleteBooking();
  console.log(selectedRow.booking.id)

  }

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
  
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
    const year = date.getUTCFullYear();
  
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
  
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  
    return formattedDate;
  };



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




return (
      <div  className="backgroundImgChambre">
      <Header menuTitle = "CHAMBRE" />
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
            room && (
              <DataTable
              title="Liste des chambres"
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
            <div className="text-center mb-5 " fontWeight="bold" >CONFIRMER  LA RESERVATION </div>
            <div>
              <p>CHAMBRE : {room?.room_label} </p>
              <p>PRIX : {room?.room_amount} </p>
              <Row>
                <Col sm={4}>
                  <p>TAUX :
                     <Input
                      id="percentage"
                      name="percentage"
                      value={bookingObj?.percentage}
                      onChange={(e) => handleChange(e)} 
                      type="select"
                    >
                    <option value="25" >25%</option>
                    <option value="50" >50%</option>
                    <option value="75" >75%</option>
                  </Input> 
                </p>
                </Col>
              </Row>
             
              <p>MONTANT : {room?.room_label} </p>

              Vous devez payer <strong>{bookingObj?.booking_amount} FCFA</strong> pour confirmer cette réservation
            </div>
            <div className="text-center">
                  <Button color="success" className=" mr-9" onClick={(e) => { closeModal(); handleConfirmBooking(e) }}>
                  CONFIRMER
                </Button>
                <Button color="danger" onClick={(e) => { closeModal() }}>
                  ANNULER
                </Button>
            </div>
         </ModalBody>
        </Modal>


        <Modal isOpen={modalOpenSup} toggle={closeModalSup} >
         <ModalBody >
            <div className="text-center mb-5 " fontWeight="bold" >Voulez vous <strong color="danger" >SUPPRIMER</strong> cette réservation ?</div>
            <div className="text-center">
                <Button color="success" className=" mr-9" onClick={(e) => { closeModalSup(); handleDeleteBooking(e) }}>
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
