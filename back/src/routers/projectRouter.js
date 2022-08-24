import { Router } from "express";
import { ProjectService } from "../services/projectService";
import { login_required } from "../middlewares/login_required";

const projectRouter = Router();

//project list get
projectRouter.get(
  "/project/:userid",
  // login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.userid;
      const projectList = await ProjectService.getProjects({ user_id });
      res.status(200).send(projectList);
    } catch (error) {
      next(error);
    }
  }
);

//project create
projectRouter.put(
  "/project/:id/create",
  // login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
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
  "/project/:projectid",
  // login_required,
  async function (req, res, next) {
    try {
      const project_id = req.params.projectid;
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
projectRouter.delete("/project/:projectid");

export { projectRouter };
