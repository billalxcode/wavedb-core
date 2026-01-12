import { Hono } from "hono";
import type { JwtVariables } from "hono/jwt";
import { createProjectController } from "@/controllers/project.controller";
import { authMiddleware } from "@/middlewares/auth";

type Variables = JwtVariables

const projectRouter = new Hono<{ Variables: Variables }>()

projectRouter.use(authMiddleware)

projectRouter.post("/", createProjectController)

export default projectRouter
