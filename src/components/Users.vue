<template>
  <span v-if="isUsersListLoadingInProgress">loading...</span>
  <div class="content" v-else-if="isUsersListSuccessfullyLoaded">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in list" v-bind:key="user.id">
          <td>{{user.username}}</td>
          <td>{{user.email}}</td>
          <td>{{user.phone}}</td>
        </tr>
      </tbody>
    </table>
    <div></div>
  </div>
  <div class="error-container" v-else-if="isUsersListCatchError">
    <span class="error-message">Error</span>
    <button v-on:click="loadUsers">Try again</button>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { UsersModuleMapper, loadingState } from '@/store/modules/UsersModule'

  const Super = Vue.extend({
    computed: UsersModuleMapper.mapState(['list', 'loadingState']),
    methods: UsersModuleMapper.mapActions({ loadUsers: 'loadUsers' })
  })

  @Component
  export default class Users extends Super {
    get isUsersListLoadingInProgress() {
      return this.loadingState === loadingState.loading
    }

    get isUsersListSuccessfullyLoaded() {
      return this.loadingState === loadingState.success
    }

    get isUsersListCatchError() {
      return this.loadingState === loadingState.error
    }

    mounted() {
      this.loadUsers()
    }
  }
</script>
<style scoped>
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .error-message {
    color: lightcoral;
  }
</style>
