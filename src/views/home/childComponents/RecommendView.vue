<template>
<div class="recommend">
    <div v-for="(item,index) in recommend" :key="index" class="recommend-item">
      <a :href="item.link"><img :src="item.image" alt=""></a>
      <h5>{{item.title}}</h5>
    </div>
</div>
  
</template>

<script>
export default {
    //推荐页面组件
    name:'RecommendView',
    props:{
        recommend:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
.recommend{
    display: flex;
    width:100%;
    text-align: center;
    font-size: 12px;
    padding: 5px 0 15px 0;
    border-bottom: 8px solid #eee;
}
.recommend-item{
    
    flex:1;
    /*  */
}
.recommend-item a img{
    width:68px;
    height:68px;
    margin-top: 5px;
    margin-bottom: 10px;
}


</style>