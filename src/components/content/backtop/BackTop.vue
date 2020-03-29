<template>
  <div class="back-top">
      <img src="~assets/img/common/top.png" alt="" @click="click">
  </div>
</template>

<script>
export default {
    name:'BackTop',
    methods: {
        click(){
            //console.log('dianji');
            this.$emit('backtopclick')
        }
    }

}
</script>

<style scoped>
.back-top{
    position: fixed;
    right: 10px;
    bottom: 55px;
}
.back-top img{
    height: 50px;
    width: 50px;
}
</style>

