import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    Button,
    Alert,
    CircularProgress,
    Chip,
} from "@mui/material";
import { FaBook, FaCalendarAlt, FaExternalLinkAlt, FaGlobe } from "react-icons/fa";

function ArticuloPage() {
    const { id } = useParams();
    const [articulo, setArticulo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState("es");

    useEffect(() => {
        const fetchArticulo = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/articulos/${id}/`
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

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    if (loading) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
                <CircularProgress />
                <Typography variant="h6" mt={2}>
                    Cargando detalles del artículo...
                </Typography>
            </Box>
        );
    }

    if (!articulo) {
        return (
            <Container>
                <Box textAlign="center" mt={5}>
                    <Alert severity="error">No se encontraron los detalles del artículo.</Alert>
                </Box>
            </Container>
        );
    }

    return (
        <Container sx={{
            marginBottom: { xs: 10, md: 5 },
        }}>
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
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                        fontSize: { xs: "2rem", md: "3.5rem" },
                        fontWeight: "bold",
                    }}
                >
                    {articulo.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: "1.2rem", opacity: 0.9 }}>
                    Detalles del artículo y temas principales
                </Typography>
            </Box>

            {/* Detalles principales */}
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={8}>
                    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h5" color="primary" gutterBottom>
                                {articulo.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "#6B7280", lineHeight: 1.6, mb: 2 }}
                            >
                                {selectedLanguage === "es"
                                    ? articulo.description_es || "No hay descripción disponible."
                                    : articulo.description_en || "Description not available."}
                            </Typography>
                            <Box mb={2}>
                                <Typography variant="body1">
                                    <FaBook className="icon" />
                                    <strong> Autor:</strong> {articulo.creator || "No especificado"}
                                </Typography>
                                <Typography variant="body1">
                                    <FaCalendarAlt className="icon" />
                                    <strong> Fecha de Publicación:</strong>{" "}
                                    {articulo.date_published || "No disponible"}
                                </Typography>
                                <Typography variant="body1">
                                    <FaGlobe className="icon" />
                                    <strong> Idioma:</strong>{" "}
                                    {articulo.language === "spa" ? "Español" : "Inglés"}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Temas:</strong>
                                </Typography>
                                {articulo.subject_es
                                    .split(";")
                                    .map((topic) => (
                                        <Chip
                                            key={topic}
                                            label={topic.trim()}
                                            sx={{
                                                margin: 0.5,
                                                backgroundColor: "#1976d2",
                                                color: "#fff",
                                            }}
                                        />
                                    ))}
                            </Box>
                            {articulo.identifier && (
                                <Button
                                    variant="contained"
                                    color="success"
                                    href={articulo.identifier}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ mt: 2, textTransform: "none", fontWeight: "bold" }}
                                >
                                    Ver artículo oficial <FaExternalLinkAlt style={{ marginLeft: 8 }} />
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Información adicional */}
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        marginBottom: { xs: 0, md: 10 }, // Añadido margen inferior
                    }}
                >
                    <Card
                        sx={{
                            padding: 3,
                            boxShadow: 3,
                            borderRadius: 2,
                            display: "flex",
                            flexDirection: "column",
                            background: "linear-gradient(135deg, #ffffff, #f8f9fc)",
                        }}
                    >
                        <Typography variant="h6" color="primary" gutterBottom>
                            Información Adicional
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "#6B7280", lineHeight: 1.6, mb: 2 }}
                        >
                            <strong>Formato:</strong> {articulo.format || "No especificado"}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "#6B7280", lineHeight: 1.6, mb: 2 }}
                        >
                            <strong>Tipo de Recurso:</strong>{" "}
                            {articulo.resource_type || "No especificado"}
                        </Typography>
                        {articulo.relation && (
                            <Button
                                variant="contained"
                                color="primary"
                                href={articulo.relation}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ mt: 2, textTransform: "none", fontWeight: "bold" }}
                            >
                                Documentos Relacionados
                            </Button>
                        )}
                    </Card>
                    <Card
                        sx={{
                            padding: 3,
                            boxShadow: 3,
                            borderRadius: 2,
                            display: "flex",
                            flexDirection: "column",
                            background: "linear-gradient(135deg, #ffffff, #f8f9fc)",
                            marginTop: 5.5
                        }}
                    >

                        <Typography
                            variant="h6"
                            color="primary"
                            gutterBottom
                            sx={{ mt: 0 }}
                        >
                            Cómo Citar este Artículo
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                background: "#f5f5f5",
                                padding: 2,
                                borderRadius: 2,
                                fontFamily: "monospace",
                                color: "#344767",
                                wordWrap: "break-word",
                            }}
                        >
                            {`"${articulo.title}", ${articulo.creator || "Autor desconocido"}, ${articulo.publisher || "Publicación desconocida"
                                }, ${articulo.date_published || "Fecha no disponible"}.`}
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ArticuloPage;
