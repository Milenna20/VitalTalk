import React from "react";
import "../styles/home.css"; 
import Logo from '../assets/images/logo.jpeg'
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <header>
                <div className="container">
                    <h1>Asistente de Salud Mental - Vital Talk</h1>
                    <img className="logoHome" src={Logo} alt="logo" />
                </div>
            </header>

            <NavBar/>

            <div className="container">
                {/* Bienvenida */}
                <div className="content">
                    <h2>Bienvenido</h2>
                    <p>
                        Nos alegra que estés aquí. Nuestro asistente de IA
                        anónima está diseñado para ofrecerte apoyo en tu
                        bienestar emocional sin comprometer tu privacidad. Puedes
                        acceder a recursos y consejos útiles en cualquier momento,
                        sin necesidad de revelar información personal.
                    </p>

                    <h3>¿Cómo Funciona?</h3>
                    <p>
                        Nuestra IA utiliza algoritmos avanzados para analizar tu
                        mensaje y proporcionarte recomendaciones personalizadas.
                        El asistente puede sugerir técnicas de manejo del estrés,
                        recursos educativos y estrategias para mejorar tu salud
                        mental. Todo esto se hace de manera completamente anónima.
                    </p>

                    <h3>Contáctanos</h3>
                    <p>
                        Si tienes alguna pregunta o deseas compartir tus
                        pensamientos, puedes enviarnos un mensaje anónimo a
                        través del siguiente formulario:
                    </p>
                    <form action="/enviar" method="post">
                        <div className="form-group">
                            <label htmlFor="mensaje">Tu Mensaje:</label>
                            <textarea id="mensaje" name="mensaje" required />
                        </div>
                        <div className="form-group">
                            <button type="submit">Enviar</button>
                        </div>
                    </form>
                </div>

                {/* Sobre Nosotros */}
                <div className="content about">
                    <h2>Sobre Nosotros</h2>
                    <p>
                        Nuestro equipo está compuesto por expertos en salud mental
                        y tecnología que trabajan juntos para ofrecerte un recurso
                        útil y seguro. Creemos en la importancia de la privacidad y
                        la confidencialidad en el cuidado de la salud mental.
                        Nuestro asistente está diseñado para brindarte ayuda sin
                        necesidad de compartir tu identidad.
                    </p>
                </div>

                {/* Preguntas Frecuentes */}
                <div className="content faq">
                    <h2>Preguntas Frecuentes</h2>
                    <dl>
                        <dt>¿Por qué debería usarlo?</dt>
                        <dd>Porque es seguro y no vas a ser juzgado.</dd>
                        <dt>¿Cómo se garantiza la confidencialidad de mis mensajes?</dt>
                        <dd>
                            Tu mensaje es procesado de manera segura. Solo se usan los
                            datos necesarios para proporcionarte recomendaciones.
                        </dd>
                        <dt>¿Qué garantiza que funcione?</dt>
                        <dd>
                            El chat está programado para responder tus necesidades de
                            la manera adecuada para garantizar tu bienestar emocional.
                        </dd>
                    </dl>
                </div>

                {/* Llamado a la Acción */}
                <div className="cta">
                    <h3>¿Te gustaría saber más?</h3>
                    <p>
                        Descubre más sobre cómo nuestro asistente puede ayudarte a
                        mejorar tu bienestar emocional.
                    </p>
                   <Link to="/recursos" className="btn_recursos">
                   <button>Recursos</button>
                   </Link>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default Home;
