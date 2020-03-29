<template>
  <div id="home">
    <nav-bar class="home-nav">  
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :title="tabCtrlTitle" 
                     class="tab-controll" 
                     @tabclick="tapclick" v-show="isShowTabCtrl"/>
    <b-scroll class="content" ref="bScroll" 
                              :probe-type="3" :pull-up-load="true"
                              @scroll="backScroll" 
                              @pullingup="pullingUp">
      
        <home-swiper :banner="banner" class="home-swiper"  @swiperload ="swiperload" v-show="isShowSwiper"></home-swiper>
        <recommend-view :recommend="recommend"></recommend-view>
        <featrue-view class="featrue-view"></featrue-view>
        <tab-control :title="tabCtrlTitle" 
                     class="tab-controll" 
                     @tabclick="tapclick" ref="tabcontrol"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
    </b-scroll>
    <back-top @backtopclick="backTopClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
//1.导入组件
//子组件
import HomeSwiper from "./childComponents/HomeSwiper"
import RecommendView from './childComponents/RecommendView'
import FeatrueView from './childComponents/FeatureView'
//公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/common/tabcontrol/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import BScroll from "components/common/scroll/Scroll"
import BackTop from "components/content/backtop/BackTop"
//2.导入network相关
import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home'
//3.导入公共方法
import {
    debounce,
} from 'common/utils'
import { get } from 'http';
//import { error } from 'util';
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatrueView,
    TabControl,
    GoodsList,
    BScroll,
    BackTop

  },
  data () {
    return {
        banner:[],
        dKeyword:[],
        keywords:[],
        recommend:[],
        tabCtrlTitle:['流行','新款','精选'],
        goods:{
          pop:{
            page:0,
            list:[]
          },
          new:{
            page:0,
            list:[]
          },
          sell:{
            page:0,
            list:[]
          }
        },
        //tab-control类型
        currentTab:'pop',
        tabOffsetTop:0,
        isShowTabCtrl:false,
        isShowBackTop:false,
        scrollY:0,
        isShowSwiper:true,
        imgLoadListener:{},
    }
  },
  created () {
    //1.请求多个数据
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  destroyed () {
    console.log('home destroyed')
  },
  mounted () {
    //1.用于解决bscroll的图片高度未加载问题 每次图片加载完成后都向home组件发送信息 每次接收信息后执行refresh刷新bscroll的高度 函数防抖后可减少refresh次数 提升性能
    const refresh = debounce(this.$refs.bScroll.refresh,200);
    //2.开启图片加载完成监听 $bus--事件总线 需在vue原型中添加 Vue.prototype.$bus = new Vue();
    this.imgLoadListener = ()=>{
      //在图片加载完成后 刷新better-scroll组件的高度
        refresh();
    }
    this.$bus.$on('itemimgload',this.imgLoadListener)
  },
  activated () {
     //console.log('来了'+ this.scrollY);
     this.$refs.bScroll.refresh();
     this.$refs.bScroll.scrollTo(0,this.scrollY,0)
     
  },
  deactivated () {
    //console.log(this.$refs.bScroll.getScrollY());
    //记录离开该页面时 y轴高度
    
    this.scrollY = this.$refs.bScroll.getScrollY()
    //关闭事件总线中对图片加载的监听
    this.$bus.$off('itemimgload',this.imgLoadListener);
  },
  computed: {
    showGoods(){
      return this.goods[this.currentTab].list;
    },
  },
  methods: {
    //动作监听
    tapclick(index){
      switch(index){
        case 0:
          this.currentTab = 'pop';
          break;
        case 1:
          this.currentTab = 'new';
          break;
        case 2:
          this.currentTab = 'sell';
          break;
      }
    },
    backScroll(position){
      this.isShowBackTop = (-position.y) > 1000
      this.isShowTabCtrl = (-position.y) >this.tabOffsetTop
      //this.isShowSwiper = (-position.y) < 1000
    },
    pullingUp(){
      //console.log('giao');
       this.getHomeGoods(this.currentTab);
       //this.$refs.bScroll.finishPullUp; 
    },
    backTopClick(){
      //console.log('返回顶部-监听到了');   
      this.$refs.bScroll.scrollTo(0,0);
    },
    swiperload(){
      // 1.console.log('homeswiper图片加载完了');
      // 2.获取tab-control的offsettop属性
      // console.log(this.$refs.tabcontrol.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabcontrol.$el.offsetTop;
    },
    // 网络请求
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
          //console.log(res.data)
          this.banner = res.data.banner.list;
          this.isShow = true;
          this.dKeyword = res.data.dKeyword.list;
          this.keywords = res.data.keywords.list;
          this.recommend = res.data.recommend.list;  
        })
    },
    getHomeGoods(type){
      const page = ++this.goods[type].page;
      
      //下面的这个是通过import的network方法
       getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list);
        
        //完成上拉加载更多
        this.$refs.bScroll.finishPullUp();
      })
    }
  },

};

</script>

<style scoped>
#home{
  height: 100vh;
  position: relative;
}
.home-nav {
  /* background-image: linear-gradient(141deg,#f7bbea 20%,#c685fc 51%,#33ccfa 75%); */
  background-image: linear-gradient(to right, #ff9569 0%, #ff4070 100%);
  color: white;
  font-weight: 500;
  /* position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 9;  */
}
.content{
  position: absolute;
  top:44px;
  bottom: 49px;
  left: 0px;
  right: 0px;
  overflow: hidden;
}
.tab-controll{
  position: relative;
  z-index: 9;
}
/* .featrue-view{
  width: 100%;
} */
</style>