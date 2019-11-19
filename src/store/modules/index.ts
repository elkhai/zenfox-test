import { Module } from 'vuex-smart-module'
import { UsersModule } from './UsersModule'

export const RootModule = new Module({
  modules: {
    users: UsersModule
  }
})
