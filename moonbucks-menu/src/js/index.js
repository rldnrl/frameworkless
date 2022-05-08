import { $ } from './utils.js'
import store from './store.js'

const baseUrl = 'http://localhost:4000/api'

const MenuAPI = {
  async fetchAllMenuByCategory(category) {
    const response = await fetch(`${baseUrl}/category/${category}/menu`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    return response.json()
  },
  async createMenuInCategory(category, name) {
    const response = await fetch(`${baseUrl}/category/${category}/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
      })
    })

    if (!response.ok) console.error('에러가 발생했습니다!')
  },
  async updateMenu(category, id, name) {
    const response = await fetch(`${baseUrl}/category/${category}/menu/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
      })
    })
    if (!response.ok) console.error('에러가 발생했습니다!')

    return response.json()
  }
}

class App {
  constructor() {
    this.baseUrl = 'http://localhost:4000/api'
    this.menu = {
      espresso: [],
      frappuccino: [],
      blended: [],
      teavana: [],
      desert: []
    }
    this.currentCategory = 'espresso'
  }

  async init() {
    if (store.getLocalStorage()) {
      this.menu = JSON.parse(store.getLocalStorage())
    }

    const allMenuByCategory = await MenuAPI.fetchAllMenuByCategory(this.currentCategory)
    this.menu[this.currentCategory] = allMenuByCategory

    this.render()
    this.initEventListener()
  }

  render() {
    const templates = this.menu[this.currentCategory].map((menu, index) => `
      <li data-menu-id=${menu.id} class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 ${this.menu[this.currentCategory][index].soldOut ? 'sold-out' : ''} menu-name">${menu.name}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
        >
          품절
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
        >
          수정
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        >
          삭제
        </button>
      </li>
    `).join('')

    $('#menu-list').innerHTML = templates
    this.updateMenuCount()
  }

  updateMenuCount() {
    const menuCount = this.menu[this.currentCategory].length
    $('.menu-count').innerText = `총 ${menuCount}개`
  }

  async addMenuName() {
    const menuName = $("#menu-name").value

    // Input이 빈 값이면 입력을 받지 않는다.
    if (menuName === '') {
      alert('값을 입력해주세요')
      return
    }

    await MenuAPI.createMenuInCategory(this.currentCategory, menuName)

    const allMenuByCategory = await MenuAPI.fetchAllMenuByCategory(this.currentCategory)
    this.menu[this.currentCategory] = allMenuByCategory
    this.render()
    $('#menu-name').value = ''
  }

  /**
   *
   * @param {Event} e
   * Menu를 수정하는 함수
   */
  async editMenuName(e) {
    const menuId = e.target.closest('li').dataset.menuId
    const $menuName = e.target.closest('li').querySelector('.menu-name')
    const editedMenuName = prompt('메뉴명을 수정하세요.', $menuName.innerText)
    if (!editedMenuName) return
    await MenuAPI.updateMenu(this.currentCategory, menuId, editedMenuName)
    const allMenuByCategory = await MenuAPI.fetchAllMenuByCategory(this.currentCategory)
    this.menu[this.currentCategory] = allMenuByCategory
    this.render()
  }

  /**
   *
   * @param {Event} e
   * Menu를 삭제하는 함수
   */
  removeMenuName(e) {
    const menuId = e.target.closest('li').dataset.menuId
    if (confirm('정말 삭제하시겠습니까?')) {
      this.menu[this.currentCategory].splice(Number(menuId), 1)
      store.setLocalStorage(this.menu)
      this.render()
      this.updateMenuCount()
    }
  }

  /**
   * @param {Event} e
   */
  soldOutMenu(e) {
    const menuId = e.target.closest('li').dataset.menuId
    this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut
    store.setLocalStorage(this.menu)
    this.render()
  }

  initEventListener() {
    // form 태그가 id 값을 전송하는 것을 막는다.
    $('#menu-form')
      .addEventListener('submit', (e) => {
        e.preventDefault()
      })

    $('#menu-submit-button').addEventListener('click', this.addMenuName)

    $('#menu-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('menu-edit-button')) {
        this.editMenuName(e)
        return
      }

      if (e.target.classList.contains('menu-remove-button')) {
        this.removeMenuName(e)
        return
      }

      if (e.target.classList.contains('menu-sold-out-button')) {
        this.soldOutMenu(e)
        return
      }
    })

    // 메뉴 입력값을 받는다.
    $("#menu-name")
      .addEventListener("keypress", (e) => {
        // q 버튼을 눌렀을 때, alert 창이 뜨게 돼서 예외 처리
        if (e.key !== 'Enter') return

        this.addMenuName()
      })

    // 버튼을 클릭했을 때 메뉴가 바뀐다.
    $('nav').addEventListener('click', async (e) => {
      const hasCategoryName = e.target.classList.contains('cafe-category-name')
      if (hasCategoryName) {
        const categoryName = e.target.dataset.categoryName
        this.currentCategory = categoryName
        $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`
        const allMenuByCategory = await MenuAPI.fetchAllMenuByCategory(this.currentCategory)
        this.menu[this.currentCategory] = allMenuByCategory
        this.render()
      }
    })
  }
}

const app = new App()
app.init()
