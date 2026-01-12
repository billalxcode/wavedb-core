import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { logger } from 'hono/logger'
import { UserAlreadyExistsError, ValidationError } from './exceptions'
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

	if (err instanceof ValidationError) {
		return c.json(err.toJSON(), err.statusCode)
	}

	if (err instanceof HTTPException) {
		return c.json({ message: err.message }, err.status)
	}
	console.error(err)
	return c.json({ message: 'Internal Server Error' }, 500)
})
export default app
