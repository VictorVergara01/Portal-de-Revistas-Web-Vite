import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { FaExternalLinkAlt, FaUniversity, FaCalendarAlt, FaBookOpen, FaUsers } from "react-icons/fa";

function RevistaPage() {
  const { id } = useParams();
  const [revista, setRevista] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevistaDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/revistas/${id}/`
        );
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
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Cargando detalles de la revista...
        </Typography>
      </Box>
    );
  }

  if (!revista) {
    return (
      <Container>
        <Box textAlign="center" mt={5}>
          <Alert severity="error">No se encontraron los detalles de la revista.</Alert>
        </Box>
      </Container>
    );
  }

  const imageUrl = revista.cover_image
    ? `${import.meta.env.VITE_API_BASE_URL}${revista.cover_image}`
    : null;

  return (
    <Container>
      {/* Header */}
      <Box
        sx={{
          textAlign: "center",
          mt: 4,
          mb: 4,
          py: 4,
          px: 2,
          borderRadius: 3,
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          color: "#fff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          marginTop: { xs: 10, md: 15.5 },

        }}
      >
        <Typography variant="h3" gutterBottom sx={{
          fontSize: { xs: "2rem", md: "3.5rem" },
          fontWeight: "bold",
        }}>
          {revista.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontSize: "1.2rem", opacity: 0.9 }}>
          Detalles y estadísticas de la revista
        </Typography>
      </Box>

      {/* Detalles principales */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4} textAlign="center">
          {imageUrl ? (
            <Box
              component="img"
              src={imageUrl}
              alt={`Portada de ${revista.name}`}
              sx={{
                width: "100%",
                maxHeight: 1000,
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                Sin Portada Disponible
              </Typography>
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" color="primary" gutterBottom>
                {revista.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {revista.description || "No hay descripción disponible."}
              </Typography>
              <Box mb={2}>
                <Typography variant="body1">
                  <FaUniversity className="icon" />
                  <strong> Institución:</strong> {revista.publisher || "No especificada"}
                </Typography>
                <Typography variant="body1">
                  <FaCalendarAlt className="icon" />
                  <strong> Última Cosecha:</strong>{" "}
                  {revista.last_harvest_date || "No disponible"}
                </Typography>
              </Box>
              {revista.official_url && (
                <Button
                  variant="contained"
                  color="success"
                  href={revista.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mr: 2 }}
                >
                  Página Oficial <FaExternalLinkAlt style={{ marginLeft: 8 }} />
                </Button>
              )}
              <Button
                component={Link}
                to={`/revista/${revista.id}/articulos`}
                state={{ selectedRevistaId: revista.id }} // Pasamos el ID de la revista
                variant="outlined"
                color="primary"
              >
                Ver Artículos
              </Button>

            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Sección de estadísticas */}
      <Box mt={5}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4} textAlign="center">
            <Card
              sx={{
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FaBookOpen className="stat-icon" size={40} color="#3f51b5" />
              <Typography variant="h6" mt={2}>
                Artículos Publicados
              </Typography>
              <Typography variant="h4">
                {revista.total_articles || "0"}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <Card
              sx={{
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FaUsers className="stat-icon" size={40} color="#4caf50" />
              <Typography variant="h6" mt={2}>
                Autores de la Revista
              </Typography>
              <Typography variant="h4">
                {revista.total_authors || "0"}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <Card
              sx={{
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 3,
              }}
            >
              <FaCalendarAlt className="stat-icon" size={40} color="#ffc107" />
              <Typography variant="h6" mt={2}>
                Año de Publicación
              </Typography>
              <Typography variant="h4">
                {revista.start_year || "Desconocido"}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default RevistaPage;
