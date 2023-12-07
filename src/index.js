
import React from "react";
import ReactDOM from "react-dom/client";


import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/css/argon-dashboard-react.css";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import RecepLayout from "layouts/Recep.js";


const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/admin/*" element={<AdminLayout />} />
     <Route path="/recep/*" element={<RecepLayout />} />
      <Route path="*" element={<Navigate to="/auth/auth" replace />} />
    </Routes>
  </BrowserRouter>
);
