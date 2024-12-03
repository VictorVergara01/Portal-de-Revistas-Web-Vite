import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./styles/FilterComponent.css";

function FilterComponent({ onApplyFilters }) {
  const [filters, setFilters] = useState({ startDate: "", endDate: "", publisher: "" });
  const [instituciones, setInstituciones] = useState([]);

  useEffect(() => {
    const fetchInstituciones = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/instituciones/");
        setInstituciones(response.data);
      } catch (error) {
        console.error("Error fetching institutions:", error);
      }
    };

    fetchInstituciones();
  }, []);

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(filters);
  };

  const handleClearFilters = () => {
    setFilters({ startDate: "", endDate: "", publisher: "" });
    onApplyFilters({ startDate: "", endDate: "", publisher: "" });
  };

  return (
    <div className="filter-container">
      <h5 className="filter-header">Filtros</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="filter-group">
          <Form.Label>Fecha de Inicio</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="filter-group">
          <Form.Label>Fecha de Fin</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="filter-group">
          <Form.Label>Institución</Form.Label>
          <Form.Control
            as="select"
            name="publisher"
            value={filters.publisher}
            onChange={handleInputChange}
          >
            <option value="">Todas</option>
            {instituciones.map((inst) => (
              <option key={inst} value={inst}>
                {inst}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <div className="filter-actions">
          <Button type="submit" className="apply-btn">
            Aplicar Filtros
          </Button>
          <Button type="button" onClick={handleClearFilters} className="clear-btn">
            Limpiar Filtros
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default FilterComponent;
