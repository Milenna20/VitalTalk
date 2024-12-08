import React, { useState } from 'react';
import '../styles/formulario.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Formulario = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const userId = localStorage.getItem("usuario_id");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/actualizar/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const result = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Datos Actualizados con éxito',
                    text: result.mensaje,
                    confirmButtonText: 'Ir al chat',
                }).then(() => {
                    navigate('/chat');
                });
            } else {
                const error = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error al actualizar datos',
                    text: error.mensaje || 'Ha ocurrido un error.',
                    confirmButtonText: 'Aceptar',
                });
            }
        } catch (error) {
            console.error('Hubo un error en la actualización:', error);
        }
    };

    const handleDelete = async () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción eliminará tu cuenta permanentemente. No podrás revertirla.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:3000/borrar/${userId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
    
                    if (response.ok) {
                        const result = await response.json();
                        Swal.fire({
                            icon: 'success',
                            title: 'Cuenta eliminada con éxito',
                            text: result.mensaje,
                            confirmButtonText: 'Aceptar',
                        }).then(() => {
                            navigate('/login');
                            localStorage.removeItem("data");
                            localStorage.removeItem("messages");
                            localStorage.removeItem("usuario_id");
                            localStorage.removeItem("moodData");
                        });
                    } else {
                        const error = await response.json();
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al eliminar cuenta',
                            text: error.mensaje || 'Ha ocurrido un error.',
                            confirmButtonText: 'Aceptar',
                        });
                    }
                } catch (error) {
                    console.error('Hubo un error en la eliminación:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo conectar al servidor.',
                        confirmButtonText: 'Aceptar',
                    });
                }
            }
        });
    };
    

    return (
        <div className='container'>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            placeholder="Nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido">Apellido</label>
                        <input
                            type="text"
                            id="apellido"
                            placeholder="Apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Correo Electrónico"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="btn btn-update">Actualizar</button>
                        <button
                            type="button"
                            className="btn btn-delete"
                            onClick={handleDelete}
                        >
                            Eliminar Cuenta
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Formulario;
