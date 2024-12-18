import React, { useState } from "react";
import "./styles/SearchComponent.css"; // Importa el archivo CSS


function SearchComponent({ onSearch }) {
  const [query, setQuery] = useState("");

  const normalizeString = (str) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remueve acentos
      .toLowerCase();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (onSearch) {
      onSearch(normalizeString(value));
    }
  };

  return (
    <div className="search-component">
      <input
        type="text"
        placeholder="Buscar por autor, nombre de revista..."
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
    </div>
  );
}

export default SearchComponent;
