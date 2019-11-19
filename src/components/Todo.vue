<template>
  <div>
    <div v-for="todo in list" v-bind:key="todo.id">
      <input disabled type="checkbox" v-bind:id="'id'+todo.id" v-bind:checked="todo.completed"><label v-bind:for="'id'+todo.id">{{todo.title}}</label>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ITodoItem } from '@/store/modules/TodoModule'

@Component({
  props: {
    list: Array
  }
})
export default class Todo extends Vue {

}
</script>