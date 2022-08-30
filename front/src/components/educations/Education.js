import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

const Education = ({ education, setEducations, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <EducationEditForm
          currentEducation={education}
          setEducations={setEducations}
          setIsEditing={setIsEditing}
        />
      ) : (
        <EducationCard
          education={education}
          isEditable={isEditable}
          setEducations={setEducations}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
};

export default Education;
