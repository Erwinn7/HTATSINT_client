
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS , ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { prefix_link } from 'variables/globalesVar';
import { useNavigate } from 'react-router-dom';

const RoomStatusChart = () => {  
  const navigate = useNavigate();

  const [RoomAvailables, setRoomAvailables] = useState([]); // Assurez-vous de déclarer l'état pour la variable
  const [RoomOccupieds, setRoomOccupieds] = useState([]); // Assurez-vous de déclarer l'état pour la variable
  const urlGetRA = prefix_link + "/room_availlable"; // toutes les chambres disponibles 
  const urlGetER = prefix_link + "/current_ended_room"; //toutes les chambres qui doivent etre libéréer dans la journée current_occupied_room
  const urlGetOR = prefix_link + "/current_occupied_room"; //toutes les chambres qui
  //recuperation de data
  
  const RoomAvailable = async () => {
  
    try {
      const token = localStorage.getItem('accessToken');
      const email= localStorage.getItem('email');

     // console.log('Response from Flask API:', email);
      const response = await fetch(urlGetRA, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'email': `${email}`
        },
      });
  
      if (!response.ok) {
        //throw new Error('Network response was not ok');
        console.log('Response from Flask API:', /*data*/);
      }
 
   // console.log('Response from Flask API:', response);
    const data = await response.json();
   
   return data;
    
    } catch (error) {
     //navigate('/auth/login');
     console.log('Response erro from Flask API:', error);
    }
  };
  const fetchroomAvailables =  async () => {
    try {
     // console.log('Response from Flask APIdddddd:', clients);
      const res = await RoomAvailable();
      setRoomAvailables(res.data);
     
     // console.log(res.data);
    } catch (error) {
     // navigate('/auth/login');
     
      console.error('Erreur lors de la requête GET', error);
    }
  };


  

  const roomOccupied = async () => {
  
    try {
      const token = localStorage.getItem('accessToken');
      const email= localStorage.getItem('email');

     // console.log('Response from Flask API:', email);
      const response = await fetch(urlGetOR, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'email': `${email}`
        },
      });
  
      if (!response.ok) {
        //throw new Error('Network response was not ok');
        //console.log('Response from Flask API:', /*data*/);
      }
 
   // console.log('Response from Flask API:', response);
    const data = await response.json();
  // console.log('Response from Flask API:', data);
   return data;
    
    } catch (error) {
     //navigate('/auth/login');
     //console.log('Response erro from Flask API:', error);
    }
  };
  const fetchRoomOccupied=  async () => {
    try {
     // console.log('Response from Flask APIdddddd:', clients);
      const res = await roomOccupied();
      setRoomOccupieds(res.data);
     
    // console.log(res.data);
    } catch (error) {
     // navigate('/auth/login');
     
      console.error('Erreur lors de la requête GET', error);
    }
  };



  
  useEffect(() => {
   
  
    fetchroomAvailables();
    fetchRoomOccupied();
  }, [  ] ); 

  const RA = RoomAvailables?.length;

const OR = RoomOccupieds?.length;




   
     const data = {
      labels: ['Disponible     ', 'Occuppée', 'Reservation   ', 'Indisponible'],
      datasets: [
       
        {
          label: '# Statut Chambres',
          data: [RA, OR, 0, 5],
          backgroundColor: [
           'rgb(34, 152, 231)',
           // 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)',
            //couleur grise fonce
            'rgb(68,68,68)'  ,
            'rgb(255, 0, 0)',
            'rgb(0, 13, 6)'
            
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
            
          ],
          borderWidth: 1,
        },
      ],
    };
    
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
          // position: 'top',
          // align: 'start',
         
         //mettre la legende en bas
         position: 'right',  // Mettez 'right' pour placer la légende à droite du diagramme
        },
       
        datalabels: {
          color: 'white',
          anchor: 'end',
          align: 'end',
          font: {
            size: 4,
          },
        },
      },
    };
  
   
      return (     

<div style={{height:'300px'}}>
<Pie data={data} options={options} />;
</div>

      );
      
     
    


}

export default RoomStatusChart;