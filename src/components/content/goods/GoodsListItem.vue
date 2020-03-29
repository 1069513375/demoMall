<template>
  <div class="goods" @click.stop="itemClick">
      <img :src="showImages" alt="" @load="imgload">
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">¥{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:'GoodsListItem',
    props: {
        goodsItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed: {
      showImages(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      //监听图片是否加载完成
      imgload(){
        this.$bus.$emit('itemimgload')
      },
      //路由跳转
      itemClick(){
        if(this.goodsItem.iid){
            this.$router.push(
            '/detail/' + this.goodsItem.iid
          )
        }else if(this.goodsItem.item_id){
          this.$router.replace(
            '/detail/' + this.goodsItem.item_id
          )
        }
       
        //console.log(this.goodsItem.iid);
      }
    }
}
</script>

<style>
.goods {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods img {
    width: 100%;
    border-radius: 5px; 
  } 

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    /* overflow: hidden; */
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
    width: 14px;
    height: 14px;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>