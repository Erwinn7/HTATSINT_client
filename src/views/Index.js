//import { useState } from "react";
// node.js library that concatenates classes (strings)
//import classnames from "classnames";
// javascipt plugin for creating charts
//import Chart from "chart.js";
// react plugin used to create charts
//import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col, CardHeader } from 'reactstrap';

import {
  //Button,
 // Card,
  //CardHeader,
 // CardBody,
  //NavItem,
  //NavLink,
  //Nav,
 // Progress,
  //Table,
  Container,
 // Row,
//  Col,
  //CardTitle,
} from "reactstrap";

// core components
import {
//  chartOptions,
  //parseOptions,
  //chartExample1,
  //chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import  "assets/css/mycss.css";
import Cardss from '../components/Dashboard/Cards';
import RoomStatusChart from '../components/Dashboard/roomStatusChart';

import MyCalendar from 'components/Dashboard/Calendar';



const Index = () => {
  
  return (

    <div className="backgroundImgClient">
    <Header menuTitle= "TABLEAU DE BORD" />

    <Container className=" pb-5 my-0" fluid>
     
<div className='mx-3 mx-n2'>
  <Cardss />
</div>
       
       <br/> 
       <div className='row  mx-n4'>
<div className='col-4 mx-n2'>
<Card style={{ width: '310px' }}>
<CardHeader>St</CardHeader>
<CardBody>

</CardBody>
</Card>
</div>
<div className='col-4 mx-n2'>
  <Card className="card-stats fluid" style={{ width: '310px' }} >
  <CardHeader>dsdf</CardHeader>
<RoomStatusChart />
</Card>
<Card className="card-stats fluid " style={{ width: '310px' }}>
<CardHeader>dsdf</CardHeader>
<RoomStatusChart />
</Card>
  </div>
  <div className='col-4 '>
       <div className='mx-0 mx-n1 container-fluid  '>
        <Card className='' style={{ width: '315px', height: '700px' }}>
          <MyCalendar></MyCalendar>
        </Card>
        
      </div>
</div>

       </div>

      
    </Container>
  </div>





  );
};
     
     
    
export default Index;
