import axios from 'axios'

export const ApiService = {
  getUsers(_page: number, _limit: number) {
    return this.api().get('/users', { params: { _page, _limit } })
  },

  getTodos(userId: string) {
    return this.api().get('/todos', { params: { userId } })
  },

  api() {
    return axios.create({
      baseURL: `https://jsonplaceholder.typicode.com`,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}
