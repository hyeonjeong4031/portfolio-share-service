import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function CommentCard({ comment, setComments, isEditable, setIsEditing }) {
  const [writer, setWriter] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const res = await Api.get("users", comment.writer_id);
    console.log(res.data);
    setWriter(res.data);
    setIsLoading(false);
  }, []);

  // 코멘트 삭제
  const commentDelete = async () => {
    try {
      await Api.delete(`comment/delete/${comment.id}`);

      const res = await Api.get("comment/readComment", comment.commentedID);
      console.log(res);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return "Loading...";

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col md="7">
          <span style={{ display: "inline-block", width: "60px" }}>
            <strong>{writer.name}</strong>
          </span>
          <span className="text-muted">{comment.description}</span>
        </Col>
        <Col className="text-end">
          {isEditable && (
            <span
              style={{
                fontSize: "14px",
                color: "#0dcaf0",
                cursor: "pointer",
              }}
            >
              <a
                onClick={() => {
                  setIsEditing((prev) => !prev);
                }}
              >
                편집
              </a>
              {"  "}
            </span>
          )}
          {isEditable && (
            <span
              style={{
                fontSize: "14px",
                color: "#dc3545",
                cursor: "pointer",
              }}
            >
              <a onClick={() => commentDelete()}>삭제</a>
            </span>
          )}
        </Col>
      </Row>
    </Card.Text>
  );
}

export default CommentCard;
