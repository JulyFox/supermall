<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      class="tab-control"
      ref="tabControl1"
      v-show="istabTop"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      :pull-up-load="true"
    >
      <home-swiper :banners="banners" @swiperLoad="swiperLoad" />
      <recommend-view :recommends="recommends" />
      <feture-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        class="tab-control"
        ref="tabControl"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FetureView from "./childComps/FetureView";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FetureView,

    NavBar,
    Scroll,
    BackTop,
    TabControl,
    GoodsList
  },
  data() {
    return {
      result: null,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabTopoff: 0,
      istabTop: false,
      saveY : 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  destroyed() {
    console.log("destroyed");
  },
  deactivated() {//离开一个路由时的生命周期
    console.log("deactivated")
    this.saveY = this.$refs.scroll.getScrollY();//记录离开时的位置
  },
  activated() {//进入一个路由时生命周期函数
    console.log("activated")
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  created() {
    //
    // 1请求多个数据
    this.getHomeMultidata(),
      // 请求商品数据
      this.getHomeGoods("pop"),
      this.getHomeGoods("new"),
      this.getHomeGoods("sell");
  },
  mounted() {
    //DOM已经挂载
    // 3 监听item中图片加载完成
    const refresh = this.debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("itemImgLoad", () => {
      //监听总线
      refresh();
    });
  },
  methods: {
    // 网络请求相关
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res);
        this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
    // 事件监听相关
    debounce(func, delay) {
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0); //访问scroll组件的scrollTo()方法
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
      this.istabTop = -position.y > this.tabTopoff;
    },
    loadMore() {
      console.log("111");
      this.getHomeGoods(this.currentType);
      console.log(this.currentType);
    },
    swiperLoad() {
      this.tabTopoff = this.$refs.tabControl.$el.offsetTop; //监听子组件
    }
  }
};
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
