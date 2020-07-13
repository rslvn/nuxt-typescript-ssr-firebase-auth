import express, { Router } from 'express'
import cookieParser from 'cookie-parser'
import { json } from 'body-parser'
import cors from 'cors'
import { ApiConfig } from '../../types'
import { claimsHandler, healthyHandler, tokenHandler, verifyHandler } from './auth-handler'

const router = Router()
router.get(ApiConfig.auth.healthy, healthyHandler)
router.get(ApiConfig.auth.verify, tokenHandler, verifyHandler)
router.post(ApiConfig.auth.claims, tokenHandler, claimsHandler)

const app = express()
app.use(json())
app.use(cookieParser())
app.use(cors({ origin: true }))
app.use(router)

export default {
  path: '/api',
  handler: app
}
