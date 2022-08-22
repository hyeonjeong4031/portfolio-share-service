import { Project } from "../db";

class ProjectService {
  static async addProject({ title, description, startDate, endDate, user_id }) {
    const newProject = { id, title, description, startDate, endDate };

    const createdNewProject = await Project.createProject({ newProject });
    createdNewProject.errorMessage = null;

    return createdNewProject;
  }

  static async getProjects({ user_id }) {
    const projects = await Project.getProjectList();
  }
}
