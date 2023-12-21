import { Card, CardBody, CardTitle,  Row, Col,Modal, ModalBody, CardFooter, CardHeader } from 'reactstrap';
import 'assets/css/card.css';
import DataTable from 'react-data-table-component';

import React, { useState, useEffect } from 'react';
import { prefix_link } from 'variables/globalesVar';
import axios from 'axios';
    


const Cardss = () => {
  const urlGetRA = prefix_link + "/api/v1/room_availlable"; // toutes les chambres disponibles 
  const urlGetER = prefix_link + "/api/v1/current_ended_room"; //toutes les chambres qui doivent etre libéréer dans la journée current_occupied_room
  const urlGetOR = prefix_link + "/api/v1/current_occupied_room"; //toutes les chambres qui 
  const [modal1, setModal1] = useState(false);
  const toggleModal1 = () => setModal1(!modal1);

  const [modal2, setModal2] = useState(false);
  const toggleModal2 = () => setModal2(!modal2);

  const [modal3, setModal3] = useState(false);
  const toggleModal3 = () => setModal3(!modal3);

  const [modal4, setModal4] = useState(false);
  const toggleModal4 = () => setModal4(!modal4);

  const [modal5, setModal5] = useState(false);
  const toggleModal5 = () => setModal5(!modal5);

  const [roomAvaillable, setRoomAvaillable] = useState(); 
  const [endedRoom, setEndedRoom] = useState(); 
  const [roomOccupied, setRoomOccupied] = useState(); 



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
  }
]



useEffect(() => {
 const fetchRoomAvaillable =  async () => {
  try {
    const res = await axios.get(urlGetRA);
    console.log('rthwrh:',res.data);
    setRoomAvaillable("Room Available:",res.data);
  } catch (error) {   
    console.error('Erreur lors de la requête GET', error);
  }
};

const fetchEndedRoom =  async () => {
  try {
    const res = await axios.get(urlGetER);
    console.log('rthwrh:',res.data);
    setEndedRoom("Ended Room:",res.data);
  } catch (error) {   
    console.error('Erreur lors de la requête GET', error);
  }
};

const fetchRoomOccupied =  async () => {
  try {
    const res = await axios.get(urlGetOR);
    console.log('rthwrh:',res.data);
    setRoomOccupied("Room occupied",res.data);
  } catch (error) {   
    console.error('Erreur lors de la requête GET', error);
  }
};





fetchRoomAvaillable();
fetchEndedRoom();
fetchRoomOccupied();
  
}, [urlGetRA,urlGetER,urlGetOR] ); 


