import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import "./styles/ViewModeSwitcher.css";

function ViewModeSwitcher({ viewMode, items, onViewChange }) {
  return (
    <div>
      {viewMode === "cards" ? (
        <Row xs={1} md={2} lg={3} className="g-4 mt-4">
          {items.map((item) => (
            <Col key={item.id}>
              <Card className="view-card shadow-sm">
                <Card.Body>
                  <Card.Title className="card-title">{item.title}</Card.Title>
                  <Card.Text>
                    {item.description_es?.slice(0, 100) || "Sin descripción disponible."}
                  </Card.Text>
                  <Button
                    href={`/articulo/${item.id}`}
                    variant="primary"
                    className="mt-3"
                  >
                    Ver Detalles
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <ul className="list-group mt-4">
          {items.map((item) => (
            <li key={item.id} className="list-group-item">
              <h5>{item.title}</h5>
              <p>
                {item.description_es?.slice(0, 100) || "Sin descripción disponible."}
              </p>
              <Button
                href={`/articulo/${item.id}`}
                variant="primary"
                className="mt-3"
              >
                Ver Detalles
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewModeSwitcher;
