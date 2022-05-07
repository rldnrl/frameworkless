import type { MenuByCategory } from '../types/menu'

export const mockMenus: MenuByCategory = {
  espresso: [
    {
      name: 'Americano',
      soldOut: false,
    },
    {
      name: 'Latte',
      soldOut: true,
    },
    {
      name: 'Vanilla Latte',
      soldOut: false,
    },
  ],
  frappuccino: [],
  blended: [],
  teavana: [],
  desert: [],
}