const roomTable = (room) => {
  return(
      <DataTable
        title="Liste des chambres"
        columns={cols}
        data={room}
        keyField="CHAMBRE"
        customStyles={customStyles}
        highlightOnHover
        pagination >
      </DataTable> 
  )
}

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







  // Simuler des données pour les quatre cartes
  // const chambreDisponible = 58;
  const arriveeAttendue = 4;
  //const departAttendu = 4;
  const recetteDuJour = 900000000;
  const chambreAttribueeAujourdHui = 7;


  return (
    <div>
      
      <Row>
        {/* Carte 1 : Chambres disponibles */}
        <Col md={2} className='mx-n2' >
          <Card className='chambres-disponibles '  style={{ width: '150px', height: '200px' }} onClick={toggleModal1}  >
             <CardHeader  className='text-center' style={{ width: '149px',marginTop: '0', height: '15px', fontWeight: 'bold' }}>
             DISPONIBLE
             </CardHeader>
            <CardBody >
             
            <CardTitle className='text-center' style={{ margin: '0',fontSize: '50px',  fontWeight: 'bold', color: '#2298e7'}}>
            <div>{roomAvaillable?.length}</div>
            <div style={{ marginTop: '-19px', fontSize: '15px', fontWeight: 'bold', color: '#2298e7' }}>CHAMBRES</div>
            </CardTitle>
             
            </CardBody>
            <CardFooter className='text-left ' text-color='dark'style={{ width: '149px', height: '15px', fontWeight: 'bold'  }}>
            <div  className='text-center'  style={{marginTop: '-10px', fontSize: '12px', fontWeight: 'bold', }}> Total:<span style={{  fontSize: '15px', fontWeight: 'bold' }}> {roomAvaillable?.length}  </span> 
             </div>
            </CardFooter>
          </Card>
        </Col>

        {/* Carte 2 : Arrivées Attendues */}
        <Col md={2} className='' >
          <Card className='arrivees-attendues'  style={{ width: '150px', height: '200px' }} onClick={toggleModal2}>
          <CardHeader className='text-center' style={{ width: '149px',marginTop: '0', height: '15px',fontWeight: 'bold' }}>ARRIVEES</CardHeader>
            <CardBody>
            <CardTitle className='text-center' style={{ margin: '0',fontSize: '50px',  fontWeight: 'bold', color: 'red'}}>
            <div>{arriveeAttendue}</div>
            <div style={{ marginTop: '-19px', fontSize: '15px', fontWeight: 'bold', color: 'red' }}>ATTENDUES</div>
            </CardTitle>
            </CardBody>
            <CardFooter className='text-left ' text-color='dark'style={{ width: '149px', height: '15px', fontWeight: 'bold'  }}>
            <div  className='text-center'  style={{marginTop: '-10px', fontSize: '12px', fontWeight: 'bold', }}> Total:<span style={{  fontSize: '15px', fontWeight: 'bold' }}> {arriveeAttendue}  </span> 
             </div>
            </CardFooter>
          </Card>
        </Col>

        {/* Carte 3 : Départs Attendus */}
        <Col md={2} className='mx-n2' >
          <Card className='departs-attendus'   style={{ width: '150px', height: '200px' }} onClick={toggleModal3}>
          <CardHeader className='text-center' style={{ width: '149px',marginTop: '0', height: '15px',fontWeight: 'bold' }}>DEPART
          </CardHeader>
            <CardBody>
            <CardTitle className='text-center' style={{ margin: '0',fontSize: '50px',  fontWeight: 'bold', color: '#f39c12'}}>
            <div>{endedRoom?.length}</div>
            <div style={{ marginTop: '-19px', fontSize: '15px', fontWeight: 'bold', color: '#f39c12' }}>ATTENDUES</div>
            </CardTitle>
              
            </CardBody>

            <CardFooter className='text-left ' text-color='dark'style={{ width: '149px', height: '15px', fontWeight: 'bold'  }}>
            <div  className='text-center'  style={{marginTop: '-10px', fontSize: '12px', fontWeight: 'bold', }}> Total:<span style={{  fontSize: '15px', fontWeight: 'bold' }}> {endedRoom?.length} </span> 
             </div>
            
            </CardFooter>
          </Card>
        </Col>

        <Col  md={3} className=''>
          <Card className='attribuees-aujourd-hui' style={{ width: '150px', height: '200px' }} onClick={toggleModal4}>
          <CardHeader className='text-center' style={{ width: '149px',marginTop: '0', height: '15px',fontWeight: 'bold' }}>CHAMBRES
          </CardHeader>
            <CardBody>
            <CardTitle className='text-center' style={{ margin: '0',fontSize: '50px',  fontWeight: 'bold', color: '#808080' }}>
            <div>{chambreAttribueeAujourdHui}</div>
            <div style={{ marginTop: '-19px', fontSize: '12px', fontWeight: 'bold',  }}> ENREGISTREES</div>
            </CardTitle>
             
            </CardBody>

            <CardFooter className='text-left ' text-color='dark'style={{ width: '149px', height: '15px', fontWeight: 'bold', fontSize: '12px'  }}>
            <div  className='text-center'  style={{marginTop: '-10px', fontSize: '12px', fontWeight: 'bold', }}>  AUJOUD'HUI</div>
            </CardFooter>
          </Card>
        </Col>

        {/* Carte 4 : Recette du Jour */}
        <Col md={3} className='mx-n5'>
          <Card className='recette-du-jour'  style={{ width: '315px', height: '198px' }} onClick={toggleModal5}>
          <CardHeader className='text-center' style={{ width: '313px',marginTop: '0', height: '15px',fontWeight: 'bold' }}>RECETTE
          </CardHeader>
            <CardBody>
            <CardTitle className='text-center' style={{ margin: '0',fontSize: '35px',  fontWeight: 'bold', color: '#00a65a' }}>
            <div>{recetteDuJour} </div>
            <div style={{ marginTop: '-10px', fontSize: '12px', fontWeight: 'bold',  }}> fcfa</div>
            </CardTitle>
            </CardBody>
            <CardFooter className='text-left ' text-color='dark'  style={{ width: '313px', height: '15px', fontWeight: 'bold', fontSize: '12px' ,  }}>
            <div  className='text-center'  style={{marginTop: '-10px', fontSize: '12px', fontWeight: 'bold', }}>  AUJOUD'HUI</div>
            </CardFooter>
          </Card>
        </Col>

        {/* Carte supplémentaire : Chambres attribuées aujourd'hui */}
       
      </Row>
      <Modal isOpen={modal1} toggle={toggleModal1} size='lg'>
        <ModalBody>
          {roomAvaillable &&(roomTable(roomAvaillable))}
        </ModalBody>
      </Modal>

      <Modal isOpen={modal2} toggle={toggleModal2}>
        <ModalBody>
          {/* Contenu du modal 2 */}
          <h5>Détails de la carte 2</h5>
          {/* Ajoutez ici les détails spécifiques à afficher dans le modal 2 */}
        </ModalBody>
      </Modal>

      <Modal isOpen={modal3} toggle={toggleModal3}>
        <ModalBody>
        {endedRoom &&(roomTable(endedRoom))}
        </ModalBody>
      </Modal>

      <Modal isOpen={modal4} toggle={toggleModal4}>
        <ModalBody>
        {roomOccupied &&(roomTable(roomOccupied))}
        </ModalBody>
      </Modal>

      <Modal isOpen={modal5} toggle={toggleModal5}>
        <ModalBody>
          {/* Contenu du modal 2 */}
          <h5>Détails de la carte 2</h5>
          {/* Ajoutez ici les détails spécifiques à afficher dans le modal 2 */}
        </ModalBody>
      </Modal>
     
    </div>
  );
};

export default Cardss;
