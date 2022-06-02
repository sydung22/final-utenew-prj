<template>
  <div class="flex relative" style="z-index: 2">
    <videoplay :background-video="backgroundVideo" :url-video="urlVideo" />
    <videocomment
      :user-name="userName"
      :full-name="fullName"
      :hashtag="hashtag"
      :avatar="avatar"
      :url-details="urlDetails"
      :description="description"
      :count-like="countLike"
      :list-comments="listComments"
    />
  </div>
</template>

<script>
import Videocomment from './videocomment.vue'
import videoplay from './videoplay.vue'
export default {
  name: 'VideoDetailsContainer',
  components: { videoplay, Videocomment },
  props: {
    backgroundVideo: {
      type: String,
      default: '',
    },
    urlVideo: {
      type: String,
      default: '',
    },
    userName: {
      type: String,
      default: '',
    },
    fullName: {
      type: String,
      default: '',
    },
    hashtag: {
      type: String,
      default: '',
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
  },
}
</script>
