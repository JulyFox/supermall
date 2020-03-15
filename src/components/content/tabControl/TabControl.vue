<template>
  <div class="tab-control">
    <div class="tab-control-item"
         v-for="(item, index) in titles"
         :class="{active: currentIndex === index}"
         @click="itemClick(index)" :key="item">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      // 内部监听点击，发送你所点击的那个数据发送到父组件
      itemClick(index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .tab-control-item.active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>