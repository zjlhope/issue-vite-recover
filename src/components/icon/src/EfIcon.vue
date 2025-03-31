<template>
  <svg class="ef-icon" :height="`${height}px`" :width="`${width}px`">
    <use :xlink:href="iconName"/>
  </svg>
</template>
<script>
export default {
  name: 'EfIcon',
  props: {
    name: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 16
    },
    width: {
      type: Number,
      default: 16
    }
  },
  computed: {
    iconName() {
      return `#${this.name}`;
    }
  }
}
</script>
<style>
.ef-icon {
  display: inline-block;
  font-size: 0;
  vertical-align: middle;
  margin-right: 5px
}
</style>
