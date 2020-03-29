<template>
  <div>
      <nav-bar class="navbar">
          <div slot="left" class="back" @click="backClick">
              <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot="center" class="title">
                <div class="title-item" :class="{active:currentIndex===index}" v-for="(item,index) in title" :key="index" @click="itemClick(index)">{{item}}</div>      
          </div> 
      </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
    name:'DetailNavBar',
    components: {
        NavBar
    },
    data () {
        return {
            title:['商品','参数','评论','推荐'],
            currentIndex:0,
        }
    },
    deactivated () {
      this.currentIndex=0;  
    },
    methods: {
        backClick(){
            this.$router.back();
        },
        itemClick(index){  
            this.currentIndex = index;
            this.$emit('itemclick',index);

        }
    }
}
</script>

<style scoped>
.title{
    display: flex;
}
.title-item{
    flex: 1;
}
.back{
    margin-top: 5px;
}
.active{
    color: var(--color-high-text);
}
</style>