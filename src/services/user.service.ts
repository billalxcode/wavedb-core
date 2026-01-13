import { prisma } from "@/helpers/prisma";

export class UserService {
	private async generateApiKey(): Promise<string> {
		const randomString = crypto.getRandomValues(new Uint8Array(32))
		const sha256 = await crypto.subtle.digest("SHA-256", randomString)
		const apiKey = btoa(String.fromCharCode(...new Uint8Array(sha256)))
		return apiKey.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
	}

	async createApiKeyForUser(userId: string) {
		return await prisma.apiKey.create({
			data: {
				key: `wave_${await this.generateApiKey()}`,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}
}
