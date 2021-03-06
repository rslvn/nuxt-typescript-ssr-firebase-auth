import { pubsub } from "firebase-functions"
import syncRequest from 'sync-request'
import { HandlerConfig } from 'handlers-module'
import { ApiConfig } from 'types-module'

export const warmUpScheduledFunction = pubsub
  .schedule('*/15 * * * *')
  .onRun((context) => {
    syncRequest('GET', HandlerConfig.getWebsiteUrl())
    syncRequest('GET', `${HandlerConfig.getWebsiteUrl()}${ApiConfig.healthy}`)
    syncRequest('GET', `${HandlerConfig.getWebsiteUrl()}/sitemap.xml`)
  })
