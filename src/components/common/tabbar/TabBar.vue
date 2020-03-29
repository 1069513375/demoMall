<template>
  <div id="tab-bar">
      <slot></slot>
  </div>
</template>

<script>
export default {
    name:'TabBar'
}
</script>

<style>
#tab-bar{
    display: flex;
    background-color: #f6f6f6;
    /* 生成绝对定位的元素，相对于浏览器窗口进行定位。
    元素的位置通过 "left", "top", "right" 以及 
    "bottom" 属性进行规定。 */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

  }
  
</style>