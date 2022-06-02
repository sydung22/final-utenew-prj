<template>
  <div id="app">
    <!-- <video id="video" controls="controls">
      <source src="http://www.w3schools.com/html/mov_bbb.mp4" /></video
    ><br />
    <button @click="capture()">Play and Capture</button>
    <div>------------------Show captured thumbnail below -----------------</div>
    <canvas id="canvas"></canvas> -->
    <div>
      <label for="uploadVideo" class="cursor-pointer">
        <div
          class="border-2 border-dashed p-5 text-center rounded-lg box-upload-video"
        >
          <h2 class="font-bold text-[18px] mb-2">Chọn video để tải lên</h2>
          <input
            id="uploadVideo"
            class="absolute opacity-0 z-[-2]"
            type="file"
            accept=".mp4,video/mp4"
            aria-label="upload image button"
            @change="getSnap"
          />
          <h3 class="font-semibold text-[17px] mb-7">Hoặc kéo thả tập tin</h3>
          <p class="mb-3 text-[#16182380]">MP4 hoặc WebM</p>
          <p class="mb-3 text-[#16182380]">Độ phân giải 720*1280 trở lên</p>
          <p class="mb-3 text-[#16182380]">Tối đa 10 phút</p>
          <p class="mb-3 text-[#16182380]">Ít hơn 2GB</p>
          <label
            for="uploadVideo"
            class="cursor-pointer relative z-10 block h-full"
          >
            <button
              class="relative z-[-1] bg-[#2563EB] font-semibold py-2 px-7 text-white rounded my-5"
            >
              Chọn tập tin
            </button>
          </label>
        </div>
      </label>
      <div>
        <img v-for="(item, index) in urlImg" :key="index" :src="item" alt="" />
      </div>
      <!-- <div class="demoVideo pt-6 text-center" v-if="srcVideo">
            <span class="text-xl font-bold italic text-blue-600 mb-3 block"
              >Demo Video</span
            >
            <video
              :src="srcVideo"
              alt="An image example with Cloudinary"
              class="w-[400px] h-auto"
              autoplay
              controls
              muted
            />
          </div> -->
    </div>
  </div>
</template>

<script>
import VideoSnapshot from 'video-snapshot'

export default {
  name: 'App',
  data() {
    return {
      listSnapShot: [],
      urlImg: [],
      src: '',
    }
  },
  methods: {
    capture() {
      const videoCanvas = document.getElementById('canvas')
      const video = document.getElementById('video')
      videoCanvas
        .getContext('2d')
        .drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
    },
    async getSnap(e) {
      const snapshoter = new VideoSnapshot(e.target.files[0])
      const arr = []
      for (let i = 0; i < 2; i += 0.2) {
        const previewSrc = await snapshoter.takeSnapshot(i)
        arr.push(previewSrc)
      }
      window.console.log(arr)
      window.console.log(e.target.files[0])
      window.console.log(snapshoter)
      this.urlImg = arr
      const instance = await this.$cloudinary
        .upload(arr[0], {
          folder: 'imageUser',
          uploadPreset: 'q4qrbvqz',
        })
        .then((res) => (this.src = res.secure_url))
      window.console.log(instance)
    },
  },
}
</script>

<style>
#canvas {
  display: inline-block;
  top: 4px;
  position: relative;
  border: dotted 1px #ccc;
  padding: 2px;
  width: 100%;
}
</style>
