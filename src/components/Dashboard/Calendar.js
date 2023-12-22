import { useState } from 'react';
import 'assets/css/Calendar.css';
import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';





const MyCalendar =()=> {
 // État pour stocker la date sélectionnée
 const [selectedDate, setSelectedDate] = useState(new Date());

 // Fonction pour gérer le changement de date
 const handleDateChange = (date) => {
   setSelectedDate(date);
 };

 return (
   <LocalizationProvider dateAdapter={AdapterDayjs} locale="fr">
   <DemoContainer
   components={[ 'StaticDatePicker']} >
    <DemoItem >
      {/* Utilisation du composant StaticDatePicker */}
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
        label="Sélectionnez une date"
      />
     </DemoItem>
  </DemoContainer>

   </LocalizationProvider>
 );
}
export default MyCalendar;