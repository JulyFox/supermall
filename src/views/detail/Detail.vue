<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramsInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <detail-recommend-info :recommend-info="recommendInfo" />
      <goods-list ref="recommend" :goods="goodsList"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar />
  </div>
</template>
<script>
import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "../../network/detail";

import Scroll from "components/common/scroll/Scroll";
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import BackTop from "components/content/backTop/BackTop";

import GoodsList from 'components/content/goods/GoodsList'

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommendInfo: {},
      goodsList: [],
      isShowBackTop: false
    };
  },
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    BackTop
  },
  created() {
    // 1保存传入的iid
    this.iid = this.$route.params.iid;

    //2根据iid请求详情数据
    this._getDetail(this.iid);
    // 请求推荐
    this._getRecommend();
  },
  methods: {
    _getDetail() {
      getDetail(this.iid).then(res => {
        // 1获取轮播图数据
        console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages;
        // console.log(this.topImages);
        // 2、获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 3、创建店铺信息的对象
        this.shop = new Shop(data.shopInfo);
        // 4、保存商品的详情数据
        this.detailInfo = data.detailInfo;
        // 5、获取参数的信息
        this.paramsInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 取出商品信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      });
    },
    _getRecommend() {
      getRecommend().then(res => {
        this.goodsList = res.data.list[0];
      });
    },
    imageLoad() {
      this.$refs.scroll.refresh();
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
    }
  }
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>