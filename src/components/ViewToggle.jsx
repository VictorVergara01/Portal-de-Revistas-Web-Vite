import React from "react";
import { Form } from "react-bootstrap";
import "./styles/ViewToggle.css";

function ViewToggle({ viewMode, onViewChange }) {
  return (
    <div className="view-container">
      <h5 className="view-header">Modo de Vista</h5>
      <Form.Check
        type="radio"
        label="Tarjetas"
        name="viewMode"
        id="view-cards"
        checked={viewMode === "cards"}
        onChange={() => onViewChange("cards")}
        className="view-option"
      />
      <Form.Check
        type="radio"
        label="Lista"
        name="viewMode"
        id="view-list"
        checked={viewMode === "list"}
        onChange={() => onViewChange("list")}
        className="view-option"
      />
    </div>
  );
}

export default ViewToggle;
