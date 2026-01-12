import { jwt } from "hono/jwt";
import { JWT_SECRET } from "@/constants";

export const authMiddleware = jwt({
	secret: JWT_SECRET,
	headerName: "Authorization",
	alg: "HS256",
	verification: {
		iss: "wavedb",
		iat: true,
		exp: true
	}
})
