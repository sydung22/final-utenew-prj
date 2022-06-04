<template>
  <div>
    <div
      class="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center"
      style="background: rgba(0 0 0 /30%)"
    >
      <div
        class="bg-white border py-2 px-5 rounded-lg flex items-center flex-col"
      >
        <div class="loader-dots block relative w-20 h-5 mt-2">
          <div
            class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"
          ></div>
          <div
            class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"
          ></div>
          <div
            class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"
          ></div>
          <div
            class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"
          ></div>
        </div>
        <div class="text-gray-500 text-xs font-medium mt-2 text-center">
          Đang tải! Vui lòng chờ trong giây lát
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
@import './style.css';
</style>
