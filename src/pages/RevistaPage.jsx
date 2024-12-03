import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Spinner, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { FaExternalLinkAlt, FaUniversity, FaCalendarAlt, FaBookOpen, FaUsers } from "react-icons/fa";
import "./styles/RevistaPage.css";

function RevistaPage() {
  const { id } = useParams();
  const [revista, setRevista] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevistaDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/revistas/${id}/`);
        setRevista(response.data);
      } catch (error) {
        console.error("Error fetching revista details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevistaDetails();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" variant="primary" />
        <p className="mt-3">Cargando detalles de la revista...</p>
      </Container>
    );
  }

  if (!revista) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">No se encontraron los detalles de la revista.</Alert>
      </Container>
    );
  }

  const imageUrl = revista.cover_image
    ? `http://localhost:8000${revista.cover_image}`
    : null;

  return (
    <Container fluid className="revista-page">
      <div className="header">
        <h1 className="page-title">{revista.name}</h1>
        <p className="subtitle">Detalles y estadísticas de la revista</p>
      </div>
      <Row className="justify-content-center">
        <Col xs={12} md={4} className="text-center mb-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`Portada de ${revista.name}`}
              className="revista-cover img-fluid rounded shadow-lg"
            />
          ) : (
            <div className="no-cover">Sin Portada Disponible</div>
          )}
        </Col>
        <Col xs={12} md={8}>
          <Card className="revista-details-card shadow-lg">
            <Card.Body>
              <Card.Title className="revista-title text-primary">{revista.name}</Card.Title>
              <Card.Text className="revista-description text-muted">
                {revista.description || "No hay descripción disponible."}
              </Card.Text>
              <ul className="revista-details list-unstyled">
                <li>
                  <FaUniversity className="me-2 text-secondary" />
                  <strong>Institución: </strong> {revista.publisher || "No especificada"}
                </li>
                <li>
                  <FaCalendarAlt className="me-2 text-secondary" />
                  <strong>Última Cosecha: </strong> {revista.last_harvest_date || "No disponible"}
                </li>
              </ul>
              {revista.official_url && (
                <Button
                  variant="success"
                  href={revista.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 me-2"
                >
                  Página Oficial <FaExternalLinkAlt className="ms-2" />
                </Button>
              )}
              <Button
                as={Link}
                to={`/revista/${revista.id}/articulos`}
                variant="secondary"
                className="mt-3"
              >
                Ver Artículos
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Nueva Sección de Estadísticas */}
      <Row className="mt-5 stats-section">
        <Col xs={12} md={4} className="text-center mb-4">
          <div className="stat-card shadow-lg">
            <FaBookOpen className="stat-icon text-primary" />
            <h5 className="stat-title">Artículos Publicados</h5>
            <p className="stat-value">{revista.total_articles || "0"}</p>
          </div>
        </Col>
        <Col xs={12} md={4} className="text-center mb-4">
          <div className="stat-card shadow-lg">
            <FaUsers className="stat-icon text-success" />
            <h5 className="stat-title">Autores de la Revista</h5>
            <p className="stat-value">{revista.total_authors || "0"}</p>
          </div>
        </Col>
        <Col xs={12} md={4} className="text-center mb-4">
          <div className="stat-card shadow-lg">
            <FaCalendarAlt className="stat-icon text-warning" />
            <h5 className="stat-title">Año de Publicacion</h5>
            <p className="stat-value">{revista.start_year || "Desconocido"}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default RevistaPage;
