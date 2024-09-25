import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import { routesRecep} from "routes.js";
import {routesReservationrecep} from "routes.js";
import { routesEditionrecep } from "routes.js";
//import { routes } from "routes";


const Recep = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const userName = localStorage.getItem('name');
  const userSurname = localStorage.getItem('surname');
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routesRecep,routesEditionrecep, routesReservationrecep) => {
    return routesRecep.map((prop, key) => {
      if  (prop.layout === "/recep" && prop.path!=="/edition" && prop.path!=="/booking" ) {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else if (prop.layout === "/recep" && prop.path==="/edition" ) {
        return routesEditionrecep.map((prop, key) => (
          <Route
            path={prop.path}
            element={prop.component}
            key={key}
            exact
          />
        ));
      } else if (prop.layout === "/recep" && prop.path==="/booking" ) {
        return routesReservationrecep.map((prop, key) => (
          <Route
            path={prop.path}
            element={prop.component}
            key={key}
            exact
          />
        ));
        
      }
      else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routesRecep.length; i++) {
      if (
        props?.location?.pathname.indexOf(routesRecep[i].layout + routesRecep[i].path) !==
        -1
      ) {
        return routesRecep[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routesRecep}
        logo={{
          innerLink: "",
          imgSrc: require("../assets/img/brand/logo.png"),
          imgAlt: "...",
         
          }}
          userRole={"R"}
          userName={userSurname}
          // Add the following style to make the sidebar transparent
          className="sidebar-transparent"
               
          
        
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(routesRecep, routesEditionrecep,routesReservationrecep)}
          <Route path="*" element={<Navigate to="/recep/index" replace />} />
        </Routes>
        <Container fluid> 
          <AdminFooter />
          
        </Container>
      </div>
    </>
  );
};

export default Recep;
