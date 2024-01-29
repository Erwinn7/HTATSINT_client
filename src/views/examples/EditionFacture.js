import React, { useEffect, useState } from 'react';
import { Form, Badge,FormGroup, Label, Input, Col, Row, Container, Button, Spinner, Modal } from "reactstrap";
import DataTable from "react-data-table-component";
import Header from 'components/Headers/Header';
import 'assets/css/customerDesign.css';
import { prefix_link } from 'variables/globalesVar';
import CustomLoader from 'components/CustomLoader/CustomLoader';
import axios from 'axios';
import PrintInvoicebyCustumer from 'components/Printer/PrintInvoicebyCustomer';
import { PDFViewer } from '@react-pdf/renderer';


const EditionFacture = () => {

const urlGetListIbyC = prefix_link+"/invoice_customer";
const urlGetListUIbyC = prefix_link+"/unpaid_invoice_customer";
const urlGetCustomer = prefix_link+"/clients";

const token = localStorage.getItem('accessToken');
const user_id= localStorage.getItem('id');
const config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', 
    'Authorization': `Bearer ${token}`
  },
};


const [invoice, setInvoice] = useState([]);
const [pending, setPending] = useState(false);
const [queryObj, setQueryObj] = useState({
  etat: '',
  start_date: '',
  end_date: '',
  customer_id:'',
  user_id: user_id
});
const [totalAmount, setTotalAmount] = useState(0);
const [currentCustomer, setCurrentCustomer] = useState({});
const [customers, setCustomers] = useState([])
const [modalOpen, setModalOpen] = useState(false);



  const cols = [
    
    {
      name: "DATE D'EMISSION",
      selector: row => formatDate(row.created_at),
      sortable: true,
    },
    {
      name: 'N° FACTURE',
      selector: row => row.invoice_number,
      sortable: true,
    },
    {
      name: 'MONTANT (FCFA)',
      selector: row => row.invoice_amount,
      sortable: true,
    },
    {
      name : "STATUT",
      selector : row  => (
        <Badge color="" className="badge-dot mr-4">
          <i className={row.invoice_status === 'Paid' ? "bg-success" : "bg-danger"} />
          {row.invoice_status ==="Paid" ? "Payé" : "Impayé"}
        </Badge>),
      sortable : true
    },
    
  ];
  
  const customStyles = {
    rows: {
        style: {

        },
    },
    headCells: {
        style: {
          color: "#8898aa",
          backgroundColor: "#f6f9fc",
          borderColor: "#e9ecef",
          fontWeight: "bold",
        },
    },
    cells: {
        style: {

        },
    },
};


useEffect(() => {
  const token = localStorage.getItem('accessToken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', 
      'Authorization': `Bearer ${token}`,
    },
  };



  
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(urlGetCustomer,config);

        setCustomers(response.data);
        setSave(true);        
      } catch (error) {
        console.error('Erreur lors de la requête GET', error);
        setSave(true);
      }
    };

    fetchCustomer();


    }, [urlGetCustomer]); 

const handleChange = (e) => {
  const { name, value } = e.target;
  setQueryObj((previews) => ({
    ...previews,
    [name]: value,
  }));
};

const [thisDay, setThisDay] = useState(new Date());
const [save, setSave] = useState(true)



const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
  const year = date.getUTCFullYear();

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};

const Submit = (e) => {
  setSave(false)
  setPending(true);
  e.preventDefault();


  const fetchUnpaidByCustomerData = async () => {
    //console.log("queryObj:", queryObj);
    try {
      const response = await axios.post(urlGetListUIbyC, queryObj, config);
      console.log("les factures impayés: ",response.data);
      setInvoice(response.data.invoice);
      setTotalAmount(response.data.invoice_amount);
      setCurrentCustomer(response.data.customer);
      setPending(false);
      setSave(true);
    } catch (error) {
      console.error('Erreur lors de la requête GET', error);
      setPending(false);
      setSave(true);
    }
  };

   const fetchPaidByCustomerData = async () => {
    //console.log("queryObj:", queryObj);
    try {
      const response = await axios.post(urlGetListIbyC, queryObj, config);
      console.log("les factures par clients: ",response.data);
      setInvoice(response.data);
      setPending(false);
      setSave(true);
    } catch (error) {
      console.error('Erreur lors de la requête post', error);
      setPending(false);
      setSave(true);
    }
  };

  if (queryObj.etat === "1") {
    fetchPaidByCustomerData();
  } else if (queryObj.etat === "2") {
    fetchUnpaidByCustomerData();
  } 


};

