import { runWith } from "firebase-functions";
import express from 'express'
import cookieParser from 'cookie-parser'
import { runtimeOpts } from './types'

const { Nuxt } = require('nuxt');

console.log('Creating the function.')

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
// Init express.
const app = express();
app.use(cookieParser())
// Give nuxt middleware to express.
app.use(nuxt.render);

export const nuxtOnFunction = runWith(runtimeOpts)
    .https
    .onRequest(app);
