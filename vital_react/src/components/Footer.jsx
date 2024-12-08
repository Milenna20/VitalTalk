import React from 'react';
import FacebookLogo from '../assets/images/Flogo.png'
import InstagramLogo from '../assets/images/ilogo.jfif'
import Xlogo from '../assets/images/xlogo.png'
function Footer() {
    return (

        <footer>
            <p>&copy; 2024 Vital Talk. Todos los derechos reservados.</p>
            <ul className="social-links">
                <li>
                    <a href="#" aria-label="Facebook">
                        <img src={FacebookLogo} alt="Facebook logo" />
                    </a>
                </li>
                <li>
                    <a href="#" aria-label="Twitter">
                        <img src={Xlogo} alt="Twitter logo" />
                    </a>
                </li>
                <li>
                    <a href="#" aria-label="Instagram">
                        <img src={InstagramLogo} alt="Instagram logo" />
                    </a>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;