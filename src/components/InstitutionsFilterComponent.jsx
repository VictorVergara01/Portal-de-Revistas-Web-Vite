import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./styles/InstitutionFilterComponent.css";

function InstitutionFilterComponent({
  institutions = [],
  selectedInstitutions = [],
  onApplyInstitutionFilter,
}) {
  const [selected, setSelected] = useState([...selectedInstitutions]);

  // Sincronizar las selecciones con el estado del padre solo si hay cambios
  useEffect(() => {
    if (JSON.stringify(selected) !== JSON.stringify(selectedInstitutions)) {
      setSelected([...selectedInstitutions]);
    }
  }, [selectedInstitutions]);

  // Manejar la selección/deselección de una institución
  const handleToggleSelection = (institution) => {
    const updatedSelection = selected.includes(institution)
      ? selected.filter((inst) => inst !== institution) // Eliminar si ya está seleccionada
      : [...selected, institution]; // Agregar si no está seleccionada

    setSelected(updatedSelection); // Actualizar el estado local
    onApplyInstitutionFilter(updatedSelection); // Notificar al componente padre
  };

  return (
    <div className="institution-filter">
      <h5 className="filter-header">Filtrar por Instituciones</h5>
      <Form>
        {institutions.length === 0 ? (
          <p>No hay instituciones disponibles.</p>
        ) : (
          institutions.map((institution, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              id={`institution-${index}`}
              label={institution}
              value={institution}
              checked={selected.includes(institution)} // Mostrar como seleccionado si está en el estado
              onChange={() => handleToggleSelection(institution)} // Alternar selección
            />
          ))
        )}
      </Form>
    </div>
  );
}

export default InstitutionFilterComponent;
