import axios from 'axios'
const AuthService = {
  initAuthHeader() {
    const token = localStorage.getItem('token')
    if (token && token !== '') {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
      axios.defaults.headers.common.Authorization = ``
    }
  },

  resetHeader() {
    localStorage.setItem('token', '')
    this.initAuthHeader()
  },

  async register(user) {
    const res = await axios.post('https://utenew.tk/api/auth/register', user)
    if (res.status === 200) {
      // localStorage.setItem('token', res.data.access_token)
      // localStorage.setItem('user', JSON.stringify(res.data.user))
      // this.initAuthHeader()

      return res.data
    } else {
      window.console.log('ko thành công')
    }
    return res.data
  },
  async login(user) {
    const res = await axios.post('https://utenew.tk/api/auth/login', user)

    if (res && res.status === 200) {
      localStorage.setItem('token', res.data.access_token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      this.initAuthHeader()
      return res.data
    } else {
      window.console.log('ko thành công')
    }
    // return res.data
  },
  async changePassword(data) {
    const res = await axios.post('https://utenew.tk/api/auth/change-pass', data)
    if (res.status === 200) {
      this.initAuthHeader()
      return res.data
    } else {
      window.console.log('ko thành công')
    }
    return res.data
  },
  async updateProfile(data) {
    const res = await axios.post(
      'https://utenew.tk/api/auth/update-profile',
      data
    )

    if (res.status === 201) {
      this.initAuthHeader()
      return res.data
    } else {
      window.console.log('ko thành công')
    }

    return res.data
  },
  async comment(data) {
    try {
      this.initAuthHeader()
      const res = await axios.post('https://utenew.tk/api/comment', data)
      if (res.status === 201) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async reply(data) {
    try {
      this.initAuthHeader()
      const res = await axios.post('https://utenew.tk/api/reply', data)
      if (res.status === 201) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async chooseVideo(data, config) {
    try {
      this.initAuthHeader()
      const res = await axios.post(
        'https://utenew.tk/api/video/store-url',
        data,
        config
      )
      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async uploadVideo(data) {
    try {
      this.initAuthHeader()
      const res = await axios.post(
        'https://utenew.tk/api/video/save-video',
        data
      )
      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async getVideoShareByUser(id) {
    try {
      this.initAuthHeader()
      const res = await axios.get(
        `https://utenew.tk/api/video/user/${id}/share`
      )
      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async getVideoShareByShare() {
    try {
      this.initAuthHeader()
      const res = await axios.get(
        `https://utenew.tk/api/video/params?type=SHARE`
      )
      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async updateVideo(data, id) {
    try {
      this.initAuthHeader()
      const res = await axios.put(`https://utenew.tk/api/video/${id}`, data)
      if (res.status === 201) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async deleteVideo(id) {
    try {
      this.initAuthHeader()
      const res = await axios.delete(`https://utenew.tk/api/video/${id}`)
      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async deleteComment(id) {
    try {
      this.initAuthHeader()
      const res = await axios.delete(`https://utenew.tk/api/comment/${id}`)
      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async createHashtag(data) {
    try {
      this.initAuthHeader()
      const res = await axios.post('https://utenew.tk/api/hashtag', data)
      if (res.status === 201) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async deleteHashtag(data) {
    try {
      this.initAuthHeader()
      const res = await axios.post('https://utenew.tk/api/hashtag', data)
      if (res.status === 201) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async sendReport(data) {
    try {
      this.initAuthHeader()
      const res = await axios.post('https://utenew.tk/api/report', data)
      if (res.status === 201) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async follow(data) {
    try {
      this.initAuthHeader()
      const res = await axios.post('https://utenew.tk/api/follow', data)
      if (res.status === 201) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async like(data) {
    try {
      this.initAuthHeader()
      const res = await axios.post('https://utenew.tk/api/like', data)
      if (res.status === 201) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async download() {
    try {
      this.initAuthHeader()
      const res = await axios.post('https://utenew.tk/api/user/minus-download')
      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async video() {
    try {
      this.initAuthHeader()
      const res = await axios.get('https://utenew.tk/api/video')
      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async shareVideo(id, data) {
    try {
      this.initAuthHeader()
      const res = await axios.post(
        `https://utenew.tk/api/video/${id}/share`,
        data
      )
      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async videoNotFollow() {
    try {
      this.initAuthHeader()
      const res = await axios.get(
        'https://utenew.tk/api/video/me?is_following=0'
      )
      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async videoIsFollow() {
    try {
      this.initAuthHeader()
      const res = await axios.get(
        'https://utenew.tk/api/video/me?is_following=1'
      )
      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async user() {
    try {
      const res = await axios.get('https://utenew.tk/api/user')
      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async hashtag() {
    try {
      this.initAuthHeader()
      const res = await axios.get(`https://utenew.tk/api/hashtag`)

      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async getProfile() {
    try {
      this.initAuthHeader()
      const res = await axios.get(`https://utenew.tk/api/auth/user-profile`)

      if (res.status === 200) {
        return res.data
      } else {
        this.resetHeader()

        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      this.resetHeader()

      window.console.log('ko thành công')
    }
  },
  async search(data) {
    try {
      this.initAuthHeader()
      const res = await axios.get(
        `https://utenew.tk/api/search?keyword=${data}`
      )

      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async detailsUser(id) {
    try {
      this.initAuthHeader()
      const res = await axios.get(`https://utenew.tk/api/user/${id}`)

      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async loadVideoById(id) {
    try {
      this.initAuthHeader()
      const res = await axios.get(`https://utenew.tk/api/video/${id}`)

      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async loadVideoByUserId(id) {
    try {
      this.initAuthHeader()
      const res = await axios.get(
        `https://utenew.tk/api/video/params?user_id=${id}`
      )

      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async loadVideoByHashtag(data) {
    try {
      this.initAuthHeader()
      const res = await axios.get(
        `https://utenew.tk/api/video/params?hashtag[0]=${data}`
      )

      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async loadVideoLiked() {
    try {
      this.initAuthHeader()
      const res = await axios.get(`https://utenew.tk/api/video/liked`)

      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  async loadCommentById(id) {
    try {
      this.initAuthHeader()
      const res = await axios.get(
        `https://utenew.tk/api/comment?video_id=${id}`
      )

      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },

  async loadReplyById(id) {
    try {
      this.initAuthHeader()
      const res = await axios.get(
        `https://utenew.tk/api/reply?comment_id=${id}`
      )

      if (res.status === 200) {
        return res.data
      } else {
        window.console.log('ko thành công')
      }
      return res.data
    } catch (e) {
      window.console.log('ko thành công')
    }
  },
  //ĐƯỜNG DẪN LOCALHOST: // http://127.0.0.1:8080/
}

export default AuthService
