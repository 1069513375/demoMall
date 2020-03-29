<template>
    <div id="detail">
        <detail-nav-bar @itemclick="itemClick" ref="navbar"></detail-nav-bar>
        <b-scroll class="detail-bscroll" ref="detailBs" :probeType="3" @scroll="probeScroll">
          <detail-swiper :topImages="topImages" ref="detailSwiper"></detail-swiper>
          <detail-base-info :goods="goodsData"></detail-base-info>
          <detail-shop-info :shop="shopData"></detail-shop-info>
          <detail-goods-info :detailInfo="detailInfo" class="detail-goods-info" @imgload="imgload" ></detail-goods-info>
          <detail-param-info :paramInfo="goodsParam" ref="param"></detail-param-info >
          <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
          <goods-list :goods="recommend" ref="recommend"></goods-list>
        </b-scroll>
        <detail-bottom-bar @addcart="addToCart"></detail-bottom-bar>
    </div>
</template>

<script>
//1.子组件
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
//2.公共组件
import BScroll from "components/common/scroll/Scroll"
import GoodsList from "components/content/goods/GoodsList"
//3.网络请求相关
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
//4.公共方法
import {debounce} from 'common/utils'

import {mapActions} from 'vuex';


export default {
    name:'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      BScroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar
    },
    data () {
      return {
        iid:null,
        topImages:[],
        goodsData:{},
        shopData:{},
        detailInfo:{},
        goodsParam:{},
        commentInfo:{},
        recommend:{},
        imgLoadListener:{},
        themeOffsetTop:[0,0,0,0],
        getThemeTop:{}
      }
    },
    created () {
       this.iid = this.$route.params.iid;
       //发送网络请求
       getDetail(this.iid).then((res)=>{
          // console.log(res);
          const data = res.result;
          //1.获取顶部图片
          this.topImages = data.itemInfo.topImages
          //2.封装Goods对象
          this.goodsData = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
          //3.封装shop对象
          this.shopData = new Shop(data.shopInfo);
          //4.获取detailInfo
          this.detailInfo = data.detailInfo;
          //5.封装商品参数
          this.goodsParam = new GoodsParam(data.itemParams.info,data.itemParams.rule)
          //6.封装评论
          this.commentInfo = data.rate.list[0];
       })
       //获取推荐list
       getRecommend().then((res)=>{
         //console.log(res);
         this.recommend = res.data.list;
       })
       //封装获取 商品 参数 评论 推荐的防抖方法
       this.getThemeTop = debounce(()=>{
          this.themeOffsetTop = [];
          this.themeOffsetTop.push(0);
          this.themeOffsetTop.push(this.$refs.param.$el.offsetTop);
          this.themeOffsetTop.push(this.$refs.comment.$el.offsetTop);
          this.themeOffsetTop.push(this.$refs.recommend.$el.offsetTop);
          //console.log(this.themeOffsetTop);
        },100)

    },
    mounted () {
      //this.$refs.detailBs.refresh();
      //1.用于解决bscroll的图片高度未加载问题 每次图片加载完成后都向home组件发送信息 每次接收信息后执行refresh刷新bscroll的高度 函数防抖后可减少refresh次数 提升性能
      const refresh = debounce(this.$refs.detailBs.refresh,200);
      //2.开启图片加载完成监听 $bus--事件总线 需在vue原型中添加 Vue.prototype.$bus = new Vue();
      this.imgLoadListener = ()=>{
        //在图片加载完成后 刷新better-scroll组件的高度
        refresh();
    }
      this.$bus.$on('itemimgload',this.imgLoadListener)
    },
    destroyed () {
      this.$bus.$off('itemimgload',this.imgLoadListener)
    },
    methods: {
      ...mapActions(['addCart']),
      imgload(){
        //console.log('giao');
        this.$refs.detailBs.refresh();//此处为了刷新商品图片 mounted是刷新goodslist高度
         this.getThemeTop();

      },
      itemClick(index){
        //console.log(index);
        this.$refs.detailBs.scrollTo(0,-this.themeOffsetTop[index],500);
      },
      addToCart(){
        const obj = {};
        obj.image = this.topImages[0];
        obj.title = this.goodsData.title;
        obj.desc = this.goodsData.desc;
        obj.price = this.goodsData.newPrice;
        obj.iid = this.iid;
        obj.checked = true;
        //console.log(obj);
        //将商品添加到购物车中
        //console.log(mapActions);
        this.addCart(obj).then(res=>{
          this.$toast.toastShow(res)
        })
      },
      probeScroll(position){
        //console.log(position);
        const y = -position.y;
        const arr = this.themeOffsetTop;
        for(let i = 0;i<arr.length;i++){
          if(this.$refs.navbar.currentIndex!=i&&(i<arr.length-1&&y>=arr[i]&&y<arr[i+1])||(i===arr.length-1&&y>=arr[i])){
            this.$refs.navbar.currentIndex = i;
          }
        }
      }
    }
}
</script>

<style scoped>
  #detail{
    height: 100vh;
    position: relative;
  }
  .detail-bscroll{
    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
    overflow: hidden;
  }
  .detail-goods-info{
    position: relative;
  }
  /* .bottombar{

  } */
</style>
