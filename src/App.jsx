import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import RevistasPage from "./pages/RevistasPage";
import RevistaPage from "./pages/RevistaPage";
import ArticulosPage from "./pages/ArticulosPage";
import ArticuloPage from "./pages/ArticuloPage";
import AllArticlesPage from "./pages/AllArticlesPage";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/revistas" element={<RevistasPage />} />
          <Route path="/revista/:id" element={<RevistaPage />} />
          <Route path="/revista/:id/articulos" element={<ArticulosPage />} />
          <Route path="/articulo/:id" element={<ArticuloPage />} />
          <Route path="/articulos" element={<AllArticlesPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
