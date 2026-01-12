import type { Context } from "hono";

export async function createProjectController(c: Context) {
	return c.json({
		message: "project created successfully"
	})
}
