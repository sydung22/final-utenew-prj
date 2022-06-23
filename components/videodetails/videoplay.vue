<template>
  <div class="w-[70%] box-blur-img flex justify-center items-center box-video">
    <div
      class="back-blur"
      :style="`background-image: url('${backgroundVideo}')`"
    ></div>
    <div
      class="h-[100vh] w-[55%] absolute top-0 inset-x-1/2 translate-x-[-50%] z-10"
    >
      <div class="w-[100%] h-[100%]">
        <video
          id="videoplay"
          controls
          autoplay
          :poster="backgroundVideo"
          class="block w-full h-full object-contain"
          :src="urlVideo"
          controlsList="nodownload"
        ></video>
      </div>
    </div>
    <button
      data-e2e="browse-close"
      class="absolute top-5 left-5 z-10 bg-[] w-[40px] h-[40px] flex items-center justify-center rounded-full hover:opacity-[0.7] duration-300"
      style="background: rgb(225 225 225 / 12%)"
      @click="goBack"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 9 10"
        fill="#fff"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.35299 0.792837L4.49961 3.93944L7.64545 0.792566C7.8407 0.597249 8.15733 0.597223 8.35262 0.792508L8.70669 1.14658C8.90195 1.34184 8.90195 1.65842 8.70669 1.85368L5.56027 5.0001L8.70672 8.14655C8.90198 8.34181 8.90198 8.65839 8.70672 8.85366L8.35316 9.20721C8.1579 9.40247 7.84132 9.40247 7.64606 9.20721L4.49961 6.06076L1.35319 9.20719C1.15793 9.40245 0.841345 9.40245 0.646083 9.20719L0.292629 8.85373C0.0973708 8.65847 0.0973653 8.3419 0.292617 8.14664L3.43895 5.0001L0.292432 1.85357C0.0972034 1.65834 0.0971656 1.34182 0.292347 1.14655L0.645801 0.792924C0.841049 0.597582 1.1577 0.597543 1.35299 0.792837Z"
        ></path>
      </svg>
    </button>

    <div
      class="flex flex-col justify-between absolute top-0 right-5 z-10 h-full py-5 items-end"
    >
      <button
        data-e2e="browse-report"
        class="bg-[] font-semibold text-[#fff] pb-1.5 pt-1 px-4 flex items-center justify-center rounded-[100px] hover:opacity-[0.7] duration-300 cursor-pointer"
        style="background: rgb(225 225 225 / 12%)"
        @click="showReport"
      >
        <span class="mdi mdi-flag-outline text-[20px] mr-1"></span>

        Báo cáo
      </button>
      <div>
        <button
          @click="backVideo"
          data-e2e="arrow-left"
          class="bg-[] w-[40px] h-[40px] flex items-center justify-center rounded-full rotate-[-90deg] hover:opacity-[0.7] duration-300"
          style="background: rgb(225 225 225 / 12%)"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 48 48"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M34.4142 22.5858L18.1213 6.29289C17.7308 5.90237 17.0976 5.90237 16.7071 6.29289L15.2929 7.70711C14.9024 8.09763 14.9024 8.7308 15.2929 9.12132L30.1716 24L15.2929 38.8787C14.9024 39.2692 14.9024 39.9024 15.2929 40.2929L16.7071 41.7071C17.0976 42.0976 17.7308 42.0976 18.1213 41.7071L34.4142 25.4142C35.1953 24.6332 35.1953 23.3668 34.4142 22.5858Z"
            ></path>
          </svg>
        </button>
        <button
          @click="nextVideo"
          data-e2e="arrow-right"
          class="bg-[] w-[40px] h-[40px] flex items-center justify-center rounded-full rotate-[90deg] mt-4 hover:opacity-[0.7] duration-300"
          style="background: rgb(225 225 225 / 12%)"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 48 48"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M34.4142 22.5858L18.1213 6.29289C17.7308 5.90237 17.0976 5.90237 16.7071 6.29289L15.2929 7.70711C14.9024 8.09763 14.9024 8.7308 15.2929 9.12132L30.1716 24L15.2929 38.8787C14.9024 39.2692 14.9024 39.9024 15.2929 40.2929L16.7071 41.7071C17.0976 42.0976 17.7308 42.0976 18.1213 41.7071L34.4142 25.4142C35.1953 24.6332 35.1953 23.3668 34.4142 22.5858Z"
            ></path>
          </svg>
        </button>
      </div>
      <img
        src="https://ute.udn.vn/images/logo-truong-250.png"
        alt=""
        class="w-[45px] h-[45px] animate-bounce"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayVideoContainer',
  props: {
    backgroundVideo: {
      type: String,
      default: '',
    },
    urlVideo: {
      type: String,
      default: '',
    },
    showReport: {
      type: Function,
      default: () => 1,
    },
  },
  mounted() {
    const res = document.getElementById('videoplay')
    window.console.log(res)
    // setTimeout(() => {
    //   res.play()
    // }, 1200)
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    backVideo() {
      this.$router.push(
        `/detailsVideoPage/${Number(this.$route.params.id) - 1}`
      )
    },
    nextVideo() {
      this.$router.push(
        `/detailsVideoPage/${Number(this.$route.params.id) + 1}`
      )
    },
  },
}
</script>
<style scoped>
.box-blur-img {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background: #000;
}

.back-blur {
  position: absolute;
  width: 10%;
  height: 10%;
  filter: blur(1.5px);
  left: 50%;
  top: 50%;
  transform: scale(11);
  opacity: 0.3;
  background: center center / cover no-repeat;
}

@media (max-width: 1401px) {
  .box-video {
    width: 65%;
  }
}
</style>
