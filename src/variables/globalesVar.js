var prefix_link = "https://d59f-41-79-219-193.ngrok-free.app"; 


var lesChambres = [
    {
      nom: "chambre 101",
      nbPlace: 2,
      type: "Ordinaire",
      price: 10000,
      item: "02 lits, climatiseur, fleur, télé, table bureau, chaise ",
      statut: "DISPONIBLE"

    },
    {
      nom: "chambre 206",
      nbPlace: 2,
      type: "Suite",
      price: 30000,
      item: "02 lits, climatiseur, fleur, frigo, télé, table bureau, chaise, table à manger ",
      statut: "INDISPONIBLE"

    },
    {
      nom: "chambre 300",
      nbPlace: 2,
      type: "Suite présidentielle",
      price: 80000,
      item: "02 lits, climatiseur, fleur, frigo, télé, table bureau, chaise ",
      statut: "DISPONIBLE"

    },
    {
      nom: "chambre 206",
      nbPlace: 2,
      type: "Suite",
      price: 30000,
      item: "02 lits, climatiseur, fleur, frigo, télé, table bureau, chaise, table à manger ",
      statut: "INDISPONIBLE"

    },
    {
      nom: "chambre 206",
      nbPlace: 2,
      type: "Suite",
      price: 30000,
      item: "02 lits, climatiseur, fleur, frigo, télé, table bureau, chaise, table à manger ",
      statut: "INDISPONIBLE"

    },
    {
      nom: "chambre 206",
      nbPlace: 2,
      type: "Suite",
      price: 30000,
      item: "02 lits, climatiseur, fleur, frigo, télé, table bureau, chaise, table à manger ",
      statut: "INDISPONIBLE"

    },
    {
      nom: "chambre 206",
      nbPlace: 2,
      type: "Suite",
      price: 30000,
      item: "02 lits, climatiseur, fleur, frigo, télé, table bureau, chaise, table à manger ",
      statut: "INDISPONIBLE"

    },
    {
      nom: "chambre 206",
      nbPlace: 2,
      type: "Suite",
      price: 30000,
      item: "02 lits, climatiseur, fleur, frigo, télé, table bureau, chaise, table à manger ",
      statut: "INDISPONIBLE"

    },
    {
      nom: "chambre 206",
      nbPlace: 2,
      type: "Suite",
      price: 30000,
      item: "02 lits, climatiseur, fleur, frigo, télé, table bureau, chaise, table à manger ",
      statut: "INDISPONIBLE"

    },
    {
      nom: "chambre 206",
      nbPlace: 2,
      type: "Suite",
      price: 30000,
      item: "02 lits, climatiseur, fleur, frigo, télé, table bureau, chaise, table à manger ",
      statut: "INDISPONIBLE"

    },
    {
      nom: "chambre 206",
      nbPlace: 2,
      type: "Suite",
      price: 30000,
      item: "02 lits, climatiseur, fleur, frigo, télé, table bureau, chaise, table à manger ",
      statut: "INDISPONIBLE"

    },
    {
      nom: "chambre 206",
      nbPlace: 2,
      type: "Suite",
      price: 30000,
      item: "02 lits, climatiseur, fleur, frigo, télé, table bureau, chaise, table à manger ",
      statut: "INDISPONIBLE"

    },
    {
      nom: "chambre 206",
      nbPlace: 2,
      type: "Suite",
      price: 30000,
      item: "02 lits, climatiseur, fleur, frigo, télé, table bureau, chaise, table à manger ",
      statut: "INDISPONIBLE"

    }
  ];


  var client = [
    {     
      id_customer:1,
    address: "null",
date_of_birth : "Wed, 08 Nov 2023 00:00:00 GMT",
email: "rodolphe@gmail.com",
first_name: "un nom",
gender: "M",
ifu: null,
institute_name: "okay",
nbr_fact:2,
total_due: 80000,
customer_type: "physique",
last_name: "mon nom",
phone_number: "96363651"
    },


    {  
      id_customer:2,   
      address: "null",
  date_of_birth : "Wed, 08 Nov 2023 00:00:00 GMT",
  email: "rodolphe@gmail.com",
  first_name: "un nom",
  gender: "M",
  nbr_fact:5,
  total_due: 80000,

  ifu: null,
  institute_name: "okay",
  
  customer_type: "physique",
  last_name: "mon nom",
  phone_number: "96363651"},

  {     
    id_customer:3,
    address: "null",
date_of_birth : "Wed, 08 Nov 2023 00:00:00 GMT",
email: "rodolphe@gmail.com",
first_name: "un nom",
gender: "M",
nbr_fact:3,
ifu: null,
institute_name: "okay",
total_due: 80000,

customer_type: "moral",
last_name: "mon nom",
phone_number: "96363651"}
  ];

  var lesfactures = [
    {     
      id_customer: 1,
      id:1,
    rest_a_Payer: "2000",
date_of_birth : "Wed, 08 Nov 2023 00:00:00 GMT",
customer_type: "physique",
last_name: "mon nom",
phone_number: "96363651"
    },

    {     
      id:2,
      id_customer: 1,
    rest_a_Payer: "2000",
date_of_birth : "Wed, 08 Nov 2023 00:00:00 GMT",
customer_type: "physique",
last_name: "mon nom",
phone_number: "96363651"
    },


    {    
      id:3,
      id_customer: 2, 
      rest_a_Payer: "2000",

      address: "null",
  date_of_birth : "Wed, 08 Nov 2023 00:00:00 GMT",
 
    },
    {   
      id:4, 
      id_customer: 2, 
      rest_a_Payer: "2000",

      address: "null",
  date_of_birth : "Wed, 08 Nov 2023 00:00:00 GMT",
 
    },

    {    
      id:5,
      id_customer: 2, 
      rest_a_Payer: "2000",

      address: "null",
  date_of_birth : "Wed, 08 Nov 2023 00:00:00 GMT",
 
    },
    {    
      id:5,
      id_customer: 2, 
      rest_a_Payer: "2000",

      address: "null",
  date_of_birth : "Wed, 08 Nov 2023 00:00:00 GMT",
 
    },
    {    
      id:5,
      id_customer: 2, 
      rest_a_Payer: "2000",

      address: "null",
  date_of_birth : "Wed, 08 Nov 2023 00:00:00 GMT",
 
    },
    {    
      id:5,
      id_customer: 2, 
      rest_a_Payer: "2000",

      address: "null",
  date_of_birth : "Wed, 08 Nov 2023 00:00:00 GMT",
 
    },
    {    
      id:5,
      id_customer: 2, 
      rest_a_Payer: "2000",

      address: "null",
  date_of_birth : "Wed, 08 Nov 2023 00:00:00 GMT",
 
    },

  {     
    id:6,
    id_customer: 3,
    rest_a_Payer: "2000",

    address: "null",
date_of_birth : "Wed, 08 Nov 2023 00:00:00 GMT",
email: "rodolphe@gmail.com",
}
  ];

  export  { lesChambres, prefix_link, client, lesfactures }; ;