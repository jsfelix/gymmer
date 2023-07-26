import fastify from 'fastify'
import { z } from 'zod'
import { prismaClient } from './config/database'
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

export const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.post(
  '/users',
  {
    schema: {
      body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      }),
    },
  },
  async (request, reply) => {
    const { name, email, password } = request.body
    await prismaClient.user.create({
      data: { email, name, passwordHash: password },
    })
    return reply.status(201).send()
  },
)
