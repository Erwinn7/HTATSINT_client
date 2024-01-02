import React from 'react';
import { Card, CardHeader } from 'reactstrap';

import { Container} from "reactstrap";

import Header from "components/Headers/Header.js";
import  "assets/css/mycss.css";
import Cardss from '../components/Dashboard/Cards';
import RoomStatusChart from '../components/Dashboard/roomStatusChart';
import CurrentInfosTable from 'components/Dashboard/CurrentInfosTable';

import MyCalendar from 'components/Dashboard/Calendar';



const Index = () => {
  
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
          <Card style={{ width: '320px' }}>
              {/* <CurrentInfosTable /> */}
          </Card>
        </div>
        <div className='col-4 mx-n2'>
          <Card className="card-stats fluid" style={{ width: '310px' }} >
          <CardHeader>info</CardHeader>
          <RoomStatusChart />
          </Card>
        </div>
        <div className='col-4 '>
          <div className='mx-0 mx-n1 container-fluid  '>
            <Card className='' style={{ width: '315px', height: '350px' }}>
              {/* <MyCalendar></MyCalendar> */}
            </Card>
          </div>
        </div>
      </div>
    </Container>
  </div>





  );
};
     
     
    
export default Index;
