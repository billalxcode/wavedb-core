import type { Context } from "hono";
import { ValidationError } from "@/exceptions";
import ProjectService from "@/services/project.service";
import type { AuthVariables } from "@/types/auth";
import { createProjectValidation } from "@/validations/project.validation";

export async function createProjectController(c: Context<{ Variables: AuthVariables }>) {
	const body = await c.req.json()
	const bodyValidated = await createProjectValidation(body)
	console.log(bodyValidated)

	if (!bodyValidated.success) {
		throw new ValidationError(bodyValidated.error.issues, "validation failed", 400)
	}

	const userId = c.get("userId") as string
	const projectService = new ProjectService()
	await projectService.createProject(
		userId,
		bodyValidated.data.name,
		bodyValidated.data.description
	)

	return c.json({
		message: "project created successfully",
		data: bodyValidated.data
	})
}

export async function getProjectsController(c: Context<{ Variables: AuthVariables }>) {
	const userId = c.get("userId") as string
	const projectService = new ProjectService()
	const projects = await projectService.getProjectsByUserId(userId)

	return c.json({
		message: "projects fetched successfully",
		data: projects
	})
}
