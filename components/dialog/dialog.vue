<template>
  <transition name="fade" mode="out-in">
    <div v-show="show" key="5" class="overlay" @click="cancel">
      <div class="dialog text-left">
        <div class="dialog__content">
          <h2 class="dialog__title" v-text="title"></h2>
          <p class="dialog__description" v-text="description"></p>
        </div>

        <hr />

        <div class="dialog__footer">
          <button class="dialog__cancel" @click="cancel">Hủy</button>
          <button class="dialog__confirm" @click="confirm">Đồng ý</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'DialogContainer',
  props: ['show', 'title', 'description', 'cancel', 'confirm', 'text'],
}
</script>
<style scoped>
@import './style.css';
</style>
