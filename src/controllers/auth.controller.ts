import type { Context } from "hono";
import { ValidationError } from "@/exceptions";
import AuthService from "@/services/auth.service";
import type { RegisterValidationType } from "@/validations/auth.validation";
import { loginValidation, registerValidation } from "@/validations/auth.validation";

export async function registerController(c: Context) {
	const body = await c.req.json()
	const bodyValidated = await registerValidation(body)

	if (!bodyValidated.success) {
		throw new ValidationError(bodyValidated.error.message, "validation failed", 400)
	}

	const authService = new AuthService()
	await authService.registerUser(bodyValidated.data as RegisterValidationType)

	return c.json({
		message: "user registered successfully",
		data: bodyValidated.data
	})
}

export async function loginController(c: Context) {
	const body = await c.req.json()
	const bodyValidated = await loginValidation(body)

	if (!bodyValidated.success) {
		throw new ValidationError(bodyValidated.error.message, "validation failed", 400)
	}

	const authService = new AuthService()
	const user = await authService.loginUser(bodyValidated.data)
	const access_token = await authService.generateAccessToken(user.id)

	return c.json({
		message: "user logged in successfully",
		data: {
			id: user.id,
			name: user.name,
			email: user.email,
			access_token: access_token
		}
	})
}
