<template>
  <transition name="el-alert-fade">
    /*
    * 1. :class 用于动态绑定组件的显示样式 class的样式会总是生效 (1). 拓展 :class和class样式优先级：同为class级
    * 2. v-show 已经编译每次显示为控制display:none alert会多次渲染 v-if每次都会生成don节点所以选择使用 v-show
    * 3. role  用于说明标签的作用
    */
    <div class="white" :class="[black]"></div>
    <div
      class="el-alert"
      :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]" 
      v-show="visible"
      role="alert"
    >
      /*
      * icon 的编译渲染并不频繁使用 <v-if></v-if>
      */
      <i class="el-alert__icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
      <div class="el-alert__content">
        /*
        * 1.当具名组件插槽title有值 或者title 属性有值是显示
        * notes: || 运算返回的是具体的值而非boolean/false  a||b a为ture返回a的值 a为false b为true返回b的值 a b均为false 返回b的值
        */
        <span class="el-alert__title" :class="[ isBoldTitle ]" v-if="title || $slots.title">
          <slot name="title">{{ title }}</slot>
        </span>
        /*
        * notes: '&&'  (1) a&&b a == ture b == false/true 返回b      (2) a == false 返回a
        */
        <p class="el-alert__description" v-if="$slots.default && !description"><slot></slot></p>
        <p class="el-alert__description" v-if="description && !$slots.default">{{ description }}</p>
        /*
        * :class 的对象型动态绑定 closeText为true时添加 is-customed
        */
        <i class="el-alert__closebtn" :class="{ 'is-customed': closeText !== '', 'el-icon-close': closeText === '' }" v-show="closable" @click="close()">{{closeText}}</i>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  const TYPE_CLASSES_MAP = {
    'success': 'el-icon-success',
    'warning': 'el-icon-warning',
    'error': 'el-icon-error'
  };
  export default {
    name: 'ElAlert',

    props: {
      title: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'info'
      },
      closable: {
        type: Boolean,
        default: true
      },
      closeText: {
        type: String,
        default: ''
      },
      showIcon: Boolean,
      center: Boolean,
      effect: {
        type: String,
        default: 'light',
        //检验effet的值是否在给定的数组中存在
        validator: function(value) {
          return ['light', 'dark'].indexOf(value) !== -1;
        }
      }
    },
     /*
     Js 对象的赋值为引用 如果创建不同的对象调用将会修改同一个值
     使用方法将每次返回一个不同的值,每个数组调用的值也将不相同 
     */
    data() {
      return {
        visible: true
      };
    },
    // 触发父组件绑定close事件
    methods: {
      close() {
        this.visible = false;
        this.$emit('close');
      }
    },
    // 计算属性当依赖的值变化时触发 与样式的动态(:class)绑定结合使用
    computed: {
      typeClass() {
        return `el-alert--${ this.type }`;
      },

      iconClass() {
        return TYPE_CLASSES_MAP[this.type] || 'el-icon-info';
      },

      isBigIcon() {
        return this.description || this.$slots.default ? 'is-big' : '';
      },

      isBoldTitle() {
        return this.description || this.$slots.default ? 'is-bold' : '';
      }
    }
  };
</script>
