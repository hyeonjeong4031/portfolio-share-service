import React, { useState } from "react";
import { Alert, Form, Col, Row, Button } from "react-bootstrap";

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  const [formData, setFormData] = useState({
    title: "",
    subscription: "",
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10),
  });

  const [errMsg, setErrMsg] = useState("");

  // const [title, setTitle] = useState("");
  // const [subscription, setSubscription] = useState("");
  // const [startDate, setStartDate] = useState(
  //   new Date().toISOString().substring(0, 10)
  // );
  // const [endDate, setEndDate] = useState(
  //   new Date().toISOString().substring(0, 10)
  // );

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.title) {
      setErrMsg("프로젝트 제목을 입력해 주세요.");
    } else if (!formData.subscription) {
      setErrMsg("프로젝트 상세 내역을 입력해 주세요.");
    } else if (formData.startDate > formData.endDate) {
      setErrMsg("시작 날짜는 종료 날짜 이전이어야 합니다.");
    } else {
      setErrMsg("");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mt-3" controlId="projectAddTitle">
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          placeholder="프로젝트 제목"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mt-3" controlId="projectAddSubscription">
        <Form.Control
          type="text"
          name="subscription"
          value={formData.subscription}
          placeholder="상세 내역"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mt-3" as={Row} controlId="projectAddDate">
        <Col className="col-auto">
          <Form.Control
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </Col>
        <Col className="col-auto">
          <Form.Control
            type="date"
            name="endDate"
            value={formData.endDate}
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
}

export default ProjectAddForm;
