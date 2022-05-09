import { v4 as uuidv4 } from 'uuid'

import type { MenuByCategory } from '../types/menu'

export const mockMenus: MenuByCategory = {
  espresso: [
    {
      id: uuidv4(),
      name: 'Americano',
      isSoldOut: false,
    },
    {
      id: uuidv4(),
      name: 'Latte',
      isSoldOut: true,
    },
    {
      id: uuidv4(),
      name: 'Vanilla Latte',
      isSoldOut: false,
    },
  ],
  frappuccino: [],
  blended: [],
  teavana: [],
  desert: [],
}
