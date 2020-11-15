import { Router } from 'express'
import { readdirSync } from 'fs'

export default (app) => {
  const router = Router()
  app.use('/api', router)
  readdirSync(`${__dirname}/../api/routes`).map(async file => {
    (await import(`../api/routes/${file}`)).default(router)
  })
}
