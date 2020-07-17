import { createGzip } from 'zlib'
import express, { Request, RequestHandler, Response, Router } from 'express'
import { SitemapStream, streamToPromise } from 'sitemap'
import { Routes } from '../types'
import { handleGenericError } from './service/request-handler-service'

const staticRoutes = [
  Routes.HOME.path,
  Routes.TERMS.path,
  Routes.PRIVACY_POLICY.path,
  Routes.REGISTER.path,
  Routes.LOGIN.path,
  Routes.CROP.path,
  Routes.LIGHT_BOX.path,
  Routes.IMAGES.path
]

let sitemap: Buffer|null = null

const sitemapHandler: RequestHandler = async (req: Request, res: Response) => {
  console.log(`${req.originalUrl} - called`)
  res.header('Content-Type', 'application/xml')
  res.header('Content-Encoding', 'gzip')

  if (sitemap) {
    res.send(sitemap)
    return
  }

  await Promise.resolve()
    .then(() => {
      const hostname = req.protocol + '://' + req.get('host')
      const smStream = new SitemapStream({ hostname })
      const pipeline = smStream.pipe(createGzip())

      staticRoutes.forEach(route =>
        smStream.write({ url: route, changefreq: 'weekly', priority: 0.8 })
      )
      smStream.end()

      // cache the response
      streamToPromise(pipeline)
        .then((sm: Buffer) => (sitemap = sm))
        .catch((error: Error) => console.log(error))
      // stream write the response
      pipeline.pipe(res).on('error', (e: Error) => {
        throw e
      })
    })
    .catch(error => handleGenericError(req, res, error))
}

const app = express()
const router = Router()

router.get('/sitemap.xml', sitemapHandler)
app.use(router)

export default {
  handler: app
}
