import Router from 'koa-router'

import { MenuMiddleware } from './menu.middleware'

const menuRouter = new Router()
const menuMiddleware = new MenuMiddleware()

menuRouter.get(
  '/api/category/:category/menu',
  menuMiddleware.getMenusByCategory
)

menuRouter.post(
  '/api/category/:category/menu',
  menuMiddleware.createMenusByCategory
)

export default menuRouter
