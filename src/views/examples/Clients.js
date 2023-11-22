/*!


jjjjj
*/
// reactstrap components
import {
  //Button,
  //Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  //Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  //Progress,
  Table,
  Container,
  Row,
  //UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import AjoutClient from "components/Buttons/Button";
import GetClient from "components/Funtions/GetCustomer";
import { client } from "variables/globalesVar";
import "assets/css/customerDesign.css";

const Tables = () => {

  
GetClient()

const clientsPhysique = client.filter(client => client.customer_type === 'physique');
const clientsMoral = client.filter(client => client.customer_type === 'moral');

   

    // Ajoutez ici le code pour effectuer d'autres traitements avec la valeur saisie
  
 




  return (
    <div className="backgroundImgClient"> 
    <>
      <Header menuTitle= 'CLIENTS'/> 
         {/* Page content */}

        

    
       
         
      <Container className="my-5" fluid>
      <div className="row">
      <div className="col"><AjoutClient butonTitle= "Ajouter nouveau client">
        
      </AjoutClient>
      </div>
     
      
      </div> 
<br>

</br>

        {/* Table */}

        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">PERSONNE PHYSIQUE</h3>
              </CardHeader>
              <Table  className="align-items-center  table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">NOM</th>
                    <th scope="col">PRENOM</th>
                    <th scope="col">ADRESSE</th>
                    <th scope="col">TELEPHONE</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">ACTIONS</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {clientsPhysique.map((client, index) => (
            <tr key={index}>
              <td>{client.first_name}</td>
              <td>{client.last_name}</td>
              <td>{client.adress}</td>
              <td>{client.phone_number}</td>
              <td>{client.email}</td>
              
                     
          
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            MODIFIER
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            SUPPRIMER
                          </DropdownItem>
                         
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>


                  </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>

        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className=" shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-dark mb-0">PERSONNE MORALE</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive 
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">NOM ENTITE</th>
                    <th scope="col">NUMERO IFU</th>
                    <th scope="col">TELEPHONE</th>
                    <th scope="col">ADRESSE EMAIL</th>
                    <th scope="col">ADRESSE SIEGE</th>
                    <th scope="col">ACTIONS</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {clientsMoral.map((client, index) => (
            <tr key={index}>
              <td>{client.first_name}</td>
              <td>{client.last_name}</td>
              <td>{client.adress}</td>
              <td>{client.phone_number}</td>
              <td>{client.email}</td>
              
                     
          
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            MODIFIER
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            SUPPRIMER
                          </DropdownItem>
                         
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>


                  </tr>
                  ))}

                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
    </div> );
  };

export default Tables;
