import express, { Request, RequestHandler, Response, Router } from 'express';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib'
import { RuntimeOptions, runWith } from "firebase-functions";
import { handleGenericError } from './service/api-error-service';
import { config } from './config';

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

let sitemap: Buffer | null = null

const sitemapHandler: RequestHandler = async (req: Request, res: Response) => {
    console.log(`${req.originalUrl} - called (function)`)
    res.header('Content-Type', 'application/xml')
    res.header('Content-Encoding', 'gzip')
    if (sitemap) {
        res.send(sitemap)
        return
    }

    await Promise.resolve()
        .then(() => {
            const smStream = new SitemapStream({ hostname: config.WEBSITE_URL })
            const pipeline = smStream.pipe(createGzip())

            staticRoutes.forEach((route) =>
                smStream.write({ url: route, changefreq: 'weekly', priority: 0.8 })
            )
            smStream.end()

            streamToPromise(pipeline)
                .then((sm: Buffer) => (sitemap = sm))
                .catch((error: Error) => console.log(error))
            // stream write the response
            pipeline.pipe(res).on('error', (e: Error) => {
                throw e
            })
        })
        .catch((error) => handleGenericError(res, error))
}

const app = express()
const router = Router()

router.get('/sitemap.xml', sitemapHandler)
app.use(router)

const runtimeOpts: RuntimeOptions = {
    timeoutSeconds: 300
}

export const sitemapApp = runWith(runtimeOpts)
    .https
    .onRequest(app);
