<template>
  <div
    class="el-tab-pane"
    v-if="(!lazy || loaded) || active"
    v-show="active"
    role="tabpanel"
    :aria-hidden="!active"
    :id="`pane-${paneName}`"
    :aria-labelledby="`tab-${paneName}`"
  >
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'ElTabPane',

    componentName: 'ElTabPane',

    props: {
      label: String,
      labelContent: Function,
      name: String,
      closable: Boolean,
      disabled: Boolean,
      lazy: Boolean
    },

    data() {
      return {
        index: null,
        loaded: false
      };
    },

    computed: {
      // 如果本组件未设置closeable则获取父组件的closable
      isClosable() {
        return this.closable || this.$parent.closable;
      },
      active() {
        // 判断当前组件是否为激活状态
        const active = this.$parent.currentName === (this.name || this.index);
        if (active) {
          this.loaded = true;
        }
        return active;
      },
      paneName() {
        // 如果当前组件设置别名则使用别名否则使用下表名
        return this.name || this.index;
      }
    },

    updated() {
      this.$parent.$emit('tab-nav-update');
    }
  };
</script>
