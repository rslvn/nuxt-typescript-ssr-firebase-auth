import express, { Router } from 'express'
import { json } from 'body-parser'
import cookieParser from 'cookie-parser'
import { claimsHandler, healthyHandler, tokenHandler, verifyHandler } from './auth-handler'
import { ApiConfig } from '../../types'

const router = Router()
router.get(ApiConfig.auth.healthy, healthyHandler)
router.get(ApiConfig.auth.verify, tokenHandler, verifyHandler)
router.post(ApiConfig.auth.claims, tokenHandler, claimsHandler)

const app = express()
app.use(json())
app.use(cookieParser())
app.use(router)

export default {
  path: '/api',
  handler: app,
}
