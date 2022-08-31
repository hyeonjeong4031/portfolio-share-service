import React, { useState } from "react";
import { Modal, Button, Form, Card, Col, Row, Toast } from "react-bootstrap";
import * as Api from "../../api";

import { useNavigate } from "react-router-dom";

function UserEditForm({ user, setIsEditing, setUser }) {
  const navigate = useNavigate();
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);
  const [modalShow, setModalShow] = useState(false);
  const [withdrawal, setWithdrawal] = useState(false);
  // const navigate = useNavigate(); 힝(지원)

  function ConfirmModal() {
    return (
      <Modal show={modalShow} onHide={modalShow}>
        <Modal.Header closeButton>
          <Modal.Title>회원 탈퇴</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말로 탈퇴하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              setModalShow(false);
            }}
          >
            취소
          </Button>
          <Button variant="danger" onClick={handleWithdraw}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function CompleteModal() {
    return (
      <Modal show={withdrawal} onHide={withdrawal}>
        <Modal.Header>
          <Modal.Title>회원 탈퇴</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          탈퇴가 완료되었습니다. 3초후 로그인 화면으로 이동합니다.
        </Modal.Body>
      </Modal>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();

    const res = await Api.put(`withdrawal/${user.id}`, {
      withdrawal: true,
    });
    console.log(res);
    if (res.status == 200) {
      setModalShow(false);
      setWithdrawal(true);
      setTimeout(() => navigate("login", { replace: true }), 3000);
    }
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Card.Title className="mb-3">{email}</Card.Title>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button
                variant="secondary"
                className="me-3"
                onClick={() => setIsEditing(false)}
              >
                취소
              </Button>
              <Button variant="danger" onClick={() => setModalShow(true)}>
                탈퇴
              </Button>
              <ConfirmModal />
              <CompleteModal />
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
