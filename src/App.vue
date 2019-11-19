<template>
  <router-view />
</template>
<style>
  a {
    cursor: pointer;
  }
  a[disabled] {
    pointer-events: none;
    cursor: default;
    color: #0064c1;
  }
</style>
