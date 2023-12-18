/*import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const RoomStatusChart = () => {
  // Données de l'état des chambres
  const data = {
    labels: ['Disponible', 'Bloquée', 'Réservée', 'Maintenance', 'Fermée', 'Ouverte'],
    datasets: [
      {
        data: [20, 5, 10, 8, 2, 5], // Remplacez ces valeurs par les données réelles
        backgroundColor: [
          '#3498db', // Bleu pour Disponible
          '#e74c3c', // Rouge pour Bloquée
          '#2ecc71', // Vert pour Réservée
          '#f39c12', // Jaune pour Maintenance
          '#8e44ad', // Violet pour Fermée
          '#27ae60', // Autre couleur pour Ouverte
        ],
      },
    ],
  };

  // Options du diagramme
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default RoomStatusChart;

*/

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


const RoomStatusChart = () => {
    
    //ChartJS.register(ArcElement, Tooltip, Legend);

     const data = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    
   
      return (     

<div>
<Pie data={data} />;
</div>

      );
      
     
    


}

export default RoomStatusChart;