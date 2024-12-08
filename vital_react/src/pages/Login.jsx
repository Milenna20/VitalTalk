import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo.jpeg';
import Swal from 'sweetalert2'; 
import axios from 'axios';
import '../styles/login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: formData.email,
      contrasenia: formData.password
    };

    try {
      const response = await axios.post('http://localhost:3000/login', data);
      console.log();
      
      if (response.status === 200) {
        
        localStorage.setItem("data",JSON.stringify(response.data.usuario))
        localStorage.setItem("usuario_id",response.data.usuario.id)
        Swal.fire({
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
          text: 'Accediendo al chat...',
          confirmButtonText: 'Ir al chat'
        }).then(() => {
          navigate('/chat'); 
        });
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: 'error',
          title: 'Error en el inicio de sesión',
          text: error.response.data.message || 'Correo o contraseña incorrectos.',
          confirmButtonText: 'Aceptar'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error de red',
          text: 'Hubo un problema al intentar procesar tu solicitud. Por favor, revisa tu conexión y vuelve a intentarlo.',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  };

  return (
    <div className="container_all">
      <Link to="/">
      <img src={Logo} alt="Logo de Vital Talk" />
      </Link>
      <h1>Vital Talk</h1>
      <div id="login" className="container_login">
        <h2>Inicio de Sesión</h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email" 
            placeholder="Email"
            value={formData.email} 
            onChange={handleChange} 
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange} 
            required
          />
          <input type="submit" value="Iniciar Sesión" />
        </form>
        <div className="login-link">
          <p>
            ¿No tienes una cuenta?{' '}
            <Link to="/Registro">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
