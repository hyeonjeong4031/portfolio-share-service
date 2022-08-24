import React, { useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";

function Projects({ portfolioOwnerId, isEditable }) {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "프로젝트1",
      description: "설명1",
      startDate: "2022-08-22",
      endDate: "2021-08-23",
    },
    {
      id: 2,
      title: "프로젝트2",
      description: "설명2",
      startDate: "2022-08-22",
      endDate: "2021-08-23",
    },
  ]);
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
