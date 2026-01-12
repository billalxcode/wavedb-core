import type { JwtVariables } from "hono/jwt";

export type AuthVariables = {
	userId: string;
} & JwtVariables
