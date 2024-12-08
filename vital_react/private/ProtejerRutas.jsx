import React from "react";
import { Navigate } from "react-router-dom";

const RutaProtejida = ({ element, redirectTo = "/login" }) => {
    const isLogged = !!localStorage.getItem('data'); 
  
    return isLogged ? element : <Navigate to={redirectTo} />;
  };
  
  export default RutaProtejida;