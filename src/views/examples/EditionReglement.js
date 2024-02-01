import React, { useState, useEffect } from 'react';
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  Spinner,
  Alert,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from 'reactstrap';
import { PDFViewer } from '@react-pdf/renderer';
import PrintSettlementByUser from 'components/Printer/PrintSettlementByUser';
import DataTable from 'react-data-table-component';
import Header from 'components/Headers/Header';
import { prefix_link } from 'variables/globalesVar';
import CustomLoader from 'components/CustomLoader/CustomLoader';
//import CustomLoader from 'components/CustomLoader/CustomLoader';
const EditionReglement = () => {
   const [loading, setLoading] = useState(false);
   const [alert,setAlert]= useState({ message: '', color: '' });
    const [selectedType, setSelectedType] = useState('all');
  const [period, setPeriod] = useState({
    start_date: '',
    end_date: '',
  });
  const [users, setUsers] = useState([]); 
  const [userInfo, setUserInfo] = useState({});
  const [selectedUserId, setSelectedUserId] = useState('');
 const [save, setSave] = useState(false); // Vous devez probablement ajuster cela selon votre logique
 const [modalOpen, setModalOpen] = useState(false);
 const toggleModal = () => setModalOpen(!modalOpen);

   const [formdata, setFormdata] = useState({
    user_id: '',
    start_date: '',
    end_date: '',
   });
   const [fcopieormdata, setCopieFormdata] = useState({
    user_id: '',
    start_date: '',
    end_date: '',
   });
   const [paymentsTable, setPaymentsTable] = useState([]);

   


 
 
  async function GetUsers  () {
    const token = localStorage.getItem('accessToken');
    
  
    try {
      const response = await fetch(prefix_link+'/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
  
  
        }
      });
  
      if (!response.ok) {
        console.log('Response from Flask API:', 'merde');
      }
  
      const data = await response.json();
     // console.log('Response from Flask API:', data);
      if (data && data.data.length > 0) {
        const usersData = data.data.map(item => ({
          id: item.user.id,
          first_name: item.employee.first_name,
          last_name: item.employee.last_name,
          role: item.role[0].role_name, // 
          email: item.user.email,
          last_connexion: item.employee.updated_at, // Adjust this based on your data structure
        }));
        
        
       // console.log('Response from Flask API:', usersData);
        //setUsers(usersData);
       return usersData;
      } else {
        console.log('Response from Flask API:', 'no dataaaa');
      }
  } catch (error) {
    // emettre une alerte d'erreur
    console.error('Une erreurrrrraaa s\'est produite : ', error);
  };
  };
  
  async function fecthUsers  () {

  try {
    const data = await GetUsers();
    setUsers(data);
   // localStorage.setItem('operateur_pr', data.first_name); 
    /*localStorage.setItem('operateur_ps', data.last_name);*/
  }

  catch (error) {
    // emettre une alerte d'erreur
    console.error('Une erreurrrrr s\'est produite : ', error);
  };  
};

useEffect(() => {
 
  fecthUsers();
}, []);

const handleUserSelect = async (e) => {
  // Ajoutez ici votre logique pour la sélection d'un utilisateur

 setSelectedUserId(e.target.value);
 await  setSave(true);
 const users = await GetUsers();
 // recuperer les information du user seletionner et le mettre dans le local storage
 const selectedUserInfo = users.find(user => user.id === e.target.value);
 console.log('util',selectedUserInfo);
setUserInfo(selectedUserInfo);
 // Mettre les informations dans le local storage
 /*;*/
//console.log('util',localStorage.getItem('selectedUser'));
 
 
  setFormdata({
    ...formdata,
    user_id: e.target.value,
  })
};


