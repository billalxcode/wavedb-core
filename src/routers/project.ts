import { Hono } from "hono";
import { createProjectController, getProjectsController } from "@/controllers/project.controller";
import { authMiddleware } from "@/middlewares/auth";
import type { AuthVariables } from "@/types/auth";

const projectRouter = new Hono<{ Variables: AuthVariables }>()

projectRouter.use(authMiddleware)

projectRouter.get("/", getProjectsController)
projectRouter.post("/", createProjectController)

export default projectRouter
