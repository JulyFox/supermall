<template>
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data(){
      return{
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      // imgLoad(){
      //   if(!this.isLoad){
      //     this.$emit("swiperLoad");
      //   this.isLoad = true;
      //   } 
      // }
      startTimer() {
	      this.$refs.swiper && this.$refs.swiper.startTimer()
      },
      stopTimer() {
        this.$refs.swiper && this.$refs.swiper.stopTimer()
      },
	    imgLoad() {
      	if (!this.isLoaded) {
      		this.$emit('swiperLoad')
          this.isLoaded = true
        }
	    }
    }
  }
</script>

<style scoped>

</style>
