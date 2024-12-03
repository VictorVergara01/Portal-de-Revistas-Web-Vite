import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./styles/SearchComponent.css";

function SearchComponent({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="search-container">
      <h5 className="search-header">Buscar Artículos</h5>
      <Form onSubmit={handleSearch} className="search-form">
        <Form.Control
          type="text"
          placeholder="Buscar por título, autor o tema..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
        <div className="search-actions">
          <Button type="submit" className="search-btn">
            Buscar
          </Button>
          <Button type="button" onClick={handleClearSearch} className="clear-btn">
            Limpiar
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default SearchComponent;
