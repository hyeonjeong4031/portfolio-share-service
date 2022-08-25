import { ProjectModel } from "../schemas/project";

class Project {
  //create
  static async createProject({ newProject }) {
    const createdProject = await ProjectModel.create(newProject);

    return createdProject;
  }

  //read
  static async getProjectsByUserId({ user_id }) {
    const projectList = await ProjectModel.find({ userId: user_id });
    return projectList;
  }

  static async getProjectByProjectId({ project_id }) {
    const project = await ProjectModel.findOne({ id: project_id });
    return project;
  }

  //update
  static async updateProject({ project_id, fieldToUpdate, newValue }) {
    const filter = { id: project_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }

  //delete
  static async deleteProject({ project_id }) {
    await ProjectModel.findOneAndDelete({ id: project_id });

    return "Deleting Project Success";
  }
}

export { Project };
