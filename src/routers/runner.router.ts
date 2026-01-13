import { Hono } from "hono";
import { createRunnerController } from "@/controllers/runner.controller";
import { apiKeyMiddleware } from "@/middlewares/auth";
import { validProjectIdMiddleware } from "@/middlewares/project";
import type { AuthVariables } from "@/types/variables";
import metricRouter from "./metric.router";

const runnerRouter = new Hono<{ Variables: AuthVariables }>()

runnerRouter.use(apiKeyMiddleware)
runnerRouter.use(validProjectIdMiddleware)

runnerRouter.post("/", createRunnerController)
runnerRouter.route("/:runnerId/metrics", metricRouter)

export default runnerRouter
