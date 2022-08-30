import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

const EducationCard = ({ education, isEditable, setIsEditing }) => {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{education.school}</span>
          <br />
          <span className="text-muted">{`${education.major} (${
            education.position || ""
          })`}</span>
        </Col>

        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              편집
            </Button>
          </Col>
        )}

        <Col xs lg="1">
          <Button variant="outline-danger" size="sm" className="mr-3">
            삭제
          </Button>
        </Col>
      </Row>
    </Card.Text>
  );
};

export default EducationCard;
