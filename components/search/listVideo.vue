<template>
  <div
    class="w-[1155px] overflow-y-scroll fixed top-[164px] right-0 bottom-0 sidebar-right py-4"
  >
    <div v-if="listVideo.length">
      <div class="grid grid-cols-3 gap-2">
        <nuxt-link
          v-for="(item, index) in listVideo"
          :key="index"
          :to="`/detailsVideoPage/${item.id}`"
          class="py-3 relative w-[260px] h-full"
        >
          <video
            ref="videoRef"
            :poster="item.cover"
            class="block w-full h-[350px] object-cover rounded-md videoplay"
            :src="item.url"
            muted
            @mouseenter="videoPlay(index)"
            @mouseleave="videoPause(index)"
          ></video>
          <div
            class="absolute left-3 flex items-center"
            :style="
              item.hashtags.length > 0
                ? { bottom: '7rem' }
                : {
                    bottom: '5rem',
                  }
            "
          >
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
          <p class="text-left line-clamp-1 mt-1.5">{{ item.description }}</p>
          <div class="flex flex-wrap">
            <nuxt-link
              v-for="(itemHashtag, indexHashtag) in item.hashtags"
              :key="indexHashtag"
              :to="`/hashtagPage/${itemHashtag.id}`"
              class="font-bold text-[16px] items-center my-1 hover:underline mr-4"
            >
              #{{ itemHashtag.name }}
            </nuxt-link>
          </div>
          <div class="flex items-center font-serif mt-1.5">
            <img
              :src="item.user.avatar"
              alt=""
              class="w-[24px] h-[24px] rounded-full object-cover mr-2"
            />
            <p>{{ item.user.username }}</p>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div v-else class="text-blue-600 font-bold text-xl">
      <p>Không có dữ liệu</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listVideo: [],
    }
  },
  computed: {
    getTitleSearch() {
      return this.$store.state.searchTitle
    },
    getListVideos() {
      return this.$store.state.listVideos
    },
  },
  watch: {
    getListVideos() {
      this.getVideos()
    },
  },
  mounted() {
    this.getVideos()
  },
  methods: {
    getVideos() {
      if (this.getTitleSearch) {
        this.listVideo = this.getListVideos.filter((el) => el.type === 'PUBLIC')
      } else {
        window.console.log('No videos')
      }
    },
    videoPlay(index) {
      const listVideo = this.$refs.videoRef
      listVideo[index].play()
    },
    videoPause(index) {
      const listVideo = this.$refs.videoRef
      listVideo[index].pause()
    },
  },
}
</script>
<style scoped>
.sidebar-right::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 20px;
}

.sidebar-right::-webkit-scrollbar {
  width: 8px;
  background-color: #fff;
}

.sidebar-right::-webkit-scrollbar-thumb {
  border-radius: 12px;
  background-color: #ddd;
}

@media (max-width: 1401px) {
  .sidebar-right {
    width: 890px;
  }
}
</style>
