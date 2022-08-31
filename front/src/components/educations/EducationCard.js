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
        <Col className="text-start">
          <span>{education.school}</span>
          <br />
          <span className="text-muted">{`${education.major} (${
            education.position || ""
          })`}</span>
        </Col>

        {isEditable && (
          <Col>
            <Row>
              <Col sm="8"></Col>
              <Col sm="2">
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="mr-3"
                >
                  편집
                </Button>
              </Col>

              <Col sm="2">
                <Button
                  onClick={() => educationtDelete()}
                  variant="outline-danger"
                  size="sm"
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
};

export default EducationCard;
