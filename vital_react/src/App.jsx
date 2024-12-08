import React from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog";
import Testimonios from "./pages/Testimonios";
import Chat from "./pages/Chat";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import Recursos from "./pages/Recursos";
import RutaProtejida from "../private/ProtejerRutas";
import Formulario from "./pages/formulario";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/testimonios" element={<Testimonios />} />
      <Route path="/chat"  element={<RutaProtejida element={<Chat />} />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recursos" element={<Recursos />} />
      <Route path="/formulario" element={<Formulario />} />
      </Routes>
  );
}

export default App
