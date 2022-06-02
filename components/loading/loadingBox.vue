<template>
  <div :class="loadingObject">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'LoadingContainer',
  props: {
    rounded: {
      type: Boolean,
      default: true,
    },
    animated: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    loadingObject() {
      return {
        loading: true,
        'loading-rounded': this.rounded,
        'loading-animated': this.animated,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import './loading.scss';
</style>
