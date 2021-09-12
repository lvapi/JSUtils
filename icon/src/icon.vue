<template>
  <i :class="'el-icon-' + name"></i>
</template>

<script>
  export default {
    name: 'ElIcon',
    // 引入属性并绑定
    props: {
      name: String
    }
  };
</script>
