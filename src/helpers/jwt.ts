import { decode, sign, verify } from "hono/jwt"
import type { JWTPayload } from "hono/utils/jwt/types"
import { JWT_EXPIRATION, JWT_SECRET } from "@/constants"

export async function generateJWT(userId: string): Promise<string> {
	const payload: JWTPayload = {
		sub: userId, // Subject (user ID)
		exp: Math.floor(Date.now() / 1000) + JWT_EXPIRATION, // Expiration time
		iat: Math.floor(Date.now() / 1000), // Issued at
		iss: "wavedb"
	}
	return await sign(payload, JWT_SECRET, "HS256")
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
	try {
		const payload = await verify(token, JWT_SECRET, "HS256")
		return payload as JWTPayload
	} catch {
		return null
	}
}

export function decodeJWT(token: string): JWTPayload | null {
	try {
		const payload = decode(token)
		return payload as JWTPayload
	} catch {
		return null
	}
}
