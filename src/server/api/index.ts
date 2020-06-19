import express from 'express'
import { json } from 'body-parser'
import cookieParser from 'cookie-parser'
import authApi from './authApi'

const app = express()

app.use(json())
app.use(cookieParser())
app.use(authApi)

export default {
  path: '/api',
  handler: app,
}
