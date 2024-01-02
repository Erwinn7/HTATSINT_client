import  {React,useState,useEffect} from "react";

import {Container, Collapse, Button, Card, CardBody ,
  Modal, ModalBody, ModalFooter,
  Badge,
  Alert,
  Input,
  Row
} from "reactstrap";

//  components
import AddRoomForm from "components/Forms/AddRoomForm.js";
import UpdateRoomStatus from "components/Forms/UpdateRoomStatus";
import Header from "components/Headers/Header.js";
import "assets/css/roomDesign.css";
import DataTable from "react-data-table-component";
import { prefix_link } from "variables/globalesVar";
import axios from "axios";



const Room = () => {
  const token = localStorage.getItem('accessToken');
  const urlGetR = prefix_link + "/api/v1/rooms";
  const urlPostOneRoom = prefix_link + "/api/v1/room_and_occupants";

  const [isOpen, setIsOpen] = useState(false);
  const [isStatColOpen, setIsStatColOpen] = useState(false);

  const [modal, setModal] = useState(false);
  const [room, setRoom] = useState([]);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    },
  };

  const [filterRoom, setfilterRoom] = useState({});
  const [hoveredRow, setHoveredRow] = useState(null);
  const [alert, setAlert] = useState({ message: '', color: '' });


  const toggle = () => setIsOpen(!isOpen);
  const toggleModal = () => setModal(!modal);
  const toggleSatCol = () => setIsStatColOpen(!isStatColOpen);
  const [selectedRow, setSelectedRow] = useState(null);
  const [infoRoom, setInfoRoom] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const cols = [
    {
      name : "CHAMBRE",
      selector : row  => row.room.room_label,
      sortable : true
    },
    {
      name : "NOMBRE DE PLACE",
      selector : row  => row.room_category.place_number,
      sortable : true
    },
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
        }
      
        return (
          <Badge color="dark" className="badge-dot mr-4" >
            <i className={leStyle} />
            {leStatus}
          </Badge>
        );
      },
      sortable : true
    }
  ]

  const returnStatut = (statut) => {
    if (statut=== "Available_and_clean") {
      return(<span>Disponible</span>)
    }else if (statut=== "Occupied"){
      return(<span>Occupée</span>) 
    }else if (statut === "Out_of_order"){
    return(<span>Réservée</span>)
    }else if(statut=== "Available_and_dirty"){
      return(<span>Indisponible</span>)
  }
  }

  const updateRoomStateInModal = (newState) => {
  setInfoRoom((prevInfoRoom) => ({
    ...prevInfoRoom,
    room: {
      ...prevInfoRoom.room,
      room_status: newState,
    },
  }));

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

    const fetchData = async () => {
      try {
        const res = await axios.get(urlGetR);
        setRoom(res.data.data);
        setfilterRoom(res.data.data);
        //console.log('rooom : ',res.data.data)
        setAlert({ message: "", color: '' });
      } catch (error) {
        console.error('Erreur lors de la requête GET', error);
        setAlert({ message: "Impossible de joindre le serveur.Contactez l'administrateur", color: 'danger' });
      }
    };
    
    fetchData();

  }, [urlGetR,modal,modalOpen]);

const handleFilter = (e) => {
  const newRoom = filterRoom?.filter(row => row.room?.room_label.toLowerCase().includes(e.target.value.toLowerCase()));
  setRoom(newRoom);
}


const handleRowClick = (row) => {

  const fetchRoomData = async () => {
    try {
      //console.log("id:",row.room.id)
      const res = await axios.post(urlPostOneRoom, {
        id: row.room.id,
      }, config);      
      setInfoRoom(res.data);
      console.log("reponse du serveur: ",res.data);
    } catch (error) {
      console.error('Erreur lors de la requête GET', error);
      setAlert({ message: "Impossible de joindre le serveur.Contactez l'administrateur", color: 'danger' });
    }
  };
  
  fetchRoomData();


  setSelectedRow(row);
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
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

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
  
    const day = date.getDate();
    const month = date.getMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
    const year = date.getFullYear();
  
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  
    return formattedDate;
  };



  return (
      <div  className="backgroundImgChambre">
      <Header menuTitle = "CHAMBRE" />
      {alert.message && <Alert className="mb-0 m-auto text-center center" color={alert.color}>{alert.message}</Alert>}

      {/* Page content */}
      <Container fluid className="pt-4">

        <Button className="bg-gradient-info mb-5" style={{color:"white"}}  onClick={toggle} >
          {!isOpen ? "Ajouter une chambre" : "Fermer" }
        </Button>
        <Collapse isOpen={isOpen} className="pt-3 pb-5" >
          <Card>
            <CardBody>
              {/* formulaire d'ajout de chambre */}
              <AddRoomForm />
            </CardBody>
          </Card>
        </Collapse>

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
              onRowMouseEnter={handleMouseEnter}
              onRowMouseLeave={handleMouseLeave}
              conditionalRowStyles={conditionalRowStyles}
              highlightOnHover
              pagination >
            </DataTable>  )
          }


          </div>

        <Modal isOpen={modalOpen} toggle={closeModal} >
         <ModalBody >
        
            {infoRoom && (
              <div >
                <div style={{ textAlign:"center", fontWeight:"bold",fontSize:"23px", position:"center",marginBottom:"20px"}}> {selectedRow.room.room_label.toUpperCase()} </div>
                
                <div >
                  <p><span style={{fontWeight:"bold"}}>Type de chambre : </span>{selectedRow.room_category.room_category_label}</p>
                  <p><span style={{fontWeight:"bold"}}>Nombre de place : </span>{selectedRow.room_category.place_number} personnes</p>
                  <p style={{textAlign:"justify"}}>
                    <Row className="ml-0">
                      <span className="mr-2"  style={{fontWeight:"bold"}}>Statut : </span>{returnStatut(infoRoom.room.room_status) }
                      <Button className="ml-4" color="primary" onClick={toggleSatCol} style={{ marginBottom: '1rem' }}size="sm" >Modifier</Button>
                      <Collapse isOpen={isStatColOpen}>
                        <Card>
                          <CardBody>
                          <UpdateRoomStatus roomId={infoRoom.room.id} roomOccupationId={infoRoom.room_occupation.id} updateRS={updateRoomStateInModal} />
                          </CardBody>
                        </Card>
                      </Collapse>
                    </Row>
                  </p>
                  <p><span style={{fontWeight:"bold"}}>Accessoires : </span>{selectedRow.room_item.map((item) => <span>{item.room_item_label}, </span> )}</p>
                </div>
                
              {
                  (selectedRow.room.room_status === "Reserved" || selectedRow.room.room_status === "Occupied")? 
                  <div>
                  <p><span style={{fontWeight:"bold"}}>Réservé par : </span>{infoRoom.customer.institute_name !== null ? infoRoom.customer.institute_name : infoRoom.customer.last_name+" "+infoRoom.customer.first_name}</p>
                  <p><span style={{fontWeight:"bold"}}>Occupée par : </span>{infoRoom.room_occupants.map((item) => <span>{item.last_name+" "+item.first_name}, </span> )}</p>
                  <p><span style={{fontWeight:"bold"}}>Date entrée : </span>{formatDate(infoRoom.room_occupation.start_date)} </p>
                  <p><span style={{fontWeight:"bold"}}>Date Sortie : </span>{formatDate(infoRoom.room_occupation.end_date)}</p>
                  </div>
                  :
                  <div></div>
                }
                
                
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={closeModal}>
              Fermer
            </Button>
          </ModalFooter>
        </Modal>
        <p className="pb-5" > </p>
      </Container>
    </div>
  );
};

export default Room;
