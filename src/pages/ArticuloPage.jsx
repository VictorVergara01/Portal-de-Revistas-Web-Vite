import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Spinner, Card, Button, Row, Col, Badge } from "react-bootstrap";
import { FaExternalLinkAlt, FaCalendarAlt, FaGlobe, FaBook, FaFilter } from "react-icons/fa";
import "./styles/ArticuloPage.css";

function ArticuloPage() {
    const { id } = useParams();
    const [articulo, setArticulo] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const initialLanguage = location.state?.language || "es";
    const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    useEffect(() => {
        const fetchArticulo = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/articulos/${id}/`
                );
                setArticulo(response.data);
            } catch (error) {
                console.error("Error fetching article:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticulo();
    }, [id]);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status" />
                <p className="mt-3">Cargando detalles del artículo...</p>
            </Container>
        );
    }

    if (!articulo) {
        return (
            <Container className="text-center mt-5">
                <p>No se encontró el artículo solicitado.</p>
            </Container>
        );
    }

    return (
        <Container className="articulo-page mt-4">
            <Card className="articulo-detail-card shadow-sm">
                <Card.Header className="bg-primary text-white">
                    <h4>{articulo.title}</h4>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={8}>
                            <Card.Text>
                                <FaBook className="me-2 text-secondary" />
                                <strong>Autor:</strong> {articulo.creator || "Desconocido"}
                            </Card.Text>
                            <Card.Text>
                                <FaCalendarAlt className="me-2 text-secondary" />
                                <strong>Publicado el:</strong> {articulo.date_published || "No disponible"}
                            </Card.Text>
                            <Card.Text>
                                <FaGlobe className="me-2 text-secondary" />
                                <strong>Idioma:</strong> {articulo.language || "No disponible"}
                            </Card.Text>
                            <Card.Text>
                                <strong>Descripción en {selectedLanguage === "es" ? "Español" : "Inglés"}:</strong>
                                <p className="mt-2">
                                    {articulo[`description_${selectedLanguage}`] || "No disponible"}
                                </p>
                            </Card.Text>
                            <Card.Text>
                                <strong>Tema en {selectedLanguage === "es" ? "Español" : "Inglés"}:</strong>
                                <Badge bg="info" className="ms-2">
                                    {articulo[`subject_${selectedLanguage}`] || "No disponible"}
                                </Badge>
                            </Card.Text>
                        </Col>
                        <Col md={4} className="text-center">
                            {articulo.official_link && (
                                <Button
                                    variant="success"
                                    className="mt-3"
                                    onClick={() => window.open(articulo.official_link, "_blank")}
                                >
                                    Ver artículo oficial <FaExternalLinkAlt />
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <Button
                        variant={selectedLanguage === "es" ? "primary" : "outline-primary"}
                        className="me-2"
                        onClick={() => handleLanguageChange("es")}
                    >
                        Español
                    </Button>
                    <Button
                        variant={selectedLanguage === "en" ? "primary" : "outline-primary"}
                        onClick={() => handleLanguageChange("en")}
                    >
                        Inglés
                    </Button>
                </Card.Footer>
            </Card>
        </Container>
    );
}

export default ArticuloPage;
