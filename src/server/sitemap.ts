import express, { Router } from 'express'
import { sitemapHandler } from 'handlers-module'

const app = express()
app.disable('x-powered-by')

const router = Router()

router.get('/sitemap.xml', sitemapHandler)
app.use(router)

export default {
  handler: app
}
