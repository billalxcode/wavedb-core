import type { Context } from "hono";
import { every, some } from "hono/combine";
import { jwt } from "hono/jwt";
import { JWT_SECRET } from "@/constants";

export const authJwtMiddleware = async (c: Context, next: () => Promise<void>) => {
	const jwtMiddleware = jwt({
		secret: JWT_SECRET,
		headerName: "Authorization",
		alg: "HS256",
		verification: {
			iss: "wavedb",
			iat: true,
			exp: true
		}
	})
	return jwtMiddleware(c, next)
}

export const authJwtUserMiddleware = async (c: Context, next: () => Promise<void>) => {
	const jwtPayload = c.get("jwtPayload")
	if (!jwtPayload || typeof jwtPayload.sub !== "string") {
		return c.json(
			{
				message: "unauthorized"
			},
			401
		)
	}
	c.set("userId", jwtPayload.sub)
	await next()
}

export const authMiddleware = some(every(authJwtMiddleware, authJwtUserMiddleware));
