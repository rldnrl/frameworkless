import Router from 'koa-router'

import { Context } from '@/types/context'
import { mockMenus } from './mocks/mockMenu'

const menuRouter = new Router()

menuRouter.get('/api/menus/:category', async (ctx: Context) => {
  const { category } = ctx.params
  try {
    ctx.body = { [category]: mockMenus[category] }
  } catch (error) {
    console.error(error)
  }
})

export default menuRouter
