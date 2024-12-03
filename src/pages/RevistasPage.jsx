import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, Spinner, Row, Col, Container, Alert, Button } from "react-bootstrap";
import SearchComponent from "../components/SearchComponent";
import Pagination from "../components/Pagination";
import ViewToggle from "../components/ViewToggle";
import FilterComponent from "../components/FilterComponent";
import "./styles/RevistasPage.css";

const normalizeString = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

function RevistasPage() {
  const [revistas, setRevistas] = useState([]);
  const [filteredRevistas, setFilteredRevistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("cards");
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchRevistas = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/revistas/");
        setRevistas(response.data);
        setFilteredRevistas(response.data);
      } catch (error) {
        console.error("Error fetching revistas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevistas();
  }, []);

  const handleSearch = (query) => {
    const normalizedQuery = normalizeString(query);
    const searched = revistas.filter((revista) => {
      return (
        normalizeString(revista.name).includes(normalizedQuery) ||
        normalizeString(revista.publisher || "").includes(normalizedQuery)
      );
    });
    setFilteredRevistas(searched);
    setCurrentPage(1);
  };

  const handleApplyFilters = (filters) => {
    const filtered = revistas.filter((revista) => {
      return (
        (!filters.startDate ||
          new Date(revista.last_harvest_date) >= new Date(filters.startDate)) &&
        (!filters.endDate ||
          new Date(revista.last_harvest_date) <= new Date(filters.endDate)) &&
        (!filters.publisher ||
          normalizeString(revista.publisher || "").includes(normalizeString(filters.publisher)))
      );
    });
    setFilteredRevistas(filtered);
    setCurrentPage(1);
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const totalPages = Math.ceil(filteredRevistas.length / itemsPerPage);
  const currentItems = filteredRevistas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" variant="primary" />
        <p className="mt-3">Cargando revistas...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="revistas-page">
      <div className="header">
        <h1 className="page-title">Explorar Revistas</h1>
        <p className="subtitle">Encuentra revistas científicas y académicas en el portal</p>
      </div>
      <Row>
        <Col xs={12} md={3} className="sidebar">
          <div className="sticky-sidebar">
            <SearchComponent onSearch={handleSearch} />
            <FilterComponent onApplyFilters={handleApplyFilters} />
            <ViewToggle viewMode={viewMode} onViewChange={handleViewChange} />
          </div>
        </Col>
        <Col xs={12} md={9} className="revistas-container">
          {filteredRevistas.length === 0 ? (
            <Alert variant="info" className="text-center mt-3">
              No hay revistas que coincidan con la búsqueda o los filtros.
            </Alert>
          ) : viewMode === "cards" ? (
            <Row xs={1} md={2} lg={3} className="g-4 mt-4">
              {currentItems.map((revista) => (
                <Col key={revista.id}>
                  <Card className="revista-card shadow-lg">
                    {revista.cover_image && (
                      <Card.Img
                        variant="top"
                        src={revista.cover_image}
                        alt={`Portada de ${revista.name}`}
                        className="revista-cover rounded-top"
                      />
                    )}
                    <Card.Body>
                      <Card.Title className="text-primary">{revista.name}</Card.Title>
                      <Card.Text className="text-muted">
                        {revista.description?.slice(0, 100) || "Sin descripción disponible."}
                      </Card.Text>
                      <div className="button-group">
                        <Button
                          as={Link}
                          to={`/revista/${revista.id}`}
                          variant="primary"
                          className="me-2"
                        >
                          Ver Detalles
                        </Button>
                        <Button
                          as={Link}
                          to={`/revista/${revista.id}/articulos`}
                          variant="secondary"
                        >
                          Ver Artículos
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <ul className="list-group mt-4">
              {currentItems.map((revista) => (
                <li key={revista.id} className="list-group-item d-flex align-items-center">
                  {revista.cover_image && (
                    <img
                      src={revista.cover_image}
                      alt={`Portada de ${revista.name}`}
                      className="list-view-image"
                    />
                  )}
                  <div className="list-item-content">
                    <h5 className="text-primary">{revista.name}</h5>
                    <p className="text-muted">
                      {revista.description?.slice(0, 100) || "Sin descripción disponible."}
                    </p>
                    <div className="button-group">
                      <Button
                        as={Link}
                        to={`/revista/${revista.id}`}
                        variant="primary"
                        className="me-2"
                      >
                        Ver Detalles
                      </Button>
                      <Button
                        as={Link}
                        to={`/revista/${revista.id}/articulos`}
                        variant="secondary"
                      >
                        Ver Artículos
                      </Button>
                    </div>
                  </div>
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

export default RevistasPage;
