import React from "react";
import { backendPortNumber } from "../../api";

function ProjectImage({ project }) {
  return (
    <img
      src={
        window.location.href +
        backendPortNumber +
        "project/" +
        project.id +
        "/image"
      }
      min-width="350px"
      max-width="100%"
    />
  );
}
export default ProjectImage;
