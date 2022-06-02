<template>
  <div>
    <span>Upload to Cloudinary</span>
    <input
      type="file"
      accept=".jpeg,.jpg,.png,image/jpeg,image/png"
      aria-label="upload image button"
      @change="selectFile"
    />
    <div>
      <img :src="src" alt="An image example with Cloudinary" />
    </div>
    <button
      class="text-white bg-black px-3 py-1 rounded"
      @click="uploadProfile"
    >
      Change Profile
    </button>
    <input
      type="file"
      accept=".mp4,video/mp4"
      aria-label="upload image button"
      @change="selectFileVideo"
    />
    <div>
      <video
        :src="srcVideo"
        alt="An image example with Cloudinary"
        class="w-[400px] h-[400px]"
        autoplay
        controls
        muted
        controlsList="nodownload"
      />
    </div>
    <a :href="srcVideo" download>Download</a>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      src: this.$cloudinary.image.url(
        `https://res.cloudinary.com/dswt194ko/image/upload/v1652616652/imageUser/l0rykkyij5skwuxuvxa1.jpg`
      ),
      srcVideo: this.$cloudinary.video.url(
        `https://res.cloudinary.com/dswt194ko/video/upload/v1652511649/videoUser/video_11_dre4ba.mp4`
      ),
    }
  },
  methods: {
    async selectFile(e) {
      const file = e.target.files[0]

      /* Make sure file exists */
      if (!file) return

      /* create a reader */
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(f)
        }).then((res) => res)

      /* Read data */
      const data = await readData(file)
      /* upload the converted data */
      const instance = await this.$cloudinary
        .upload(data, {
          folder: 'imageUser',
          uploadPreset: 'q4qrbvqz',
        })
        .then((res) => (this.src = res.secure_url))
      //  secure_url)
      console.log(data)

      console.log(instance)
    },
    async uploadProfile() {
      const data = {
        id: 14,
        username: 'sydung.ute',
        fullname: 'Nguyễn Sỹ Dũng',
        description: 'Xin chào mình là sinh viên IT',
        facebook: 'https://www.facebook.com/SyDung2222000/',
        age: 22,
        gender: 'male',
        avatar: this.src,
      }
      const res = await axios.post(
        'http://127.0.0.1:8000/api/update_user',
        data
      )
      window.console.log(res)
      this.$notify({
        type: 'success',
        group: 'default',
        title: 'Success',
        text: 'Cập nhật thông tin thành công!',
      })
    },
    async selectFileVideo(e) {
      const file = e.target.files[0]
      window.console.log(file)
      /* Make sure file exists */
      if (!file) return

      /* create a reader */
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(f)
        }).then((res) => res)

      /* Read data */
      const data = await readData(file)
      window.console.log(data)
      /* upload the converted data */
      const instance = await this.$cloudinary
        .upload(data, {
          folder: 'videoUser',
          uploadPreset: 'ihmfg0bi',
        })
        .then((res) => (this.srcVideo = res.secure_url))
      //  secure_url)

      console.log(instance)
    },
  },
}
</script>
