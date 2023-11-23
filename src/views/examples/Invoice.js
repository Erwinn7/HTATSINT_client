import  {React,useState,useEffect} from "react";
import {
  Input,
  Container,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import DataTable from "react-data-table-component";
import Axios from "axios";
import { prefix_link } from "variables/globalesVar";

const Invoice = () => {

  const urlGetInvoice = prefix_link+"/api/v1/clients";
  const [invoice, setInvoice] = useState({});
  const [filterInvoice, setfilterInvoice] = useState({});

  const invoiceWithNum = invoice.data?.map((item, index) => {
    return { ...item, Num: index + 1 };
  });


  const cols = [
    {
      name : "N°",
      selector : row  => row.Num,
      sortable : true

    },
    {
      name : "CHAMBRE",
      selector : row  => row.room.room_label,
      sortable : true
    },
    {
      name : "PLACE",
      selector : row  => row.room_category.place_number,
      sortable : true
    },
    {
      name : "TYPE",
      selector : row  => row.room_category.room_category_label,
      sortable : true
    },
    {
      name : "PRIX (FCFA)",
      selector : row  => row.room.room_amount,
      sortable : true
    },
    {
      name : "STATUT",
      selector : row  => row.room.room_status,
      sortable : true
    }
  ]

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


useEffect ( () => {

  const fetchData = async () => {
    try {
      const res = await Axios.get(urlGetInvoice);
      setInvoice(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Erreur lors de la requête GET', error);
    }
  };
  
  fetchData();

}, [urlGetInvoice]);

const handleFilter = (e) => {
  const newInvoice = filterInvoice.filter(row => row.room.room_label.toLowerCase().includes(e.target.value.toLowerCase()));
  setInvoice(newInvoice);
}


// const handleRowClick = (row) => {
//   setSelectedRow(row);
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
              title="Liste des Factures"
              columns={cols}
              data={invoiceWithNum}
              keyField="Num"
              // onRowClicked={handleRowClick}
              customStyles={customStyles}
              pagination >
            </DataTable>  )
          }
        </div>

      </Container>
    </div>
  );
};

export default Invoice;
