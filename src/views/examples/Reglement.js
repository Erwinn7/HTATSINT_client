//import React, { useState } from 'react';
import { Container, Input } from 'reactstrap';
import DataTable from "react-data-table-component";
import Header from 'components/Headers/Header';
import AjoutUser from 'components/Buttons/ButtonAddUser';
import GetClient from 'components/Funtions/GetCustomer';
import { client } from 'variables/globalesVar';
import 'assets/css/customerDesign.css';

const Users = () => {
 // const [room, setRoom] = useState([]); // Assurez-vous de déclarer l'état pour la variable room

 const customTheme = {
  text: {
    primary: 'red',
  },
  background: {
    default: 'lightblue',
  },
};
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
      name: 'NBRE FACTURE',
      selector: (row) => row.type,
      sortable: true,
      
    },
    {
      name: 'MONTANT IMPAYE(FCFA)',
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: 'DETAIL',
      selector: (row) => row.statut,
      sortable: true,
    },

    {
        name: 'PAYER',
        cell: (row) => (
          <button onClick={() => handleFilter(row)}>PAYER</button>
        ),
        allowOverflow: true,
        button: true,
        selector: (row) => row.statut,
        sortable: true,
      },
  ];
  

  GetClient(); // Assurez-vous que GetClient() a un comportement approprié

  // Fonction handleFilter non définie, assurez-vous de la définir correctement
  const handleFilter = (e) => {
    // Ajoutez le code nécessaire pour gérer la recherche
  };

  return (
    <div className="backgroundImgClient">
      <Header menuTitle="REGLEMENTS" />

      <Container className="my-5" fluid>
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
            <DataTable className="" title="Liste des reglements" columns={cols} data={client} keyField="id" pagination               theme={customTheme}
>
              {/* Ajoutez ici des composants DataTable si nécessaire */}
            

            </DataTable>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Users;
