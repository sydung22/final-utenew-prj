<template>
  <UploadVideo />
</template>

<script>
export default {
  name: 'UploadPage',
  layout: 'another',
  middleware: ['auth'],
}
</script>
