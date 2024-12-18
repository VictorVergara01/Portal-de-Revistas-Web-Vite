import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateRangeFilter({ onDateRangeChange }) {
  const [dateRange, setDateRange] = React.useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleDateChange = (update) => {
    setDateRange(update); // Actualizar el estado local
    onDateRangeChange(update); // Notificar al componente padre
  };

  return (
    <div className="date-range-filter">
      <h5>Filtrar por Fecha</h5>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
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

export default DateRangeFilter;
