import { HTTP_METHOD, request } from "./utils/api.js"

const baseUrl = 'http://localhost:4000/api'

export default {
  async fetchAllMenuByCategory(category) {
    const response = await request(`${baseUrl}/category/${category}/menu`)
    return response.json()
  },
  async createMenuInCategory(category, name) {
    const response = await request(`${baseUrl}/category/${category}/menu`, HTTP_METHOD.POST({ name }))
    return response.json()
  },
  async updateMenu(category, id, name) {
    const response = await request(`${baseUrl}/category/${category}/menu/${id}`, HTTP_METHOD.PUT({ name }) )
    return response.json()
  },
  async toggleSoldOutMenu(category, id) {
    const response = await request(`${baseUrl}/category/${category}/menu/${id}/soldout`, HTTP_METHOD.PUT())
    return response.json()
  },
  deleteMenu(category, id) {
    return request(`${baseUrl}/category/${category}/menu/${id}`, HTTP_METHOD.DELETE())
  }
}
