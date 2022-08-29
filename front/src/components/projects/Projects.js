import React, { useState, useEffect } from "react";
import { Card, Col, Button } from "react-bootstrap";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";
import * as Api from "../../api";

function Projects({ portfolioOwnerId, isEditable }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    Api.get("project", portfolioOwnerId).then((res) => setProjects(res.data));
  }, [portfolioOwnerId]);

  const [isAdding, setIsAdding] = useState(false);

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-start">프로젝트</Card.Title>
        <Col>
          {projects.map((project) => {
            return (
              <Project
                key={project.id}
                project={project}
                setProjects={setProjects}
                isEditable={isEditable}
              ></Project>
            );
          })}
        </Col>
        {isEditable && (
          <Col className="mt-3 mb-4">
            <Button varient="primary" onClick={() => setIsAdding(true)}>
              +
            </Button>
          </Col>
        )}
        {isAdding && (
          <ProjectAddForm
            portfolioOwnerId={portfolioOwnerId}
            setProjects={setProjects}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Projects;
