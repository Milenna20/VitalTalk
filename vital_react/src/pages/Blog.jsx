import React from "react";
import "../styles/blog.css";
import Logo from '../assets/images/logo.jpeg'
import Autocuidado from '../assets/images/autocuidado.jfif'
import Estres from '../assets/images/estress.jpg'
import ManejoEstres from '../assets/images/manejodeestres.png'
import CuidadoEmocional from '../assets/images/cuidadoemocional.jfif'
import FacebookLogo from '../assets/images/Flogo.png'
import InstagramLogo from '../assets/images/ilogo.jfif'
import Xlogo from '../assets/images/xlogo.png'
import NavBar from "../components/Navbar";
import Footer from '../components/Footer'




const Blog = () => {
    return (
        <div>
            <header>
                <div className="container">
                    <h1>Blog de Salud Mental - Vital Talk</h1>
                    <img src={Logo} alt="logo" />
                </div>
            </header>

            <NavBar/>

            <div className="container">
                <div className="content">
                    <h2>Últimos Artículos</h2>

                    {/* Primer artículo */}
                    <div className="blog-post">
                        <img
                            src={ManejoEstres}
                            alt="Estrategias para Manejar el Estrés"
                            width="300px"
                            />
                        <div>
                            <h3>
                                <a
                                    href="https://www.psicologiaymente.com/estrategias-de-manejo-del-estres"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >
                                    Estrategias Efectivas para Manejar el Estrés
                                </a>
                            </h3>
                            <p> 
                                Descubre técnicas prácticas para reducir el estrés en tu
                                vida diaria. Este artículo te ofrece estrategias basadas en
                                investigaciones y prácticas recomendadas para ayudarte a
                                manejar el estrés de manera efectiva.
                            </p>
                        </div>
                    </div>

                    {/* Segundo artículo */}
                    <div className="blog-post">
                        <img
                            src={Autocuidado}
                            alt="La Importancia del Autocuidado"
                            />
                        <div>
                            <h3>
                                <a
                                    href="https://www.saludmental.org/importancia-del-autocuidado"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >
                                    La Importancia del Autocuidado en tu Bienestar
                                </a>
                            </h3>
                            <p>
                                Aprende cómo el autocuidado puede mejorar tu salud mental y
                                emocional. Este artículo explora diversas prácticas de
                                autocuidado y su impacto positivo en tu bienestar general.
                            </p>
                        </div>
                    </div>

                    {/* Tercer artículo */}
                    <div className="blog-post">
                        <img
                            src={Estres}
                            alt="Mindfulness y Reducción del Estrés"
                            width="300px"
                            />
                        <div>
                            <h3>
                                <a
                                    href="https://www.mindfulness.org/reduccion-estres"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >
                                    Mindfulness y Reducción del Estrés
                                </a>
                            </h3>
                            <p>
                                Explora cómo la práctica de mindfulness puede ayudarte a
                                reducir el estrés y mejorar tu bienestar. Este artículo
                                proporciona una guía introductoria a la meditación y
                                técnicas de mindfulness.
                            </p>
                        </div>
                    </div>

                    {/* Cuarto artículo */}
                    <div className="blog-post">
                        <img
                            src={CuidadoEmocional}
                            alt="Cómo Mantener una Salud Emocional Equilibrada"
                            width="300px"
                            />
                        <div>
                            <h3>
                                <a
                                    href="https://www.cmhc.com/salud-emocional"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >
                                    Cómo Mantener una Salud Emocional Equilibrada
                                </a>
                            </h3>
                            <p>
                                Conoce las claves para mantener un equilibrio emocional
                                saludable. Este artículo ofrece consejos prácticos y
                                estrategias para gestionar tus emociones y mantener una
                                salud emocional positiva.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        <Footer/>
        </div>
    );
};

export default Blog;
