import React, { useState } from "react";
import { Collapse, Card, Col, Row, Button } from "react-bootstrap";
import * as Api from "../../api";
import ProjectImage from "./ProjectImage";

function Project({ project, setProjects, isEditable, setIsEditing }) {
  const [tapOpen, setTapOpen] = useState(false);

  const ProjectDelete = async () => {
    try {
      const res = await Api.delete("project", project.id);
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col className="text-start">
          <a
            onClick={() => setTapOpen(!tapOpen)}
            aria-controls="example-collapse-text"
            aria-expanded={tapOpen}
            style={{ cursor: "pointer" }}
          >
            <span>{project.title}</span>
          </a>
          <br />
          {/* <span className="text-muted">{project.description}</span>
          <br /> */}
          <span className="text-muted">
            {project.startDate.substring(0, 10)} ~{" "}
            {project.endDate.substring(0, 10)}
          </span>
          <br />
        </Col>
        {isEditable && (
          <Col>
            <Row>
              <Col md="8"></Col>
              <Col md="2">
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="mr-3"
                >
                  편집
                </Button>
              </Col>
              <Col md="2">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => ProjectDelete()}
                  className="ml-3"
                >
                  삭제
                </Button>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
      <Collapse in={tapOpen}>
        <div>
          {project.image && (
            <div className="mt-3 mb-3">
              <ProjectImage project={project} />
            </div>
          )}
          <span className="text-muted">{project.description}</span>
        </div>
      </Collapse>
    </Card.Text>
  );
}

export default Project;
