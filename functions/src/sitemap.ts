import express, { Request, Response, Router } from 'express';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib'
import { RuntimeOptions, runWith } from "firebase-functions";

const service = '/sitemap.xml';
const app = express();
const router = Router();

let sitemap: Buffer | null = null;

router.get(service, (req: Request, res: Response) => {
    console.log(req.originalUrl, ' called (get)');
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');

    if (sitemap) {
        res.send(sitemap)
        return
    }

    try {
        const smStream = new SitemapStream({ hostname: 'https://nuxt-ts-firebase-auth-ssr.web.app//' })
        const pipeline = smStream.pipe(createGzip())

        smStream.write({ url: '/', changefreq: 'weekly', priority: 0.8 })
        smStream.write({ url: '/terms', changefreq: 'weekly', priority: 0.8 })
        smStream.write({ url: '/privacy-policy', changefreq: 'weekly', priority: 0.8 })
        smStream.write({ url: '/register', changefreq: 'weekly', priority: 0.8 })
        smStream.write({ url: '/login', changefreq: 'weekly', priority: 0.8 })
        smStream.end()

        // cache the response
        streamToPromise(pipeline).then((sm: Buffer) => sitemap = sm).catch(error => console.log(error))
        // stream write the response
        pipeline.pipe(res).on('error', (e) => {
            throw e
        })
    } catch (e) {
        console.error(e)
        res.status(500).end()
    }
});

app.use(router)

const runtimeOpts: RuntimeOptions = {
    timeoutSeconds: 300,
    maxInstances: 1
}

export const sitemapApp = runWith(runtimeOpts)
    .https
    .onRequest(app);
