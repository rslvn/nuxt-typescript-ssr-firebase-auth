import express, { Router } from 'express'
import { RuntimeOptions, runWith } from "firebase-functions"
import { sitemapHandler } from 'handlers-module'

const app = express()
app.disable('x-powered-by')

const router = Router()

router.get('/sitemap.xml', sitemapHandler)
app.use(router)

const runtimeOpts: RuntimeOptions = {
  timeoutSeconds: 300
}

export const sitemapApp = runWith(runtimeOpts)
  .https
  .onRequest(app);
