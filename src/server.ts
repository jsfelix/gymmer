import 'dotenv/config'
import { app } from './app'
import { env } from './config/env'
import { logInfo } from './debug'

const PORT = env.APP_PORT

app
  .listen({
    host: '0.0.0.0',
    port: PORT,
  })
  .then(() => {
    logInfo(
      `🚀 HTTP Server Running on port ${PORT} in ${env.NODE_ENV} environment`,
    )
  })
