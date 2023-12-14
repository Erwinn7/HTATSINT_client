import { Card, CardBody, CardTitle, CardText, Row, Col,Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import 'assets/css/card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faSignInAlt, faSignOutAlt, faMoneyBillAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

    


const Cardss = () => {
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
  // Simuler des données pour les quatre cartes
  const chambreDisponible = 10;
  const arriveeAttendue = 5;
  const departAttendu = 3;
  const recetteDuJour = 1500;
  const chambreAttribueeAujourdHui = 7;


  return (
    <div>
      
      <Row>
        {/* Carte 1 : Chambres disponibles */}
        <Col md={3} >
          <Card className='chambres-disponibles '  style={{ width: '200px', height: '90px' }} onClick={toggleModal1}  >
            <CardBody>
            
              <CardTitle>{chambreDisponible}  <span><FontAwesomeIcon icon={faBed} size="1x" /></span></CardTitle>
              <CardText className='text-left small  '  text-color='white'>Chambres Disponibles </CardText>
            </CardBody>
          </Card>
        </Col>

        {/* Carte 2 : Arrivées Attendues */}
        <Col md={2} >
          <Card className='arrivees-attendues'  style={{ width: '200px', height: '90px' }} onClick={toggleModal2}>
            <CardBody>
              <CardTitle>{arriveeAttendue} <span><FontAwesomeIcon icon={faSignInAlt} size="1x" /></span></CardTitle>
              <CardText className='text-left small'>Arrivées Attendues</CardText>
            </CardBody>
          </Card>
        </Col>

        {/* Carte 3 : Départs Attendus */}
        <Col md={3} >
          <Card className='departs-attendus'   style={{ width: '200px', height: '90px' }} onClick={toggleModal3}>
            <CardBody>
              <CardTitle className=''>{departAttendu} <span><FontAwesomeIcon icon={faSignOutAlt} size="1x" /></span></CardTitle>
              <CardText className='text-left small'>Départs Attendus</CardText>
            </CardBody>
          </Card>
        </Col>

        <Col  md={2}>
          <Card className='attribuees-aujourd-hui'  style={{ width: '200px', height: '90px' }} onClick={toggleModal4}>
            <CardBody>
              <CardTitle>{chambreAttribueeAujourdHui} <span><FontAwesomeIcon icon={faUser} size="1x" /></span></CardTitle>
              <CardText className='text-left small'> Attribuées Aujourd'hui</CardText>
            </CardBody>
          </Card>
        </Col>

        {/* Carte 4 : Recette du Jour */}
        <Col md={2}>
          <Card className='recette-du-jour'  style={{ width: '200px', height: '90px' }} onClick={toggleModal5}>
            <CardBody>
              <CardTitle> {recetteDuJour}$ <span><FontAwesomeIcon icon={faMoneyBillAlt} size="1x" /></span></CardTitle>
              <CardText className='text-left small'> Recette du jour </CardText>
            </CardBody>
          </Card>
        </Col>

        {/* Carte supplémentaire : Chambres attribuées aujourd'hui */}
       
      </Row>
      <Modal isOpen={modal1} toggle={toggleModal1}>
        <ModalBody>
          {/* Contenu du modal */}
          <h5>Détails de la carte sélectionnée</h5>
          {/* Ajoutez ici les détails spécifiques à afficher dans le modal */}
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
          {/* Contenu du modal 2 */}
          <h5>Détails de la carte 2</h5>
          {/* Ajoutez ici les détails spécifiques à afficher dans le modal 2 */}
        </ModalBody>
      </Modal>

      <Modal isOpen={modal4} toggle={toggleModal4}>
        <ModalBody>
          {/* Contenu du modal 2 */}
          <h5>Détails de la carte 2</h5>
          {/* Ajoutez ici les détails spécifiques à afficher dans le modal 2 */}
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
