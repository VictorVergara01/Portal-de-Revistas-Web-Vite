import React from "react";
import { Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="filter-section">
      <Typography variant="subtitle1">Filtrar por Categoría:</Typography>
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Categorías</InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategory}
          onChange={onCategoryChange}
          label="Categorías"
        >
          <MenuItem value="">Todas las Categorías</MenuItem>
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default CategoryFilter;
