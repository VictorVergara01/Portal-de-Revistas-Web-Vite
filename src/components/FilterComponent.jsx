import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FilterComponent({ onApplyFilters }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleDateRangeChange = (update) => {
    setDateRange(update);
    const filters = {
      startDate: update[0],
      endDate: update[1],
    };
    onApplyFilters(filters);
  };

  return (
    <div className="filter-container">
      <h5 className="filter-header">Filtrar por Fecha</h5>
      <DatePicker
        selected={startDate}
        onChange={handleDateRangeChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        isClearable
        placeholderText="Seleccionar rango de fechas"
        className="form-control"
      />
    </div>
  );
}

export default FilterComponent;
