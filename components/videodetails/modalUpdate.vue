<template>
  <div
    v-show="ShowModalUpdate"
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex items-center justify-center"
    style="background-color: rgba(0 0 0 / 70%)"
  >
    <div class="relative p-4 w-full max-w-[1200px] h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Chỉnh sửa bài đăng
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal"
            @click="unShowModalUpdate"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <loading-video v-show="showLoadingBox"></loading-video>

        <div
          class="bg-white w-[90%] mx-auto my-4 py-6 px-10 rounded"
          style="box-shadow: rgb(0 0 0 / 20%) 0 2px 8px"
        >
          <h2 class="text-[24px] font-bold">Tải video lên</h2>
          <h3 class="text-[18px] text-[#868484]">
            Đăng video vào tải khoản của bạn
          </h3>
          <div class="flex mt-8">
            <div class="w-[40%]">
              <div
                v-if="item.url"
                v-show="showBoxDemoVideo"
                class="demoVideo text-center"
              >
                <span class="text-xl font-bold italic text-gray-700 mb-3 block"
                  >Demo Video</span
                >
                <video
                  :src="item.url"
                  alt="An image example with Cloudinary"
                  class="w-full h-[365px]"
                  autoplay
                  controls
                  muted
                />
              </div>
              <loading-box v-show="showLoadingVideo" class="mt-7">
                <div
                  class="loading-item"
                  :style="`width: 100%; height: 400px;`"
                ></div>
              </loading-box>
              <div
                class="flex border rounded mt-3 px-6 py-1 justify-between items-center"
              >
                <p class="text-gray-600 text-sm line-clamp-1 w-[220px]">
                  {{ item.url }}
                </p>
                <label
                  for="uploadVideo"
                  class="text-blue-600 text-sm italic font-semibold cursor-pointer underline"
                  >Thay đổi video
                  <input
                    id="uploadVideo"
                    class="absolute opacity-0 z-[-2]"
                    type="file"
                    accept=".mp4,video/mp4"
                    aria-label="upload image button"
                    @change="selectFileVideo"
                /></label>
              </div>
            </div>
            <div class="form ml-5 flex-1 w-[60%]">
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Nội dung
                </label>
                <div class="flex items-center relative">
                  <textarea
                    id="username"
                    v-model="item.description"
                    class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-[100px]"
                    type="text"
                    placeholder="Nội dung"
                  />
                  <emoji-picker
                    :search="search"
                    class="absolute right-3 top-1/2 translate-y-[-50%]"
                    @emoji="insert"
                  >
                    <div
                      slot="emoji-invoker"
                      slot-scope="{ events: { click: clickEvent } }"
                      @click.stop="clickEvent"
                    >
                      <span
                        class="mdi mdi-emoticon-happy-outline text-[22px] text-[#161823] mt-1 ml-3 cursor-pointer"
                      ></span>
                    </div>
                    <div
                      slot="emoji-picker"
                      slot-scope="{ emojis, insert }"
                      style="
                        position: absolute;
                        right: -300px;
                        top: 0;
                        width: 300px;
                        height: 300px;
                        background-color: #fff;
                        padding: 10px;
                        overflow-y: scroll;
                        border-radius: 8px;
                      "
                    >
                      <div>
                        <div>
                          <div
                            v-for="(emojiGroup, category) in emojis"
                            :key="category"
                          >
                            <h5>{{ category }}</h5>
                            <div>
                              <span
                                v-for="(emoji, emojiName) in emojiGroup"
                                :key="emojiName"
                                class="cursor-grabbing"
                                :title="emojiName"
                                @click="insert(emoji)"
                                >{{ emoji }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </emoji-picker>
                </div>
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="tagname"
                >
                  Hashtag
                </label>
                <div class="tag-input">
                  <div
                    v-for="(tag, index) in listTags"
                    :key="tag"
                    class="tag-input-tag"
                  >
                    <span @click="removeTag(index)">x</span>
                    {{ tag }}
                  </div>
                  <input
                    id="tagname"
                    type="text"
                    placeholder="Enter a Tag"
                    class="tag-input-text"
                    @keydown.enter="addTag"
                    @keydown.delete="removeLastTag"
                  />
                </div>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Ảnh bìa
                </label>
                <div
                  class="shadow border rounded p-2 flex overflow-x-auto sidebar-left"
                >
                  <label
                    v-for="(item, index) in listImg"
                    :key="index"
                    class="mr-0.5 w-[84px] h-[150px]"
                  >
                    <input
                      ref="detailImg"
                      type="radio"
                      name="test"
                      :value="item"
                      checked
                      @click="getValue(index)"
                    />
                    <img
                      :src="item"
                      alt="bg-video"
                      class="w-full h-full object-cover"
                    />
                  </label>
                  <img
                    v-if="listImg.length <= 0"
                    :src="item.cover"
                    class="bg-[#16182308] w-[84px] h-[150px]"
                  />
                </div>
              </div>
              <div class="mt-2">
                <div class="flex items-center">
                  <label
                    class="form-check-label block text-gray-700 text-sm font-bold mr-2"
                    for="flexSwitchCheckDefault"
                    >Chạy quy trình kiểm tra bản quyền</label
                  >
                  <div class="form-check form-switch">
                    <input
                      id="flexSwitchCheckDefault"
                      class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm checked:bg-[#2563EB]"
                      type="checkbox"
                      role="switch"
                    />
                  </div>
                </div>
                <div class="text-[13px] text-gray-500 mt-1 italic">
                  Chúng tôi sẽ kiểm tra xem video của bạn có sử dụng âm thanh vi
                  phạm bản quyền hay không. Nếu chúng tôi phát hiện có vi phạm,
                  bạn có thể chỉnh sửa video trước khi đăng.<a
                    href="#"
                    class="text-[13px] font-bold text-black not-italic"
                    >Tìm hiểu thêm</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="px-6 space-y-6 flex items-center"></div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600 justify-end"
        >
          <button
            data-modal-toggle="defaultModal"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click.prevent="showDialog = true"
          >
            Cập nhật
          </button>
          <button
            data-modal-toggle="defaultModal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            @click="unShowModalUpdate"
          >
            Thoát
          </button>
        </div>
      </div>
    </div>
    <Dialog
      :show="showDialog"
      title="Thông báo"
      description="Bạn có muốn cập nhật bài đăng này ??"
      :confirm="uploadVideo"
      :cancel="unShowDialog"
    ></Dialog>
  </div>
</template>

<script>
import { EmojiPicker } from 'vue-emoji-picker'
import VideoSnapshot from 'video-snapshot'
import LoadingVideo from '../loading/loadingVideo.vue'
import LoadingBox from '../loading/loadingBox.vue'
// import axios from 'axios'
import AuthService from '@/services/authService.js'

export default {
  components: {
    EmojiPicker,
    LoadingVideo,
    LoadingBox,
  },
  props: {
    ShowModalUpdate: {
      type: Boolean,
      default: false,
    },
    unShowModalUpdate: {
      type: Function,
      default: () => 1,
    },
    dataUpdateObj: {
      type: Object,
      default: () => {},
    },
    listHashtags: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    showSelect: false,
    tags: [],
    srcVideo: '',
    src: '',
    listImg: [],
    description: '',
    hashtag: '',
    dataLinkImg: '',
    nameFile: '',
    input: '',
    search: '',
    showLoadingBox: false,
    showBoxVideo: true,
    showLoadingVideo: false,
    showBoxDemoVideo: true,
    showDialog: false,
  }),
  computed: {
    item() {
      return this.dataUpdateObj
    },
    listTags() {
      return this.listHashtags
    },
  },
  methods: {
    unShowDialog() {
      this.showDialog = false
    },
    insert(emoji) {
      this.item.description += emoji
    },
    getValue(index) {
      this.dataLinkImg = this.$refs.detailImg[index].value
    },
    async uploadVideo() {
      if (this.item.url !== '') {
        this.showLoadingBox = true
        if (this.dataLinkImg) {
          await this.$cloudinary
            .upload(this.dataLinkImg, {
              folder: 'imageUser',
              uploadPreset: 'q4qrbvqz',
            })
            .then((res) => (this.src = res.secure_url))
        }
        if (this.src === '') {
          this.src = this.item.cover
        }
        if (this.item.description !== '' && this.listTags.length > 0) {
          window.console.log(this.listTags)
          const res = await AuthService.updateVideo(
            {
              hashtags: this.listTags,
              video_url: this.item.url,
              video_cover_url: this.src,
              description: this.item.description,
            },
            Number(this.$route.params.id)
          )
          if (res && res.status === 'success') {
            this.showLoadingBox = false
            this.$notify({
              type: 'success',
              group: 'default',
              title: 'Success',
              text: 'Cập nhật bài đăng thành công',
            })
            setTimeout(() => {
              this.$router.push('/')
            }, 1000)
          } else {
            window.console.log('upload k thành công')
          }
        } else {
          this.$notify({
            type: 'warn',
            group: 'default',
            title: 'Warning',
            text: 'Vui lòng điền đầy đủ nội dung video',
          })
        }
      } else {
        this.$notify({
          type: 'warn',
          group: 'default',
          title: 'Warning',
          text: 'Dữ liệu video chưa được tải lên',
        })
      }
    },
    showSelectBox() {
      this.showSelect = !this.showSelect
    },
    addTag(event) {
      event.preventDefault()
      const val = event.target.value.trim()
      window.console.log(val)
      if (val.length) {
        this.listTags.push(val)
        event.target.value = ''
        window.console.log(this.listTags)
      }
    },
    removeTag(index) {
      this.listTags.splice(index, 1)
    },
    removeLastTag(event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.listTags.length - 1)
      }
    },
    async selectFileVideo(e) {
      this.showLoadingVideo = true
      this.showBoxVideo = false
      this.showBoxDemoVideo = false
      const data = new FormData()
      const file = e.target.files[0]

      data.append('video', file)

      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const res = await AuthService.chooseVideo(data, config)

      if (res && res.status === 'success') {
        this.item.url = res.video_url
        this.showLoadingVideo = false
        this.showBoxVideo = true
        this.showBoxDemoVideo = true
        window.console.log(res.video_url)
      } else {
        window.console.log('ko thành công')
      }
      this.nameFile = file.name

      const snapshoter = new VideoSnapshot(e.target.files[0])
      const arr = []
      for (let i = 0; i < 3; i += 0.3) {
        const previewSrc = await snapshoter.takeSnapshot(i)
        arr.push(previewSrc)
      }
      this.listImg = arr
    },
  },
}
</script>
<style scoped>
.tag-input {
  width: 100%;
  border: 1px solid #eee;
  font-size: 0.9em;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
}

.tag-input-tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #eee;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
}

.tag-input-tag > span {
  cursor: pointer;
  opacity: 0.75;
}

.tag-input-text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
}

.box-upload-video:hover {
  background: rgba(22 24 35/ 3%);
  border-color: #2563eb;
}

.sidebar-left {
  transition: 0.5s;
  max-width: 610px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(87px, 1fr));
  grid-auto-flow: column;
  grid-auto-columns: auto;
  scroll-snap-type: x mandatory;
  scroll-snap-stop: always;
  overflow-x: auto;
  padding: 14px;
}

.sidebar-left::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 20px;
}

.sidebar-left::-webkit-scrollbar {
  width: 8px;
  background-color: #fff;
}

.sidebar-left::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ccc;
}

[type='radio'] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* IMAGE STYLES */
[type='radio'] + img {
  cursor: pointer;
  opacity: 0.7;
  position: relative;
}

/* CHECKED STYLES */
[type='radio']:checked + img {
  outline: 2px solid #2563eb;
  opacity: 1.5;
  transform: scale(1.15);
  z-index: 10;
}
</style>
