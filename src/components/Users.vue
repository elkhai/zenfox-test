<template>
  <div class="error-container" v-if="isUsersListCatchError">
    <span class="error-message">Error</span>
    <button v-on:click="loadUsers">Try again</button>
  </div>
  <div class="content" v-else>
    <table v-if="isUsersListSuccessfullyLoaded">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in list" v-bind:key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
        </tr>
      </tbody>
    </table>
    <!-- <span v-bind:active="isUsersListLoadingInProgress" class="loading-message">loading...</span> -->
    <div>
      <a class="page" v-for="n in pages" v-bind:disabled="n === page" v-bind:key="n" v-on:click="if (n !== page) setPageAndLoadUsers(n)">{{ n }}</a>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { UsersModuleMapper, loadingState } from '@/store/modules/UsersModule'

  const Super = Vue.extend({
    computed: {
      ...UsersModuleMapper.mapState(['list', 'loadingState', 'page']),
      ...UsersModuleMapper.mapGetters(['pages'])
    },
    methods: {
      ...UsersModuleMapper.mapActions(['loadUsers', 'setPageAndLoadUsers']),
    }
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
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    /* width: 500px; */
  }
  .loading-message {
    background-color: rgba(255, 255, 255, 0);
    position: absolute;
    left: 0px;
    top: 0px;
    min-height: 195px;
    min-width: 500px;
    text-align: center;
    line-height: 195px;
    transition: 0 0.2s background-color ease-in;
  }
  .loading-message:active {
    background-color: rgba(255, 255, 255, .3);
  }
  .page {
    cursor: pointer;
    display: inline-block;
    text-align: center;
    line-height: 28px;
    width: 30px;
    height: 30px;
    margin-right: 5px;
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
