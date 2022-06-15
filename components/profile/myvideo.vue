<template>
  <div class="grid grid-cols-4 gap-4">
    <nuxt-link
      v-for="(item, index) in listVideo"
      :key="index"
      :to="`/detailsVideoPage/${item.id}`"
      class="w-[220px] h-[300px] py-3 relative text-left list-myvideo"
    >
      <video
        ref="videoRef"
        :poster="item.cover"
        class="block w-full h-full object-cover rounded-md videoplay"
        :src="item.url"
        muted
        @mouseenter="videoPlay(index)"
        @mouseleave="videoPause(index)"
      ></video>
      <div class="absolute left-3 flex items-center" style="bottom: 28px">
        <svg
          class="mr-1"
          width="18"
          height="18"
          viewBox="0 0 48 48"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 10.554V37.4459L38.1463 24L16 10.554ZM12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z"
          ></path></svg
        ><strong
          data-e2e="video-views"
          class="text-[#fff] text-[17px] italic"
          >{{ item.views }}</strong
        >
      </div>
      <p class="mt-2 ml-1 box-des line-clamp-1">{{ item.description }}</p>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'MyVideoContainer',
  props: {
    listVideo: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // listVideo: [],
    }
  },
  methods: {
    videoPlay(id) {
      const listVideo = this.$refs.videoRef
      listVideo[id].play()
    },
    videoPause(id) {
      const listVideo = this.$refs.videoRef
      listVideo[id].pause()
    },
  },
}
</script>
<style scoped>
@media (max-width: 1401px) {
  .list-myvideo {
    width: auto;
    height: auto;
  }
}
</style>
