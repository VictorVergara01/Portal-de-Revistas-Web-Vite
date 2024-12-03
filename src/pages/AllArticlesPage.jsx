import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, Spinner, Row, Col, Container, Alert, Button } from "react-bootstrap";
import SearchComponent from "../components/SearchComponent";
import FilterComponent from "../components/FilterComponent";
import ViewToggle from "../components/ViewToggle";
import Pagination from "../components/Pagination";
import "./styles/AllArticlesPage.css";

const normalizeString = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

function AllArticlesPage() {
  const [articulos, setArticulos] = useState([]);
  const [filteredArticulos, setFilteredArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("cards");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchAllArticulos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/articulos/");
        setArticulos(response.data);
        setFilteredArticulos(response.data);
      } catch (error) {
        console.error("Error fetching all articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllArticulos();
  }, []);

  const handleSearch = (query) => {
    const normalizedQuery = normalizeString(query);
    const searched = articulos.filter((articulo) => {
      return (
        normalizeString(articulo.title).includes(normalizedQuery) ||
        normalizeString(articulo.creator || "").includes(normalizedQuery) ||
        normalizeString(articulo.subject_es || "").includes(normalizedQuery) ||
        normalizeString(articulo.subject_en || "").includes(normalizedQuery)
      );
    });
    setFilteredArticulos(searched);
    setCurrentPage(1);
  };

  const handleApplyFilters = (filters) => {
    const filtered = articulos.filter((articulo) => {
      return (
        (!filters.startDate ||
          new Date(articulo.date_published) >= new Date(filters.startDate)) &&
        (!filters.endDate ||
          new Date(articulo.date_published) <= new Date(filters.endDate))
      );
    });
    setFilteredArticulos(filtered);
    setCurrentPage(1);
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Regresa al inicio de la página
  };

  const totalPages = Math.ceil(filteredArticulos.length / itemsPerPage);
  const currentItems = filteredArticulos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Cargando artículos...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="all-articles-page">
      <div className="content-wrapper">
        <Row>
          <Col xs={12} className="mb-4">
            <h1 className="page-title">Todos los Artículos</h1>
          </Col>
          <Col xs={12} md={3} className="sidebar">
            <div className="sticky-sidebar">
              <SearchComponent onSearch={handleSearch} />
              <FilterComponent onApplyFilters={handleApplyFilters} />
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
                    <Card className="articulo-card">
                      <Card.Body>
                        <Card.Title className="card-title">{articulo.title}</Card.Title>
                        <Card.Text>
                          {articulo.description_es?.slice(0, 100) ||
                            "Sin descripción disponible."}
                        </Card.Text>
                        <Button
                          as={Link}
                          to={`/articulo/${articulo.id}`}
                          variant="primary"
                          className="mt-3"
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
                    <h5>{articulo.title}</h5>
                    <p>
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
      </div>
    </Container>
  );
}

export default AllArticlesPage;
