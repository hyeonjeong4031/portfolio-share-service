import { Router } from "express";
import { ProjectService } from "../services/projectService";
import { login_required } from "../middlewares/login_required";
import multer from "multer";

const projectRouter = Router();

const storage = multer.memoryStorage();

//image limit
const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png)$/)) {
      return cb(new Error("Please upload a JPG or PNG"));
    }

    cb(undefined, true);
  },
  storage: storage,
});

//project list get
projectRouter.get("/project", login_required, async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
    const projectList = await ProjectService.getProjects({ user_id });
    res.status(200).send(projectList);
  } catch (error) {
    next(error);
  }
});

//project create
projectRouter.post("/project", login_required, async function (req, res, next) {
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
});

//project update
projectRouter.put("/project", login_required, async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
    const project_id = req.body.projectId;
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const startDate = req.body.startDate ?? null;
    const endDate = req.body.endDate ?? null;

    const toUpdate = { title, description, startDate, endDate };

    const updatedProject = await ProjectService.setProject({
      project_id,
      toUpdate,
      user_id,
    });

    if (updatedProject.errorMessage) {
      throw new Error(updatedProject.errorMessage);
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
});

//project delete
projectRouter.delete(
  "/project/:projectId",
  login_required,
  async function (req, res, next) {
    try {
      const project_id = req.params.projectId;
      const user_id = req.currentUserId;

      const deletedProject = await ProjectService.removeProject({
        project_id,
        user_id,
      });

      if (deletedProject.errorMessage) {
        throw new Error(deletedProject.errorMessage);
      }

      res.status(200).json(deletedProject);
    } catch (error) {
      next(error);
    }
  }
);

//other user project list get - NETWORK PAGE
projectRouter.get(
  "/project/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const projectList = await ProjectService.getProjects({ user_id });
      res.status(200).send(projectList);
    } catch (error) {
      next(error);
    }
  }
);

//get project image
projectRouter.get("/project/:projectId/image", async function (req, res, next) {
  try {
    const project_id = req.params.projectId;

    const project = await ProjectService.getProjectImg({ project_id });

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }

    res.set("Content-Type", "image/jpg");
    res.send(project.image);
  } catch (error) {
    next(error);
  }
});

//update project image
projectRouter.put(
  "/project/:projectId/image",
  login_required,
  upload.single("image"),
  async function (req, res, next) {
    try {
      const img = req.file.buffer;
      const user_id = req.currentUserId;
      const project_id = req.params.projectId;

      const toUpdate = { img };

      const updatedProject = await ProjectService.setProject({
        project_id,
        toUpdate,
        user_id,
      });

      if (updatedProject.errorMessage) {
        throw new Error(updatedProject.errorMessage);
      }

      res.status(201).send("Image updated successfully!");
    } catch (error) {
      next(error);
    }
  }
);

//delete project image
projectRouter.delete(
  "/project/:projectId/image",
  login_required,
  async function (req, res, next) {
    try {
      const project_id = req.params.projectId;
      const user_id = req.currentUserId;

      const deletedProject = await ProjectService.removeProjectImg({
        project_id,
        user_id,
      });

      if (deletedProject.errorMessage) {
        throw new Error(deletedProject.errorMessage);
      }

      res.status(200).send(deletedProject);
    } catch (error) {
      next(error);
    }
  }
);

export { projectRouter };
