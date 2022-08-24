import { Router } from "express";
import { ProjectService } from "../services/projectService";
import { login_required } from "../middlewares/login_required";

const projectRouter = Router();

//project list get
projectRouter.get(
  "/project/read",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.currentUserId;
      const projectList = await ProjectService.getProjects({ user_id });
      res.status(200).send(projectList);
    } catch (error) {
      next(error);
    }
  }
);

//project create
projectRouter.put(
  "/project/create",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.currentUserId;
      const title = req.body.title;
      const description = req.body.description;
      const startDate = req.body.startDate;
      const endDate = req.body.endDate;

      const newProject = await ProjectService.addProject({
        title,
        description,
        startDate,
        endDate,
        user_id,
      });

      if (newProject.errorMessage) {
        throw new Error(newUser.errorMessage);
      }

      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  }
);

//project update
projectRouter.put(
  "/project/update",
  // login_required,
  async function (req, res, next) {
    try {
      const project_id = req.body.projectId;
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const startDate = req.body.startDate ?? null;
      const endDate = req.body.endDate ?? null;

      const toUpdate = { title, description, startDate, endDate };

      const updatedProject = await ProjectService.setProject({
        project_id,
        toUpdate,
      });

      if (updatedProject.errorMessage) {
        throw new Error(updatedProject.errorMessage);
      }

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

//project delete
projectRouter.delete("/project/delete");

export { projectRouter };
