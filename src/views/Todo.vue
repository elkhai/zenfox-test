<template>
  <div>
    <router-link to='/'>Go back</router-link>
    <h2>{{selectedUser.name}}</h2>
    <h3>{{userId}}</h3>
    <todo v-bind:list="list"/>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import { UsersModuleMapper } from '@/store/modules/UsersModule'
  import { TodoModuleMapper } from '@/store/modules/TodoModule'
  import Todo from '@/components/Todo.vue'

  const Super = Vue.extend({
    props: {
      userId: String
    },
    computed: {
      ...UsersModuleMapper.mapGetters(['selectedUser']),
      ...TodoModuleMapper.mapState(['list'])
    },
    methods: {
      ...TodoModuleMapper.mapActions(['loadTodos']),
      ...TodoModuleMapper.mapMutations(['setList']),
    },
    components: {
      todo: Todo
    }
  })

  @Component
  export default class TodoView extends Super {
    mounted() {
      this.loadTodos(this.userId)
    }
    beforeDestroy() {
      this.setList([])
    }
  }
</script>
