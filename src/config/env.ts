import { logError } from '@/config/debug'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  APP_PORT: z.coerce.number().default(3333),
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
  logError('⛔️ Environment variable verification failed!')
  logError('See logs bellow and fix .env file')
  console.table(
    result.error.issues.map((issue) => ({
      code: issue.code,
      path: issue.path.join('.'),
      message: issue.message,
    })),
  )
  process.exit(1)
}

export const env = result.data
