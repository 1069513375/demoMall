<template>
  <div>
      <swiper class="detail-swiper">
          <swiper-item v-for="(item,index) in topImages" :key="index">
              <img :src="item" alt="">
          </swiper-item>
      </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index'
export default {
    name:'DetailSwiper',
    components: {
        Swiper, SwiperItem
    },
    props: {
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    },
    created () {
        
    },
    mounted () {
        //console.log(this.topImages);
    }
}
</script>

<style scoped>
    .detail-swiper{
        height: 300px;
    }
</style>