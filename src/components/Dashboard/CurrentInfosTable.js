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

    const [currentInfo, setCurrentInfo] = useState([
        {
            titre : "",
            room : 0,
            total: 0,
            percent: 0,
        }
    ]);


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
      

useEffect(() => {
    const fetchRoomAvaillable =  async () => {
     try {
       const res = await axios.get(urlGetRA);
       console.log("Room Available:",res.data);
       setCurrentInfo((prevInfoRoom) => ({
        ...prevInfoRoom,
        room : res.data.data.length
      }));
     } catch (error) {   
       console.error('Erreur lors de la requête GET', error);
     }
   };
   
//    const fetchEndedRoom =  async () => {
//      try {
//        const res = await axios.get(urlGetER);
//        console.log("Ended Room:",res.data);
//        setEndedRoom(res.data.data);
//      } catch (error) {   
//        console.error('Erreur lors de la requête GET', error);
//      }
//    };
   
//    const fetchRoomOccupied =  async () => {
//      try {
//        const res = await axios.get(urlGetOR);
//        console.log("Room occupied",res.data);
//        setRoomOccupied(res.data.data);  
//      } catch (error) {   
//        console.error('Erreur lors de la requête GET', error);
//      }
//    };
   
//    const fetchRoomNumber = async () => {
//      try {
//        const res = await axios.get(urlGetR);
//        setRoomNumber(res.data.data.length);
//      } catch (error) {
//        console.error('Erreur lors de la requête GET', error);
//      }
//    };
   
   
   
//    fetchRoomAvaillable();
//    fetchEndedRoom();
//    fetchRoomOccupied();
//    fetchRoomNumber();
     
   }, [urlGetRA,urlGetER,urlGetOR,urlGetR] ); 






   
    return (

         
    <DataTable
        title="Informations courantes"
        columns={cols}
        data={currentInfo}
        keyField="Chambres"
        highlightOnHover
        pagination 
        >
    </DataTable> 


   )

}

export default CurrentInfosTable;