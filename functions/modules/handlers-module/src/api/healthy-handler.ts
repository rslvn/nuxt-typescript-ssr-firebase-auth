import { Request, RequestHandler, Response } from 'express'
import { OK } from 'http-status-codes'
import { ProviderType } from 'types-module'

export const healthyHandler: RequestHandler = (req: Request, res: Response) => {
  console.log(`${req.originalUrl} - healthyHandler called`, ProviderType.PASSWORD)
  return res.status(OK).send('OK')
}
