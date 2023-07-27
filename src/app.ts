import fastify from 'fastify'
import { userRoutes } from './http/routes/user'
import { ZodError } from 'zod'
import { env } from './config/env'
import { logError } from './config/debug'

export const app = fastify({ logger: true })

app.register(userRoutes, { prefix: '/users' })

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    logError((error as Error).message)
  } else {
    // send to external tool when production error
  }
  return reply.status(500).send({ message: 'Internal server error.' })
})
