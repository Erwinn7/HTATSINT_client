import React, { useState } from 'react';
import { Button, Form } from 'reactstrap';
import MyForm from "../Forms/AddCustomForm.js";
import MyFormEnt from 'components/Forms/AddCustomEntForm.js';

function ButtonCustom() {
  const [showForm1, setShowForm1] = useState(true);

  const toggleForm = () => {
    setShowForm1(!showForm1);
  };

  return (
    <div>
      <Button className='sm' color="primary" onClick={toggleForm}>
        {showForm1 ? 'PERSONNE MORALE' : ' PERSONNE PHYSIQUE'}
      </Button>

      {showForm1 ? (
       <div className='container fluid'>
       <MyForm></MyForm>
       </div> 
      ) : (
        <Form>
          {/* Formulaire 2 */}
        <div className='container fluid'>
        <MyFormEnt></MyFormEnt>
        </div> 
        </Form>
      )}
    </div>
  );
}

export default ButtonCustom;
