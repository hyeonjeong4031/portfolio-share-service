import React, { useState } from "react";
import { Alert, Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const EducationAddForm = ({ portfolioOwnerId, setEducations, setIsAdding }) => {
  const [formData, setFormData] = useState({
    school: "",
    major: "",
    position: "재학중",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    await Api.post("education/create", formData);

    const res = await Api.get("education/educationlist");
    setEducations(res.data);
    setIsAdding(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="educationAddSchool">
        <Form.Control
          type="text"
          name="school"
          placeholder="학교 이름"
          value={formData.school}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="educationAddMajor" className="mt-3">
        <Form.Control
          type="text"
          name="major"
          placeholder="전공"
          value={formData.major}
          onChange={handleChange}
        />
      </Form.Group>

      <div key={`inline-radio`} className="mb-3 mt-3">
        <Form.Check
          inline
          label="재학중"
          id="radio-add-1"
          type="radio"
          name="position"
          value="재학중"
          checked={formData.position === "재학중"}
          onChange={handleChange}
        />
        <Form.Check
          inline
          label="학사졸업"
          id="radio-add-2"
          type="radio"
          name="position"
          value="학사졸업"
          checked={formData.position === "학사졸업"}
          onChange={handleChange}
        />
        <Form.Check
          inline
          label="석사졸업"
          id="radio-add-3"
          type="radio"
          name="position"
          value="석사졸업"
          checked={formData.position === "석사졸업"}
          onChange={handleChange}
        />
        <Form.Check
          inline
          label="박사졸업"
          id="radio-add-4"
          type="radio"
          name="position"
          value="박사졸업"
          checked={formData.position === "박사졸업"}
          onChange={handleChange}
        />
      </div>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default EducationAddForm;
