<template>
  <div>
    <div v-show="showLayout" class="flex relative" style="z-index: 2">
      <videoplay
        :background-video="detailsVideo.cover"
        :url-video="detailsVideo.url"
        :show-report="showReport"
      />
      <videocomment
        :user-name="detailsUser.username"
        :full-name="detailsUser.fullname"
        :count-view="detailsVideo.views"
        :hash-tag="detailsVideo.hashtags"
        :description="detailsVideo.description"
        :avatar="detailsUser.avatar"
        :url-details="setUrl"
        :count-like="detailsVideo.likes_count"
        :list-comments="getListComments"
        :video-data-user="detailsUser.id"
        :is-follow="isFollow"
        :is-liked-video="isLikedVideo"
        :is-liked-comment="checkLikedCmt"
        :is-liked-reply="checkLikedReply"
        :change-followings="changeFollowings"
        :change-heart="changeHeart"
        :on-like-comment="likeComment"
        :on-like-reply="likeReply"
        :show-update="showUpdate"
        :delete-video="deleteVideo"
        :delete-comment="deleteComment"
        :download-video="downloadItem"
        :handle-row="handleRow"
        :show-dialog-delete="showDialogDelete"
        :un-show-dialog-delete="unShowDialogDelete"
      />
      <modal-report :show-modal="showModal" :un-show-modal="unShowModal" />
      <modal-update
        :show-modal-update="showModalUpdate"
        :un-show-modal-update="unShowModalUpdate"
        :data-update-obj="dataVideo"
        :list-hashtags="listHashtags"
      />
    </div>
    <test-page v-show="showSpin"></test-page>
    <loading-sign-in v-show="showLoading"></loading-sign-in>
    <notifications group="default" position="top left" />
  </div>
</template>

