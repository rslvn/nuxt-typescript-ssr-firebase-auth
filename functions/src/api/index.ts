import express, { Router } from 'express'
import cookieParser from 'cookie-parser'
import { json } from 'body-parser'
import cors from 'cors'
import { RuntimeOptions, runWith } from 'firebase-functions'
import { ApiConfig } from '../types';
import { claimsHandler, verifyHandler } from './auth-handler';
import { healthyHandler, tokenHandler } from './api-handler'

const router = Router()
router.get(ApiConfig.auth.healthy, healthyHandler)
router.get(ApiConfig.auth.verify, tokenHandler, verifyHandler)
router.post(ApiConfig.auth.claims, tokenHandler, claimsHandler)

const app = express()
app.use(cookieParser())
app.use(json())
app.use(cors({ origin: true }))
app.use('/api', router)

const runtimeOpts: RuntimeOptions = {
  timeoutSeconds: 300,
  memory: '1GB'
}

export const apiApp = runWith(runtimeOpts)
  .https
  .onRequest(app)
