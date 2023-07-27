import fastify from 'fastify'
import { userRoutes } from './http/routes/user'

export const app = fastify({ logger: true })

app.register(userRoutes, { prefix: '/users' })
