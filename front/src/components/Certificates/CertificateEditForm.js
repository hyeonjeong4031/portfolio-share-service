import React, { useState } from "react";
import { Alert, Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const CertificateEditForm = ({
  currentCertificate,
  setCertificates,
  setIsEditing,
}) => {
  const [formData, setFormData] = useState({
    id: currentCertificate.id,
    title: currentCertificate.title,
    description: currentCertificate.description,
    whenDate: currentCertificate.when_date.substring(0, 10),
  });

  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      setErrMsg("자격증 이름을 입력해 주세요.");
      return;
    }
    if (!formData.description) {
      setErrMsg("자격증 상세 내역을 입력해 주세요.");
      return;
    }
    setErrMsg("");
    try {
      await Api.put("certificate/edit", {
        id: formData.id,
        title: formData.title,
        description: formData.description,
        when_date: formData.whenDate,
      });

      const res = await Api.get("certificate/certificatelist");
      setCertificates(res.data);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="certificateAddTitle">
        <Form.Control
          type="text"
          name="title"
          placeholder="자격증 제목"
          value={formData.title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="certificateAddDescription" className="mt-3">
        <Form.Control
          type="text"
          name="description"
          placeholder="상세내역"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        <Col className="col-auto">
          <Form.Control
            type="date"
            name="whenDate"
            value={formData.whenDate}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Col>
        {errMsg && (
          <Alert variant="info" className="pt-2 pb-2 mt-3 mb-4">
            {errMsg}
          </Alert>
        )}
      </Col>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default CertificateEditForm;
