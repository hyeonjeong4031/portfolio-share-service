import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import Education from "./Education";
import EducationAddForm from "./EducationAddForm";

const Educations = ({ portfolioOwnerId, isEditable }) => {
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    if (!portfolioOwnerId) {
      return;
    }
    Api.get("education/educationlist").then((res) => {
      setEducations(res.data);
    });
  }, [portfolioOwnerId]);

  const [isAdding, setIsAdding] = useState(false);

  return (
    <Card>
      <Card.Body>
        <Card.Title>학력</Card.Title>
        <Col>
          {educations.map((education) => {
            return (
              <Education
                key={education.id}
                education={education}
                setEducations={setEducations}
                isEditable={isEditable}
              />
            );
          })}
        </Col>
        {isEditable && (
          <Row className="mt-3 mb-4 text-center">
            <Col>
              <Button varient="primary" onClick={() => setIsAdding(true)}>
                +
              </Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <EducationAddForm
            portfolioOwnerId={portfolioOwnerId}
            setEducations={setEducations}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default Educations;
