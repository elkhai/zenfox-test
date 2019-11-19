import { Module, Mutations, Actions, createMapper, Getters } from 'vuex-smart-module'
import { ApiService } from '@/services/ApiService'

enum loadingState {
  loading,
  success,
  error
}

export interface ITodoItem {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

class TodoState {
  loadingState: loadingState = loadingState.loading
  list: Array<ITodoItem> = []
}

class TodoGetters extends Getters<TodoState> {}

class TodoMutations extends Mutations<TodoState> {
  setList(list: Array<ITodoItem>) {
    this.state.list = list
  }
  setLoadingState(state: loadingState) {
    this.state.loadingState = state
  }
}

class TodoActions extends Actions<TodoState, TodoGetters, TodoMutations> {
  async loadTodos(id: string) {
    this.commit('setLoadingState', loadingState.loading)
    try {
      const { status, data } = await ApiService.getTodos(id)
      if (status === 200) {
        this.commit('setLoadingState', loadingState.success)
        this.commit('setList', data)
      } else {
        this.commit('setLoadingState', loadingState.error)
      }
    } catch (e) {
      console.log(e)
      this.commit('setLoadingState', loadingState.error)
    }
  }
}

export const TodoModule = new Module({
  state: TodoState,
  getters: TodoGetters,
  mutations: TodoMutations,
  actions: TodoActions
})

export const TodoModuleMapper = createMapper(TodoModule)