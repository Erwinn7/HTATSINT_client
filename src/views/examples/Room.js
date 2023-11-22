
import  {React,useState,useEffect} from "react";

import {Container, Collapse, Button, Card, CardBody ,
  // Table,
  Modal, ModalBody, ModalFooter, ModalHeader,
  // Badge,
  // CardHeader,
  // CardFooter,
  // DropdownMenu,
  // DropdownItem,
  // UncontrolledDropdown,
  // DropdownToggle,
  // Pagination,
  // PaginationItem,
  // PaginationLink,
  // Row,
  // Col,
  Input
} from "reactstrap";
// import Axios from "axios";

//  components
import AddRoomForm from "components/Forms/AddRoomForm.js";
import Header from "components/Headers/Header.js";
// import {lesChambres} from "variables/globalesVar";
import "assets/css/roomDesign.css";
import DataTable from "react-data-table-component";
import { prefix_link } from "variables/globalesVar";
import Axios from "axios";



const Room = () => {
  const urlGetR = prefix_link + "/api/v1/rooms";

  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [room, setRoom] = useState({});
  const [filterRoom, setfilterRoom] = useState({});

  
  const roomWithNum = room.data?.map((item, index) => {
    return { ...item, Num: index + 1 };
  });

  const toggle = () => setIsOpen(!isOpen);
  const toggleModal = () => setModal(!modal);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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
        const res = await Axios.get(urlGetR);
        setRoom(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Erreur lors de la requête GET', error);
      }
    };
    
    fetchData();

  }, [urlGetR,modal]);

const handleFilter = (e) => {
  const newRoom = filterRoom.filter(row => row.nom.toLowerCase().includes(e.target.value.toLowerCase()));
  setRoom(newRoom);
}


const handleRowClick = (row) => {
  setSelectedRow(row);
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
};



  return (
    <div  className="backgroundImgChambre">
      <Header menuTitle = "CHAMBRE" />

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
          <div className="float-right col-md-12 col-12 pb-2  " style={{width:"20%",display:"flex",justifyContent:"left",right:"0"}}>
              <Input type="text" placeholder="Recherche..." onChange={(e)=> handleFilter(e)} />
          </div>
          <div>
          {
            room && (
              <DataTable
              title="Liste des Chambres"
              columns={cols}
              data={roomWithNum}
              keyField="Num"
              onRowClicked={handleRowClick}
              customStyles={customStyles}
              pagination >
            </DataTable>  )
          }


          </div>

        <Modal isOpen={modalOpen} toggle={closeModal}>
          <ModalHeader toggle={closeModal}>{selectedRow?.room.room_label.toUpperCase() }</ModalHeader>
          <ModalBody>
            {selectedRow && (
              <div>
                <p>Type: {selectedRow.room_category.room_category_label}</p>
                <p>Nombre de place: {selectedRow.room_category.place_number} personnes</p>
                <p>Statut: {selectedRow.room.room_status}</p>
                <p>Accessoires: {selectedRow.room_item.map((item) => <span>{item.room_item_label}({item.item_status}), </span> )}</p>
                <p>Réservé par: client</p>
                <p>Occupée par: occupant(s)</p>
                <p>Date entréé: jj/mm/aaaa</p>
                <p>Date Sortie: jj/mm/aaaa</p>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={closeModal}>
              Fermer
            </Button>
          </ModalFooter>
        </Modal>


          {/* Table */}
        {/* <Row className="pb-5">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Liste des Chambres</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light ">
                  <tr>
                    <th scope="col">CHAMBRE</th>
                    <th scope="col">PLACE</th>
                    <th scope="col">TYPE</th>
                    <th scope="col">PRIX (FCFA)</th>
                    <th scope="col">STATUT</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {
                  lesChambres.map( (laChambre, index) => (

                    <tr key={index}>
                    <th scope="row">
                      <span className="mb-0 text-sm">
                        {laChambre.nom}
                      </span>
                    </th>
                    <th>
                      <span className="mb-0 text-sm">
                      {laChambre.nbPlace}
                      </span>
                    </th>
                    <th>
                      <span className="mb-0 text-sm">
                      {laChambre.type}
                      </span>
                    </th>
                    <th>
                      <span className="mb-0 text-sm">
                      {laChambre.price}.00
                      </span>
                    </th>
                    <th>
                      <Badge color="" className="badge-dot mr-4">
                        <i className={laChambre.statut === "DISPONIBLE" ? "bg-success":"bg-danger" } />
                        {laChambre.statut}
                      </Badge>
                      <Button color="primary" onClick={toggleModal} size="sm">
                        INFO
                      </Button>
                      <Modal isOpen={modal} toggle={toggleModal}>
                        <ModalHeader toggle={toggleModal}>{laChambre.nom}</ModalHeader>
                        <ModalBody>
                        <Spinner size="sm">
                            Loading...
                        </Spinner>
                        <span>
                            {' '} Description de la chambre bientôt disponible...
                        </span>

                        </ModalBody>
                        <ModalFooter>
                          <Button color="danger" onClick={toggleModal}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal>

                    </th>

                    <th className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            onClick={(e) => e.preventDefault()}
                            style ={{color:"green"}}
                          >
                            DISPONIBLE
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => e.preventDefault()}
                            style ={{color:"blue"}}
                          >
                            RESERVEE
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => e.preventDefault()}
                            style ={{color:"orange"}}
                          >
                            OCCUPEE
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => e.preventDefault()}
                            style ={{color:"red"}}
                          >
                            INDISPONIBLE
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </th>
                  </tr>


                    )
                  )

                }
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row> */}
        <p className="pb-5" > </p>
      </Container>
    </div>
  );
};

export default Room;
