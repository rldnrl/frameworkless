import type { MenuByCategory } from '../types/menu'

export const mockMenus: MenuByCategory = {
  espresso: [
    {
      name: 'Americano',
      isSoldOut: false,
    },
    {
      name: 'Latte',
      isSoldOut: true,
    },
    {
      name: 'Vanilla Latte',
      isSoldOut: false,
    },
  ],
  frappuccino: [],
  blended: [],
  teavana: [],
  desert: [],
}
