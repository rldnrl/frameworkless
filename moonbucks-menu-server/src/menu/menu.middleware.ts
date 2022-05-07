import { Context } from '@/types/context'
import { mockMenus } from './mocks/mockMenu'

export class MenuMiddleware {
  async getMenusByCategory(ctx: Context) {
    const { category } = ctx.params
    try {
      ctx.body = { [category]: mockMenus[category] }
    } catch (error) {
      console.error(error)
    }
  }
}
