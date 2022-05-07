import { Category } from './category'

export type Menu = {
  name: string
  soldOut: boolean
}

export type MenuByCategory = {
  [category in Category]?: Menu[]
}
