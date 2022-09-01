// award의 "편집" 관련. AwardEditForm, AwardCard 이용.

import React, { useState } from "react";
import CommentCard from "./CommentCard";
import CommentEditForm from "./CommentEditForm";

function Comment({ key, comment, setComments, isEditable }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <CommentEditForm
          currentComment={comment}
          setComments={setComments}
          setIsEditing={setIsEditing}
        />
      ) : (
        <CommentCard
          comment={comment}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setComments={setComments}
        />
      )}
    </>
  );
}

export default Comment;
