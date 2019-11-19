import { Module } from 'vuex-smart-module'
import { UsersModule } from './UsersModule'
import { TodoModule } from './TodoModule'

export const RootModule = new Module({
  modules: {
    users: UsersModule,
    todo: TodoModule
  }
})
