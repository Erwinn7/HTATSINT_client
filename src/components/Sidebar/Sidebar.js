/*eslint-disable*/
import { useState } from "react";
import { NavLink as NavLinkRRD, Link,useNavigate, navigate  } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import { prefix_link } from "variables/globalesVar";
import CustomLoader from 'components/CustomLoader/CustomLoader';
// Importez le composant de liste déroulante (DropDown) de votre bibliothèque UI préférée


// Importez la liste des éditions
import {routesEdition}  from "routes";
import { routesReservation } from "routes";


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Dropdown,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import sidebar from "assets/css/sidebar.css";

var ps;

const Sidebar = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [collapseOpen, setCollapseOpen] = useState();
  const [collapseOpenRe, setCollapseOpenRe] = useState();

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  const toggleCollapseRe = () => {
    setCollapseOpenRe((data) => !data);
  };
  // closes the collapse
  const closeCollapseRe = () => {
    setCollapseOpenRe(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes, routesEdition,routesReservation) => {
    return routes.map((prop, key) => {
      if (prop.path === "/edition") {
        // faire un map sur les elements du tableau 
        return (
          <NavItem key={key}>
            <NavLink
              to="#"
              onClick={toggleCollapse}
              className="nav-link route-name"
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
  
            <Collapse isOpen={collapseOpen} className="ml-4">
              {routesEdition.map((editionprop, editionkey) => (
                <NavItem key={editionkey}>
                  <NavLink
                    to={editionprop.layout + editionprop.path}
                    tag={NavLinkRRD}
                    onClick={closeCollapse}
                    className="route-name"
                  >
                    <i className={editionprop.icon} />
                    {editionprop.name}
                  </NavLink>
                </NavItem>
              ))}
  
              {/* Ajoutez ici les autres éléments à afficher dans le Collapse */}
            </Collapse>
          </NavItem>
        );
      } else if (prop.path === "/booking") {
        // faire un map sur les elements du tableau 
        return (
          <NavItem key={key}>
            <NavLink
              to="#"
              onClick={toggleCollapseRe}
              className="nav-link route-name"
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
  
            <Collapse isOpen={collapseOpenRe} className="ml-4">
              {routesReservation.map((editionprop, editionkey) => (
                <NavItem key={editionkey}>
                  <NavLink
                    to={editionprop.layout + editionprop.path}
                    tag={NavLinkRRD}
                    onClick={closeCollapseRe}
                    className="route-name"
                  >
                    <i className={editionprop.icon} />
                    {editionprop.name}
                  </NavLink>
                </NavItem>
              ))}
  
              {/* Ajoutez ici les autres éléments à afficher dans le Collapse */}
            </Collapse>
          </NavItem>
        );

      }  else {
        // Sinon, renvoyez simplement le composant de route existant
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
              className="route-name"
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      }
    });
  };
const handleLogout = async () => {
  const token = localStorage.getItem('accessToken');
  const id = localStorage.getItem('id');
  const email = localStorage.getItem('email');
 // console.log(localStorage.getItem("accessToken"));
  // faire un  appel api fecth pour blcklister le token
  try {
    setLoading(true);
    const response = await fetch( prefix_link+'/api/v1/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        
      },
      body: JSON.stringify({
        'email': email,
        'user_id': id
        
      }),
    });
    if (!response.ok) {
      //throw new Error('Network response was not ok');
     // console.log('Response from Flask API:', /*data*/);
    }
    const data = response.json();
   console.log('Response from Flaskkk API:', data);
   localStorage.clear();
   
    navigate("/auth/login");
   
   // console.log(localStorage.getItem("accessToken"));
   //rediriger vers la page de login
   
   //console.log("Logout");

  } catch (error) {
   console.log('tfkyuh',error);
   
    navigate("/auth/login");
  }


 
};
  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-whitesmoke"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
       
        {/* Brand */}
        <div className="">    
       
            {logo ? (
              
              <NavbarBrand className="   pt-0 mt-0  " {...navbarBrandProps}>
             
                <img
                  alt={logo.imgAlt}
                  className="navbar-brand-img  "
                  src={logo.imgSrc}
                /> 
               <nav className="ralign-items-center">
                 <UncontrolledDropdown nav inNavbar>
                 <DropdownToggle nav className="nav-link-icon">
              <i className="fa fa-user-shield" />
              <span className="ml-2">{props.userRole}</span>
            </DropdownToggle>
             
              <DropdownMenu right>  
              
              {loading ? <CustomLoader /> && console.log({loading} ) :
              
                <DropdownItem className="   " style={{color:"red",textAlign:"center"}} onClick={handleLogout}> 
                {/* implementer le loader    */}
               
                Déconnexion
                     
                  <i className="fas fa-sign-out-alt" style={{marginLeft:"5px"}} />
                </DropdownItem>
              }
                
              </DropdownMenu>
            </UncontrolledDropdown>
                </nav>
         
               
                
              </NavbarBrand>
            ) : null}
           
       
        <Row>
          <Col>
           
          </Col>
        </Row>
        </div>
        {/* User */}
       
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col  xs="6">
               
                
                   {logo.innerLink ? (
        <Link to={logo.innerLink}>
          <img alt={logo.imgAlt} src={logo.imgSrc} />
        </Link>
      ) : (
        <a href={logo.outterLink}>
          <img alt={logo.imgAlt} src={logo.imgSrc} />
        </a>
      )}
      
                </Col>

              ) : null}
             
            </Row>
          </div>
          {/* Form */}
         
          {/* Navigation */}
          <Nav navbar>{createLinks(routes, routesEdition,routesReservation)}</Nav>
         
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
    userRole: PropTypes.string,
  }),
};

export default Sidebar;
