import { Request, RequestHandler, Response } from 'express'
import { SitemapStream, streamToPromise } from 'sitemap'
import { createGzip } from 'zlib'
import { handleGenericError } from './service/request-handler-service'

const staticRoutes = [
  '/',
  '/terms',
  '/privacy-policy',
  '/register',
  '/login',
  '/crop',
  '/lightbox',
  '/images'
]

let sitemapBuffer: Buffer|null = null

export const sitemapHandler: RequestHandler = async (req: Request, res: Response) => {
  console.log(`${req.originalUrl} - called (function)`)
  res.header('Content-Type', 'application/xml')
  res.header('Content-Encoding', 'gzip')
  if (sitemapBuffer) {
    res.send(sitemapBuffer)
    return
  }

  await Promise.resolve()
    .then(() => {
      const smStream = new SitemapStream({ hostname: 'https://nuxt-ts-firebase-auth-ssr.web.app/' })
      const pipeline = smStream.pipe(createGzip())

      staticRoutes.forEach((route) =>
        smStream.write({ url: route, changefreq: 'weekly', priority: 0.8 })
      )
      smStream.end()

      streamToPromise(pipeline)
        .then((sm: Buffer) => (sitemapBuffer = sm))
        .catch((error: Error) => console.log(error))
      // stream write the response
      pipeline.pipe(res).on('error', (e: Error) => {
        throw e
      })
    })
    .catch((error) => handleGenericError(req, res, error))
}

