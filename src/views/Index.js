//import { useState } from "react";
// node.js library that concatenates classes (strings)
//import classnames from "classnames";
// javascipt plugin for creating charts
//import Chart from "chart.js";
// react plugin used to create charts
//import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  //Button,
  Card,
  //CardHeader,
 // CardBody,
  //NavItem,
  //NavLink,
  //Nav,
 // Progress,
  //Table,
  Container,
  Row,
  Col,
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
import  "/home/ahouangbenon/Documents/TATS INT/htats/nouveau/HTATSINT_client/src/assets/css/mycss.css"

const Index = (props) => {
  //const [activeNav, setActiveNav] = useState(1);
  //const [chartExample1Data, setChartExample1Data] = useState("data1");

 // if (window.Chart) {
   // parseOptions(Chart, chartOptions());
  //}

  //const toggleNavs = (e, index) => {
    //e.preventDefault();
    //setActiveNav(index);
    //setChartExample1Data("data" + index);
  //};
  return (
    <>
      <Header  /> <br></br>  <br></br> 
     
      {/* Page content */}
      <Container className="mt--7 container-background" fluid >
        

       
        <Row className="mt-5">
         
          <Col xl="4">
            <Card className="shadow">
              
              
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
