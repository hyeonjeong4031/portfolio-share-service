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

  const setWirterName = (name) => {
    return name.length > 15 ? name.substring(0, 15) + ".." : name;
  };

  if (isLoading) return "Loading...";

  return (
    <Card.Text>
      <Col>
        <strong>{setWirterName(writer.name)}</strong>
        <Col className="text-muted">{comment.description}</Col>

        {isEditable && (
          <Col className="text-end">
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
            <span
              style={{
                fontSize: "14px",
                color: "#dc3545",
                cursor: "pointer",
              }}
            >
              <a onClick={() => commentDelete()}>삭제</a>
            </span>
          </Col>
        )}
      </Col>
    </Card.Text>
  );
}

export default CommentCard;
