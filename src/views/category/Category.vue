<template>
<div class="wrapper">
  <ul class="content">
    <button @click="btnClick">按钮</button>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
  </ul>
</div>
  
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Category",
    data(){
      return{
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        probeType: 3,
        pullUpload: true
      })
      //事件监听
      this.scroll.on('scroll',(position) => console.log(position))
      this.scroll.on('pullUpload',()=> console.log('上拉加载更多'))
    },
    methods: {
      btnClick(){
        console.log('btnClick');
      }
    }
  }
</script>

<style scoped>
.wrapper {
  height: 100px;
  background-color: paleturquoise;
  overflow: hidden;
}
</style>
