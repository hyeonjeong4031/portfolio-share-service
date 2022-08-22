import { ProjectModel } from "../schemas/project";

class Project {
  //create ???
  static async createProject({ newProject }) {
    const createdProject = await ProjectModel.create(newProject);
    return createdProject;
  }

  //read ????
  static async getProjectList({ user_id }) {
    const projectList = await ProjectModel.find({}).populate({ id: user_id });
    return projectList;
  }

  //update
  static async updateProject({ project_id, filedToUpdate, newValue }) {
    const filter = { projectId: project_id };
    const update = { [filedToUpdate]: newValue };
    const option = { returnOriginal: false }; //??

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }

  //delete
  static async deleteProject({ project_id }) {
    await ProjectModel.findOneAndDelete({ projectId: project_id });

    return "Delete Project Success";
  }
}

export { Project };
