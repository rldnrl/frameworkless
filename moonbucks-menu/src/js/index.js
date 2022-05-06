import { $ } from './utils'
import store from './store'

function App() {
  // State: 변화할 수 있는 데이터
  // - menuName

  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: []
  }

  this.currentCategory = 'espresso'

  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = JSON.parse(store.getLocalStorage())
    }
    render()
    initEventListener()
  }

  const render = () => {
    const templates = this.menu[this.currentCategory].map((menuName, index) => `
      <li data-menu-id=${index} class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 ${this.menu[this.currentCategory][index].soldOut ? 'sold-out' : ''} menu-name">${menuName.name}</span>
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
    updateMenuCount()
  }

  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length
    $('.menu-count').innerText = `총 ${menuCount}개`
  }

  const addMenuName = () => {
    const menuName = $("#menu-name").value

    // Input이 빈 값이면 입력을 받지 않는다.
    if (menuName === '') {
      alert('값을 입력해주세요')
      return
    }

    this.menu[this.currentCategory].push({ name: menuName })
    store.setLocalStorage(this.menu)

    render()
    $('#menu-name').value = ''
  }

  /**
   *
   * @param {Event} e
   * Menu를 수정하는 함수
   */
  const editMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId
    const $menuName = e.target.closest('li').querySelector('.menu-name')
    const editedMenuName = prompt('메뉴명을 수정하세요.', $menuName.innerText)
    if (!editedMenuName) return
    this.menu[this.currentCategory][menuId].name = editedMenuName
    store.setLocalStorage(this.menu)
    render()
  }

  /**
   *
   * @param {Event} e
   * Menu를 삭제하는 함수
   */
  const removeMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId
    const $menuName = e.target.closest('li')
    if (confirm('정말 삭제하시겠습니까?')) {
      this.menu[this.currentCategory].splice(Number(menuId), 1)
      store.setLocalStorage(this.menu)
      render()
      updateMenuCount()
    }
  }

  /**
   * @param {Event} e
   */
  const soldOutMenu = (e) => {
    const menuId = e.target.closest('li').dataset.menuId
    this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut
    store.setLocalStorage(this.menu)
    render()
  }

  const initEventListener = () => {
    // form 태그가 id 값을 전송하는 것을 막는다.
    $('#menu-form')
      .addEventListener('submit', (e) => {
        e.preventDefault()
      })

    $('#menu-submit-button').addEventListener('click', addMenuName)

    $('#menu-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('menu-edit-button')) {
        editMenuName(e)
        return
      }

      if (e.target.classList.contains('menu-remove-button')) {
        removeMenuName(e)
        return
      }

      if (e.target.classList.contains('menu-sold-out-button')) {
        soldOutMenu(e)
        return
      }
    })

    // 메뉴 입력값을 받는다.
    $("#menu-name")
      .addEventListener("keypress", (e) => {
        // q 버튼을 눌렀을 때, alert 창이 뜨게 돼서 예외 처리
        if (e.key !== 'Enter') return

        addMenuName()
      })

    $('nav').addEventListener('click', (e) => {
      const hasCategoryName = e.target.classList.contains('cafe-category-name')
      if (hasCategoryName) {
        const categoryName = e.target.dataset.categoryName
        this.currentCategory = categoryName
        $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`
        render()
      }
    })
  }
}

const app = new App()
app.init()
