<template>
  <div class="nav-bar ignore">
    <div class="left"><slot name="left"/></div>
    <div class="center"><slot name="center"/></div>
    <div class="right"><slot name="right"/></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,0.1);
  }

  .left {
    width: 60px;
  }

  .right {
    width: 60px;
  }

  .center {
    flex: 1;
  }
</style>