const handleButtonClick = async () => {
  setModalOpen(true);
  console.log("obj send to printer",invoice)
};

const closeModal = () => {
  setModalOpen(false);
};

  return (
    <div className="backgroundImgClient">
      <Header menuTitle="EDITION DES FACTURES" />

      <Container className="pb-5 my-5" fluid>
          <Form onSubmit={(e) => Submit(e)} >
              <FormGroup className="p-3 centered-container-occup">
                <Row style={{ margin: "auto" }}>
                  <Col sm={3}>
                    <Label for="etat">
                      Liste: 
                    </Label>
                    <Input
                      id="etat"
                      name="etat"
                      value={queryObj?.etat}
                      onChange={(e) => handleChange(e)} 
                      type="select"
                    >
                      <option value="" > Sélectionnez</option>
                      <option value="1" >PAR CLIENT</option>
                      <option value="2" >IMPAYEES PAR CLIENT</option>
                      {/* <option value="3" >GLOBALE</option> */}
                      
                    </Input>


                    
                  </Col>

                  <Col sm={3}>
                    <Label for="customer_id">
                      Client : 
                    </Label>
                    <Input
                      id="customer_id"
                      name="customer_id"
                      value={queryObj?.customer_id}
                      onChange={(e) => handleChange(e)} 
                      type="select"
                    >
                      <option value="" >Sélectionnez un Client</option>
                      {                   
                        customers.data?.map((customer)  => (
                          <option key={customer.customer.id} value={customer.customer.id}>
                            {customer.customer.institute_name ? customer.customer.institute_name : customer.customer.last_name + " "+ customer?.customer.first_name }  - {customer.customer.phone_number}
                          </option>
                        ))
                      } 
                    </Input>

                  </Col>
                  <Col sm={2}>
                    <Label for="datedebut">
                      Début :
                    </Label>
                    <Input
                      id="datedebut"
                      name="start_date"
                      placeholder="Arrivée"
                      type="datetime-local"
                      value={queryObj?.start_date}
                      onChange={handleChange}
                      max={thisDay}

                    />
                  </Col>
                  <Col sm={2}>
                    <Label for="datefin">
                      Fin :
                    </Label>
                    <Input
                      id="datefin"
                      name="end_date"
                      placeholder="Départ"
                      type="datetime-local"
                      value={queryObj?.end_date}
                      onChange={handleChange}
                      min={queryObj.start_date}

                    />
                  </Col>
                  <Col sm={2} style={{ marginTop: "30px" }}>
                    {save ?
                      <Button color="primary" >
                        Rechercher
                      </Button>
                      :
                      <Button color="primary" disabled >
                        <Spinner size="sm">
                          Loading...
                        </Spinner>
                        <span>
                          {' '} En cours
                        </span>
                      </Button>
                    }
                  </Col>
                </Row>
              </FormGroup>
            </Form>
            
          <div className="float-right col-md-12 col-12 pb-2  " style={{width:"20%",display:"flex",justifyContent:"left",right:"0"}}>
            <Button color="success" onClick={() => handleButtonClick()} > Imprimer la liste</Button>
          </div>
          
          <div>
            <DataTable 
            className="" 
            title="Liste des factures "
            columns={cols}
            data={invoice} 
            keyField="id" 
            pagination
            customStyles={customStyles}
            progressPending={pending}
            highlightOnHover
            progressComponent={<CustomLoader/>}
             >
            </DataTable>
          </div>

          <div>
          <Modal isOpen={modalOpen} toggle={closeModal} size="lg" >
            {
            invoice && (
            <PDFViewer width="100%" height="600px" >
              <PrintInvoicebyCustumer myInvoice={invoice}  totalImpayes = {totalAmount} destinataire = {currentCustomer} />
            </PDFViewer>
            )
            }            
          </Modal>
        </div>
      </Container>
    </div>
  );

};

export default EditionFacture;
