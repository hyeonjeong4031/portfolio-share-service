import React from "react";

function ProjectImage({ project }) {
  return (
    <img
      src={"http://localhost:5001/project/" + project.id + "/image"}
      min-width="350px"
      max-width="100%"
    />
  );
}
export default ProjectImage;
