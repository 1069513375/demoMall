<template>
<div>
     <div class="tab-control">
      <div v-for="(item,index) in title" :key="index" class="tab-control-item" :class="{active:currentIndex===index}">
          <span @click="itemClick(index)">{{item}}</span>
      </div>
  </div>
</div>
 
</template>

<script>
export default {
    name:'TabControl',
    props: {
        title:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    data () {
        return {
            currentIndex:0
        }
    },
    methods: {
        itemClick(index){
            this.currentIndex = index;
            this.$emit("tabclick",index);
        }
    }
}
</script>

<style>
.tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color:#fff;
}
.tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
}
.tab-control-item span{
    padding: 3px;
}
.active{
    color: var(--color-high-text);
}
.active span{
    border-bottom: 2px solid var(--color-high-text);
    
}
</style>