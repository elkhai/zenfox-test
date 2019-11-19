import { Module, Mutations, Actions, createMapper, Getters } from 'vuex-smart-module'
import { ApiService } from '@/services/ApiService'
import router from '@/router'

interface IUser {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: { lat: string; lng: string }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export enum loadingState {
  loading,
  success,
  error
}

class UsersState {
  loadingState: loadingState = loadingState.loading
  limit: number = 5
  page: number = 1
  total: number = 0
  list: Array<IUser> = []
  selectedUserIndex: number = NaN
}

class UsersGetters extends Getters<UsersState> {
  get pages() {
    // Round to larger value(for cases, when backend may change total users count, and don't notify about that)
    return Math.ceil(this.state.total/this.state.limit)
  }
  get selectedUser() {
    return this.state.list[this.state.selectedUserIndex]
  }
}

class UsersMutations extends Mutations<UsersState> {
  updateLoadingState(newState: loadingState) {
    this.state.loadingState = newState
  }
  setUsersList(newList: Array<IUser>) {
    this.state.list = newList
  }
  setTotalCount(newCount: number) {
    this.state.total = newCount
  }
  setPage(page: number) {
    this.state.page = page
  }
  setSelectedUserIndex(index: number) {
    this.state.selectedUserIndex = index
  }
}

class UsersActions extends Actions<UsersState, UsersGetters, UsersMutations, UsersActions> {
  async loadUsers() {
    this.commit('updateLoadingState', loadingState.loading)
    try {
      const { status, data, headers } = await ApiService.getUsers(this.state.page, this.state.limit)
      if (status === 200) {
        this.commit('setTotalCount', Number(headers['x-total-count']))
        this.commit('setUsersList', data)
        this.commit('updateLoadingState', loadingState.success)
      } else {
        this.commit('updateLoadingState', loadingState.error)
      }
    } catch(e) {
      this.commit('updateLoadingState', loadingState.error)
      console.error(e)
    }
  }
  setPageAndLoadUsers(page:number) {
    this.commit('setPage', page)
    this.dispatch({ type: 'loadUsers' })
  }
  setSelectedUserIndexAndGoToTodoPage(payload: { index: number, userId: number }) {
    this.commit('setSelectedUserIndex', payload.index)
    router.push({ path: `/todo/${payload.userId}` })
  }
}

export const UsersModule = new Module({
  state: UsersState,
  getters: UsersGetters,
  mutations: UsersMutations,
  actions: UsersActions
})

export const UsersModuleMapper = createMapper(UsersModule)
