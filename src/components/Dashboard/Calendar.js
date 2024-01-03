import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fr'; // Importez le module de localisation française
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

dayjs.locale('fr'); // Définissez la localisation française pour dayjs
  const formatDate = (date) => {
    return dayjs(date).format('DD-MM-YYYY').locale('fr'); // Formatage de la date en "jour-mois-année"
  };

const MyCalendar =()=> {


 return (
  <LocalizationProvider dateAdapter={AdapterDayjs} locale="fr">
    <DemoContainer
        components={[
          'StaticDatePicker',
        ]}
      >
        <DemoItem >
          <StaticDatePicker
          defaultValue={dayjs(new Date())}
          renderInput={(params) => <input {...params} value={formatDate(params.value)} />} // Utilisez formatDate pour formater la date affichée
          />
        </DemoItem>
    </DemoContainer>
  </LocalizationProvider>
  );
}
export default MyCalendar;