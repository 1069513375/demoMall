<template>
  <div class="tab-bar-item" @click="itemClick">

      <div v-if=isActive><slot name="imgckd"></slot></div>
      <div v-else><slot name="imguckd"></slot></div>
      <div :style="activeStyle"><slot name="imgtext"></slot></div>

  </div>
</template>

<script>
export default {
    name:'TabBarItem',
    props: {
        path:String,
        activeColor:{
            type:String,
            default:'blue'
        }
    },
    methods: {
        itemClick(){
            this.$router.replace(this.path)
        }
    },
    computed: {
        isActive(){
            // console.log('1'+this.$route.path)
            // console.log('2'+this.path)
           return this.$route.path.indexOf(this.path) !==-1
        },
        activeStyle(){
            return this.isActive ? {color:this.activeColor}:{}
        }
    },
}
</script>

<style>
.tab-bar-item{
    flex: 1;
    text-align: center;
    /* 通常tabbar高度为49 */
    height: 49px;
    /* padding-top: 10px; */
    /* 依次为 水平阴影位置 垂直阴影位置 模糊距离 阴影颜色 */
    /* box-shadow: 0px -2px 1px rgba(182, 197, 226, 0.2); */
    font-size: 14px;
    color: gray

  }
  .tab-bar-item img{
      height: 20px;
      width: 20px;
      margin-top: 5px;
      /* 使元素垂直对齐 此处用于缩短文字与icon之间的间隙*/
      vertical-align: middle;
  }

</style>
