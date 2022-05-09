import { v4 as uuidv4 } from 'uuid'

import { RouterContext } from '@/types/context'
import { mockMenus } from './mocks/mockMenu'

export class MenuMiddleware {
  async getMenusByCategory(ctx: RouterContext) {
    const { category } = ctx.params
    try {
      ctx.body = mockMenus[category]
    } catch (error) {
      console.error(error)
    }
  }

  async createMenusByCategory(ctx: RouterContext) {
    const { category } = ctx.params
    const { name } = ctx.request.body
    if (name) {
      const newMenuItem = { id: uuidv4(), name, isSoldOut: false }
      mockMenus[category].push(newMenuItem)
      ctx.body = newMenuItem
    } else {
      ctx.status = 400
      ctx.body = '이름과 품절 여부를 입력해주세요.'
    }
  }
}
