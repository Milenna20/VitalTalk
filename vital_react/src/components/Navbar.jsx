import React from "react";
import { Link } from "react-router-dom";


const NavBar = () => {
    let isLogged = localStorage.getItem("data")
    return (
        <nav>
            <Link to="/">Inicio</Link>
                <Link to="/testimonios">Testimonios</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/registro" className="chat-button">
                    Iniciar Sesión/Registrate
                </Link>
                {
                    isLogged ? <Link to="/chat" className="ir_chat">
                    Chat
                </Link>:""
                }
            </nav>
    );
}

export default NavBar;