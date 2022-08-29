import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";

class ProjectService {
  static async addProject({ title, description, startDate, endDate, user_id }) {
    const id = uuidv4();
    const newProject = {
      id,
      title,
      description,
      startDate,
      endDate,
      userId: user_id,
    };

    const createdNewProject = await Project.createProject({ newProject });
    createdNewProject.errorMessage = null;

    return createdNewProject;
  }

  static async getProjects({ user_id }) {
    const projects = await Project.getProjectsByUserId({ user_id });
    return projects;
  }

  static async setProject({ project_id, toUpdate, user_id }) {
    let project = await Project.getProjectByProjectId({ project_id });

    if (project.userId !== user_id) {
      throw new Error("No authorization to update this project");
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.updateProject({
        project_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.updateProject({
        project_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.startDate) {
      const fieldToUpdate = "startDate";
      const newValue = toUpdate.startDate;
      project = await Project.updateProject({
        project_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.endDate) {
      const fieldToUpdate = "endDate";
      const newValue = toUpdate.endDate;
      project = await Project.updateProject({
        project_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.img) {
      const fieldToUpdate = "image";
      const newValue = toUpdate.img;
      project = await Project.updateProject({
        project_id,
        fieldToUpdate,
        newValue,
      });
    }

    return project;
  }

  //delete
  static async removeProject({ project_id, user_id }) {
    const project = await Project.getProjectByProjectId({ project_id });

    if (project.userId !== user_id) {
      throw new Error("No authorization to delete this project");
    }

    const deleteResult = await Project.deleteProject({ project_id });
    console.log(deleteResult);

    const projctList = await Project.getProjectsByUserId({ user_id });

    return projctList;
  }

  static async getProjectImg({ project_id }) {
    const project = await Project.getProjectByProjectId({ project_id });

    return project;
  }
}

export { ProjectService };
