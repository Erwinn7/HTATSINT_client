import  {React,useState,useEffect} from "react";
import {
  Input,
  Container,
  Badge,
  Button,Modal,ModalBody,ModalHeader,ModalFooter
} from "reactstrap";
import Header from "components/Headers/Header.js";
import DataTable from "react-data-table-component";
import Axios from "axios";
import { prefix_link } from "variables/globalesVar";
import PrintInvoice from "components/Printer/PrintInvoice";
import { PDFViewer } from '@react-pdf/renderer';


const Invoice = () => {

  const urlGetInvoice = prefix_link+"/api/v1/invoices";
  const [invoice, setInvoice] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterInvoice, setfilterInvoice] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);




  const cols = [
    {
      name : "DATE D'EMISSION",
      selector : row  => formatDate(row.invoiceEmitDate), 
      sortable : true

    },
    {
      name : "CLIENT",
      selector : row  => row.clientFullname,
      sortable : true
    },
    {
      name : "N° FACTURE",
      selector : row  => row.invoiceNumber,
      sortable : true
    },
    {
      name : "PRIX (FCFA)",
      selector : row  => row.invoiceAmount,
      sortable : true
    },
    {
      name : "STATUT",
      selector : row  => (
        <Badge color="" className="badge-dot mr-4">
          <i className={row.invoiceStatus === 'Paid' ? "bg-success" : "bg-danger"} />
          {row.invoiceStatus}
        </Badge>),
      sortable : true
    },
    {
      name: 'APERCU',
      cell: (row) => (
        <Button color="success"  onClick={() => handleButtonClick(row)}>Voir</Button>
      ),
      allowOverflow: true,
      button: true,
    },
  ]

  const handleButtonClick = async (row) => {
   
    setSelectedRow(row);
    setModalOpen(true);
    console.log(selectedRow);
    
  };


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



const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};


useEffect ( () => {

  const fetchData = async () => {
    try {
      const res = await Axios.get(urlGetInvoice);
      const myDatas = res.data;
      var myNewElmts = []
      myDatas.data?.forEach(element => {
       
        element.invoice.forEach(item => {
          
          const newInvoice ={

            invoiceId: item.id,
            invoiceNumber: item.invoice_number,
            invoiceAmount: item.invoice_amount,
            invoiceEmitDate: item.created_at,
            invoicePaymentDate: item.updated_at,
            invoiceStatus: item.invoice_status,
            clientFullname: element.customer.institute_name ? element.customer.institute_name : element.customer.last_name+" "+element.customer.first_name,
              
          }

         // console.log(newInvoice);
         myNewElmts = [...myNewElmts, newInvoice];
        })

      });
      setInvoice(myNewElmts);

    } catch (error) {
      console.error('Erreur lors de la requête GET', error);
    }
  };
  
  fetchData();

}, [urlGetInvoice]);

const handleFilter = (e) => {
  const newInvoice = filterInvoice.filter(row => row.invoiceNumber.toLowerCase().includes(e.target.value.toLowerCase()));
  setInvoice(newInvoice);
}

const closeModal = () => {
  setModalOpen(false);
};



const sampleInvoice = {
  date_facture: '2023-12-01',
  numero_facture: '0021/PERL/23',
  nClient: 'Hotel le pelerin',
  aClient: 'DASSA',
  tClient: '0022961656895',
  designation: 'Chambre 305',
  nombre_de_jour: 5,
  prix_journalier: 25000,
  prix_total: 5 * 25000,
};




  return (
    <div  className="backgroundImgChambre">
      < Header menuTitle= 'FACTURE' />
      {/* Page content */}
      <Container fluid className="pt-4 pb-5">

        
    
        <div className="float-right col-md-12 col-12 pb-2  " style={{width:"20%",display:"flex",justifyContent:"left",right:"0"}}>
            <Input type="text" placeholder="Recherche..." onChange={(e)=> handleFilter(e)} />
        </div>
        <div>
          {
            invoice && (
              <DataTable
              title="Liste des Factures"
              columns={cols}
              data={invoice}
              keyField="Num"
              // onRowClicked={handleRowClick}
              customStyles={customStyles}
              pagination >
            </DataTable>  )
          }
        </div>
        <div>
          <Modal isOpen={modalOpen} toggle={closeModal} size="lg" >
            <PDFViewer width="100%" height="600px" >
              <PrintInvoice myInvoice={sampleInvoice} />
            </PDFViewer>
          </Modal>
        </div>

      </Container>
    </div>
  );
};

export default Invoice;
