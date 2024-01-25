/*!


jjjjj
*/
// reactstrap components
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

const Tables = () => {
  const token = localStorage.getItem('accessToken');
  const tokenn ='1235478952';
 // const id= localStorage.getItem('id');
 // const [clients, setClients] = useState([]);
  const [clientsPhysique, setClientsPhysique] = useState([]);
  const [clientsMoral, setClientsMoral] = useState([]);
  const [pending, setPending] = useState(true);
 

//const client = GetClient();
const handleButtonDelete = (id) => {
  
};
const handleButtonUpdate = (id) => {
  
};

async function GetClient  () {

  try {
    
    const response = await fetch( prefix_link+'/clients', {
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
console.log('Response from Flask API:', data.data);
    const clientsData = Object.values(data.data).map(item => {
      if (item && item.customer) {

        const clientData= [{           
         customer:{               
           email: item.customer.email || null,
          firstName: item.customer.first_name || null,
          lastName: item.customer.last_name || null,
          phoneNumber: item.customer.phone_number || null,
          gender: item.customer.gender || null,
        ifu: item.customer.ifu || null,
        instituteName: item.customer.institute_name || null,
        dateOfBirth: item.customer.date_of_birth || null,
        address: item.customer.address || null,
        typeCustomer: item.type_customer ? item.type_customer.type_custormer : null,
        }, }]

    
        
      //  console.log('Response frommmmmmaa Flask API:', clientData);
        return clientData;
        
      } else {
        //console.log('Response frommmmmm Flask API:', /*data*/);
        return null; // ou toute autre valeur par défaut que vous préférez
      }
    });



  return clientsData;
} catch (error) {
console.error('Une erreur s\'est produite : ', error);
console.log('Response from Flask API:', error.type);
}
};




//useEffect(() => {
  // Utilisation de useEffect pour exécuter GetClient une seule fois au chargement initial
  async function fetchData() {
    try {
      const clientsData = await GetClient();
      //console.log('uhrtbdrhdytn:', clientsData);
      const physiques = clientsData.flatMap(arr => arr).filter(item => item.customer.typeCustomer === "Physique");
      const moraux = clientsData.flatMap(arr => arr).filter(item => item.customer.typeCustomer === "Morale");
//console.log('uhrtbdrhdytnphyy:', physiques);
setClientsPhysique(physiques);
console.log('uhrtbdrhdytnphyy:', physiques);
        setClientsMoral(moraux);
        setPending(false);
//transformer la liste des clients en tableau
//const clientsDataArray = Object.value(clientsData)
     
    } catch (error) {
      console.error("Une erreur s'est produite : ", error);
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    fetchData(); // Exécute GetClient au chargement initial
  
  }, []); // Le tableau de dépendances vide [] signifie que cela ne dépend d'aucune variable, donc cela s'exécutera une seule fois






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
        <Button color="primary" onClick={() => handleButtonUpdate(row)}>Mod</Button>
      ),
      allowOverflow: true,
      button: true,
      selector: (row) => row.statut,
      sortable: true,
    },
    {
      name: 'SUPPRIMER',
      cell: (row) => (
        <Button color="danger" onClick={() => handleButtonDelete(row)}>Sup</Button>
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
        <Button color="primary" onClick={() => handleButtonUpdate(row)}>Mod</Button>
      ),
      allowOverflow: true,
      button: true,
      selector: (row) => row.statut,
      sortable: true,
    },
    {
      name: 'SUPPRIMER',
      cell: (row) => (
        <Button color="danger" onClick={() => handleButtonDelete(row)}>Sup</Button>
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
              <DataTable 
              columns={cols2}
              data={clientsMoral}
              pagination
              customStyles={customStyles}
              responsive
              progressPending={pending}
             
             progressComponent={<CustomLoader/>}>
               
              </DataTable>
             
            </Card>
          </div>
        
         
        </Row>


      </Container>
    </>
    </div> );
  };

export default Tables;
