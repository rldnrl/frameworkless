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
    const { name, soldOut } = ctx.request.body
    if (name && soldOut) {
      mockMenus[category].push({ name, isSoldOut: false })
      ctx.body = `Success Create ${category} menu`
    } else {
      ctx.status = 401
      ctx.body = '이름과 품절 여부를 입력해주세요.'
    }
  }
}
