<template>
 <!-- /*
 * 扩展：如.prevent组织发生默认事件 等同于如：<a click= 'funcation(),return flase'>阻止点击a标签后发生页面跳转
 * .stop阻止事件冒泡 == event.stopPropagation()
   .capture子元素触发的事件在此触发后向下传递交由内部元素处理
   .self与事件捕获对应只在当前元素触发时生效子元素触发不生效
   .once点击事件只可触发一次（*只有此事件可用于自定义元素）
   .passive用于提升移动端性能会使.prevent失效不可结合使用
   使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击
 */ -->
  <!-- /*
  *事件触发流程:1.点击触发 switchValue方法
  */ -->
  <div
    class="el-switch"
    :class="{ 'is-disabled': switchDisabled, 'is-checked': checked }"
    role="switch"
    :aria-checked="checked"
    :aria-disabled="switchDisabled"
    @click.prevent="switchValue"
  >
    <input
      class="el-switch__input"
      type="checkbox"
      @change="handleChange"
      ref="input"
      :id="id"
      :name="name"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="switchDisabled"
      @keydown.enter="switchValue"
    >
    <span
      :class="['el-switch__label', 'el-switch__label--left', !checked ? 'is-active' : '']"
      v-if="inactiveIconClass || inactiveText">
      <i :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
      <span v-if="!inactiveIconClass && inactiveText" :aria-hidden="checked">{{ inactiveText }}</span>
    </span>
    <span class="el-switch__core" ref="core" :style="{ 'width': coreWidth + 'px' }">
    </span>
    <span
      :class="['el-switch__label', 'el-switch__label--right', checked ? 'is-active' : '']"
      v-if="activeIconClass || activeText">、
      <!-- //逻辑运算符的短路原理 active/inactiveIcon会导致忽略 activeText的值 -->
      <i :class="[activeIconClass]" v-if="activeIconClass"></i>
      <span v-if="!activeIconClass && activeText" :aria-hidden="!checked">{{ activeText }}</span>
    </span>
  </div>
</template>
<script>
  import emitter from 'element-ui/src/mixins/emitter';
  import Focus from 'element-ui/src/mixins/focus';
  import Migrating from 'element-ui/src/mixins/migrating';

  export default {
    name: 'ElSwitch',
    mixins: [Focus('input'), Migrating, emitter],
    inject: {
      elForm: {
        default: ''
      }
    },
    props: {
      value: {
        type: [Boolean, String, Number],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 40
      },
      activeIconClass: {
        type: String,
        default: ''
      },
      inactiveIconClass: {
        type: String,
        default: ''
      },
      activeText: String,
      inactiveText: String,
      activeColor: {
        type: String,
        default: ''
      },
      inactiveColor: {
        type: String,
        default: ''
      },
      activeValue: {
        type: [Boolean, String, Number],
        default: true
      },
      inactiveValue: {
        type: [Boolean, String, Number],
        default: false
      },
      name: {
        type: String,
        default: ''
      },
      validateEvent: {
        type: Boolean,
        default: true
      },
      id: String
    },
    data() {
      // 为什么不直接使用coreWidth的值而是使用data中的返回值？
      return {
        coreWidth: this.width
      };
    },
    created() {
      if (!~[this.activeValue, this.inactiveValue].indexOf(this.value)) {
        this.$emit('input', this.inactiveValue);
      }
    },
    computed: {
      // 如果当前绑定的值和出入的激活值相同则返回true
      checked() {
        return this.value === this.activeValue;
      },
      // provide/inject 判断from表单是否使用:disable属性
      switchDisabled() {
        return this.disabled || (this.elForm || {}).disabled;
      }
    },
    // **监听计算属性的checked的值 当计算属性的返回值改变时触发相应的方法  监听修改开关的样式
    watch: {
      checked() {
        this.$refs.input.checked = this.checked;
        if (this.activeColor || this.inactiveColor) {
          this.setBackgroundColor();
        }
        // ***未知知识点
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.change', [this.value]);
        }
      }
    },
    methods: {
      handleChange(event) {
        // 取和当前状态相反的值inactive->active active->inactive
        const val = this.checked ? this.inactiveValue : this.activeValue;
        // 触发值输入事件 返回新的v-model绑定值'value'更新dom 此时value重新触发计算属性
        this.$emit('input', val);
        // 触发改变数据前的回值
        this.$emit('change', val);
        this.$nextTick(() => {
          // set input's checked property
          // in case parent refuses to change component's value
          this.$refs.input.checked = this.checked;
        });
      },
      // 数据修改时触发
      setBackgroundColor() {
        let newColor = this.checked ? this.activeColor : this.inactiveColor;
        this.$refs.core.style.borderColor = newColor;
        this.$refs.core.style.backgroundColor = newColor;
      },
      // 判断开关是否被禁用 采用逻辑运算符的短路原理 如果为false 将不会调用handleChange()方法
      switchValue() {
        !this.switchDisabled && this.handleChange();
      },
      getMigratingConfig() {
        return {
          props: {
            'on-color': 'on-color is renamed to active-color.',
            'off-color': 'off-color is renamed to inactive-color.',
            'on-text': 'on-text is renamed to active-text.',
            'off-text': 'off-text is renamed to inactive-text.',
            'on-value': 'on-value is renamed to active-value.',
            'off-value': 'off-value is renamed to inactive-value.',
            'on-icon-class': 'on-icon-class is renamed to active-icon-class.',
            'off-icon-class': 'off-icon-class is renamed to inactive-icon-class.'
          }
        };
      }
    },
    mounted() {
      /* istanbul ignore if */
      this.coreWidth = this.width || 40;
      if (this.activeColor || this.inactiveColor) {
        this.setBackgroundColor();
      }
      this.$refs.input.checked = this.checked;
    }
  };
</script>
