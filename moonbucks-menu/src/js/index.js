/**
 * @param {string} selector
 */

const $ = (selector) => document.querySelector(selector)

const store = {
  setLocalStorage(menu) {
    localStorage.setItem('menus', JSON.stringify(menu))
  },
  getLocalStorage() {
    localStorage.getItem('menus')
  }
}

function App() {
  // State: 변화할 수 있는 데이터
  // - menuName
  const menu = []

  function updateMenuCount() {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length
    $('.menu-count').innerText = `총 ${menuCount}개`
  }

  function addMenuName() {
    const espressoMenuName = $("#espresso-menu-name").value

    // Input이 빈 값이면 입력을 받지 않는다.
    if (espressoMenuName === '') {
      alert('값을 입력해주세요')
      return
    }

    menu.push({ name: espressoMenuName })
    store.setLocalStorage(menu)
    const templates = menu.map((menuName, index) => `
      <li data-menu-id=${index} class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menuName.name}</span>
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

    $('#espresso-menu-list').innerHTML = templates
    updateMenuCount()
    $('#espresso-menu-name').value = ''
  }

  /**
   *
   * @param {Event} e
   * Menu를 수정하는 함수
   */
  function editMenuName(e) {
    const menuId = e.target.closest('li').dataset.menuId
    const $menuName = e.target.closest('li').querySelector('.menu-name')
    const editedMenuName = prompt('메뉴명을 수정하세요.', $menuName.innerText)
    if (!editedMenuName) return
    menu[menuId].name = editedMenuName
    store.setLocalStorage(menu)
    $menuName.innerText = editedMenuName
  }

  /**
   *
   * @param {Event} e
   * Menu를 삭제하는 함수
   */
  function removeMenuName(e) {
    const $menuName = e.target.closest('li')
    if (confirm('정말 삭제하시겠습니까?')) {
      $menuName.remove()
    }
    updateMenuCount()
  }

  // form 태그가 id 값을 전송하는 것을 막는다.
  $('#espresso-menu-form')
    .addEventListener('submit', (e) => {
      e.preventDefault()
    })

  $('#espresso-menu-submit-button').addEventListener('click', addMenuName)

  $('#espresso-menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      editMenuName(e)
    }

    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e)
    }
  })

  // 메뉴 입력값을 받는다.
  $("#espresso-menu-name")
    .addEventListener("keypress", (e) => {
      // q 버튼을 눌렀을 때, alert 창이 뜨게 돼서 예외 처리
      if (e.key !== 'Enter') return

      addMenuName()
    })
}

App()