import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import 'assets/css/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const MyCalendar =()=> {
  const [value, onChange] = useState(new Date());

  return (
    <div className="sample">
      <header>
       
      </header>
      <div className="sample__container">
        <main className="">
          <Calendar onChange={onChange} showWeekNumbers value={value} />
        </main>
      </div>
    </div>
  );
}
export default MyCalendar;