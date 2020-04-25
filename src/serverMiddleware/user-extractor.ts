import { ServerMiddleware } from '@nuxt/types'

const userExtractor: ServerMiddleware = function (req, res, next) {
  console.log('userExtractor: ', req.headers.cookie);

  // @ts-ignore
  req.user = { test: 'test' }
};

export default userExtractor
