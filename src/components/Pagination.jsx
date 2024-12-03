import React, { useEffect } from "react";
import "./styles/Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  // Use useEffect para desplazarse al inicio cada vez que cambie la página actual
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="pagination-container">
      <button
        className="btn btn-secondary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </button>
      <span className="pagination-info">
        Página {currentPage} de {totalPages}
      </span>
      <button
        className="btn btn-secondary"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;
