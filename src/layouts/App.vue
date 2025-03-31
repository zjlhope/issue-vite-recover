<template>
  <div class="ct">
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
</script>

<style>
  html,
  body {
    padding: 0;
    margin: 0;
    height: 100%;
  }
  /* .ct{padding:40px;} */
  .main {
    margin-left: 10px;
    flex-grow: 1;
    overflow: auto;
    /* background: #ccc; */
  }
</style>