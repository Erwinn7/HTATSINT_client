import  {React,useState,useEffect} from "react";
import {
  Input,
  Container,
  Badge,
  Button,Modal,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import DataTable from "react-data-table-component";
import axios from "axios";
import { prefix_link } from "variables/globalesVar";
import PrintInvoice from "components/Printer/PrintInvoice";
import { PDFViewer } from '@react-pdf/renderer';
import CustomLoader from 'components/CustomLoader/CustomLoader';



const Invoice = () => {
  const token = localStorage.getItem('accessToken');
  const urlGetInvoice = prefix_link+"/api/v1/invoices";  
  const urlGetRoomAndOccup = prefix_link+"/api/v1/room_and_occupation";    
  
  const [invoice, setInvoice] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterInvoice, setfilterInvoice] = useState({});
  const [selectedRow, setSelectedRow] = useState();
  const [pending, setPending] = useState(true);


  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', 
      'Authorization': `Bearer ${token}`

    },
  };



  const cols = [
    {
      name : "DATE D'EMISSION",
      selector : row  => formatDate(row.invoiceEmitDate), 
      sortable : true

    },
    {
      name : "CLIENT",
      selector : row  => row.costumerFullname,
      sortable : true
    },
    {
      name : "N° FACTURE",
      selector : row  => row.invoiceNumber,
      sortable : true
    },
    {
      name : "MONTANT (FCFA)",
      selector : row  => row.invoiceAmount,
      sortable : true
    },
    {
      name : "STATUT",
      selector : row  => (
        <Badge color="" className="badge-dot mr-4">
          <i className={row.invoiceStatus === 'Paid' ? "bg-success" : "bg-danger"} />
          {row.invoiceStatus ==="Paid" ? "Payé" : "Impayée"}
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
   
    const fetchInvoiceData = async () => {
      try {
        const response = await axios.post(urlGetRoomAndOccup, {invoice_id: row.invoiceId },config);
        //console.log("Reponse du serveur: ",response.data) ;
        const myDatas = response.data;

        const newInvoiceData = {
          invoiceEmitDate: formatDate(row.invoiceEmitDate) ,
          invoiceNumber: row.invoiceNumber,
          invoiceStatus: row.invoiceStatus,
          customerFullname: row.costumerFullname,
          customerAddress: row.costumerAddress,
          costumerEmail: row.costumerEmail,
          costumerIfu: row.costumerIfu,  
          designation: myDatas.room.room_label,
          dayly_price: myDatas.room.room_amount,
          number_of_days: myDatas.number_of_day,
        }

        setSelectedRow(newInvoiceData);
        //console.log(newInvoiceData);


      } catch (error) {
        console.error('Erreur lors de la requête GET', error);
      }
    };

    fetchInvoiceData();
    setModalOpen(true);
    
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

  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
  const year = date.getUTCFullYear();

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};



useEffect ( () => {
  const token = localStorage.getItem('accessToken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', 
      'Authorization': `Bearer ${token}`
    },
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(urlGetInvoice,config);
      //console.log(res.data)
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
            costumerFullname: element.customer.institute_name ? element.customer.institute_name : element.customer.last_name+" "+element.customer.first_name,
            costumerAddress: element.customer.address,
            costumerEmail: element.customer.email,
            costumerIfu: element.customer.ifu,  
          }

         //console.log(newInvoice);
         myNewElmts = [...myNewElmts, newInvoice];
        })

      });
      setInvoice(myNewElmts);
      setPending(false);


    } catch (error) {
      console.error('Erreur lors de la requête GET', error);
      setPending(false);

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



// const sampleInvoice = {
//   date_facture: '2023-12-01',
//   numero_facture: '0021/PERL/23',
//   nClient: 'Hotel le pelerin',
//   aClient: 'DASSA',
//   tClient: '0022961656895',
//   designation: 'Chambre 305',
//   nombre_de_jour: 5,
//   prix_journalier: 25000,
//   prix_total: 5 * 25000,
// };




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
              title="Liste des factures"
              columns={cols}
              data={invoice}
              keyField="Num"
              customStyles={customStyles}
              progressPending={pending}
              progressComponent={<CustomLoader/>}
              highlightOnHover
              pagination >
            </DataTable>  )
          }
        </div>
        <div>
          <Modal isOpen={modalOpen} toggle={closeModal} size="lg" >
            {
            selectedRow &&
            <PDFViewer width="100%" height="600px" >
              <PrintInvoice myInvoice={selectedRow} />
            </PDFViewer>
            }            
          </Modal>
        </div>

      </Container>
    </div>
  );
};

export default Invoice;