<script>
import axios from 'axios'
import testPage from '~/components/loading/testPage.vue'
import Videoplay from '~/components/videodetails/videoplay.vue'
import Videocomment from '~/components/videodetails/videocomment.vue'
import ModalReport from '~/components/videodetails/modalReport.vue'
import AuthService from '@/services/authService.js'
import ModalUpdate from '~/components/videodetails/modalUpdate.vue'
import LoadingSignIn from '~/components/loading/loadingSignIn.vue'
export default {
  name: 'DetailsVideo',
  components: {
    testPage,
    Videoplay,
    Videocomment,
    ModalReport,
    ModalUpdate,
    LoadingSignIn,
  },
  data() {
    return {
      detailsVideo: {},
      detailsUser: {},
      detailsLikes: {},
      setUrl: '',
      showSpin: false,
      showLayout: false,
      loading: false,
      dataUser: {},
      tokenUser: '',
      showModal: false,
      showModalUpdate: false,
      dataVideo: {},
      listHashtags: [],
      listPosters: [],
      showLoading: false,
      idDelete: null,
      showDialogDelete: false,
      listCheckContent: [],
    }
  },
  computed: {
    getListComments() {
      return this.$store.state.listComments
    },
    getCountLike() {
      return this.$store.state.countLikeVideos
    },
    getListFollowings() {
      return this.$store.state.listUserFollowings
    },
    getListUserLiked() {
      return this.$store.state.listUserLiked
    },
    getListUserLikedCmt() {
      return this.$store.state.listUserLikedCmt
    },
  },
  async mounted() {
    this.showSpin = true
    await this.loadDetailVideo()
    await this.loadComments()
    this.dataUser = JSON.parse(localStorage.getItem('user'))
    this.tokenUser = localStorage.getItem('token')
    this.$store.dispatch('actionsetIsUser', this.tokenUser)
    localStorage.setItem('video', JSON.stringify(this.detailsVideo))
    this.setUrl = `http://localhost:3000/detailsVideoPage/${this.$route.params.id}`
    this.dataVideo = JSON.parse(localStorage.getItem('video'))
    if (this.dataVideo) {
      const resultHashtag = []
      this.dataVideo.hashtags.forEach((item) => {
        window.console.log(item.name)
        resultHashtag.push(item.name)
      })
      this.listHashtags = resultHashtag.flat(99)
    }
    await this.loadListFollowing()
    // window.console.log(this.isFollow())
    this.showSpin = false
    this.showLayout = true
    const resultPoster = []
    resultPoster.push(this.dataVideo.cover)
    this.listPosters = resultPoster.flat(99)
  },
  methods: {
    handleRow(item) {
      this.showDialogDelete = true
      this.idDelete = item.id
    },
    unShowDialogDelete() {
      this.showDialogDelete = false
    },
    checkLikedCmt(index) {
      const resUser = JSON.parse(localStorage.getItem('user'))
      if (resUser) {
        const data = this.getListUserLikedCmt.find(
          (el) => el.id === this.getListUserLikedCmt[index].id
        )
        if (data) {
          const dataLikes = !!data.likes.find((el) => el.user_id === resUser.id)
          return dataLikes
        }
      }
    },
    checkLikedReply(indexCmt, indexReply) {
      const resUser = JSON.parse(localStorage.getItem('user'))
      if (resUser) {
        const data = this.getListUserLikedCmt.find(
          (el) => el.id === this.getListUserLikedCmt[indexCmt].id
        )
        if (data) {
          const dataLikeCmt = data.replies.find(
            (el) => el.id === data.replies[indexReply].id
          )
          if (dataLikeCmt) {
            const dataLikeReply = !!dataLikeCmt.likes.find(
              (el) => el.user_id === resUser.id
            )
            return dataLikeReply
          } else {
            window.console.log('ko có dữ liệu')
          }
        } else {
          window.console.log('Ko có dữ liệu')
        }
      }
    },
    async changeHeart() {
      if (this.dataUser && this.tokenUser) {
        const res = await AuthService.like({
          video_id: Number(this.$route.params.id),
        })
        if (res && res.status === 'success') {
          this.loadDetailVideo()
        } else {
          window.console.log('ko thành công')
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
    async loadVideo() {
      const res = await AuthService.video()
      if (res && res.status === 'success') {
        this.listCheckContent = res.videos
      } else {
        window.console.log('ko thành công')
      }
    },
    async deleteVideo() {
      this.showLoading = true
      const res = await AuthService.deleteVideo(Number(this.$route.params.id))
      if (res && res.status === 'success') {
        // await this.loadVideo()
        // const data = this.listCheckContent.filter(
        //   (el) => el.share_video_id === Number(this.$route.params.id)
        // )
        // data.forEach((el) => {
        //   AuthService.deleteVideo(el.id)
        //   if (res && res.status === 'success') {
        //     window.console.log('xóa video chia sẻ thành công')
        //   } else {
        //     window.console.log('xóa video không chia sẻ thành công')
        //   }
        // })
        this.showLoading = false
        this.$notify({
          type: 'success',
          group: 'default',
          title: 'Thông báo',
          text: 'Xóa bài đăng thành công!!!',
        })
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      } else {
        window.console.log('ko thành công')
      }
    },
    async deleteComment() {
      this.showLoading = true
      const res = await AuthService.deleteComment(this.idDelete)
      if (res && res.status === 'success') {
        const resCmt = await AuthService.loadCommentById(this.$route.params.id)
        this.$store.dispatch('actionsetListComments', resCmt.comments)
        this.$store.dispatch('actionsetListReplyComments', resCmt.comments)
        this.$store.dispatch('actionsetListUserLikedCmt', resCmt.comments)
        this.showLoading = false
        this.$notify({
          type: 'success',
          group: 'default',
          title: 'Thông báo',
          text: 'Xóa bình luận thành công!!!',
        })
      } else {
        window.console.log('ko thành công')
      }
    },
    async likeComment(id) {
      if (this.dataUser && this.tokenUser) {
        const res = await AuthService.like({
          comment_id: id,
        })
        if (res && res.status === 'success') {
          this.loadComments()
        } else {
          window.console.log('ko thành công')
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
    async likeReply(id) {
      if (this.dataUser && this.tokenUser) {
        const res = await AuthService.like({
          reply_id: id,
        })
        if (res && res.status === 'success') {
          this.loadComments()
        } else {
          window.console.log('ko thành công')
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
    async loadDetailVideo() {
      const res = await AuthService.loadVideoById(this.$route.params.id)
      if (res && res.status === 'success') {
        this.detailsVideo = res.video
        this.detailsUser = res.video.user
        this.$store.dispatch('actionsetListUserLiked', res.video.likes)
        window.console.log('thành công')
      } else {
        window.console.log('ko thành công')
      }
    },
    async downloadItem() {
      if (this.tokenUser) {
        const res = await AuthService.download()
        if (res && res.status === 'success') {
          axios
            .get(this.detailsVideo.url, { responseType: 'blob' })
            .then((response) => {
              const blob = new Blob([response.data], { type: 'video/mp4' })
              const link = document.createElement('a')
              link.href = URL.createObjectURL(blob)
              link.download = 'video'
              link.click()
              URL.revokeObjectURL(link.href)
              setTimeout(() => {
                this.$notify({
                  type: 'error',
                  group: 'default',
                  title: 'Trừ Coin',
                  text: 'Bạn bị trừ 10 coin trong tài khoản',
                })
              }, 2000)
            })
            .catch(window.console.error)
        } else {
          this.$notify({
            type: 'warn',
            group: 'default',
            title: 'Thông báo',
            text: 'Bạn chưa đủ điều kiện để tải video này',
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
    showReport() {
      if (this.tokenUser && this.dataUser) {
        this.showModal = true
      } else {
        this.$notify({
          type: 'warn',
          group: 'default',
          title: 'Thông báo',
          text: 'Vui lòng đăng nhập để thực hiện chức năng này',
        })
      }
    },
    unShowModal() {
      this.showModal = false
    },
    showUpdate() {
      this.showModalUpdate = true
    },
    unShowModalUpdate() {
      this.showModalUpdate = false
    },
    async loadListFollowing() {
      if (this.dataUser && this.tokenUser) {
        const res = await AuthService.detailsUser(this.dataUser.id)
        if (res && res.status === 'success') {
          this.$store.dispatch(
            'actionsetListUserFollowings',
            res.user.followings
          )
          window.console.log('thành công')
        } else {
          window.console.log('ko thành công')
        }
      }
    },
    isFollow() {
      if (this.dataUser && this.tokenUser) {
        const isFollowing = !!this.getListFollowings.find(
          (ele) => ele.user_id_2 === this.detailsUser.id
        )
        return isFollowing
      }
    },
    isLikedVideo() {
      if (this.dataUser && this.tokenUser) {
        const isFollowing = !!this.getListUserLiked.find(
          (ele) => ele.user_id === this.dataUser.id
        )
        return isFollowing
      }
    },
    async changeFollowings() {
      if (this.dataUser && this.tokenUser) {
        const res = await AuthService.follow({ user_id: this.detailsUser.id })
        if (res && res.status === 'success') {
          if (this.dataUser) {
            const res = await AuthService.detailsUser(this.dataUser.id)
            if (res && res.status === 'success') {
              this.$store.dispatch(
                'actionsetListUserFollowings',
                res.user.followings
              )
              window.console.log('thành công')
            } else {
              window.console.log('ko thành công')
            }
          }
          if (res && res.message === 'Follow successfully') {
            this.$notify({
              type: 'success',
              group: 'default',
              title: 'Thông báo',
              text: 'Bạn vừa theo dõi người dùng này',
            })
            setTimeout(() => {
              this.$notify({
                type: 'success',
                group: 'default',
                title: 'Thưởng',
                text: 'Bạn được thưởng 1 coin vào tài khoản',
              })
            }, 700)
          } else {
            this.$notify({
              type: 'success',
              group: 'default',
              title: 'Thông báo',
              text: 'Bạn vừa hủy theo dõi người dùng này',
            })
          }
        } else {
          window.console.log('ko thành công')
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
    async loadComments() {
      const res = await AuthService.loadCommentById(this.$route.params.id)
      if (res && res.status === 'success') {
        this.$store.dispatch('actionsetListComments', res.comments)
        this.$store.dispatch('actionsetListReplyComments', res.comments)
        this.$store.dispatch('actionsetListUserLikedCmt', res.comments)
        window.console.log('thành công')
      } else {
        window.console.log('ko thành công')
      }
      // this.listComments = this.getListComments
    },
  },
}
</script>
