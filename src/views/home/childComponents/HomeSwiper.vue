<template>
      <swiper class="home-swiper">
        <swiper-item v-for="(item,index) in banner" v-bind:key="index" >
          <a :href="item.link">
            <img :src="item.image" alt="" @load="swiperload">
          </a>
        </swiper-item>
    </swiper>
</template>

<script>

import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name:'HomeSwiper',
    props: {
        //一定要初始化
        banner:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return{
            isitemload:false
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    methods: {
        swiperload(){
            if(!this.isitemload){
                this.$emit('swiperload')
                this.isitemload = true
            }
        }
    }
    
}
</script>

<style>

</style>