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
import RevistasFilter from "../components/RevistasFilter";

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
  const [selectedInstitutions, setSelectedInstitutions] = useState([]);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchRevistas = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/revistas/`);
        setRevistas(response.data);
        setFilteredRevistas(response.data);
      } catch (error) {
        console.error("Error al cargar las revistas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevistas();
  }, []);

  const handleSearch = (query) => {
    const normalizedQuery = normalizeString(query);
    const searched = revistas.filter((revista) => {
      const normalizedName = normalizeString(revista.name || "");
      const normalizedPublisher = normalizeString(revista.publisher || "");
      const normalizedDescription = normalizeString(revista.description || "");
      return (
        normalizedName.includes(normalizedQuery) ||
        normalizedPublisher.includes(normalizedQuery) ||
        normalizedDescription.includes(normalizedQuery)
      );
    });

    const filteredByInstitution = selectedInstitutions.length
      ? searched.filter((revista) => selectedInstitutions.includes(revista.publisher))
      : searched;

    setFilteredRevistas(filteredByInstitution);
    setCurrentPage(1);
  };

  const handleInstitutionFilter = (selected) => {
    setSelectedInstitutions(selected);

    const filteredByInstitution = selected.length
      ? revistas.filter((revista) => selected.includes(revista.publisher))
      : revistas;

    setFilteredRevistas(filteredByInstitution);
    setCurrentPage(1);
  };

  const handleViewChange = (event, mode) => {
    if (mode) setViewMode(mode);
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
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Cargando revistas...
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Box
        textAlign="center"
        mt={4}
        mb={4}
        sx={{
          py: { xs: 3, md: 12 },
          px: 3,
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          color: "#fff",
          borderRadius: 3,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          position: "relative",
          marginTop: { xs: 10, md: 15.5 },

        }}
      >
        {/* Fondo decorativo con gradiente */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.2,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.2), transparent)",
            zIndex: 0,
          }}
        />
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontFamily: "'Roboto Slab', serif",
              textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              fontSize: { xs: "2rem", md: "3.5rem" }
            }}
          >
            Explorar Revistas
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 2,
              fontFamily: "'Roboto', sans-serif",
              lineHeight: 1.5,
            }}
          >
            Encuentra revistas científicas y académicas en el portal.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              fontStyle: "italic",
              fontFamily: "'Roboto', sans-serif",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Más de 500 revistas disponibles para explorar y descubrir.
          </Typography>
        </Box>
      </Box>


      {/* Filtros */}
      <Box mb={3}>
        <RevistasFilter
          onSearch={handleSearch}
          onApplyInstitutionFilter={handleInstitutionFilter}
          viewMode={viewMode}
          selectedInstitutions={selectedInstitutions}
        />
      </Box>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        sx={{
          py: 3,
          px: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #ffffff, #f7f9fc)",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: { xs: 2, md: 0 },
            fontSize: { xs: "1.15rem", md: "1.5rem" },
            color: "#344767",
            fontWeight: "bold",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          {filteredRevistas.length > 0
            ? `Se encontraron ${filteredRevistas.length} revistas`
            : "No hay resultados para mostrar"}
        </Typography>

        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          aria-label="view mode"
          sx={{
            "& .MuiToggleButton-root": {
              color: "#6c757d",
              borderColor: "#dee2e6",
              "&.Mui-selected": {
                backgroundColor: "#1976d2",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#115293",
                },
              },
            },
          }}
        >
          <ToggleButton value="cards" aria-label="card view" sx={{ px: 2 }}>
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view" sx={{ px: 2 }}>
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>


      {filteredRevistas.length === 0 ? (
        <Alert
          severity="info"
          sx={{
            mt: 2,
            fontFamily: "'Roboto', sans-serif",
            textAlign: "center",
            borderRadius: 2,
            backgroundColor: "#f3f6fa",
            color: "#344767",
          }}
        >
          No hay revistas que coincidan con la búsqueda o los filtros.
        </Alert>
      ) : viewMode === "cards" ? (
        <Grid container spacing={4}>
          {currentItems.map((revista) => (
            <Grid item xs={12} sm={6} md={4} key={revista.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  background: "linear-gradient(135deg, #ffffff, #f8f9fc)",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                {/* Imagen */}
                <Box
                  component="img"
                  src={revista.cover_image || "/placeholder.jpg"}
                  alt={`Portada de ${revista.name}`}
                  sx={{
                    height: 500,
                    width: "100%",
                    objectFit: "cover",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
                {/* Contenido */}
                <CardContent
                  sx={{
                    p: 3,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#344767",
                      fontWeight: "bold",
                      fontFamily: "'Roboto Slab', serif",
                      mb: 1,
                    }}
                  >
                    {revista.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6B7280",
                      mb: 2,
                      fontFamily: "'Roboto', sans-serif",
                      lineHeight: 1.5,
                    }}
                  >
                    {revista.description?.slice(0, 150) || "Sin descripción disponible."}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#9CA3AF", fontFamily: "'Roboto', sans-serif" }}
                  >
                    Publicado por: {revista.publisher || "Desconocido"}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#9CA3AF", fontFamily: "'Roboto', sans-serif", mt: 1 }}
                  >
                    Última Cosecha: {revista.last_harvest_date || "No disponible"}
                  </Typography>
                </CardContent>
                {/* Acciones */}
                <CardActions
                  sx={{
                    justifyContent: "flex-end",
                    px: 3,
                    pb: 2,
                  }}
                >
                  <Button
                    size="medium"
                    variant="contained"
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#ffffff",
                      textTransform: "none",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#155a9c" },
                    }}
                    component={Link}
                    to={`/revista/${revista.id}`}
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
            gap: 3,
          }}
        >
          {currentItems.map((revista) => (
            <Box
              component="li"
              key={revista.id}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "flex-start",
                border: "1px solid #e0e0e0",
                borderRadius: 3,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                background: "linear-gradient(135deg, #ffffff, #f8f9fc)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Box
                component="img"
                src={revista.cover_image || "/placeholder.jpg"}
                alt={`Portada de ${revista.name}`}
                sx={{
                  width: { xs: "100%", sm: "200px" },
                  height: { xs: "150px", sm: "auto" },
                  objectFit: "cover",
                }}
              />
              <Box
                sx={{
                  flex: 1,
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#344767",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  {revista.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  {revista.description?.slice(0, 150) || "Sin descripción disponible."}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mt: 2 }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", fontFamily: "'Roboto', sans-serif" }}
                    >
                      Publicado por: <strong>{revista.publisher || "Desconocido"}</strong>
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontFamily: "'Roboto', sans-serif" }}
                    >
                      Última Cosecha: {revista.last_harvest_date || "No disponible"}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#ffffff",
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: "0.875rem",
                      "&:hover": { backgroundColor: "#155a9c" },
                    }}
                    component={Link}
                    to={`/revista/${revista.id}`}
                  >
                    Ver Detalles
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}


      <Box
        mt={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2, // Espaciado entre los elementos
          padding: 2,
          backgroundColor: "#f8fafc", // Fondo claro para destacar la paginación
          borderRadius: 3,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Sombra suave
        }}
      >
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-root": {
              fontWeight: "bold",
              color: "#344767",
              "&:hover": {
                backgroundColor: "#e3f2fd", // Color de hover para los botones
                color: "#1976d2",
              },
              "&.Mui-selected": {
                backgroundColor: "#1976d2",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#155a9c",
                },
              },
            },
          }}
        />
      </Box>
    </Container>
  );
}

export default RevistasPage;
