import { RouterContext } from '@/types/context'
import { mockMenus } from './mocks/mockMenu'

export class MenuMiddleware {
  async getMenusByCategory(ctx: RouterContext) {
    const { category } = ctx.params
    try {
      ctx.body = {
        [category]: mockMenus[category],
      }
    } catch (error) {
      console.error(error)
    }
  }

  async createMenusByCategory(ctx: RouterContext) {
    const { category } = ctx.params
    const { name, soldOut } = ctx.request.body
    if (name && soldOut) {
      mockMenus[category].push({ name, soldOut })
      ctx.body = `Success Create ${category} menu`
    } else {
      ctx.body = '이름과 품절 여부를 입력해주세요.'
    }
  }
}
