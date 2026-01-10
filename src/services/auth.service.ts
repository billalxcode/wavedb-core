import { UserAlreadyExistsError, UserNotFoundError } from "@/exceptions";
import { generateJWT } from "@/helpers/jwt";
import { prisma } from "@/helpers/prisma";
import type { LoginValidationType, RegisterValidationType } from "@/validations/auth.validation";

export default class AuthService {
	async comparePassword(password: string, hash: string): Promise<boolean> {
		console.log("Password", password)
		console.log("Hash", hash)
		return await Bun.password.verify(password, hash, "bcrypt")
	}

	async toHash(password: string): Promise<string> {
		return await Bun.password.hash(password, "bcrypt")
	}

	async findUserByEmail(email: string) {
		return await prisma.user.findFirst({
			where: {
				email: email
			}
		})
	}

	async generateAccessToken(userId: string): Promise<string> {
		const access_token = await generateJWT(userId)
		return access_token
	}

	async registerUser(data: RegisterValidationType) {
		const user = await this.findUserByEmail(data.email)
		if (user) {
			throw new UserAlreadyExistsError("user with this email already exists", 400)
		}

		return await prisma.user.create({
			data: {
				email: data.email,
				name: data.name,
				password: (await this.toHash(data.password)).toString()
			}
		})
	}

	async loginUser(data: LoginValidationType) {
		const user = await this.findUserByEmail(data.email)
		if (!user) {
			throw new UserNotFoundError("user with this email does not exist", 404)
		}

		const isPasswordValid = await this.comparePassword(data.password, user.password)
		if (!isPasswordValid) {
			throw new UserNotFoundError("invalid credentials", 401)
		}

		return user
	}
}
