//import { useState } from "react";
// node.js library that concatenates classes (strings)
//import classnames from "classnames";
// javascipt plugin for creating charts
//import Chart from "chart.js";
// react plugin used to create charts
//import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import React from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';

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

const Index = () => {
 
  
  return (

    <div className="backgroundImgClient">
    <Header menuTitle= "TABLEAU DE BORD" />

    <Container className=" pb-5 my-5" fluid>
     

       <Cardss />
    </Container>
  </div>





  );
};
     
     
    
export default Index;
