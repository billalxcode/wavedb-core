import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { UserAlreadyExistsError } from './exceptions'
import authRouter from './routers/auth'
import projectRouter from './routers/project'

const app = new Hono()

app.use(logger())
app.route("/auth", authRouter)
app.route("/project", projectRouter)

app.get('/', (c) => {
	return c.text('WaveDB Health!')
})

app.onError((err, c) => {
	if (err instanceof UserAlreadyExistsError) {
		return c.json(err.toJSON(), err.statusCode)
	}

	console.error(err)
	return c.json({ message: 'Internal Server Error' }, 500)
})
export default app
