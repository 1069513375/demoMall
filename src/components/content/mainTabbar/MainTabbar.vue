<template>
  <div>
      <!-- <router-view></router-view> -->
      <tab-bar v-show="isShowTabbar">
      <tab-bar-item path='/home' activeColor='black'>
        <img slot="imgckd" src="~assets/img/tabbar_icon/icon_checked/icon-shouji.png" alt="">
        <img slot="imguckd" src="~assets/img/tabbar_icon/icon_unchecked/icon-shouji.png" alt="">
        <div slot="imgtext">首页</div>
      </tab-bar-item>
      <tab-bar-item path='/category' activeColor='black'>
        <img slot="imgckd" src="~assets/img/tabbar_icon/icon_checked/icon-search.png" alt="">
        <img slot="imguckd" src="~assets/img/tabbar_icon/icon_unchecked/icon-search.png" alt="">
        <div slot="imgtext">分类</div>
      </tab-bar-item>
      <tab-bar-item path='/cart' activeColor='black'>
        <img slot="imgckd" src="~assets/img/tabbar_icon/icon_checked/cart-add.png" alt="">
        <img slot="imguckd" src="~assets/img/tabbar_icon/icon_unchecked/cart-add .png" alt="">
        <div slot="imgtext">购物车</div>
      </tab-bar-item>
      <tab-bar-item path='/profile' activeColor='black'>
        <img slot="imgckd" src="~assets/img/tabbar_icon/icon_checked/icon-geren.png" alt="">
        <img slot="imguckd" src="~assets/img/tabbar_icon/icon_unchecked/icon-geren.png" alt="">
        <div slot="imgtext">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
export default {
    name:'MainTabbar',
    components: {
        TabBar,
        TabBarItem
  },
  computed: {
    isShowTabbar(){
      return this.$route.path.indexOf('/detail') == -1
    }
  }
  
}
</script>

<style>

</style>