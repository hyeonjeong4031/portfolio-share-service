import React from "react";
import { backendPortNumber } from "../../api";

function ProjectImage({ project }) {
  return (
    <img
      src={
        "http://" +
        window.location.hostname +
        ":" +
        backendPortNumber +
        "/project/" +
        project.id +
        "/image"
      }
      width="80%"
    />
  );
}
export default ProjectImage;
