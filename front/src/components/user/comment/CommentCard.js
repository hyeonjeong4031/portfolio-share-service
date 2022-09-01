import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../../api";

function CommentCard({ comment, setComments, isEditable, setIsEditing, portfolioOwnerId }) {
  
  
  // 코멘트 삭제
  const commentDelete = async () => {
    try {
      await Api.delete(`comment/delete/${comment.id}`);
      
      
      Api.get("comment/readComment", portfolioOwnerId).then((res) => setComments(res.data));
        } catch (err) {
        console.log(err);
      }
  };
  
  
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span className="text-muted">{comment.description}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              편집
            </Button>
          </Col>
        )}
        {isEditable && (
          <Col xs lg="1">
          <Button
            onClick={() => commentDelete()}
            variant="outline-danger"
            size="sm"
            className="ml-3"
          >
            삭제
          </Button>
        </Col>

        )}
      </Row>
    </Card.Text>
  );
}

export default CommentCard;
