import React from "react";
import "../styles/testimonios.css"; 
import Logo from '../assets/images/logo.jpeg'

import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const Testimonios = () => {
    return (
        <div>
            <header>
                <div className="container">
                    <h1>Testimonios - Vital Talk</h1>
                    <img src={Logo} alt="logo" />
                </div>
            </header>

            <NavBar/>
            <div className="container">
                {/* Testimonios */}
                <div className="content">
                    <h2>Lo Que Dicen Nuestros Usuarios</h2>
                    <div className="testimonial-item">
                        <p>
                            "El asistente de Vital Talk ha sido una herramienta
                            increíble en momentos difíciles. La capacidad de
                            recibir apoyo sin revelar mi identidad es invaluable."
                        </p>
                        <span>- María G.</span>
                    </div>
                    <div className="testimonial-item">
                        <p>
                            "Me gusta que el asistente no me juzga y siempre me
                            ofrece consejos prácticos y útiles. Me siento más en
                            control de mi bienestar."
                        </p>
                        <span>- Carlos L.</span>
                    </div>
                    <div className="testimonial-item">
                        <p>
                            "Utilizo Vital Talk regularmente y siempre encuentro
                            apoyo en los momentos que más lo necesito. Es una
                            herramienta muy efectiva."
                        </p>
                        <span>- Laura T.</span>
                    </div>
                    <div className="testimonial-item">
                        <p>
                            "Agradezco la posibilidad de recibir orientación sin
                            tener que compartir mi identidad. El asistente ha sido
                            un gran apoyo en mi viaje hacia el bienestar."
                        </p>
                        <span>- Javier M.</span>
                    </div>
                </div>

                {/* Compartir Testimonio */}
                <div className="content share-testimonial">
                    <h2>Comparte Tu Testimonio</h2>
                    <p>
                        Nos encantaría conocer tu experiencia con Vital Talk.
                        Comparte tu testimonio anónimo con nosotros para ayudar a
                        otros a encontrar apoyo.
                    </p>
                    <form action="/compartir-testimonio" method="post">
                        <div className="form-group">
                            <label htmlFor="testimonio">Tu Testimonio:</label>
                            <textarea id="testimonio" name="testimonio" required />
                        </div>
                        <div className="form-group">
                            <button type="submit">Enviar Testimonio</button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default Testimonios;
