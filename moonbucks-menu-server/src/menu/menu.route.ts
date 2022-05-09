import Router from 'koa-router'

import { MenuMiddleware } from './menu.middleware'

const menuRouter = new Router()
const menuMiddleware = new MenuMiddleware()

menuRouter.get(
  '/api/category/:category/menu',
  menuMiddleware.getMenusByCategory
)

menuRouter.post('/api/menu/:category', menuMiddleware.createMenusByCategory)

export default menuRouter
