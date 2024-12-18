import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import { FaBookOpen, FaUsers, FaClipboardList, FaArrowRight, FaRocket } from "react-icons/fa";
import axios from "axios";
import CountUp from "react-countup";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const LandingPage = () => {
  const [stats, setStats] = useState({
    total_revistas: 0,
    total_articulos: 0,
    total_autores: 0,
  });
  const [featuredRevistas, setFeaturedRevistas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stats/`);
        setStats(statsResponse.data);

        const revistasResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/revistas/`);
        setFeaturedRevistas(revistasResponse.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{
      background: "linear-gradient(135deg,rgb(218, 219, 219),rgb(206, 231, 255))",
      minHeight: "100vh", // Cubre toda la pantalla
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between", // Espaciado uniforme
      paddingBottom: "2rem", // Espacio adicional en el footer
      overflowX: "hidden", // Evita desbordamientos horizontales
    }}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #1E3A8A, #10B981)", // Degradado elegante
          color: "#FFFFFF",
          py: { xs: 25, md: 12 }, // Espaciado adaptable
          textAlign: "center",
          marginTop: 9.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Container>
          {/* Título Principal */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 3,
              fontSize: { xs: "2rem", md: "3.5rem" }, // Tamaño adaptable
              lineHeight: 1.2,
              textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)", // Sombra elegante
            }}
          >
            Bienvenido al Portal de Revistas Científicas
          </Typography>

          {/* Subtítulo */}
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              fontSize: { xs: "1rem", md: "1.25rem" }, // Tamaño adaptable
              color: "rgba(255, 255, 255, 0.9)", // Texto ligeramente translúcido
            }}
          >
            Explora una amplia colección de artículos y publicaciones científicas.
          </Typography>

          {/* Botón de Acción */}
          <Button
            component={Link}
            to="/revistas"
            variant="contained"
            sx={{
              backgroundColor: "#EF4444", // Rojo llamativo
              fontSize: "1rem",
              padding: "12px 24px",
              borderRadius: "50px", // Botón redondeado
              fontWeight: "bold",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Sombra elegante
              "&:hover": { backgroundColor: "#DC2626" },
              transition: "all 0.3s ease-in-out", // Transición suave
              "&:focus": {
                outline: "2px solid #F87171", // Foco visible accesible
                outlineOffset: "4px",
              },
            }}
          >
            Comienza Ahora
          </Button>
        </Container>
      </Box>

      <Container
        sx={{
          my: 5,
          py: 4,
          px: { xs: 2, md: 4 },
          background: "linear-gradient(135deg, #F3F7FF, #E8EAF6)", // Fondo suave que resalta
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)", // Sombra sutil
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          sx={{
            mb: 4,
            color: "#344767",
            fontFamily: "'Roboto Slab', serif",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Pequeño efecto de sombra en el texto
          }}
        >
          Estadísticas del Portal
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              icon: <FaClipboardList size={40} color="#1E88E5" />,
              title: "Revistas Cosechadas",
              value: stats.total_revistas,
              link: "/revistas",
              bgColor: "linear-gradient(135deg, #E3F2FD, #FFFFFF)",
            },
            {
              icon: <FaBookOpen size={40} color="#43A047" />,
              title: "Artículos Cosechados",
              value: stats.total_articulos,
              link: "/articulos",
              bgColor: "linear-gradient(135deg, #E8F5E9, #FFFFFF)",
            },
            {
              icon: <FaUsers size={40} color="#F9A825" />,
              title: "Autores Registrados",
              value: stats.total_autores,
              bgColor: "linear-gradient(135deg, #FFF8E1, #FFFFFF)",
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 3,
                  background: item.bgColor,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: item.link ? "translateY(-8px)" : "none",
                    boxShadow: item.link ? "0 8px 24px rgba(0, 0, 0, 0.2)" : "none",
                  },
                  cursor: item.link ? "pointer" : "default",
                }}
                onClick={() => {
                  if (item.link) {
                    window.location.href = item.link;
                  }
                }}
              >
                <Box mb={2}>{item.icon}</Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    mb: 1,
                    color: "#344767",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    color: item.icon.props.color, // Color del ícono para armonizar
                    fontFamily: "'Roboto Slab', serif",
                  }}
                >
                  {loading ? <CircularProgress size={30} /> : <CountUp end={item.value || 0} />}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>


      <Container
  sx={{
    my: 5,
    py: 4,
    px: { xs: 2, md: 4 },
    background: "linear-gradient(135deg, #F3F7FF, #E8EAF6)", // Fondo sutil que resalta
    borderRadius: 4,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)", // Sombra para separar visualmente
  }}
