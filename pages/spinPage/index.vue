<template>
  <test-page></test-page>
</template>

<script>
import testPage from '~/components/loading/testPage.vue'
export default {
  name: 'SpinPage',
  components: { testPage },
  layout: 'another',
}
</script>
