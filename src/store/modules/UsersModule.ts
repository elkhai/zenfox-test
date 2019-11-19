import { Module, Mutations, Actions, createMapper, Getters } from 'vuex-smart-module'
import { ApiService } from '@/services/ApiService'

interface User {
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
  list: Array<User> = []
}

class UsersGetters extends Getters<UsersState> {}

class UsersMutations extends Mutations<UsersState> {
  updateLoadingState(newState: loadingState) {
    this.state.loadingState = newState
  }
  setUsersList(newList: Array<User>) {
    this.state.list = newList
  }
}

class UsersActions extends Actions<UsersState, UsersGetters, UsersMutations, UsersActions> {
  async loadUsers() {
    this.commit('updateLoadingState', loadingState.loading)
    try {
      const { status, data } = await ApiService.getUsers(this.state.page, this.state.limit)
      if (status === 200) {
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
}

export const UsersModule = new Module({
  state: UsersState,
  mutations: UsersMutations,
  actions: UsersActions
})

export const UsersModuleMapper = createMapper(UsersModule)
