import express, { Router } from 'express'
import cookieParser from 'cookie-parser'
import { json } from 'body-parser'
import cors from 'cors'
import { RuntimeOptions, runWith } from 'firebase-functions'
import { ApiConfig } from 'types-module'
import {
  claimsHandler,
  extractHeaderHandler,
  healthyHandler,
  notifyHandler,
  tokenHandler,
  verifyHandler
} from 'handlers-module'

const router = Router()
router.get(ApiConfig.healthy, healthyHandler)
router.get(ApiConfig.auth.verify, extractHeaderHandler, tokenHandler, verifyHandler)
router.post(ApiConfig.auth.claims, extractHeaderHandler, tokenHandler, claimsHandler)
router.post(ApiConfig.notification.notify.context, extractHeaderHandler, tokenHandler, notifyHandler)

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
