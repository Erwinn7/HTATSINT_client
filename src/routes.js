import Index from "views/Index.js";
import Client from "views/examples/Clients.js";
import Room from "views/examples/Room.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

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
    path: "/addroom",
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
    path: "/tables",
    name: "FACTURE",
    icon: "fa fa-clipboard text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "REGLEMENT",
    icon: "fa fa-credit-card text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "OCCUPATION",
    icon: "fa fa-bed  text-pink",
    component: <Register />,
    layout: "/auth",
  },
];
export default routes;
