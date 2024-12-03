import React from "react";
import "./styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo y descripción */}
        <div className="footer-section">
          <h2>Revistas Científicas</h2>
          <p>
            Explora las mejores revistas científicas y artículos de investigación.
            Plataforma creada para conectar a investigadores y profesionales.
          </p>
        </div>

        {/* Navegación rápida */}
        <div className="footer-section">
          <h3>Navegación</h3>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/revistas">Revistas</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="footer-section">
          <h3>Síguenos</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; 2024 SENACYT Portal de Revistas Científicas. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
