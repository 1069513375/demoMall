<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    props: {
        probeType:{//用于监听滚动
            type:Number,
            default:0
        },
        pullUpLoad:{//用于监听是否上拉加载
            type:Boolean,
            default:false
        }
    },
    data () {
        return {
            bscroll:{}      
        }
    },
    created () {
        this.$nextTick(()=>{
           
        })
    },
    mounted () {
         //1.创建实例
            this.bscroll = new BScroll(this.$refs.wrapper,{
                click:true,
                probeType:this.probeType,//只有该值为3才能开启监听屏幕滚动
                pullUpLoad:this.pullUpLoad,//只有该值为true才能开启监听上拉加载
            })
            //2.监听滚动
            if(this.probeType==2||this.probeType==3){
                this.bscroll.on('scroll',position=>{
                    //console.log(position);
                    this.$emit('scroll',position)     
                })
            }
            
            //3.监听上拉加载
            if(this.pullUpLoad){
                this.bscroll.on('pullingUp',()=>{
                    this.$emit('pullingup');
                     
                })
            }
    },
    methods: {
        scrollTo(x,y,time=500){
            //console.log('去这里',y);
            this.bscroll && this.bscroll.scrollTo(x,y,time)
        },
        refresh(){
            //console.log('---');
            this.bscroll && this.bscroll.refresh();
        },
        finishPullUp(){
            this.bscroll.finishPullUp();
        },
        getScrollY(){
            return this.bscroll ? this.bscroll.y:0;
        }
    }
}
</script>

<style>

</style>