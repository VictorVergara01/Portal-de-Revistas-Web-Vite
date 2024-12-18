import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import SearchComponent from "./SearchComponent";
import InstitutionFilterComponent from "./InstitutionsFilterComponent";
import { FiFilter } from "react-icons/fi";
import axios from "axios";
import "./styles/RevistaFilter.css";

function RevistasFilter({
  onSearch,
  onApplyInstitutionFilter,
  viewMode,
  onViewChange,
}) {
  const [filtersVisible, setFiltersVisible] = useState(false); // Control de visibilidad de filtros
  const [institutions, setInstitutions] = useState([]); // Lista de instituciones
  const [selectedInstitutions, setSelectedInstitutions] = useState([]); // Instituciones seleccionadas

  // Fetch de instituciones
  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/revistas/`);
        const uniqueInstitutions = Array.from(
          new Set(response.data.map((revista) => revista.publisher).filter(Boolean))
        );
        setInstitutions(uniqueInstitutions); // Almacenar instituciones únicas
      } catch (error) {
        console.error("Error al cargar las instituciones:", error);
      }
    };

    fetchInstitutions();
  }, []);

  // Manejo de filtro de instituciones
  const handleInstitutionFilterUpdate = (updatedSelection) => {
    setSelectedInstitutions(updatedSelection); // Actualizar el estado local
    onApplyInstitutionFilter(updatedSelection); // Notificar al componente padre
  };

  // Alternar visibilidad de los filtros
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  return (
    <div className="revistas-filter-container">
      {/* Botón para abrir/cerrar filtros */}
      <Button
        variant="primary"
        className="toggle-filters-button sticky-button"
        onClick={toggleFilters}
      >
        <FiFilter className="filter-icon" />
      </Button>

      {/* Filtros */}
      {filtersVisible && (
        <div className="revistas-filter">
          <SearchComponent onSearch={onSearch} />
          <InstitutionFilterComponent
            institutions={institutions} // Pasar instituciones disponibles
            selectedInstitutions={selectedInstitutions} // Pasar las seleccionadas al hijo
            onApplyInstitutionFilter={handleInstitutionFilterUpdate} // Manejar cambios
          />
        </div>
      )}
    </div>
  );
}

export default RevistasFilter;
