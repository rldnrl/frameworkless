import { Category } from './category'

export type Menu = {
  id: string
  name: string
  isSoldOut: boolean
}

export type MenuByCategory = {
  [category in Category]?: Menu[]
}
