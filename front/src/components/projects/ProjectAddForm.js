import React, { useState, useEffect } from "react";
import { Alert, Form, Col, Row, Button } from "react-bootstrap";
import * as Api from "../../api";

const FormData = require("form-data");

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10),
  });

  const [errMsg, setErrMsg] = useState("");
  const [imageFile, setImageFile] = useState();

  // 파일 사이즈 제한(2MB) 검증
  const validateFile = (e) => {
    const newImageFile = e.target.files[0];
    if (newImageFile && newImageFile.size > 1000 * 20000) {
      setErrMsg("파일 크기는 20MB를 넘을 수 없습니다.");
      e.target.value = "";
    } else {
      setErrMsg("");
      setImageFile(newImageFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      setErrMsg("프로젝트 제목을 입력해 주세요.");
      return;
    }
    if (!formData.description) {
      setErrMsg("프로젝트 상세 내역을 입력해 주세요.");
      return;
    }
    if (formData.startDate > formData.endDate) {
      setErrMsg("시작 날짜는 종료 날짜 이전이어야 합니다.");
      return;
    }

    try {
      // 프로젝트 정보 등록
      const newProject = await Api.post("project", {
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
      });

      // image 추가 등록
      if (imageFile) {
        const imageData = new FormData();
        imageData.append("image", imageFile);

        const response = await Api.fileUpload(
          `project/${newProject.data.id}/image`,
          imageData
        );
        console.log(response);
      }

      // 프로젝트 리스트 불러오기
      const res = await Api.get("project", portfolioOwnerId);
      setProjects(res.data);
      setIsAdding(false);
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
          as="textarea"
          name="description"
          value={formData.description}
          placeholder="상세 내역"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mt-3" controlId="projectAddImage">
        <Form.Control
          type="file"
          name="image"
          onChange={validateFile}
          accept="image/png, image/jpg"
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
