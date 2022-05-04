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

  // 메뉴 입력값을 받는다.
  $("#espresso-menu-name")
    .addEventListener("keypress", (e) => {
      // q 버튼을 눌렀을 때, alert 창이 뜨게 돼서 예외 처리
      if (e.key !== 'Enter') return

      // Input이 빈 값이면 입력을 받지 않는다.
      if ($('#espresso-menu-name').value === '') {
        alert('값을 입력해주세요')
        return
      }

      // Enter를 입력했다면 추가하기
      if (e.key === 'Enter') {
        const espressoMenuName = $("#espresso-menu-name").value
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
        $('#espresso-menu-list').insertAdjacentHTML("beforeend", setMenuItemTemplate(espressoMenuName))

        // 메뉴 Count 업데이트
        const menuCount = $('#espresso-menu-list').querySelectorAll('li').length
        $('.menu-count').innerText = `총 ${menuCount}개`

        // Input을 빈 값으로 초기화하기
        $('#espresso-menu-name').value = ''
      }
    })
}

App()