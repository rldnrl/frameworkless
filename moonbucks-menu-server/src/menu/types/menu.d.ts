import { Category } from './category'

export type Menu = {
  name: string
  isSoldOut: boolean
}

export type MenuByCategory = {
  [category in Category]?: Menu[]
}
