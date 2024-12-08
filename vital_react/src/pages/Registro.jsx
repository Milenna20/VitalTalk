import React, { useState } from 'react';
import '../styles/registro.css';
import Logo from '../assets/images/logo.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; 

const Registro = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
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
      nombre: formData.username,
      apellido: formData.fullname,
      email: formData.email,
      contrasenia: formData.password
    };
    
    try {
      const response = await axios.post('http://localhost:3000/registro', data);
      console.log(response);
      
      if (response.status === 200) {
        const dataSession = {
          nombre: formData.username,
          apellido: formData.fullname,
          email: formData.email
        }
        localStorage.setItem('data',JSON.stringify(dataSession));
        localStorage.setItem('usuario_id',response.data.usuario_id);
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Ahora puedes acceder al chat.',
          confirmButtonText: 'Ir al chat'
        }).then(() => {
          navigate('/chat'); 
        });
      }
    } catch (error) {
      console.log(error);
      
      if (error.response) {
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: error.response.data.detalles || 'Hubo un error en el registro. Por favor, intenta nuevamente.',
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
    <div className='container_all'>
      <Link to="/">
      <img src={Logo} alt="Logo de Vital Talk" />
      </Link>
      <h1>Vital Talk</h1>
      <div className="container_register">
        <h2>Registro</h2>
        <form id="registrationForm" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="Nombres"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="fullname"
            placeholder="Apellidos"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
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
          <input type="submit" value="Registrarse" />
        </form>
        <div className="login-link">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registro;
