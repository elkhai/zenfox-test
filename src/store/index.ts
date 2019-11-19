import Vue from 'vue'
import Vuex from 'vuex'
import { createStore } from 'vuex-smart-module'
import { RootModule } from './modules'

Vue.use(Vuex)

export const store = createStore(RootModule)
