<template>
  <div
    v-show="showBoxProfile"
    class="absolute top-[66px] z-10 ml-5"
    @mouseover="showWhenOver"
    @mouseleave="showWhenLeave"
  >
    <ul
      class="bg-white text-black text-left py-1 rounded-lg"
      style="box-shadow: rgb(0 0 0 / 20%) 0 2px 8px"
    >
      <li>
        <nuxt-link
          :to="`/profilePage/${dataUser.id}`"
          class="flex justify-start items-center"
        >
          <span class="mdi mdi-account text-[20px] mr-2"></span> Hồ
          sơ</nuxt-link
        >
      </li>
      <li>
        <nuxt-link to="/CoinPage" class="flex justify-start items-center">
          <span class="mdi mdi-coin text-[20px] mr-2"></span> Tình trạng xu cá
          nhân</nuxt-link
        >
      </li>
      <li>
        <a
          href="#"
          class="flex justify-start items-center"
          @click="showModal = true"
        >
          <span class="mdi mdi-wrench text-[20px] mr-2"></span> Đổi mật khẩu</a
        >
      </li>
      <li>
        <a href="#" class="flex justify-start items-center">
          <span class="mdi mdi-comment-question text-[20px] mr-2"></span>
          Hỗ Trợ</a
        >
      </li>
      <li @click="showDialog = true">
        <a href="#" class="flex justify-start items-center">
          <span class="mdi mdi-forward text-[20px] mr-2"></span>
          Đăng xuất</a
        >
      </li>
    </ul>
    <modal-change-pass :show-modal="showModal" :un-show-modal="unShowModal" />
    <Dialog
      :show="showDialog"
      title="Thông báo"
      description="Bạn có muốn đăng xuất không ??"
      :confirm="signOut"
      :cancel="unShowDialog"
    ></Dialog>
  </div>
</template>

<script>
import Dialog from '../dialog/dialog.vue'

import modalChangePass from './modalChangePass.vue'
import AuthService from '@/services/authService.js'

export default {
  components: { modalChangePass, Dialog },
  props: {
    showBoxProfile: {
      type: Boolean,
      default: false,
    },
    showWhenOver: {
      type: Function,
      default: () => 1,
    },
    showWhenLeave: {
      type: Function,
      default: () => 1,
    },
  },
  data() {
    return {
      dataUser: {},
      showModal: false,
      showDialog: false,
    }
  },

  async mounted() {
    await this.loadHeaderUser()
    window.console.log(this.dataUser.id)
  },
  methods: {
    unShowDialog() {
      this.showDialog = false
    },
    async loadHeaderUser() {
      const res = await AuthService.getProfile()
      if (res) {
        this.dataUser = res
      } else {
        this.$router.push('/')
        window.console.log('ko thành công')
      }
    },
    unShowModal() {
      this.showModal = false
    },
    signOut() {
      localStorage.clear()
      window.location.reload()
    },
  },
}
</script>
<style scoped>
ul li {
  padding: 8px 20px 8px 17px;
  cursor: pointer;
}

ul li:hover {
  background-color: #eee;
}
</style>
