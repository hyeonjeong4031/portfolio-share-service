import React from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import * as Api from "../../api";

function Project({ project, setProjects, isEditable, setIsEditing }) {
  const ProjectDelete = async () => {
    try {
      await Api.delete("project", project.id);

      const res = await Api.get("project", project.userId);
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col xs={9} className="text-start">
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.description}</span>
          <br />
          <span className="text-muted">
            {project.startDate.substring(0, 10)} ~{" "}
            {project.endDate.substring(0, 10)}
          </span>
        </Col>
        {isEditable && (
          <Col>
            <Row>
              <Col>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="mr-3"
                >
                  편집
                </Button>
              </Col>
              <Col>
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
    </Card.Text>
  );
}

export default Project;
