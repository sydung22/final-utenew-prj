<template>
  <div class="text-center">
    <Header />
    <div class="w-[1170px] mx-auto flex">
      <Sidebar />
      <Nuxt />
    </div>
    <notifications group="default" position="top left" />
  </div>
</template>

<script>
export default {
  name: 'PublicLayout',
}
</script>
//
<style lang="scss">
// .my-notification {
//   margin: 0 5px 5px;
//   padding: 10px;
//   font-size: 12px;
//   color: #ffffff;
//   border-radius: 2px;
//   // default (blue)
//   background: #44a4fc;
//   border-left: 5px solid #187fe7;
//   .notification-title {
//     font-size: 15px;
//   }

//   .notification-content {
//     font-size: 14px;
//   }
//   &.success {
//     background: #68cd86;
//     border-left-color: #42a85f;
//   }

//   &.warn {
//     background: #ffb648;
//     border-left-color: #f48a06;
//   }

//   &.error {
//     background: #e54d42;
//     border-left-color: #b82e24;
//   }
// }
//
</style>
