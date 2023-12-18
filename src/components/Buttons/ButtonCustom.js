import React, { useState } from 'react';
import { Button, Form } from 'reactstrap';
import MyForm from "../Forms/AddCustomForm.js";
import MyFormEnt from 'components/Forms/AddCustomEntForm.js';

function ButtonCustom({ updateModalTitle }) {
  const showPersonneMorale = () => {
    setShowForm1(true);
    updateModalTitle('Ajout client moral');
  };

  const showPersonnePhysique = () => {
    setShowForm1(false);
    updateModalTitle('Ajout client physique');
  };

  const [showForm1, setShowForm1] = useState(true);

 /* const showPersonneMorale = () => {
    setShowForm1(true);
  };*/

  /*const showPersonnePhysique = () => {
    setShowForm1(false);
  };*/

  return (
    <div>
      <div className="btn-group">
        <Button className={` ${showForm1 ? 'active' : ''}`} color="dark" onClick={showPersonneMorale} >
          PERSONNE MORALE
        </Button>
        <Button className={` ${!showForm1 ? 'active' : ''}`} color="dark" onClick={showPersonnePhysique}  >
          PERSONNE PHYSIQUE
        </Button>
      </div>

      {showForm1 ? (
        <div className='container fluid'>
          <br></br>
          <MyFormEnt></MyFormEnt>
        </div>
      ) : (
        <Form>
          {/* Formulaire 2 */}
          <div className='container fluid'>
            <br></br>
            <MyForm></MyForm>
            
          </div>
        </Form>
      )}
    </div>
  );
}

export default ButtonCustom;
