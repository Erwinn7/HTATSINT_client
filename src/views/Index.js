import React from 'react';
import { Card, CardHeader } from 'reactstrap';

import { Container} from "reactstrap";
import { useEffect } from 'react';
import Header from "components/Headers/Header.js";
import  "assets/css/mycss.css";
import Cardss from '../components/Dashboard/Cards';
import RoomStatusChart from '../components/Dashboard/roomStatusChart';
import CurrentInfosTable from 'components/Dashboard/CurrentInfosTable';

import MyCalendar from 'components/Dashboard/Calendar';



const Index = () => {
 
  useEffect(() => {
    const handleResize = () => {
      // Restaurer la taille de la fenêtre si elle est redimensionnée
      window.resizeTo(800, 600); // Ajustez les valeurs selon vos besoins
    };

    // Ajouter l'écouteur d'événement de redimensionnement lors du montage du composant
    window.addEventListener('resize', handleResize);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Le tableau vide en tant que deuxième argument signifie que cet effet s'exécute uniquement lors du montage et du démontage du composant



  return (

    <div className="backgroundImgClient">
    <Header menuTitle= "TABLEAU DE BORD" />

    <Container className=" pb-5 pt-5 my-0" fluid>
      <div className='mx-3 mx-n2'>
        <Cardss />
      </div>
      <br/> 
      <div className='row  mx-n4'>
        <div className='col-4 mx-n2'>
          <Card className='mb-4' style={{ width: 'auto' }}>
          <CardHeader><div style={{fontWeight: 'bold', color: 'black', fontSize: '20px'}}>% Remplissage de l'hôtel </div></CardHeader>
              <CurrentInfosTable />
          </Card>
          <Card style={{ width: 'auto' }}>
          <CardHeader><div style={{fontWeight: 'bold', color: 'black', fontSize: '20px'}}>Autres informations</div></CardHeader>
              <CurrentInfosTable />
          </Card>
        </div>
        <div className='col-4 mx-n2'>
          <Card className="card-stats fluid" style={{ width: 'auto' }} >

          <CardHeader><div style={{fontWeight: 'bold', color: 'black', fontSize: '20px'}}> Statut des chambres</div></CardHeader>
          <RoomStatusChart />
          </Card>
         
        </div>
        <div className='col-4 '>
          <div className='mx-0 mx-n1 container-fluid  '>
            <Card className='' style={{ width: '325px'}}>
              <MyCalendar/>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  </div>





  );
};
     
     
    
export default Index;
