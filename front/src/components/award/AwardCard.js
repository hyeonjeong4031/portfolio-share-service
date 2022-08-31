import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function AwardCard({ award, setAwards, isEditable, setIsEditing }) {
  const awardDelete = async () => {
    try {
      await Api.delete(`award/delete/${award.id}`);

      const res = await Api.get("award/readAll");
      console.log(res.data)
      setAwards(res.data);
      } catch (err) {
        console.log(err);
      }
  };
  
  
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{award.title}</span>
          <br />
          <span className="text-muted">{award.description}</span>
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
        {isEditable && (
          <Col xs lg="1">
          <Button
            onClick={() => awardDelete()}
            variant="outline-danger"
            size="sm"
            className="ml-3"
          >
            삭제
          </Button>
        </Col>

        )}
      </Row>
    </Card.Text>
  );
}

export default AwardCard;
