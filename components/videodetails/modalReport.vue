<template>
  <div
    v-show="showModal"
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex items-center justify-center"
    style="background-color: rgba(0 0 0 / 70%)"
  >
    <div class="relative p-4 w-full max-w-[600px] h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Báo cáo video
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal"
            @click="unShowModal"
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
        <!-- <form>
          <label for="email">Your email address:</label>
          <input id="email" type="email" v-model="email" />
          <label for="message">Message:</label>
          <textarea id="message" v-model="message" />
          <button type="submit" @click.prevent="send">Send email</button>
        </form> -->
        <div class="px-5">
          <!-- <div class="my-4">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
              for="email"
            >
              Email
            </label>
            <input
              v-model="email"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div> -->
          <div class="my-4">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
              for="facebook"
            >
              Tiêu đề
            </label>
            <input
              id="facebook"
              v-model="subject"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Tiêu đề"
            />
          </div>
          <div class="my-4">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
              for="message"
            >
              Nội dung báo cáo
            </label>
            <textarea
              id="message"
              v-model="message"
              class="h-[200px] appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Nội dung..."
            />
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
            @click.prevent="sendReport"
          >
            Gửi báo cáo
          </button>
          <button
            data-modal-toggle="defaultModal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            @click="unShowModal"
          >
            Thoát
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import AuthService from '@/services/authService.js'

export default {
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    unShowModal: {
      type: Function,
      default: () => 1,
    },
    dataUpdateObj: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    email: '',
    message: '',
    subject: '',
  }),
  methods: {
    async sendReport() {
      const res = await AuthService.sendReport({
        video_id: Number(this.$route.params.id),
        title: this.subject,
        description: this.message,
      })
      if (res && res.status === 'success') {
        this.$notify({
          type: 'success',
          group: 'default',
          title: 'Success',
          text: 'Gửi nội dung báo cáo thành công!',
        })
        setTimeout(() => {
          this.$router.push('/')
        }, 800)
      } else {
        window.console.log('ko thành công')
      }
    },
    send() {
      this.$mail.send({
        from: this.email,
        subject: this.subject,
        text: this.message,
      })
      this.$notify({
        type: 'success',
        group: 'default',
        title: 'Success',
        text: 'Gửi nội dung báo cáo thành công!',
      })
    },
  },
}
</script>
