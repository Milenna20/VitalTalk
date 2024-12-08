import React from "react";
import "../styles/recursos.css";    
import Logo from '../assets/images/logo.jpeg'
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Saludmental from "../assets/images/Saludmental.jfif"
import Cumunitario from "../assets/images/comunitario.png"
import Min from "../assets/images/Min.jfif"
import Libros from "../assets/images/libros.jfif"
import Psicologia from "../assets/images/psicologiaymente.webp"

const Recursos = () => {
    return (
        <div>
            <header>
                <div className="container">
                    <h1>Recursos Adicionales - Vital Talk</h1>
                    <img src={Logo} alt="logo" />
                </div>
            </header>

            <NavBar/>

            <div className="container">
                <div className="content">
                    <h2>Recursos Recomendados</h2>

                    {/* Recurso 1 */}
                    <div className="resource-item">
                        <img src={Psicologia} alt="Psicología y Mente" />
                        <div>
                            <h3>
                                <a
                                    href="https://www.psicologiaymente.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Psicología y Mente
                                </a>
                            </h3>
                            <p>
                                Una plataforma completa que ofrece artículos, guías y recursos
                                sobre psicología y bienestar mental. Perfecto para aprender más
                                sobre diferentes aspectos de la salud mental y técnicas de manejo
                                del estrés.
                            </p>
                        </div>
                    </div>

                    {/* Recurso 2 */}
                    <div className="resource-item">
                        <img src={Saludmental} alt="Salud Mental" />
                        <div>
                            <h3>
                                <a
                                    href="https://www.saludmental.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Salud Mental
                                </a>
                            </h3>
                            <p>
                                Un sitio dedicado a proporcionar información y recursos sobre
                                salud mental. Incluye artículos informativos, guías de
                                autocomprensión y enlaces a servicios profesionales de apoyo.
                            </p>
                        </div>
                    </div>

                    {/* Recurso 3 */}
                    <div className="resource-item">
                        <img src={Cumunitario} alt="Centro de Salud Mental Comunitario" />
                        <div>
                            <h3>
                                <a
                                    href="https://www.cmhc.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Centro de Salud Mental Comunitario
                                </a>
                            </h3>
                            <p>
                                Este recurso ofrece servicios de salud mental accesibles y apoyo
                                comunitario. Ofrece información sobre programas de apoyo,
                                talleres y consultas gratuitas o a bajo costo.
                            </p>
                        </div>
                    </div>

                    {/* Recurso 4 */}
                    <div className="resource-item">
                        <img src={Min} alt="Mindfulness" />
                        <div>
                            <h3>
                                <a
                                    href="https://www.mindfulness.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Mindfulness
                                </a>
                            </h3>
                            <p>
                                Recursos y ejercicios de mindfulness para ayudarte a reducir el
                                estrés y aumentar tu bienestar. Incluye meditaciones guiadas,
                                artículos y consejos prácticos para integrar el mindfulness en tu
                                vida diaria.
                            </p>
                        </div>
                    </div>

                    {/* Recurso 5 */}
                    <div className="resource-item">
                        <img src={Libros} alt="Libros de Autoayuda" />
                        <div>
                            <h3>
                                <a
                                    href="https://www.amazon.com/autoayuda"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Libros de Autoayuda
                                </a>
                            </h3>
                            <p>
                                Una selección de libros recomendados sobre autoayuda y crecimiento
                                personal. Explora títulos que pueden ofrecerte nuevas
                                perspectivas y herramientas para mejorar tu salud mental y
                                emocional.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
           
        </div>
    );
};

export default Recursos;
