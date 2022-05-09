const baseUrl = 'http://localhost:4000/api'

export default {
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
  },
  async toggleSoldOutMenu(category, id) {
    const response = await fetch(`${baseUrl}/category/${category}/menu/${id}/soldout`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) console.error('에러가 발생했습니다!')

    return response.json()
  },
  async deleteMenu(category, id) {
    const response = await fetch(`${baseUrl}/category/${category}/menu/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) console.error('에러가 발생했습니다!')
  }
}
