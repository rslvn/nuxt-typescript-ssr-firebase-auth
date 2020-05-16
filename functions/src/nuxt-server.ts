import { RuntimeOptions, runWith } from "firebase-functions";
import cookieParser from 'cookie-parser'
import express, { Request, Response } from 'express'

const { Nuxt } = require('nuxt');

console.log('Creating nuxtOnFunction function.')

const config = {
    // Don't start in dev mode.
    dev: false,
    // Set the path to the .nuxt folder.
    buildDir: '.nuxt',
    // // Enable debug when in the develop environment.
    // debug: process.env.GCP_PROJECT === 'nuxt2-example-dev',
    // Path to the assets.
    build: {
        publicPath: '/assets/',
    },
};
const nuxt = new Nuxt(config);

let isReady = false
const readyPromise = nuxt
    .ready()
    .then(() => {
        isReady = true
    })
    .catch(() => {
        process.exit(1)
    })

const handleRequest = async (req: Request, res: Response) => {
    if (!isReady) {
        await readyPromise
    }
    res.set('Cache-Control', 'public, max-age=1, s-maxage=1')
    await nuxt.render(req, res)
}

// Init express.
const app = express();
app.use(cookieParser())
// Give nuxt middleware to express.
app.get('*', handleRequest)
app.use(handleRequest)

const runtimeOpts: RuntimeOptions = {
    timeoutSeconds: 300,
    memory: '2GB',
    maxInstances: 1
}

export const nuxtOnFunction = runWith(runtimeOpts)
    .https
    .onRequest(app);
