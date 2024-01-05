import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

//import routes from "routes.js";
import {routes} from "routes.js";
import {routesEdition} from "routes.js";


const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes,routesEdition) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin" && prop.path!=="/edition") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else if (prop.layout === "/admin" && prop.path==="/edition") {
            
        return routesEdition.map((prop, key) => (
          <Route
            path={prop.path}
            element={prop.component}
            key={key}
            exact
          />
        ));
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "",
          imgSrc: require("../assets/img/brand/logo.png"),
          imgAlt: "...",
         
          }}
          userRole={"Administrateur"}
          // Add the following style to make the sidebar transparent
          className="sidebar-transparent"
               
          
        
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(routes,routesEdition)}
          <Route path="*" element={<Navigate to="/admin/index" replace />} />
        </Routes>
        <Container fluid> 
          <AdminFooter />
          
        </Container>
      </div>
    </>
  );
};

export default Admin;
