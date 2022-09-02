import React from "react";

function ProjectImage({ project }) {
  return (
    <img
      src={
        "http://kdt-ai5-team07.elicecoding.com:5001/project/" +
        project.id +
        "/image"
      }
      min-width="350px"
      max-width="100%"
    />
  );
}
export default ProjectImage;
