<template>
  <div class="form my-4">
    <input
      :id="typeId"
      :v-model="dataInput"
      :type="type"
      class="form-input"
      autocomplete="off"
      placeholder=" "
    />
    <label :for="typeId" class="form-label">{{ typeContent }}</label>
  </div>
</template>

<script>
export default {
  name: 'InputForm',
  props: {
    typeId: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    typeContent: {
      type: String,
      default: '',
    },
    dataInput: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
@import '../assets/style.css';
</style>
