import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import CategoryFilter from "./CategoryFilter";
import { FiFilter } from "react-icons/fi";
import { Button } from "react-bootstrap";// Asegúrate de que Button esté importado
import "./styles/ArticulosFilter.css";

function ArticulosFilter({
  onSearch,
  categories,
  selectedCategory,
  onCategoryFilter
}) {
  const [filtersVisible, setFiltersVisible] = useState(false);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleCategoryChange = (event) => {
    onCategoryFilter(event.target.value);
  };

  return (
    <div className="articulos-filter-container">
      {/* Botón flotante */}
      <Button
        variant="primary"
        className="toggle-filters-button sticky-button"
        onClick={toggleFilters}
      >
        <FiFilter className="filter-icon" />
      </Button>
      {filtersVisible && (
        <div className="articulos-filter">
          {/* Búsqueda */}
          <SearchComponent onSearch={onSearch} />

          {/* Categorías */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      )}
    </div>
  );
}

export default ArticulosFilter;
