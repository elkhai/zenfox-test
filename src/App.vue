<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<style>
  a[disabled] {
    pointer-events: none;
    cursor: default;
    color: #0064c1;
  }
</style>
