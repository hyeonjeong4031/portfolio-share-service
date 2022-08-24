import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";

function Project({ key, project, isEditable, setProjects }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <ProjectEditForm currentProject={project} setIsEditing={setIsEditing} />
    );
  }
  if (!isEditing) {
    return (
      <ProjectCard
        project={project}
        isEditable={isEditable}
        setIsEditing={setIsEditing}
      />
    );
  }
}

export default Project;
