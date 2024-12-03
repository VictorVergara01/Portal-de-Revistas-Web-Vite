import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Carousel, Accordion } from "react-bootstrap";
import { FaBookOpen, FaUsers, FaClipboardList, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import "./styles/LandingPage.css";

function LandingPage() {
  const [stats, setStats] = useState({ revistas: 0, autores: 0, articulos: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/stats/");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="hero">
        <Container>
          <Row className="align-items-center text-center text-md-start">
            <Col md={6} className="hero-content">
              <h1 className="hero-title">Descubre el Conocimiento</h1>
              <p className="hero-text">
                Accede a una vasta colección de revistas científicas y artículos relevantes.
              </p>
              <Link to="/revistas">
                <Button variant="primary" size="lg" className="hero-button">
                  Explorar Revistas <FaArrowRight className="ms-2" />
                </Button>
              </Link>
            </Col>
            <Col md={6}>
              <Carousel interval={3000} className="hero-carousel">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://via.placeholder.com/600x300?text=Revistas+Científicas"
                    alt="Revistas Científicas"
                  />
                  <Carousel.Caption>
                    <h3>Revistas Científicas</h3>
                    <p>Explora las mejores publicaciones académicas.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://via.placeholder.com/600x300?text=Artículos+Relevantes"
                    alt="Artículos Relevantes"
                  />
                  <Carousel.Caption>
                    <h3>Artículos Relevantes</h3>
                    <p>Accede a contenido actualizado y relevante.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://via.placeholder.com/600x300?text=Autores+Reconocidos"
                    alt="Autores Reconocidos"
                  />
                  <Carousel.Caption>
                    <h3>Autores Reconocidos</h3>
                    <p>Conoce a los líderes en investigación científica.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Statistics Section */}
      <Container className="stats-section my-5">
        <Row>
          <Col xs={12} md={4} className="mb-4">
            <div className="stat-card shadow-lg">
              <FaClipboardList className="stat-icon text-primary" />
              <h5 className="stat-title">Revistas Cosechadas</h5>
              <p className="stat-value">
                {loading ? "Cargando..." : stats.total_revistas}
              </p>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-4">
            <div className="stat-card shadow-lg">
              <FaBookOpen className="stat-icon text-success" />
              <h5 className="stat-title">Artículos Cosechados</h5>
              <p className="stat-value">
                {loading ? "Cargando..." : stats.total_articulos}
              </p>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-4">
            <div className="stat-card shadow-lg">
              <FaUsers className="stat-icon text-warning" />
              <h5 className="stat-title">Autores Registrados</h5>
              <p className="stat-value">
                {loading ? "Cargando..." : stats.total_autores}
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <Container className="features-section my-5">
        <Row>
          <Col md={4} className="feature text-center">
            <FaClipboardList className="feature-icon text-primary" />
            <h4>Fácil Navegación</h4>
            <p>Encuentra rápidamente las revistas y artículos que necesitas.</p>
          </Col>
          <Col md={4} className="feature text-center">
            <FaBookOpen className="feature-icon text-success" />
            <h4>Actualización Constante</h4>
            <p>Accede siempre a la información más reciente y relevante.</p>
          </Col>
          <Col md={4} className="feature text-center">
            <FaUsers className="feature-icon text-warning" />
            <h4>Accesibilidad</h4>
            <p>Compatible con todos tus dispositivos para máxima comodidad.</p>
          </Col>
        </Row>
      </Container>

      {/* Accordion Section */}
      <Container className="accordion-section">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>¿Qué Ofrecemos?</Accordion.Header>
            <Accordion.Body>
              Una plataforma donde puedes explorar contenido científico y académico centralizado.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>¿Cómo Funciona?</Accordion.Header>
            <Accordion.Body>
              Filtra, busca y accede a la información relevante para tus investigaciones fácilmente.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>

      {/* Call to Action */}
      <Container className="cta-section text-center my-5">
        <h3 className="cta-title">Únete a Nuestra Comunidad</h3>
        <p className="cta-text">
          Sé parte de los usuarios que exploran el conocimiento y comparten ideas.
        </p>
        <Link to="/registro">
          <Button variant="primary" size="lg" className="cta-button">
            Regístrate Ahora
          </Button>
        </Link>
      </Container>
    </div>
  );
}

export default LandingPage;
