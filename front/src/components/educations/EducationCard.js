import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

const EducationCard = ({
  education,
  setEducations,
  isEditable,
  setIsEditing,
}) => {
  const educationtDelete = async () => {
    try {
      await Api.delete(`education/delete/${education.id}`);

      const res = await Api.get("education/educationlist");
      setEducations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

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
          <Button
            onClick={() => educationtDelete()}
            variant="outline-danger"
            size="sm"
            className="mr-3"
          >
            삭제
          </Button>
        </Col>
      </Row>
    </Card.Text>
  );
};

export default EducationCard;
