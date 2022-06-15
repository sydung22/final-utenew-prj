<template>
  <div class="w-[30%] pt-8 flex flex-col h-[100vh] contain-comment">
    <div class="pb-4 border-b px-8">
      <div class="flex justify-between items-center pt-[22px] pb-4">
        <div class="flex items-center">
          <img
            class="w-[45px] h-[45px] object-cover rounded-full"
            :src="avatar"
            alt=""
          />
          <div class="ml-[12px]">
            <h2 class="text-[18px] font-bold leading-[25px]">{{ userName }}</h2>
            <h3 class="text-[14px] italic">{{ fullName }}</h3>
          </div>
        </div>
        <!-- <button
          class="border rounded-md text-[#2563eb] border-[#2563eb] font-semibold px-8 py-1.5"
        >
          Follow
        </button> -->
        <button
          v-if="tokenUser && videoDataUser !== dataUser.id"
          class="text-[#2563eb] border border-[#2563eb] py-[2px] px-[24px] font-semibold rounded-md text-[16px] hover:bg-[#d6d6f0] duration-300"
          :style="
            !isFollow()
              ? {
                  color: '#2563eb',
                  border: '1px solid #2563eb',
                  padding: '6px 32px',
                }
              : {
                  color: '#000',
                  border: '1px solid #ccc',
                  padding: '6px 14px',
                }
          "
          @click="changeFollowings"
        >
          {{ !isFollow() ? 'Follow' : 'Đang Follow' }}
        </button>
      </div>
      <p>{{ description }}</p>
      <div class="flex flex-wrap">
        <nuxt-link
          v-for="(item, index) in hashTag"
          :key="index"
          :to="`/hashtagPage/${item.id}`"
          class="font-bold text-[16px] items-center my-1 hover:underline mr-5"
        >
          #{{ item.name }}
        </nuxt-link>
      </div>
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center">
          <div class="flex items-center">
            <div
              class="w-[32px] h-[32px] rounded-full flex justify-center items-center bg-[#eee]"
            >
              <button
                class="mdi mdi-heart text-[20px] cursor-pointer button-heart w-[32px] h-[32px]"
                :style="
                  isLikedVideo() ? { color: '#2563eb' } : { color: '#000' }
                "
                @click="changeHeart"
              ></button>
            </div>
            <p
              class="text-[12px] font-semibold text-[#161823] my-1 ml-2 semibold"
            >
              {{ getListUserLiked.length }}
            </p>
          </div>
          <div class="flex items-center ml-[20px]">
            <a
              href="#"
              class="w-[32px] h-[32px] rounded-full flex justify-center items-center bg-[#eee]"
            >
              <span class="mdi mdi-comment-multiple text-[17px]"></span>
            </a>
            <p
              class="text-[12px] font-semibold text-[#161823] my-1 ml-2 semibold"
            >
              {{ listCmt.length }}
            </p>
          </div>
          <div class="flex items-center ml-[20px]">
            <a
              href="#"
              class="w-[32px] h-[32px] rounded-full flex justify-center items-center bg-[#eee]"
            >
              <span class="mdi mdi-eye text-[17px]"></span>
            </a>
            <p
              class="text-[12px] font-semibold text-[#161823] my-1 ml-2 semibold"
            >
              {{ countView }}
            </p>
          </div>
        </div>
        <div class="flex">
          <a
            v-if="tokenUser && videoDataUser !== dataUser.id"
            class="mdi mdi-download text-[17px] w-7 h-7 flex items-center justify-center text-black rounded-full bg-[#eee] mr-2 list-icon-share"
            @click="downloadVideo(urlVideo)"
          ></a>
          <span
            v-if="tokenUser && videoDataUser === dataUser.id"
            class="mdi mdi-pencil-box-outline text-[15px] w-7 h-7 flex items-center justify-center bg-[#2563eb] text-white rounded-full mr-2 list-icon-share"
            @click="showUpdate"
          ></span>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=example.org"
            target="_blank"
            class="mdi mdi-facebook text-[32px] w-7 h-7 flex items-center justify-center text-[#0075fa] rounded-full mr-2 list-icon-share"
          ></a>
          <span
            class="mdi mdi-whatsapp text-[15px] w-7 h-7 flex items-center justify-center text-white rounded-full bg-green-500 mr-2 list-icon-share"
          ></span>
          <span
            class="mdi mdi-twitter text-[17px] w-7 h-7 flex items-center justify-center text-white rounded-full bg-[#1da1f2] mr-2 list-icon-share"
          ></span>
          <span
            v-if="tokenUser && videoDataUser === dataUser.id"
            class="mdi mdi-delete text-[17px] w-7 h-7 flex items-center justify-center text-black rounded-full bg-[#eee] list-icon-share"
            @click="showDialog = true"
          ></span>
          <Dialog
            :show="showDialog"
            title="Thông báo"
            description="Bạn có muốn xóa bài đăng này không ??"
            :confirm="deleteVideo"
            :cancel="unShowDialog"
          ></Dialog>
        </div>
      </div>
      <div class="border rounded-sm mt-4 text-[14px] flex">
        <p
          class="text-ellipsis overflow-hidden whitespace-nowrap pl-2 py-1.5 pr-1 bg-[#eee]"
          style="flex: 1 1 auto"
        >
          {{ urlDetails }}
        </p>
        <button class="font-semibold py-1.5 px-4" style="flex: 0 0 auto">
          Sao chép liên kết
        </button>
      </div>
    </div>
    <div
      class="w-full bottom-0 sidebar-left bg-[#f8f8f8] max-h-full box-comment py-2 h-full"
      style="overflow: hidden auto"
    >
      <div v-if="tokenUser && listComments.length">
        <div
          v-for="(item, index) in listComments"
          :key="index"
          class="flex justify-between py-3 px-8 border-b"
        >
          <div class="flex">
            <a href="#" class="mr-3"
              ><img
                :src="item.user.avatar"
                alt=""
                class="w-[40px] h-[40px] object-cover rounded-full"
            /></a>
            <div class="w-[340px]">
              <h2 class="text-[18px] font-bold leading-6">
                {{ item.user.username }}
              </h2>
              <p class="leading-5 mt-1 mb-2">{{ item.content }}</p>
              <div class="flex text-[14px] text-[#16182380] items-center">
                <p class="mr-5">
                  {{ timeCreated(item.created_at) }}
                </p>
                <p class="cursor-pointer mr-5" @click="repCmt(item.id)">
                  Trả Lời
                </p>
                <span
                  v-if="tokenUser && item.user.id === dataUser.id"
                  class="mdi mdi-delete-outline text-[16px] cursor-pointer"
                  @click="handleRow(item)"
                ></span>
                <Dialog
                  :show="showDialogDelete"
                  title="Thông báo"
                  description="Bạn có muốn xóa bình luận này không ??"
                  :confirm="deleteComment"
                  :cancel="unShowDialogDelete"
                ></Dialog>
              </div>
              <span
                v-if="getListReplyComments[index].replies.length > 0"
                class="text-gray-500 mt-2 inline-block cursor-pointer text-[14px] font-semibold italic"
                @click="showReply(index)"
                >{{
                  showIndex === index
                    ? 'Ẩn câu trả lời'
                    : 'Xem thêm câu trả lời'
                }}</span
              >
              <div
                v-show="showIndex === index"
                v-if="getListReplyComments[index].replies.length > 0"
                class="mt-3"
              >
                <div
                  v-for="(itemReply, indexReply) in getListReplyComments[index]
                    .replies"
                  :key="indexReply"
                  class="flex mt-3 justify-between"
                >
                  <div class="flex">
                    <a href="#" class="mr-3"
                      ><img
                        :src="itemReply.user.avatar"
                        alt=""
                        class="w-[40px] h-[40px] object-cover rounded-full"
                    /></a>
                    <div>
                      <h2 class="text-[18px] font-bold leading-6">
                        {{ itemReply.user.username }}
                      </h2>
                      <p class="leading-5 mt-1 mb-2">
                        {{ itemReply.content }}
                      </p>
                      <div class="flex text-[14px] text-[#16182380]">
                        <p class="mr-6">
                          {{ timeCreated(itemReply.created_at) }}
                        </p>
                        <!-- <p>Trả Lời</p> -->
                      </div>
                    </div>
                  </div>
                  <div class="text-center leading-4 ml-[70px] mt-3">
                    <span
                      class="mdi mdi-heart text-[20px] cursor-pointer button-heart w-[25px] h-[25px] rounded-full"
                      :style="
                        isLikedReply(index, indexReply)
                          ? { color: '#2563eb' }
                          : { color: '#000' }
                      "
                      @click="onLikeReply(itemReply.id)"
                    ></span>
                    <p class="text-[12px]">
                      {{ item.replies[indexReply].likes_count }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center leading-4 mt-3">
            <button
              class="mdi mdi-heart text-[20px] cursor-pointer button-heart w-[25px] h-[25px] rounded-full"
              :style="
                isLikedComment(index) ? { color: '#2563eb' } : { color: '#000' }
              "
              @click="onLikeComment(item.id)"
            ></button>
            <p class="text-[12px]">{{ item.likes_count }}</p>
          </div>
        </div>
      </div>
      <div
        v-else-if="tokenUser && listComments.length <= 0"
        class="font-bold italic text-lg text-center"
      >
        Chưa có bình luận nào
      </div>
      <div v-else class="font-bold italic text-xl text-center mt-[150px]">
        Vui lòng đăng nhập để xem nội dung bình luận
      </div>
    </div>
    <div class="px-8 py-5 relative">
      <div
        v-show="showUpReply"
        class="absolute left-0 bottom-[83px] bg-[#f0eeee] px-8 py-2 border w-full flex justify-between"
      >
        <div>
          <p class="font-bold text-[17px]">
            Đang trả lời
            <span
              v-if="repCmtData.user && repCmtData.user.id === dataUser.id"
              class="text-blue-600 font-bold italic text-[17px]"
              >chính mình</span
            >
            <span v-else class="text-blue-600 font-bold italic text-[17px]">{{
              repCmtData.user && repCmtData.user.username
            }}</span>
          </p>
          <p class="text-gray-600">{{ repCmtData.content }}</p>
        </div>
        <span
          class="mdi mdi-close-box text-[18px] text-[#aaa] cursor-pointer"
          @click="showUpReply = false"
        ></span>
      </div>
      <div class="flex items-center" @keyup.enter="saveComment">
        <div
          class="flex items-center bg-[#1618230f] w-[432px] py-[5px] px-4 rounded-md input-comment"
        >
          <input
            v-model="commentContent"
            type="text"
            class="w-[328px] focus:outline-none bg-transparent text-[15px]"
            placeholder="Thêm bình luận..."
          />
          <span class="font-bold text-[22px] text-[#161823] ml-4">@</span>

          <emoji-picker :search="search" @emoji="insert">
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
                right: 20px;
                bottom: 70px;
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
                  <div v-for="(emojiGroup, category) in emojis" :key="category">
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
        <button
          class="text-[16px] text-white bg-[#2563eb] ml-4 font-semibold py-1.5 px-5 rounded-md hover:opacity-80 duration-200"
          @click="saveComment"
        >
          Đăng
        </button>
        <loading-sign-in v-show="showLoading"></loading-sign-in>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

import { EmojiPicker } from 'vue-emoji-picker'
import moment from 'moment'
import Dialog from '../dialog/dialog.vue'
import LoadingSignIn from '../loading/loadingSignIn.vue'

import AuthService from '@/services/authService.js'

export default {
  name: 'VideoCommentContainer',
  components: {
    EmojiPicker,
    Dialog,
    LoadingSignIn,
  },
  props: {
    userName: {
      type: String,
      default: '',
    },
    fullName: {
      type: String,
      default: '',
    },
    countView: {
      type: Number,
      default: 0,
    },
    hashTag: {
      type: Array,
      default: () => [],
    },
    showUpdate: {
      type: Function,
      default: () => 1,
    },
    deleteVideo: {
      type: Function,
      default: () => 1,
    },
    deleteComment: {
      type: Function,
      default: () => 1,
    },
    checkCoin: {
      type: Function,
      default: () => 1,
    },
    description: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    urlDetails: {
      type: String,
      default: '',
    },
    countLike: {
      type: Number,
      default: 0,
    },
    listComments: {
      type: Array,
      default: () => [],
    },
    videoDataUser: {
      type: Number,
      default: 0,
    },
    isFollow: {
      type: Function,
      default: () => 1,
    },
    isLikedVideo: {
      type: Function,
      default: () => 1,
    },
    isLikedComment: {
      type: Function,
      default: () => 1,
    },
    isLikedReply: {
      type: Function,
      default: () => 1,
    },
    changeFollowings: {
      type: Function,
      default: () => 1,
    },
    changeHeart: {
      type: Function,
      default: () => 1,
    },
    onLikeComment: {
      type: Function,
      default: () => 1,
    },
    onLikeReply: {
      type: Function,
      default: () => 1,
    },
    urlVideo: {
      type: String,
      default: '',
    },
    downloadVideo: {
      type: Function,
      default: () => 1,
    },
    handleRow: {
      type: Function,
      default: () => 1,
    },
    showDialogDelete: {
      type: Boolean,
      default: false,
    },
    unShowDialogDelete: {
      type: Function,
      default: () => 1,
    },
  },
  data() {
    return {
      changeColor: false,
      replyComment: 'Xem thêm câu trả lời',
      showComment: false,
      commentContent: '',
      detailsVideo: {},
      input: '',
      search: '',
      dataUser: {},
      detailsLikes: {},
      dataReplies: {},
      listLikeComments: [],
      listCheckLikeComments: [],
      showIndex: null,
      showUpReply: false,
      repCmtData: {},
      listReply: [],
      tokenUser: '',
      showDialog: false,
      showLoading: false,
    }
  },
  computed: {
    listCmt() {
      return this.listComments
    },
    getListReplyComments() {
      return this.$store.state.listReplyComments
    },
    getCountLikeCmt() {
      return this.$store.state.listCountCmtLikes
    },
    showIsFl() {
      return this.isFollow
    },
    getListUserLiked() {
      return this.$store.state.listUserLiked
    },
  },
  mounted() {
    this.tokenUser = localStorage.getItem('token')
    this.dataUser = JSON.parse(localStorage.getItem('user'))
  },

  methods: {
    unShowDialog() {
      this.showDialog = false
    },
    repCmt(id) {
      const res = this.listCmt.find((data) => data.id === id)
      this.repCmtData = res
      this.showUpReply = true
    },
    timeCreated(value) {
      return moment(value).format('MM-DD-YYYY')
    },
    insert(emoji) {
      this.commentContent += emoji
    },
    // downloadVideo(url) {
    //   axios
    //     .get(url, { responseType: 'blob' })
    //     .then((response) => {
    //       const blob = new Blob([response.data], { type: 'video/mp4' })
    //       const link = document.createElement('a')
    //       link.href = URL.createObjectURL(blob)
    //       link.download = 'video'
    //       link.click()
    //       URL.revokeObjectURL(link.href)
    //     })
    //     .catch(console.error)
    // },
    async saveComment() {
      if (this.dataUser && this.tokenUser) {
        if (this.showUpReply === false) {
          if (this.commentContent !== '') {
            this.showLoading = true
            const res = await AuthService.comment({
              content: this.commentContent,
              video_id: this.$route.params.id,
            })

            if (res && res.status === 'success') {
              window.console.log(res)
              const resCmt = await AuthService.loadCommentById(
                this.$route.params.id
              )
              this.$store.dispatch('actionsetListComments', resCmt.comments)
              this.$store.dispatch(
                'actionsetListReplyComments',
                resCmt.comments
              )
              this.$store.dispatch('actionsetListUserLikedCmt', resCmt.comments)
              this.commentContent = ''
              this.showLoading = false

              this.$notify({
                type: 'success',
                group: 'default',
                title: 'Thông báo',
                text: 'Bạn vừa bình luận bài viết này',
              })
              setTimeout(() => {
                this.$notify({
                  type: 'success',
                  group: 'default',
                  title: 'Thưởng',
                  text: 'Bạn được thưởng 1 coin vào tài khoản',
                })
              }, 500)
            } else {
              window.console.log('ko thành công')
            }
          } else {
            this.$notify({
              type: 'warn',
              group: 'default',
              title: 'Thông báo',
              text: 'Bạn chưa điền nội dung bình luận vào',
            })
          }
        } else if (this.commentContent !== '') {
          this.showLoading = true
          const res = await AuthService.reply({
            content: this.commentContent,
            comment_id: this.repCmtData.id,
          })
          if (res && res.status === 'success') {
            window.console.log(res)
            this.commentContent = ''
            const resCmt = await AuthService.loadCommentById(
              this.$route.params.id
            )
            window.console.log(resCmt)
            if (resCmt && resCmt.status === 'success') {
              this.$store.dispatch('actionsetListComments', resCmt.comments)
              this.$store.dispatch(
                'actionsetListReplyComments',
                resCmt.comments
              )
              this.$store.dispatch('actionsetListUserLikedCmt', resCmt.comments)
              this.showLoading = false
              this.$notify({
                type: 'success',
                group: 'default',
                title: 'Thông báo',
                text: 'Bạn vừa trả lời bình luận bài viết này',
              })
              setTimeout(() => {
                this.$notify({
                  type: 'success',
                  group: 'default',
                  title: 'Thưởng',
                  text: 'Bạn được thưởng 1 coin vào tài khoản',
                })
              }, 500)
            } else {
              window.console.log('ko thành công')
            }
          } else {
            window.console.log('ko thành công')
          }
        } else if (this.commentContent === '') {
          this.$notify({
            type: 'warn',
            group: 'default',
            title: 'Thông báo',
            text: 'Bạn chưa điền nội dung bình luận vào',
          })
        }
      } else {
        this.$notify({
          type: 'warn',
          group: 'default',
          title: 'Thông báo',
          text: 'Vui lòng đăng nhập để thực hiện chức năng này',
        })
      }
    },
    loadReplies(id) {
      const dataReply = this.getListReplyComments.filter(
        (el) => el.comment_id === id
      )
      return dataReply
    },
    showReply(index) {
      if (this.showIndex !== index) {
        this.showIndex = index
      } else {
        this.showIndex = null
      }
    },
  },
}
</script>
<style scoped>
.box-comment::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 20px;
}

.box-comment::-webkit-scrollbar {
  width: 8px;
  background-color: #fff;
}

.box-comment::-webkit-scrollbar-thumb {
  border-radius: 12px;
  background-color: #ddd;
}

.list-icon-share {
  cursor: pointer;
  transition: all 0.5s;
}

.list-icon-share:hover {
  transform: translateY(-5px);
}

.button-heart {
  transition-duration: 0.3s;
  position: relative;
}

.button-heart::after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 50%;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.4s;
  box-shadow: 0 0 10px 30px #2563eb;
}

.button-heart:active::after {
  box-shadow: 0 0 0 0 #2563eb;
  position: absolute;
  border-radius: 50%;
  left: 0;
  top: 0;
  opacity: 1;
  transition: 0s;
}

.button-heart:active {
  transform: translateY(5px);
}

@media (max-width: 1401px) {
  .input-comment {
    width: 343px;
  }

  .contain-comment {
    width: 35%;
  }
}
</style>
