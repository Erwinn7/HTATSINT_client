
import {
  //Button,
  //ButtonDropdown,
  Button,
  //Badge,
  Card,
  CardHeader,
  
  Container,
  Row,
  Input,
  //UncontrolledTooltip,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import Header from "components/Headers/Header.js";
import AjoutClient from "components/Buttons/Button";
//import GetClient from "components/Funtions/GetCustomer";
//import { client } from "variables/globalesVar";
import "assets/css/customerDesign.css";
import { prefix_link } from "variables/globalesVar";
import CustomLoader from 'components/CustomLoader/CustomLoader';
import ModalUpdateCustomer from 'components/Modals/ModalUpdateCustomer';
import ModalUpdateCustomerEnt from 'components/Modals/ModalUpdateCustomerEnt';
import ModalsNoRecFound from 'components/Modals/ModalsNoRecFound';

const Tables = () => {
  const token = localStorage.getItem('accessToken');
 
 // const id= localStorage.getItem('id');
 // const [clients, setClients] = useState([]);
  const [clientsPhysique, setClientsPhysique] = useState([]);
  const [clientsMoral, setClientsMoral] = useState([]);
  const [pending, setPending] = useState(true);
 // const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedClientPhysique, setSelectedClientPhysique] = useState(null);
  const [selectedClientMoral, setSelectedClientMoral] = useState(null);
  const [modalPhysiqueOuvert, setModalPhysiqueOuvert] = useState(false);
  const [modalMoralOuvert, setModalMoralOuvert] = useState(false);

//const client = GetClient();


async function GetClientPhysique  () {

  try {
    
    const response = await fetch( prefix_link+'/clients_physique', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      //throw new Error('Network response was not ok');
      console.log('Response from Flask API:', response);
      if (response.status === 401) {
        // Gérer le statut 401 ici (par exemple, rediriger vers la page de connexion)
        //navigate('/auth/login');
        console.log('Redirection vers la page de connexion');
      } else {
        // Gérer les autres erreurs
        console.log('Erreur inattendue:', response.status);
      }
    }

    const data = await response.json();
console.log('Response from Flask API physss:', data);

const clientPhysiqueData = Object.values(data.data).map(item => {
  if (item && item.customer) {
    return {           
      customer: { 
        id: item.customer.id || null,              
        email: item.customer.email || null,
        firstName: item.customer.first_name || null,
        lastName: item.customer.last_name || null,
        phoneNumber: item.customer.phone_number || null,
        gender: item.customer.gender || null,
        ifu: item.customer.ifu || null,
        //instituteName: item.customer.institute_name || null,
        dateOfBirth: item.customer.date_of_birth || null,
        address: item.customer.address || null,
        typeCustomer: item.type_customer ? item.type_customer.type_custormer : null,
      }
    };
  } else {
    // Retourne null si aucune donnée client n'est disponible
    return null;
  }
});

//console.log('Response from Flask API:', clientData);


  //  console.log('Response frommmmmmaa Flask API:', clientData);
    return clientPhysiqueData;


   
    

//  return clientsData;  */
} catch (error) {
console.error('Une erreur s\'est produite : ', error);
console.log('Response from Flask API:', error.type);
}
};

// les clients moraux
async function GetClientMoral  () {

  try {
    
    const response = await fetch( prefix_link+'/clients_morale', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      //throw new Error('Network response was not ok');
      console.log('Response from Flask API:', response);
      if (response.status === 401) {
        // Gérer le statut 401 ici (par exemple, rediriger vers la page de connexion)
        //navigate('/auth/login');
        console.log('Redirection vers la page de connexion');
      } else {
        // Gérer les autres erreurs
        console.log('Erreur inattendue:', response.status);
      }
    }

    const data = await response.json();
console.log('Response from Flask API:', data);
const clientMoralData = Object.values(data.data).map(item => {
  if (item && item.customer) {
    return {           
      customer: { 
        id: item.customer.id || null,              
        email: item.customer.email || null,
        //firstName: item.customer.first_name || null,
       // lastName: item.customer.last_name || null,
        phoneNumber: item.customer.phone_number || null,
        //gender: item.customer.gender || null,
        ifu: item.customer.ifu || null,
        instituteName: item.customer.institute_name || null,
        dateOfBirth: item.customer.date_of_birth || null,
        address: item.customer.address || null,
        typeCustomer: item.type_customer ? item.type_customer.type_custormer : null,
      }
    };
  } else {
    // Retourne null si aucune donnée client n'est disponible
    return null;
  }
});

//console.log('Response from Flask API:', clientData);




   


  return clientMoralData;
} catch (error) {
console.error('Une erreur s\'est produite : ', error);
console.log('Response from Flask API:', error.type);
}
};



//useEffect(() => {
  // Utilisation de useEffect pour exécuter GetClient une seule fois au chargement initial
 

  useEffect(() => {
   // fetchData(); // Exécute GetClient au chargement initial
    

   async function fetchData( ) {
    try {
      const clientsDataPhysique = await GetClientPhysique();
      const clientsDataMoral = await GetClientMoral();
      //console.log('uhrtbdrhdytn:', clientsData);
     /* const physiques = clientsData.flatMap(arr => arr).filter(item => item.customer.typeCustomer === "Physique");
      const moraux = clientsData.flatMap(arr => arr).filter(item => item.customer.typeCustomer === "Morale");*/
//console.log('uhrtbdrhdytnphyy:', physiques);
setClientsPhysique(clientsDataPhysique);
//console.log('uhrtbdrhdytnphyy:', clientsDataPhysique);
        setClientsMoral(clientsDataMoral);
        setPending(false);
//transformer la liste des clients en tableau
//const clientsDataArray = Object.value(clientsData)
     
    } catch (error) {
      console.error("Une erreur s'est produite : ", error);
    } finally {
      setPending(false);
    }
  };
  fetchData();





    
  
  }, []); // Le tableau de dépendances vide [] signifie que cela ne dépend d'aucune variable, donc cela s'exécutera une seule fois

const handleButtonUpdate1 = (row) => {
    // Ouvrez le modal de client physique
    console.log("tyjgvkh:",row);
    if (row.customer.typeCustomer === "Physique"  ) {
      setModalPhysiqueOuvert(true);

    setSelectedClientPhysique(row);
    } else {
      setModalMoralOuvert(true);
      setSelectedClientMoral(row);
    }
    
  

};



// Fonction pour mettre à jour le tableau de clients moraux après la modification






const cols = [
   
  {
    name: 'NOM',
    
    selector: (client) => client.customer.firstName,
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
    selector: (client) => client.customer.lastName,
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
    name: 'TELEPHONE',
    selector: (client) => client.customer.phoneNumber,
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
    name: 'EMAIL',
    selector: (client) => client.customer.email,
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
    name: 'ADRESSE',
    selector: (client) => client.customer.address,
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
      name: 'MODIFIER',
      cell: (row) => (
        <Button color="primary" onClick={() => handleButtonUpdate1(row)}>Mod</Button>
      ),
      allowOverflow: true,
      button: true,
      selector: (row) => row.statut,
      sortable: true,
    },
    {
      name: 'SUPPRIMER',
      cell: (row) => (
        <Button color="danger" onClick={() => ()=>{}}>Sup</Button>
      ),
      allowOverflow: true,
      button: true,
      selector: (row) => row.statut,
      sortable: true,
    },
];
   


const cols2 = [
   
  {
    name: 'NOM DE L\'INSTITUT',
    
    selector: (client) => client.customer.instituteName,
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
    name: 'TELEPHONE',
    selector: (client) => client.customer.phoneNumber,
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
    name: 'EMAIL',
    selector: (client) => client.customer.email,
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
    name: 'ADRESSE',
    selector: (client) => client.customer.address,
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
      name: 'MODIFIER',
      cell: (row) => (
        <Button color="primary" size="sm" onClick={() => handleButtonUpdate1(row)}>Modifier</Button>
      ),
      allowOverflow: true,
      button: true,
      selector: (row) => row.statut,
      sortable: true,
    },
    {
      name: 'SUPPRIMER',
      cell: (row) => (
        <Button color="danger" size="sm" onClick={() => ()=>{}}>Supprimer</Button>
      ),
      allowOverflow: true,
      button: true,
      selector: (row) => row.statut,
      sortable: true,
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










    // Ajoutez ici le code pour effectuer d'autres traitements avec la valeur saisie
  
 const HandleFilter = (e) => {
 
  
 }

  return (
    <div className="backgroundImgClient"> 
    
    <>
      <Header menuTitle= 'CLIENTS'/> 
         {/* Page content */}

         
      <Container className="pb-5 my-5" fluid>
     
            <ModalUpdateCustomer
selectedClient={selectedClientPhysique}
        ouvert={modalPhysiqueOuvert}
        toggle={() => {
          GetClientPhysique();
        setModalPhysiqueOuvert(!modalPhysiqueOuvert)}}
        
      />
            <ModalUpdateCustomerEnt
selectedClient={selectedClientMoral}
        ouvert={modalMoralOuvert}
        toggle={() => {
          GetClientMoral();
        setModalMoralOuvert(!modalMoralOuvert)}}
        
        
      />
    
      <div className="row">
      <div className="col">
      <AjoutClient 
      id = "ajout"
      butonTitle= "Ajouter nouveau client"
      >

      </AjoutClient>
      </div>
      <div className="float-right offset-md-5 col-md-3 col-12" style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
            <Input type="text" placeholder="Recherche..." onChange={(e) => HandleFilter(e)} />
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
              
              {
                clientsPhysique.length ===0 ?
                <div className="mt-2 mb-9">
                  <ModalsNoRecFound text="Aucune client physique enrégistré"   />
                </div>
                :
                <DataTable 
                  columns={cols}
                  data={clientsPhysique}
                  pagination
                  customStyles={customStyles}
                  responsive
                  fixedHeader={true}
                  progressPending={pending}
                  progressComponent={<CustomLoader/>}
                  >
             
                </DataTable>

              }


              
             
            </Card>
          </div> 
         
        </Row>


<br></br> <br></br>

        {/* Dark table */}
      <div className="row">
<div className="col">

</div>
      <div className="float-right offset-md-5 col-md-3 col-12" style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
            <Input type="text" placeholder="Recherche..." onChange={(e) => HandleFilter(e)} />
      </div>
      </div>
<br></br>
        <Row>
       
         <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">PERSONNE MORALE</h3>
              </CardHeader>

              {
                clientsMoral.length ===0 ?
                <div className="mt-2 mb-9">
                  <ModalsNoRecFound text="Aucune client moral enrégistré"   />
                </div>
                :
                <DataTable 
                  columns={cols2}
                  data={clientsMoral}
                  pagination
                  customStyles={customStyles}
                  responsive
                  progressPending={pending}
                
                  progressComponent={<CustomLoader/>}>
                  
                </DataTable>

              }             
            </Card>
          </div>
        </Row>


      </Container>
    </>
    </div> );
  };

export default Tables;