>
  <Typography
    variant="h4"
    fontWeight="bold"
    textAlign="center"
    sx={{
      mb: 4,
      fontFamily: "'Roboto Slab', serif",
      color: "#344767",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Efecto de sombra para resaltar
    }}
  >
    Revistas Destacadas
  </Typography>
  <Grid container spacing={4}>
    {featuredRevistas.map((revista) => (
      <Grid item xs={12} sm={6} md={4} key={revista.id}>
        <Paper
          elevation={6}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            background: "linear-gradient(135deg, #F8FAFC, #FFFFFF)", // Fondo suave en tarjetas
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <Box
            component="img"
            src={revista.cover_image || "/placeholder.jpg"}
            alt={revista.name}
            sx={{
              width: "100%",
              height: 500,
              objectFit: "cover",
              borderBottom: "4px solid #6a11cb", // Detalle de separación visual
            }}
          />
          <Box
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                fontFamily: "'Roboto', sans-serif",
                color: "#1976d2", // Azul destacado
                mb: 1,
              }}
            >
              {revista.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                fontFamily: "'Roboto', sans-serif",
                lineHeight: 1.6,
              }}
            >
              {revista.description?.slice(0, 120) || "Descripción no disponible"}
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to={`/revista/${revista.id}`}
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "0.875rem",
                padding: "10px 20px",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "#155a9c",
                },
              }}
            >
              Ver Más
            </Button>
          </Box>
        </Paper>
      </Grid>
    ))}
  </Grid>
</Container>


<Container
  sx={{
    textAlign: "center",
    my: 5,
    py: 4,
    px: { xs: 2, md: 4 },
    background: "linear-gradient(135deg, #E3F2FD, #F3F7FF)", // Fondo suave
    borderRadius: 4,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)", // Sombra para destacar la sección
  }}
>
  <Typography
    variant="h4"
    fontWeight="bold"
    textAlign="center"
    sx={{
      mb: 4,
      fontFamily: "'Roboto Slab', serif",
      color: "#344767",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Sombra en el título
    }}
  >
    Características Destacadas
  </Typography>
  <Grid container spacing={4}>
    {[
      {
        icon: <FaClipboardList size={50} color="#1976d2" />,
        title: "Fácil Navegación",
        text: "Encuentra rápidamente lo que necesitas.",
      },
      {
        icon: <FaBookOpen size={50} color="#2e7d32" />,
        title: "Actualización Constante",
        text: "Información siempre actualizada.",
      },
      {
        icon: <FaRocket size={50} color="#f44336" />,
        title: "Explora Nuevas Ideas",
        text: "Conecta con contenido científico.",
      },
    ].map((feature, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "linear-gradient(135deg, #ffffff, #F8FAFC)", // Fondo claro para tarjetas
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)", // Efecto de hover
            },
          }}
        >
          <Box
            mb={2}
            sx={{
              background: "rgba(0, 0, 0, 0.05)", // Fondo sutil en el ícono
              borderRadius: "50%",
              padding: 2,
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra en el ícono
            }}
          >
            {feature.icon}
          </Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              mb: 1,
              fontFamily: "'Roboto', sans-serif",
              color: "#344767",
            }}
          >
            {feature.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontFamily: "'Roboto', sans-serif",
              lineHeight: 1.6,
            }}
          >
            {feature.text}
          </Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
</Container>




      {/* Accordion Section */}
      <Container
        sx={{
          my: 5,
          background: "linear-gradient(135deg, #f3f7ff, #eaf2fa)",
          borderRadius: 3,
          p: { xs: 3, md: 5 },
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          sx={{
            mb: 4,
            fontFamily: "'Roboto Slab', serif",
            color: "#344767",
          }}
        >
          Preguntas Frecuentes
        </Typography>
        {[
          {
            question: "¿Qué Ofrecemos?",
            answer: "Una plataforma centralizada para explorar contenido científico y académico.",
          },
          {
            question: "¿Cómo Funciona?",
            answer: "Filtra, busca y accede a revistas y artículos relevantes.",
          },
        ].map((item, index) => (
          <Accordion
            key={index}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 3px 12px rgba(0, 0, 0, 0.1)",
              "&:not(:last-child)": { mb: 3 },
              transition: "all 0.3s ease",
              "&:hover": { boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#6a11cb" }} />}
              sx={{
                backgroundColor: "#f7f7f7",
                "&:hover": { backgroundColor: "#eef1f6" },
                px: { xs: 3, md: 5 },
                py: 2,
              }}
            >
              <Typography
                fontWeight="bold"
                sx={{
                  fontFamily: "'Roboto', sans-serif",
                  color: "#344767",
                }}
              >
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: { xs: 3, md: 5 }, py: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'Roboto', sans-serif",
                  color: "#4a4a4a",
                  lineHeight: 1.8,
                }}
              >
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

    </Box>
  );
};

export default LandingPage;
