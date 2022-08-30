import React, { useState } from "react";
import { Alert, Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const EducationEditForm = ({
  currentEducation,
  setEducations,
  setIsEditing,
}) => {
  const [formData, setFormData] = useState({
    id: currentEducation.id,
    school: currentEducation.school,
    major: currentEducation.major,
    position: currentEducation.position,
  });

  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.school) {
      setErrMsg("학교 이름을 입력해 주세요.");
      return;
    }
    if (!formData.major) {
      setErrMsg("전공을 입력해 주세요.");
      return;
    }
    setErrMsg("");
    try {
      await Api.put("education/:id", formData);

      const res = await Api.get(
        "education/educationlist",
        currentEducation.userId
      );
      setEducations(res.data);
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

export default EducationEditForm;
