export default {
  setLocalStorage(menu) {
    localStorage.setItem('menu', JSON.stringify(menu))
  },
  getLocalStorage() {
    return localStorage.getItem('menu')
  }
}
