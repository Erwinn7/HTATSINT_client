import  { React, useState, useEffect } from 'react';
import { Container, Input, Button } from 'reactstrap';
import DataTable from "react-data-table-component";
import Header from 'components/Headers/Header';
//import { client } from 'variables/globalesVar';
import 'assets/css/customerDesign.css';
import PaymentModal from "components/Forms/AddReglementForm"
import ModalMoralFactures from 'components/Modals/ModalMoralFacture';
import ModalPhysiqueFactures from 'components/Modals/ModalPhysiqueFacture';
import { prefix_link } from 'variables/globalesVar';
import { useNavigate } from 'react-router-dom';
import CustomLoader from 'components/CustomLoader/CustomLoader';
const Apayer =  () => {
 // const [room, setRoom] = useState([]); // Assurez-vous de déclarer l'état pour la variable 
 const navigate = useNavigate();
 const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
 const [facturesClientSelectionne, setFacturesClientSelectionne] = useState([]);
 const [modalMoralOuvert, setModalMoralOuvert] = useState(false);
 const [modalPhysiqueOuvert, setModalPhysiqueOuvert] = useState(false);
const [pending, setPending] = useState(true);
 // client selectionne
 const [clientSelectionne, setClientSelectionne] = useState(null);
 const [clients, setClients] = useState([]); // Ajoutez l'état pour stocker la liste des clients

 const handlePaymentSuccess = () => {
  // Cette fonction sera appelée lorsque le paiement est réussi
  // Elle mettra à jour l'état pour déclencher l'effet useEffect
  
};

   const GetClientsInvoice = async () => {
    //const navigate = useNavigate();

    try {
      const token = localStorage.getItem('accessToken');
     

     // console.log('Response from Flask API:', email);
      const response = await fetch(prefix_link + '/api/v1/invoice_with_customer', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          
       
        },
      });
  
      if (!response.ok) {
        //throw new Error('Network response was not ok');
        console.log('Response from Flask API:', /*data*/);
      }
 
   // console.log('Response from Flask API:', response);
    const data = await response.json();
    if (data.data && data.data.length > 0) {
      const clientsData = data.data.map(item => {
        const client = item.customer;
        const invoices = item.invoice;
        const totalDue = item.amount;
        const numberOfInvoices = invoices.length;
        console.log('Response from Flask API:', client);
        return {
          ...client,
          totalDue,
          numberOfInvoices,
          invoices,
        };
      });

      setClients(clientsData);
      return clientsData;

  }
    
    } catch (error) {
    console.log('tfkyuh',error);
     // console.error('Une erreurrrrr s\'est produite : ', error);
     navigate('/auth/login');
    }
  };
  const fetchData =  async () => {
    try {
     // console.log('Response from Flask APIdddddd:', clients);
      const res = await GetClientsInvoice();
      setClients(res);
      setPending(false);
     // console.log(res.data);
    } catch (error) {
      navigate('/auth/login');
     
      console.error('Erreur lors de la requête GET', error);
    }
  };

  
  useEffect(() => {
   
  
   fetchData();
    
  }, [  ] ); 


// recuperer la listes des client depuis la reponse de l'api

