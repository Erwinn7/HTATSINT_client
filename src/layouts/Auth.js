import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
/*import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";*/

import {routesAuth} from "routes.js";

const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routesAuth) => {
    return routesAuth.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="main-content" ref={mainContent}>
        
        <div className="header">
          <Container>
            <div className="header-body text-center mb-7 pb-4 mt-5">
              <Row className="justify-content-center">
                <Col lg="7" md="7">
                <marquee><h1 className="text-white text-uppercase">Bienvenu au centre d'hébergement "Le Pèlerin"</h1 ></marquee> 
                 
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
         
            <Routes>
              {getRoutes(routesAuth)}
              <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Routes>
         
        </Container>
      </div>
     
    </>
  );
};

export default Auth;
