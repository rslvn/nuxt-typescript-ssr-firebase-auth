import express, { Router } from 'express'
import cookieParser from 'cookie-parser'
import { json } from 'body-parser'
import cors from 'cors'
import { ApiConfig } from '../../types'
import { claimsHandler, verifyHandler } from './auth-handler'
import { extractHeaderHandler, healthyHandler, tokenHandler } from './api-handler'
import { notifyHandler } from './notification-handler'

const router = Router()
router.get(ApiConfig.healthy, healthyHandler)
router.get(ApiConfig.auth.verify, extractHeaderHandler, tokenHandler, verifyHandler)
router.post(ApiConfig.auth.claims, extractHeaderHandler, tokenHandler, claimsHandler)
router.post(ApiConfig.notification.notify.context, extractHeaderHandler, tokenHandler, notifyHandler)

const app = express()
app.use(json())
app.use(cookieParser())
app.use(cors({ origin: true }))
app.use(router)

export default {
  path: '/api',
  handler: app
}
