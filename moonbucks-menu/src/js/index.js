/**
 * @param {string} selector
 */

const $ = (selector) => document.querySelector(selector)

function App() {
  // form 태그가 id 값을 전송하는 것을 막는다.
  $('#espresso-menu-form')
    .addEventListener('submit', (e) => {
      e.preventDefault()
    })

  function updateMenuCount() {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length
    $('.menu-count').innerText = `총 ${menuCount}개`
  }

  function addMenuName() {
    // Input이 빈 값이면 입력을 받지 않는다.
    const espressoMenuName = $("#espresso-menu-name").value

    if (espressoMenuName === '') {
      alert('값을 입력해주세요')
      return
    }

    const setMenuItemTemplate = (espressoName) => `
      <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${espressoName}</span>
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
    `

    const menuList = $('#espresso-menu-list')
    menuList.insertAdjacentHTML("beforeend", setMenuItemTemplate(espressoMenuName))

    // 메뉴 Count 업데이트
    updateMenuCount()

    // Input을 빈 값으로 초기화하기
    $('#espresso-menu-name').value = ''
  }

  $('#espresso-menu-submit-button')
    .addEventListener('click', () => {
      addMenuName()
    })

  $('#espresso-menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      const $menuName = e.target.closest('li').querySelector('.menu-name')
      const editedMenuName = prompt('메뉴명을 수정하세요.', $menuName.innerText)
      $menuName.innerText = editedMenuName
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