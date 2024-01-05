import Index from "views/Index.js";
import Client from "views/examples/Clients.js";
import Room from "views/examples/Room.js";
import Register from "views/examples/Register.js";
import Reglement from "views/examples/Reglement.js";
import Invoice from "views/examples/Invoice.js";
import Icons from "views/examples/Icons.js";
import Occupation from "views/examples/Occupation";
import Login from "views/examples/Login";
import Edition from "views/examples/Edition";
import EditionOccupant from "views/examples/EditionOccupant";
import EditionChambre from "views/examples/EditionChambre";
import EditionFacture from "views/examples/EditionFacture";
import EditionClient from "views/examples/EditionClient";
import EditionReglement from "views/examples/EditionReglement";
export const routes = [
  
  {
    path: "/index",
    name: "TABLEAU DE BORD",
    icon: "fa fa-home text-dark",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "RESERVATION",
    icon: "fa fa-registered text-dark",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/client",
    name: "CLIENT",
    icon: "ni ni-circle-08 text-dark",
    component: <Client />,
    layout: "/admin",
  },
  {
    path: "/occupation",
    name: "OCCUPATION",
    icon: "fas fa-key text-dark",
    component: <Occupation />,
    layout: "/admin",
  },
  {
    path: "/Reglement",
    name: "REGLEMENT",
    icon: "fa fa-credit-card text-dark",
    component: <Reglement />,
    layout: "/admin"
  },
  {
    path: "/invoice",
    name: "FACTURE",
    icon: "fa fa-clipboard text-dark",
    component: <Invoice />,
    layout: "/admin",
  },

  {
    path: "/room",
    name: "CHAMBRE",
    icon: " fa fa-bed  text-dark",
    component: <Room />,
    layout: "/admin",
  },
  
  
 
  
  {
    path: "/edition",
    name: "EDITION",
    icon: "fas fa-wrench text-dark",
    component: <Edition />,
    layout: "/admin",
    
  },

  {
    path: "/register",
    name: "UTILISATEURS",
    icon: "fas fa-user text-dark",
    component: <Register />,
    layout: "/admin",
    
  },
 
  
];

export const routesRecep = [
  {
    path: "/index",
    name: "TABLEAU DE BORD",
    icon: "fa fa-tachometer text-dark",
    component: <Index />,
    layout: "/recep",
  },
  {
    path: "/icons",
    name: "RESERVATION",
    icon: "fa fa-registered text-blue",
    component: <Icons />,
    layout: "/recep",
  },
  {
    path: "/room",
    name: "CHAMBRE",
    icon: " fa fa-home text-orange",
    component: <Room />,
    layout: "/recep",
  },
  {
    path: "/client",
    name: "CLIENT",
    icon: "ni ni-circle-08 text-yellow",
    component: <Client />,
    layout: "/recep",
  },
  {
    path: "/invoice",
    name: "FACTURE",
    icon: "fa fa-clipboard text-red",
    component: <Invoice />,
    layout: "/recep",
  },
  {
    path: "/Reglement",
    name: "REGLEMENT",
    icon: "fa fa-credit-card text-info",
    component: <Reglement />,
    layout: "/recep"
  },
  {
    path: "/occupation",
    name: "OCCUPATION",
    icon: "fa fa-bed  text-pink",
    component: <Occupation />,
    layout: "/recep",
  }
]; 

export const routesAuth = [
  {
    path: "/login",
    name: "CONNEXION",
    icon: "fa fa-credit-card text-info",
    component: <Login />,
    layout: "/auth",
  }
];

export const routesEdition = [
  {
    path: "/editionreglement",
    name: "Reglements",
    icon: "fas fa-book text-dark",
    component: <EditionReglement />,
    layout: "/admin",
    
    
  },
  {
    path: "/editionOccupant",
    name: "Occupants",
    icon: "fas fa-book text-dark",
    component: <EditionOccupant />,
    layout: "/admin",
    
    
  },
  
  {
    path: "/editionFActure",
    name: "Factures",
    icon: "fas fa-book text-dark",
    component: <EditionFacture />,
    layout: "/admin",
    
    
  },
  {
    path: "/editionChambre",
    name: "Chambres",
    icon: "fas fa-book text-dark",
    component: <EditionChambre />,
    layout: "/admin",
    
    
  },
  {
    path: "/editionClient",
    name: "Clients",
    icon: "fas fa-book text-dark",
    component: <EditionClient />,
    layout: "/admin",
    
    
  },
  
]

//export {routes , routesRecep} ;  
