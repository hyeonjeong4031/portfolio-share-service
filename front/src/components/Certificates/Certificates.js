import React, { useEffect, useState, useReducer, useContext } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";

const Certificates = ({ portfolioOwnerId, isEditable }) => {
  const [certificates, setCertificates] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const { user } = useContext(UserStateContext);

  useEffect(() => {
    const isMe = user?.id === portfolioOwnerId;
    Api.get(
      `certificate/certificatelist${isMe ? "" : "/" + portfolioOwnerId}`
    ).then((res) => setCertificates(res.data));
  }, [portfolioOwnerId, user]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        {certificates.map((certificate) => (
          <Certificate
            key={certificate.id}
            certificate={certificate}
            setCertificates={setCertificates}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <CertificateAddForm
            portfolioOwnerId={portfolioOwnerId}
            setCertificates={setCertificates}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default Certificates;
