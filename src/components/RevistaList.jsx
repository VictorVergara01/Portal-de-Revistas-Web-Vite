import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./styles/RevistaList.css";

const RevistaList = ({ revistas = [] }) => {
  if (!revistas || revistas.length === 0) {
    return <p>No hay revistas disponibles.</p>;
  }

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {revistas.map((revista) => (
        <Col key={revista.id}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>{revista.name}</Card.Title>
              <Card.Text>{revista.url}</Card.Text>
              <Button as={Link} to={`/revista/${revista.id}`} variant="primary">
                Ver Artículos
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default RevistaList;
