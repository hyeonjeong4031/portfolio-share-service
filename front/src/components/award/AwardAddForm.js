import React, { useState } from "react";
import { Alert, Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardAddForm({ portfolioOwnerId, setAwards, setIsAdding }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState("");
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId;

    if (!title) {
      setErrMsg("수상 내역을 입력해 주세요.");
      return;
    }
    if (!description) {
      setErrMsg("상세 내역을 입력해 주세요.");
      return;
    }
    setErrMsg("");
    try {
      // "award/add" 엔드포인트로 post요청함.
      await Api.post("award/add", {
        title,
        description,
      });

      // "award/readAll" 엔드포인트로 get요청함.
      console.log("Add쪽");

      const res = await Api.get("award/readAll");
      // awards를 response의 data로 세팅함.
      setAwards(res.data);
      // award를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
      setIsAdding(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="수상내역"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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

export default AwardAddForm;
