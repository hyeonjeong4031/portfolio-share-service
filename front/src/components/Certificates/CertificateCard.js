import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

const CertificateCard = ({
  certificate,
  setCertificates,
  isEditable,
  setIsEditing,
}) => {
  const certificateDelete = async () => {
    try {
      await Api.delete(`certificate/delete/${certificate.id}`);

      const res = await Api.get("certificate/certificatelist");
      setCertificates(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col className="text-start">
          {certificate.title}
          <br />
          <span className="text-muted">{certificate.description}</span>
          <br />
          <span className="text-muted">
            {certificate.when_date.substring(0, 10)}
          </span>
        </Col>
        {isEditable && (
          <Col>
            <Row>
              <Col md="8"></Col>
              <Col md="2">
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="mr-3"
                >
                  편집
                </Button>
              </Col>

              <Col md="2">
                <Button
                  onClick={() => certificateDelete()}
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

export default CertificateCard;
