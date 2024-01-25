import 'assets/css/card.css';
import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import { prefix_link } from 'variables/globalesVar';
import axios from 'axios';
import CustomLoader from 'components/CustomLoader/CustomLoader';


const CurrentInfosTable = () => {
  const [pending, setPending] = useState(true);

    const urlGetRA = prefix_link + "/room_availlable"; // toutes les chambres disponibles 
    const urlGetER = prefix_link + "/current_ended_room"; //toutes les chambres qui doivent etre libéréer dans la journée   
    const urlGetR = prefix_link + "/rooms";
    const urlGetOR = prefix_link + "/current_occupied_room"; //toutes les chambres qui sont occupées aujourd'hui

    const [currentInfo, setCurrentInfo] = useState([]);
      

useEffect(() => {

  const fetchData = async () => {
    const token = localStorage.getItem('accessToken');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const fetchRoomAvailable = async () => {
        const res = await axios.get(urlGetRA, config);
        return res.data.data.length;
      };

      const fetchRoomOccupied = async () => {
        const res = await axios.get(urlGetOR,config);
        return res.data.data.length;
      };

      const fetchRoomNumber = async () => {
        const res = await axios.get(urlGetR, config);
        return res.data.data.length;
      };

      const roomAvailableNow = await fetchRoomAvailable();
      const roomOccupied = await fetchRoomOccupied();
      const roomNumber = await fetchRoomNumber();

      setCurrentInfo([
        {
          titre: "Ce matin",
          room: `${roomNumber - (roomAvailableNow + roomOccupied)} / ${roomNumber}`,
          percent: ((roomNumber - (roomAvailableNow + roomOccupied)) / roomNumber * 100).toFixed(2) // Arrondir à deux chiffres après la virgule
        },
        {
          titre: "Actuellement",
          room:  `${roomNumber - roomAvailableNow} / ${roomNumber}`,
          percent: ((roomNumber - roomAvailableNow) / roomNumber * 100).toFixed(2) // Arrondir à deux chiffres après la virgule
        }
      ]);
      setPending(false);

    } catch (error) {
      console.error('Erreur lors de la requête GET', error);
      setPending(false);

    }
  };

  fetchData();
     
   }, [urlGetRA,urlGetER,urlGetOR,urlGetR] ); 

   const cols = [
    {
      name : "",
      selector : row  => row.titre,
      sortable : true,
      style: {
      fontWeight: 'bold'
      }

    },
    {
      name : "Occupés",
      selector : row  => row.room,
      sortable : true,

    },
    {
      name : "%",
      selector : row  => row.percent,
      sortable : true
    }
  ]




   
    return (

         
    <DataTable className='mb-3'
        columns={cols}
        data={currentInfo}
        keyField="Occupés"
        progressPending={pending}
        progressComponent={<CustomLoader/>}
        >
    </DataTable> 


   )

}

export default CurrentInfosTable;