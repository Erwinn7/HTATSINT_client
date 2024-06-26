import React, { useEffect, useState } from 'react';
import { Container, Input, Button } from 'reactstrap';
import DataTable from "react-data-table-component";
import Header from 'components/Headers/Header';
import AjoutUser from 'components/Buttons/ButtonAddUser';
import 'assets/css/customerDesign.css';
import { prefix_link } from 'variables/globalesVar';
//import {Oval} from "react-loader-spinner";
import CustomLoader from 'components/CustomLoader/CustomLoader';
import ModalsNoRecFound from 'components/Modals/ModalsNoRecFound';
import ModalUpdateUser from 'components/Modals/ModalUpdateUser';

const Users = () => {

const [users, setUsers] = useState([]);
const [filterUser, setfilterUser] = useState([]);

const [pending, setPending] = useState(true);
const [updateModalOpen, setUpdateModalOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);

async function GetUsers  () {
  const token = localStorage.getItem('accessToken');
  

  try {
    const response = await fetch(prefix_link+'/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,


      }
    });

    if (!response.ok) {
      console.log('Response from Flask API:', 'merde');
    }

    const data = await response.json();
    console.log('Response from Flask API:', data);
    if (data && data.data.length > 0) {
      const usersData = data.data.map(item => ({
        id_employee: item.employee.id,
        id_user: item.user.id,
        id_role: item.role[0].id,
        first_name: item.employee.first_name,
        last_name: item.employee.last_name,
        role: item.role[0].role_name, // 
        email: item.user.email,
        last_connexion: item.employee.updated_at, // Adjust this based on your data structure
      }));
      
      
     // console.log('Response from Flask API:', usersData);
      //setUsers(usersData);
     return usersData;
    } else {
      console.log('Response from Flask API:', 'no dataaaa');
    }
} catch (error) {
  // emettre une alerte d'erreur
  console.error('Une erreurrrrraaa s\'est produite : ', error);
};
};

async function fecthUsers  () {

  try {
    const data = await GetUsers();
    setUsers(data);
    setfilterUser(data);
    setPending(false);

   // console.log('Response from Flask API:', data);
  }

  catch (error) {
    // emettre une alerte d'erreur
    console.error('Une erreurrrrr s\'est produite : ', error);
  };  
};

useEffect(() => {
 
  fecthUsers();
}, [])

const handleButtonUpdate = (row) => {
  // Ouvrez le modal de client physique
  console.log("tyjgvkh:",row);
  setUpdateModalOpen(true);
  setSelectedUser(row);


};

/*React.useEffect(() => {
  const timeout = setTimeout(() => {
    setRows(users);
    setPending(false);
  }, 5000);
  return () => clearTimeout(timeout);
}, []);  


*/


  const cols = [
    
    {
      name: 'NOM',
      selector: (users) => users.first_name,
      sortable: true,
    },
    {
      name: 'PRENOM',
      selector: (users) => users.last_name,
      sortable: true,
    },
    {
      name: 'TYPE',
      selector: (users) => users.role,
      sortable: true,
    },
    {
      name: 'EMAIL ',
      selector: (users) => users.email,
      sortable: true,
    },
    {
      name: 'DERNIERE CONNEXION',
      selector: (users) => users.last_connexion,
      sortable: true,
    },
    {
      name: 'MODIFIER ',
      cell: (row) => (
        <Button  color="primary" size="sm" onClick={() => handleButtonUpdate(row)}>Modifier
        </Button>
      ),
      allowOverflow: true,
      button: true,
      selector: (row) => row.statut,
      sortable: true,
    },
    {
      name: 'SUPPRIMER ',
      cell: (row) => (
        <Button disabled color="danger" size='sm' onClick={() => ()=>{}}>Supprimer
        </Button>
      ),
      selector: (users) => users.email,
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


  
 
  const handleFilter = (e) => {
    // Récupérer la valeur de recherche
  const searchTerm = e.target.value.toLowerCase();
  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUsers = filterUser.filter(row => 
    row.role.toLowerCase().includes(searchTerm)
  );
  // Mettre à jour uniquement l'état 'users' en fonction des résultats filtrés
  setUsers(filteredUsers);
  };

  return (
    <div className="backgroundImgClient">
      <Header menuTitle="UTILISATEURS" />

      <Container className="pb-5 my-5" fluid>
        <div className="row">
          <div className="float-left col-md-3 col-12">
            <AjoutUser butonTitle="Ajouter un utilisateur" />
          </div>
          <div className="float-right offset-md-5 col-md-4 col-12" style={{ width: '20%', display: 'flex', justifyContent: 'right' }}>
            <Input type="text" placeholder="Recherche..." onChange={(e) => handleFilter(e)} />
          </div>
        </div>
        <br />

        {/* Table */}
        <div>
          
          <div>

            {
              users.length ===0 ?
              <div className="mt-2 mb-9">
                <ModalsNoRecFound text="Aucune chambre disponible sur cette période"   />
              </div>
              :
              <DataTable 
                className="" 
                title="Liste des utilisateurs" 
                columns={cols}
                data={users} 
                keyField="id" 
                customStyles={customStyles}
                pagination
                // progressPending={pending}
                
                progressComponent={<CustomLoader/>}
                >
              </DataTable>
            }

            
          </div>
        </div>
      </Container>
      <ModalUpdateUser
      selectedUser={selectedUser}
        ouvert={updateModalOpen}
        toggle={() => {
          GetUsers();
        setUpdateModalOpen(!updateModalOpen)}}
      ></ModalUpdateUser>
    </div>
  );
};

export default Users;
