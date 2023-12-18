import React, { useEffect, useState } from 'react';
import { Container, Input } from 'reactstrap';
import DataTable from "react-data-table-component";
import Header from 'components/Headers/Header';
import AjoutUser from 'components/Buttons/ButtonAddUser';
import 'assets/css/customerDesign.css';
import { prefix_link } from 'variables/globalesVar';
//import {Oval} from "react-loader-spinner";
import CustomLoader from 'components/CustomLoader/CustomLoader';

const Users = () => {

const [users, setUsers] = useState([]);

const [pending, setPending] = useState(true);

async function GetUsers  () {

  try {
    const response = await fetch(prefix_link + '/api/v1/users', {
      method: 'GET'
    });

    if (!response.ok) {
      console.log('Response from Flask API:', 'merde');
    }

    const data = await response.json();
    console.log('Response from Flask API:', data);
    if (data && data.data.length > 0) {
      const usersData = data.data.map(item => ({
        id: item.employee.id,
        first_name: item.employee.first_name,
        last_name: item.employee.last_name,
        role: item.role[0].role_name, // 
        email: item.user.email,
        last_connexion: item.employee.updated_at, // Adjust this based on your data structure
      }));
      
      
      console.log('Response from Flask API:', usersData);
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
    setPending(false);

    
  }

  catch (error) {
    // emettre une alerte d'erreur
    console.error('Une erreurrrrr s\'est produite : ', error);
  };  
};

useEffect(() => {
 
  fecthUsers();
}, [])


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
    // Ajoutez le code nécessaire pour gérer la recherche
    //const newUser = filterUser.filter(row => row.first_name.toLowerCase().includes(e.target.value.toLowerCase()));
  //setUser(newUser);
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
            <DataTable 
            className="" 
            title="Liste des utilisateurs" 
            columns={cols}
             data={users} 
             keyField="id" 
             customStyles={customStyles}
             pagination
             progressPending={pending}
             
             progressComponent={<CustomLoader/>}
             >
              

            </DataTable>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Users;