//console.log('Response from Flask API:', clients.id);










 
  const cols = [
   
    {
      name: 'NOM',
      
      selector: (clients) => clients.first_name? clients.first_name : '---',
      sortable: true,
      //ajouez du style css
      style: {
        // Add your desired CSS styles here
        backgroundColor: '#white',
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '10px',
        borderRadius: '5px',

      },
    },
    {
      name: 'PRENOM',
      selector: (clients) => clients.last_name? clients.last_name : '---',
      sortable: true,
      style: {
        // Add your desired CSS styles here
        backgroundColor: '#white',
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '10px',
        borderRadius: '5px',

      },
    },

    {
      name: 'INSTITUT',
      selector: (clients) => clients.institute_name? clients.institute_name : '---',
      sortable: true,
      style: {
        // Add your desired CSS styles here
        backgroundColor: '#white',
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '10px',
        borderRadius: '5px',

      },
    },
    {
      name: 'NBRE FACTURE',
      selector: (clients) => clients.numberOfInvoices,
      sortable: true,
      style: {
        // Add your desired CSS styles here
        backgroundColor: '#white',
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '10px',
        borderRadius: '5px',

      },
      
    },
    {
      name: 'MONTANT IMPAYE(FCFA)',
      selector: (clients) => clients.totalDue,
      sortable: true,
      style: {
        // Add your desired CSS styles here
        backgroundColor: '#white',
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '10px',
        borderRadius: '5px',

      },
    },
    {
      name: 'DETAIL',
      cell: (row) => (
        <Button color="success" onClick={() => handleButtonClick(row)}>Voir</Button>
      ),
      allowOverflow: true,
      button: true,
      selector: (row) => row.nom,
      sortable: true,
    },

    {
        name: 'PAYER',
        cell: (row) => (
          <Button disabled color="primary" onClick={() => handleButtonPayer(row)}>PAYER</Button>
        ),
        allowOverflow: true,
        button: true,
        selector: (row) => row.nom,
        sortable: true,
      },
  ];
  const handleButtonClick = async (row) => {
   
   // console.log('Données de la ligne cliqué :', row);

   
    if (row.institute_name !== null) {
      // Ouvrez le modal de client moral
      setModalMoralOuvert(true);
    setFacturesClientSelectionne(row.invoices);
    setClientSelectionne(row);
    } else {
      // Ouvrez le modal de client physique
      setModalPhysiqueOuvert(true);
      setFacturesClientSelectionne(row.invoices);
      setClientSelectionne(row);
    }
   
  };

  const handleButtonPayer = (rowData) => {
    // Logique à exécuter lorsque le bouton est cliqué
    setPaymentModalOpen(true);
    console.log('Bouton cliqué pour la ligne:', rowData);

  };
  
  const togglePaymentModal = () => {
    // Fermer le modal
    setPaymentModalOpen(!isPaymentModalOpen);
  };
  // Fonction handleFilter non définie, assurez-vous de la définir correctement
 
  const handleFilter = (e) => {
   
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
  

  return (
    <div className="backgroundImgClient">
      <Header menuTitle="REGLEMENTS" />

      <Container className=" pb-5 my-5" fluid>
        <div className="row">
          <div className="float-left col-md-3 col-12">

          </div>
          <div className="float-right offset-md-5 col-md-4 col-12" style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
            <Input type="text" placeholder="Recherche..." onChange={(e) => handleFilter(e)} />
          </div>
        </div>
        <br />

        {/* Table */}
        <div>
          
          <div>
            <DataTable  
    
    // Ajoutez d'autres objets de style pour les colonnes
    
    
     title="Liste des factures impayées" 
     columns={cols} 
     data={clients} 
     keyField="id" 
     pagination  
     customStyles={customStyles} 
     progressPending={pending}
             
       progressComponent={<CustomLoader/>}
>
              {/* Ajoutez ici des composants DataTable si nécessaire */}
            

            </DataTable>
            <PaymentModal isOpen={isPaymentModalOpen} toggle={togglePaymentModal} />
            <ModalMoralFactures
        ouvert={modalMoralOuvert}
        toggle={() => setModalMoralOuvert(!modalMoralOuvert)}
        factures={facturesClientSelectionne}
        client={clientSelectionne}
        onPaymentSuccess={handlePaymentSuccess}
      />
            <ModalPhysiqueFactures
        ouvert={modalPhysiqueOuvert}
        toggle={() => setModalPhysiqueOuvert(!modalPhysiqueOuvert)}
        factures={facturesClientSelectionne}
        client={clientSelectionne}
        onPaymentSuccess={handlePaymentSuccess}
      />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Apayer;
