import React, { useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";

function Projects({ portfolioOwnerId }) {
  const [Editing, isEditing] = useState(false);
  const [Adding, isAdding] = useState(false);

  return (
    <Card>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        <Col>
          <ProjectAddForm></ProjectAddForm>
          <Button varient="primary" onClick="">
            +
          </Button>
        </Col>
      </Card.Body>
    </Card>
  );
}

export default Projects;
