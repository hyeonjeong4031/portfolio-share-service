import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../../api";

function CommentAddForm({ portfolioOwnerId, setComments}) {
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // POST 요청
    await Api.post(`comment/add/${portfolioOwnerId}`, { description });

    // GET 요청, 세팅
    const res= await Api.get(`comment/readComment/${portfolioOwnerId}`);
    setComments(res.data);
    };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="댓글 달기"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            게시
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CommentAddForm;