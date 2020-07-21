import express, { Router } from 'express'
import { sitemapHandler } from 'handlers-module'

// const staticRoutes = [
//   Routes.HOME.path,
//   Routes.TERMS.path,
//   Routes.PRIVACY_POLICY.path,
//   Routes.REGISTER.path,
//   Routes.LOGIN.path,
//   Routes.CROP.path,
//   Routes.LIGHT_BOX.path,
//   Routes.IMAGES.path
// ]

const app = express()
const router = Router()

router.get('/sitemap.xml', sitemapHandler)
app.use(router)

export default {
  handler: app
}
