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

  static async setProject({ project_id, toUpdate }) {
    let project = await Project.getProjectByProjectId({ project_id });

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

    if (toUpdate.endtDate) {
      const fieldToUpdate = "endDate";
      const newValue = toUpdate.endDate;
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
    const result = await Project.deleteProject({ project_id });
    console.log(result);

    const projctList = await Project.getProjectsByUserId({ user_id });

    return projctList;
  }
}

export { ProjectService };
