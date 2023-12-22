import { Card, CardBody, CardTitle,  Row, Col,Modal, ModalBody, CardFooter, CardHeader } from 'reactstrap';
import 'assets/css/card.css';
import DataTable from 'react-data-table-component';

import React, { useState, useEffect } from 'react';
import { prefix_link } from 'variables/globalesVar';
import axios from 'axios';

const CurrentInfosTable = () => {
    const urlGetRA = prefix_link + "/api/v1/room_availlable"; // toutes les chambres disponibles 
    const urlGetER = prefix_link + "/api/v1/current_ended_room"; //toutes les chambres qui doivent etre libéréer dans la journée   
    const urlGetR = prefix_link + "/api/v1/rooms";
    const urlGetOR = prefix_link + "/api/v1/current_occupied_room"; //toutes les chambres qui sont occupées aujourd'hui

    const cols = [
        {
          name : "",
          selector : row  => row.room.room_label,
          sortable : true
        },
        {
          name : "Chambres",
          selector : row  => row.room_category.place_number,
          sortable : true
        },
        {
          name : "Total",
          selector : row  => row.room_category.room_category_label,
          sortable : true
        },
        {
          name : "Pourcentage",
          selector : row  => row.room.room_amount,
          sortable : true
        }
      ]
      

   
    return (

         
    <DataTable
        // title="Liste des chambres"
        // columns={cols}
        // data={room}
        // keyField="CHAMBRE"
        // customStyles={customStyles}
        // highlightOnHover
        // pagination 
        >
    </DataTable> 


   )

}

export default CurrentInfosTable;