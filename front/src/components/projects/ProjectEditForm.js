import React, { useState } from "react";
import { Alert, Form, Col, Row, Button } from "react-bootstrap";
import * as Api from "../../api";

function ProjectEditForm({ currentProject, setProjects, setIsEditing }) {
  const [formData, setFormData] = useState({
    projectId: currentProject.id,
    title: currentProject.title,
    description: currentProject.description,
    startDate: currentProject.startDate.substring(0, 10),
    endDate: currentProject.endDate.substring(0, 10),
  });
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.title) {
      setErrMsg("프로젝트 제목을 입력해 주세요.");
    } else if (!formData.description) {
      setErrMsg("프로젝트 상세 내역을 입력해 주세요.");
    } else if (formData.startDate > formData.endDate) {
      setErrMsg("시작 날짜는 종료 날짜 이전이어야 합니다.");
    } else {
      setErrMsg("");
      try {
        console.log(formData);
        await Api.put("project", formData);

        const res = await Api.get("project", currentProject.userId);
        setProjects(res.data);
        setIsEditing(false);
      } catch (err) {
        console.log(err);
      }
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
      <Form.Group className="mt-3" controlId="projectAddDescription">
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
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
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectEditForm;
