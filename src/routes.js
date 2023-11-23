import Index from "views/Index.js";
import Client from "views/examples/Clients.js";
import Room from "views/examples/Room.js";
import Register from "views/examples/Register.js";
import Reglement from "views/examples/Reglement.js";
import Invoice from "views/examples/Invoice.js";
import Icons from "views/examples/Icons.js";
import Occupation from "views/examples/Occupation";
import Login from "views/examples/Login";

var routes = [
  
  {
    path: "/index",
    name: "TABLEAU DE BORD",
    icon: "fa fa-tachometer text-dark",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "RESERVATION",
    icon: "fa fa-registered text-blue",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/room",
    name: "CHAMBRE",
    icon: " fa fa-home text-orange",
    component: <Room />,
    layout: "/admin",
  },
  {
    path: "/client",
    name: "CLIENT",
    icon: "ni ni-single-02 text-yellow",
    component: <Client />,
    layout: "/admin",
  },
  {
    path: "/invoice",
    name: "FACTURE",
    icon: "fa fa-clipboard text-red",
    component: <Invoice />,
    layout: "/admin",
  },
  {
    path: "/Reglement",
    name: "REGLEMENT",
    icon: "fa fa-credit-card text-info",
    component: <Reglement />,
    layout: "/admin"
  },
  {
    path: "/occupation",
    name: "OCCUPATION",
    icon: "fa fa-bed  text-pink",
    component: <Occupation />,
    layout: "/admin",
  },

  {
    path: "/register",
    name: "UTILISATEURS",
    icon: "fa fa-credit-card text-info",
    component: <Register />,
    layout: "/admin",
  },
  {
    path: "/login",
   // name: "CONNEXION",
   // icon: "fa fa-credit-card text-info",
    component: <Login />,
    layout: "/auth",
  },
];
export default routes;
