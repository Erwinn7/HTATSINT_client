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
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "RESERVATION",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/addroom",
    name: "CHAMBRE",
    icon: "ni ni-pin-3 text-orange",
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
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "REGLEMENT",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "OCCUPATION",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
];
export default routes;