const handleDateChange = (e) => {
  const { name, value } = e.target;
  setFormdata((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};

//setPeriod({ start: handleDateChange.start, end: handleDateChange.end });
console.log(formdata);

 

   const Submit = async (e)=> {
    setCopieFormdata(formdata);
    setLoading(true);
    e.preventDefault();
    
    const token = localStorage.getItem('accessToken');
    console.log(save);
if (save) {
// mettre a jour formdata avec id_user, la periode
console.log('formdata:', formdata);
try {
  const response =  await fetch(prefix_link+'/sttlement_by_user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(formdata),
  });
  if (response.ok) {
    // Vérifier si la réponse est au format JSON
    
    const data = await response.json();
    console.log('Reponse de la requête POST:', data);
    if (data.settlements && data.settlements.length > 0 && data.customers && data.customers.length > 0) {
      // Créez un tableau pour stocker les données à afficher
      const paymentsTable = [];
    
      // Parcourez chaque règlement dans le tableau "settlements"
      data.settlements.forEach((settlement, index) => {
        // Utilisez l'index pour récupérer le client associé dans le tableau "customers"
        const associatedCustomer = data.customers[index];
    
        // Si le client est trouvé
        if (associatedCustomer) {
          // Ajoutez une entrée au tableau avec les détails requis
          const totalAmount = parseFloat(data.amount); 
          paymentsTable.push({
            Nom: associatedCustomer.customer.last_name,
            Prenom: associatedCustomer.customer.first_name,
            Institut: associatedCustomer.customer.institute_name,
            Montant: settlement.settlement_amount,
            Total: totalAmount,
            Date: settlement.created_at,
          });
        }
      });
    
      // Affichez le tableau résultant
      console.table("Tableau de paiements:", paymentsTable);

     /*setFormdata({
   
      user_id: '',
      start_date: '',
      end_date: '',
    });*/
    document.getElementById("myForm").reset();
    resetUserSelect();
    setSave(false);
    setLoading(false);
    setPaymentsTable(paymentsTable);
    //localStorage.setItem('selectedUser', JSON.stringify(userInfo));

   


    } else {
      setLoading(false);
      setAlert({ message: 'Aucun client ou paiement dans les données.', color: 'danger' });
      setTimeout(() => {
        setAlert({ message: '', color: '' });
         
      }, 10000);
     
      console.log('Aucun règlement ou client trouvé dans les données.');
      setSave(false);
    }

 
  } else {
    setLoading(false);
    console.error('Erreur lors de la requête POST - Statut HTTP:', response.status, );
    setSave(false);
  }
 
} catch (error) {
  setLoading(false);
  console.error('Erreur lors de la requête POST', error);
  setSave(false);
  setFormdata({
   
    user_id: '',
    start_date: '',
    end_date: '',
  });
  
}
}else{
  setFormdata({
   
    user_id: '',
    start_date: '',
    end_date: '',
  });
  setLoading(false);
  setAlert({ message: 'Cette fonctionnalite est en attente de mise en production. Veuillez choisir un operateur.', color: 'danger' });
  setTimeout(() => {
    setAlert({ message: '', color: '' });
  }, 10000)
// envoyer une alerte d'indisponibilite derreur
console.log('Veuillez choisir une date de debut et une date de fin');
}

  };

// recuperer les donnees  retouner par submit




  
  const resetUserSelect = () => {
    setSelectedUserId('');
    setFormdata({
      ...formdata,
      user_id: '',
    });
  
    // Utilisez la référence de votre champ de sélection d'opérateur pour le réinitialiser
    const userSelect = document.getElementById("user_id");
    if (userSelect) {
      userSelect.value = ''; // Définir la valeur sur l'option par défaut
    }
  };

   useEffect(() => {
     resetUserSelect();
   }, []);
  

  const renderUserSelect = () => {
    if (selectedType === 'by_user' && users?.length > 0) {

      return (
        <Form id="opForm">
          <FormGroup>
            <Label for="user">OPERATEUR</Label>
            <Input placeholder=' choisir un operateur' 
            type="select" 
            name="user_id" 
            id="user_id"
            value={selectedUserId}
            onChange={handleUserSelect}
            >
            <option> Selectionnez un operateur</option>
              {/* Add options for user selection */
              users.map((users) => (
                <option value={users.id}>{users.first_name+" "+users.last_name+" "+users.role}</option>
              ))
              }
            
            </Input>
          </FormGroup>
        </Form>
      );
    }
    return null;
  };

  const cols = [
    {
      name: 'NOM',
      selector: (paymentsTable)=> paymentsTable.Nom? paymentsTable.Nom:'---',
      sortable: true,

    } ,
    {
      name: 'PRENOM',
      selector: (paymentsTable)=>paymentsTable.Prenom? paymentsTable.Prenom:'---',
      sortable: true,
    },

    {
      name: 'INSTITUT',
      selector: (paymentsTable)=>paymentsTable.Institut? paymentsTable.Institut:'---',
      sortable: true,
    },
     {
      name: 'MONTANT',
      selector: (paymentsTable)=>paymentsTable.Montant? paymentsTable.Montant:'---',
      sortable: true,
    },

    {
      name: 'ENREGISTRER LE:',
      selector: (paymentsTable)=>paymentsTable.Date? paymentsTable.Date:'---',
      sortable: true,
     
    },
  
   
  ];
  const customStyles = {
    rows: {
        style: {

        },
    },
    headCells: {
        style: {
          color: "#8898aa",
          backgroundColor: "#f6f9fc",
          borderColor: "#e9ecef",
          fontWeight: "bold",
        },
    },
    cells: {
        style: {

        },
    },
};

  return (
    <div className="backgroundImgClient">
      <Header menuTitle="EDITION   REGLEMENTS" />
      <Container className="pb-5 my-2" fluid>
          <div className=' centered-container-reglement  '  style={{}}>
          {alert.message && <Alert color={alert.color}>{alert.message}</Alert>}
<div className='row ' >
 <div className='col-md-3 ml-n2'>
         
{
 //mettre un input avec select pour rechercher un type
 
 <Form id='myForm'>
 
          <FormGroup>
          
            <Label for="type">Liste:</Label>
            <Input type="select" name="type" id="type"  onChange={(e) => {setSave(false);
             setFormdata({ user_id: '', start_date: '', end_date: '' });
             //document.getElementById("user_id").reset();
             resetUserSelect();
              setSelectedType(e.target.value)}}>
            <option value="all">Global</option>
            <option value="by_user"> Par operateur</option>
            </Input>
          </FormGroup>
        </Form>
}

          </div>
          <div id='usersel' className={`col-md-3 ml-n3 ${selectedType !== 'by_user' ? 'collapse' : ''}`}>
          {renderUserSelect()}
          </div>

         
        <div id='period'  style={{ /*textAlign: 'right' */ }} className='col-md-6 ml-n4 ' >
        <Form >
          <FormGroup className=" ">
            <Row style={{ margin: 'auto' }}>
              <Col sm={5}>
                <Label for="start">Début:</Label>
                <Input
                  id="start"
                  name="start_date"
                  placeholder="Arrivée"
                  type="datetime-local"
                  value={formdata.start_date}
                  onChange={handleDateChange}
                 //mettre le max a la date daujourdhui 
                 max={new Date()}
                />
              </Col>
              <Col sm={5}>
                <Label for="end">Fin:</Label>
                <Input
                  id="end"
                  name="end_date"
                  placeholder="Départ"
                  type="datetime-local"
                  value={formdata.end_date}
                  onChange={handleDateChange}
                  min={period.start}
                />
              </Col>
              <Col sm={1} style={{ marginTop: '30px'  }} className='ml-n2'>
                {loading ? (
                  <Button color="primary" disabled>
                    <Spinner size="sm" /> <span>En cours</span>
                  </Button>

                 
                ) : (
                  <Button className='' size="xs" color="primary" type="submit"
                   onClick={(e) => Submit(e)}
                   disabled={formdata.user_id === '' || formdata.start_date === '' || formdata.end_date === ''}
                   >
                    Rechercher
                  </Button>
                )}
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </div>
          </div>


         
</div>  <br></br> 

          <div className="float-right offset-md-5 col-md-4 col-12" style={{ width: '20%', display: 'flex', justifyContent: 'right' }}>
            <Button size="xs" className='btn btn-success'
           // toggle={toggle}
            onClick={toggleModal}
            disabled={paymentsTable.length === 0}
            >Imprimer</Button>
          </div>
<br></br> <br></br> 


         <div>
         <DataTable 
            className="" 
            title="Liste des reglements"
            columns={cols}
             data={paymentsTable} 
             keyField="id" 
             customStyles={customStyles}
             pagination
            //  progressPending={pending}
             
             progressComponent={<CustomLoader/>}
             >
              

            </DataTable>

         </div>

         <Modal isOpen={modalOpen} toggle={toggleModal} size="xl"> {/* Utilisez "xl" ou "lg" pour la taille */}
        <ModalHeader toggle={toggleModal}>Liste à imprimer</ModalHeader>
       <ModalBody>
       {
            paymentsTable && userInfo && formdata && (
            <PDFViewer width="100%" height="600px" >
              <PrintSettlementByUser mypaymentsTable={paymentsTable} myuserInfo={userInfo} myformdata={formdata}/>
            </PDFViewer>
            )
            }      
       </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Fermer
          </Button>
          {/* Ajoutez un bouton d'impression ici, ou utilisez une bibliothèque d'impression */}
        </ModalFooter>
      </Modal>
          

      </Container>
     
    </div>
  );
};

export default EditionReglement;
