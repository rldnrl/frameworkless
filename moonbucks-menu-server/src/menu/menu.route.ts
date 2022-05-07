import Router from 'koa-router'

import { MenuMiddleware } from './menu.middleware'

const menuRouter = new Router()
const menuMiddleware = new MenuMiddleware()

menuRouter.get('/api/menus/:category', menuMiddleware.getMenusByCategory)

export default menuRouter
