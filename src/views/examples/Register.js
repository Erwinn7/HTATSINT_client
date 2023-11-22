import React, { useState } from 'react';
import { Container, Input } from 'reactstrap';
import DataTable from "react-data-table-component";
import Header from 'components/Headers/Header';
import AjoutUser from 'components/Buttons/ButtonAddUser';
//import GetClient from 'components/Funtions/GetCustomer';
import { client } from 'variables/globalesVar';
import 'assets/css/customerDesign.css';

const Users = () => {
  const [user, setUser] = useState(client); 
  const [filterUser, setfilterUser] = useState(client);

  const cols = [
    
    {
      name: 'NOM',
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: 'PRENOM',
      selector: (row) => row.last_name,
      sortable: true,
    },
    {
      name: 'TYPE',
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: 'EMAIL ',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'DERNIERE CONNEXION',
      selector: (row) => row.last_connexion,
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
    const newUser = filterUser.filter(row => row.first_name.toLowerCase().includes(e.target.value.toLowerCase()));
  setUser(newUser);
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
             data={client} 
             keyField="id" 
             customStyles={customStyles}
             pagination
             >
              

            </DataTable>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Users;
