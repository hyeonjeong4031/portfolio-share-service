import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const Educations = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>학력</Card.Title>
      </Card.Body>
      <Row>
        <Col className="text-center mb-3">
          <Button variant="primary" className="sm">
            +
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default Educations;
