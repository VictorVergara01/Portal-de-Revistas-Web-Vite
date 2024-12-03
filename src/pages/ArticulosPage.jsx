import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, Spinner, Row, Col, Container, Alert, Button } from "react-bootstrap";
import SearchComponent from "../components/SearchComponent";
import FilterComponent from "../components/FilterComponent";
import ViewToggle from "../components/ViewToggle";
import Pagination from "../components/Pagination";
import { FaBookOpen, FaFilter } from "react-icons/fa";
import "./styles/ArticulosPage.css";

const normalizeString = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

function ArticulosPage() {
  const { id } = useParams();
  const [articulos, setArticulos] = useState([]);
  const [filteredArticulos, setFilteredArticulos] = useState([]);
  const [revistaName, setRevistaName] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("cards");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/revistas/${id}/articulos/`);
        setArticulos(response.data);
        setFilteredArticulos(response.data);

        const revistaResponse = await axios.get(`http://localhost:8000/api/revistas/${id}/`);
        setRevistaName(revistaResponse.data.name || "Sin Nombre");
      } catch (error) {
        console.error("Error fetching articles or revista details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticulos();
  }, [id]);

  const handleSearch = (query) => {
    const normalizedQuery = normalizeString(query);
    const searched = articulos.filter((articulo) =>
      normalizeString(articulo.title).includes(normalizedQuery)
    );
    setFilteredArticulos(searched);
    setCurrentPage(1);
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const totalPages = Math.ceil(filteredArticulos.length / itemsPerPage);
  const currentItems = filteredArticulos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" role="status" />
        <p className="mt-3">Cargando artículos...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="articulos-page">
      <div className="header">
        <h1 className="page-title">
          <FaBookOpen className="me-2 text-primary" />
          Artículos de la Revista
        </h1>
        <h2 className="subtitle">{revistaName}</h2>
      </div>
      <Row>
        <Col xs={12} md={3} className="sidebar">
          <div className="sticky-sidebar">
            <div className="search-filter-section mb-4">
              <SearchComponent onSearch={handleSearch} />
              <FilterComponent onApplyFilters={() => {}} />
            </div>
            <ViewToggle viewMode={viewMode} onViewChange={handleViewChange} />
          </div>
        </Col>
        <Col xs={12} md={9} className="articles-container">
          {filteredArticulos.length === 0 ? (
            <Alert variant="info" className="text-center mt-3">
              No hay artículos que coincidan con los filtros o la búsqueda.
            </Alert>
          ) : viewMode === "cards" ? (
            <Row xs={1} md={2} lg={3} className="g-4 mt-4">
              {currentItems.map((articulo) => (
                <Col key={articulo.id}>
                  <Card className="articulo-card shadow-lg border-0">
                    {articulo.image && (
                      <Card.Img
                        variant="top"
                        src={articulo.image}
                        className="article-image rounded-top"
                      />
                    )}
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="card-title text-primary">
                        {articulo.title}
                      </Card.Title>
                      <Card.Text className="text-muted">
                        {articulo.description_es?.slice(0, 100) ||
                          "Sin descripción disponible."}
                      </Card.Text>
                      <Button
                        as={Link}
                        to={`/articulo/${articulo.id}`}
                        variant="primary"
                        className="mt-auto align-self-start"
                      >
                        Ver Detalles
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <ul className="list-group mt-4">
              {currentItems.map((articulo) => (
                <li key={articulo.id} className="list-group-item">
                  <h5 className="text-primary">{articulo.title}</h5>
                  <p className="text-muted">
                    {articulo.description_es?.slice(0, 100) ||
                      "Sin descripción disponible."}
                  </p>
                  <Button
                    as={Link}
                    to={`/articulo/${articulo.id}`}
                    variant="primary"
                    className="mt-3"
                  >
                    Ver Detalles
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default ArticulosPage;
