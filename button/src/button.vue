<template>
  <button
    class="el-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <!-- loding为true时图标将不显示只显示正在加载状态 -->
    <i class="el-icon-loading" v-if="loading"></i>
    <!-- 当图标存在切不加载时显示 -->
    <i :class="icon" v-if="icon && !loading"></i>
    <!-- 判断显示组件插槽内容 -->
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
  export default {
    name: 'ElButton',
    // Provide/Inject 父组件向子组件注入信息当被表单组件包裹时获得信息
    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },

    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean
    },

    computed: {
      /* el-from-item 返回的是表单的 this对象 此时将会调用父组件的.elFormItemSize方法获得sizes属性的值用于控制组件的尺寸 */
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      // 用于控制组件的属性 size 的值为medium/samll/mini
      buttonSize() {
        return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      },
      // 获取父组件注入值disabled和传入值disabled为true时组件将被禁用
      buttonDisabled() {
        return this.disabled || (this.elForm || {}).disabled;
      }
    },

    methods: {
      // 触发父组件绑定方法
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
