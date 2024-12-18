import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.png";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: "Inicio", path: "/" },
    { text: "Revistas", path: "/revistas" },
    { text: "Artículos", path: "/articulos" },
    { text: "Contacto", path: "/contacto" },
  ];

  const drawer = (
    <Box
  onClick={handleDrawerToggle}
  sx={{
    textAlign: "center",
    p: 3,
    background: "linear-gradient(135deg, #121212, #1f1f1f)", // Fondo oscuro degradado
    height: "100%",
    color: "#ffffff", // Texto blanco para buen contraste
  }}
>
  {/* Logo */}
  <Box
    component="img"
    src={logo}
    alt="Logo"
    sx={{
      width: "120px",
      mb: 2,
      transition: "all 0.3s",
      "&:hover": {
        transform: "scale(1.1)", // Pequeño zoom al pasar el cursor
        filter: "drop-shadow(0px 4px 6px rgba(255, 255, 255, 0.2))",
      },
    }}
  />

  <Divider sx={{ mb: 2, borderColor: "rgba(255, 255, 255, 0.3)" }} />

  {/* Menú Items */}
  <List>
    {navItems.map((item) => (
      <ListItem
        key={item.text}
        component={Link}
        to={item.path}
        sx={{
          textDecoration: "none",
          color: "#e0e0e0", // Color gris claro para los textos
          textAlign: "center",
          py: 1,
          borderRadius: "8px",
          transition: "all 0.3s",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Sutil fondo al hover
            color: "#90caf9", // Azul claro al interactuar
            transform: "translateX(5px)", // Movimiento sutil hacia la derecha
          },
        }}
      >
        <ListItemText
          primaryTypographyProps={{
            sx: { fontWeight: "bold", letterSpacing: "0.5px" },
          }}
          primary={item.text}
        />
      </ListItem>
    ))}
  </List>
</Box>

  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: '#1E3A8A' }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                borderRadius: 2,
                transition: "all 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  background: "rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                },
              }}
            >
              {/* Logo */}
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                  width: { xs: "60px", md: "80px" }, // Tamaño responsivo
                  height: "auto",
                  mr: 2,
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "rotate(5deg)", // Pequeña animación
                  },
                }}
              />

              {/* Texto */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#FFFFFF", // Contraste con tu navbar
                  letterSpacing: "0.5px",
                  whiteSpace: "nowrap", // Evita saltos de línea
                  fontSize: { xs: "1rem", md: "1.5rem" }, // Ajuste responsivo
                }}
              >
                Portal de Revistas
              </Typography>
            </Box>
          </Link>


          {/* Menú Escritorio */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  color: "inherit",
                  fontWeight: "bold",
                  textTransform: "none",
                  '&:hover': { color: '#10B981' },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Botón Menú Móvil */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton color="inherit"
              onClick={handleDrawerToggle}
              sx={{ color: "#2575fc" }}
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer Móvil */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: "240px",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Navbar;
