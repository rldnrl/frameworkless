export const HTTP_METHOD = {
  POST(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  },
  PUT(data) {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : null
    }
  },
  DELETE() {
    return {
      method: 'DELETE',
    }
  }
}

export const request = async (url, option) => {
  const response = await fetch(url, option)

  if (!response.ok) {
    alert('에러가 발생했습니다.')

    return
  }

  return response
}