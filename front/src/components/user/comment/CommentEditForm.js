import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../../api";

function CommentEditForm({ currentComment, setComments, setIsEditing, portfolioOwnerId }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentComment.title);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(currentComment.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();


    // "awards/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`comment/fix/${currentComment.id}`, {
      description
    });

    // GET 요청
    Api.get("comment/readComment", portfolioOwnerId).then((res) => setComments(res.data));
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
}

export default CommentEditForm;
