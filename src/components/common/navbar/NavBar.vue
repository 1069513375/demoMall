<template>
  <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center">center</slot></div>
      <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
    name:'NavBar'
}
</script>

<style scoped>
.left,.right{
    width: 20%;
}
.center{
    width: 60%;
}

.nav-bar{
    /* 行高 导航栏通常44px  */
    height:44px;
    line-height: 44px; /*有内容之后才能撑起高度 */
    text-align: center;
    width: 100%;
    display: flex;
    box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
    
 
}
</style>