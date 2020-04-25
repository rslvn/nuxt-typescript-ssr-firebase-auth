import express from 'express';
import authApi from './authApi'

const app = express();

app.use(authApi);

export default {
  path: '/api',
  handler: app
}
