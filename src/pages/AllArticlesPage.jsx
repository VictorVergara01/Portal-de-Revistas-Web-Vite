import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import Pagination from "../components/Pagination";
import AllArticlesFilter from "../components/AllArticlesFilter";

const normalizeString = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

function AllArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [revistas, setRevistas] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("cards");
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitutions, setSelectedInstitutions] = useState([]);
  const itemsPerPage = 21;

  useEffect(() => {
    const fetchArticlesAndRevistas = async () => {
      try {
        const [articlesResponse, revistasResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/articulos/`),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/revistas/`),
        ]);

        const articlesData = articlesResponse.data;
        const revistasData = revistasResponse.data;

        // Mapear los artículos con las imágenes de revistas
        const updatedArticles = articlesData.map((article) => {
          const matchingRevista = revistasData.find(
            (revista) => revista.id === article.fuente
          );

          return {
            ...article,
            image: matchingRevista ? matchingRevista.cover_image : "/placeholder.jpg",
          };
        });

        setArticles(updatedArticles);
        setFilteredArticles(updatedArticles);

        const uniqueInstitutions = Array.from(
          new Set(articlesData.map((article) => article.publisher).filter(Boolean))
        );
        setInstitutions(uniqueInstitutions);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticlesAndRevistas();
  }, []);

  const handleSearch = (query) => {
    const normalizedQuery = normalizeString(query);
    const searched = articles.filter((article) => {
      const normalizedTitle = normalizeString(article.title || "");
      const normalizedPublisher = normalizeString(article.publisher || "");
      const normalizedDescription = normalizeString(article.description || "");
      return (
        normalizedTitle.includes(normalizedQuery) ||
        normalizedPublisher.includes(normalizedQuery) ||
        normalizedDescription.includes(normalizedQuery)
      );
    });

    const filteredByInstitution = selectedInstitutions.length
      ? searched.filter((article) => selectedInstitutions.includes(article.publisher))
      : searched;

    setFilteredArticles(filteredByInstitution);
    setCurrentPage(1);
  };

  const handleInstitutionFilter = (selected) => {
    setSelectedInstitutions(selected);

    const filteredByInstitution = selected.length
      ? articles.filter((article) => selected.includes(article.publisher))
      : articles;

    setFilteredArticles(filteredByInstitution);
    setCurrentPage(1);
  };

  const handleViewChange = (event, mode) => {
    if (mode) setViewMode(mode);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const currentItems = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Cargando artículos...
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          mt: 4,
          mb: 4,
          py: 4,
          px: 2,
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          color: "#fff",
          borderRadius: 2,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Explorar Artículos
        </Typography>
        <Typography variant="subtitle1">
          Encuentra artículos científicos y académicos que te interesen.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, fontStyle: "italic" }}>
          Más de 10,000 artículos disponibles para explorar, clasificar y descubrir.
        </Typography>
      </Box>

      {/* Filtros */}
      <Box mb={3}>
        <AllArticlesFilter
          onSearch={handleSearch}
          onApplyInstitutionFilter={handleInstitutionFilter}
          viewMode={viewMode}
          institutions={institutions}
          selectedInstitutions={selectedInstitutions}
        />
      </Box>

      {/* Cambiar Vista */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        sx={{
          py: 2,
          px: 3,
          borderRadius: 2,
          background: "#f5f5f5",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6">
          {filteredArticles.length > 0
            ? `Se encontraron ${filteredArticles.length} artículos`
            : "No hay resultados para mostrar"}
        </Typography>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          aria-label="view mode"
        >
          <ToggleButton value="cards" aria-label="card view">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Resultados */}
      {filteredArticles.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2, textAlign: "center" }}>
          No hay artículos que coincidan con la búsqueda o los filtros aplicados.
        </Alert>
      ) : viewMode === "cards" ? (
        <Grid container spacing={4}>
          {currentItems.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                }}
              >
                <Box
                  component="img"
                  src={article.image || "/placeholder.jpg"}
                  alt={article.title}
                  sx={{
                    height: 200,
                    objectFit: "cover",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {article.description_es?.slice(0, 150) ||
                      article.description_en?.slice(0, 150) ||
                      "Sin descripción disponible."}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Autor: {article.creator || "Desconocido"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Publicado: {article.date_published || "Fecha no disponible"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/articulo/${article.id}`}
                  >
                    Ver Detalles
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
  component="ul"
  sx={{
    listStyleType: "none",
    p: 0,
    m: 0,
    display: "flex",
    flexDirection: "column",
    gap: 2, // Espaciado entre elementos
  }}
>
  {currentItems.map((article) => (
    <Box
      component="li"
      key={article.id}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // Responsive: columna en móvil, fila en pantallas más grandes
        alignItems: "flex-start",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        boxShadow: 1,
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-5px)", // Efecto hover sutil
        },
        backgroundColor: "#fff",
      }}
    >
      {/* Imagen */}
      <Box
        component="img"
        src={article.image || "/placeholder.jpg"}
        alt={article.title}
        sx={{
          width: { xs: "100%", sm: "200px" }, // Ancho responsive
          height: { xs: "150px", sm: "auto" },
          objectFit: "cover",
          borderTopLeftRadius: { xs: 2, sm: 2 },
          borderBottomLeftRadius: { xs: 0, sm: 2 },
        }}
      />
      
      {/* Contenido */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1, // Espacio entre textos
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
          {article.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            fontSize: "0.9rem",
            lineHeight: 1.5,
          }}
        >
          {article.description_es?.slice(0, 150) ||
            article.description_en?.slice(0, 150) ||
            "Sin descripción disponible."}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block" }}
            >
              Autor: <strong>{article.creator || "Desconocido"}</strong>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Publicado: {article.date_published || "Fecha no disponible"}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/articulo/${article.id}`}
            size="small"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Ver Detalles
          </Button>
        </Box>
      </Box>
    </Box>
  ))}
</Box>

      )}

      {/* Paginación */}
      <Box mt={4}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Box>
    </Container>
  );
}

export default AllArticlesPage;
