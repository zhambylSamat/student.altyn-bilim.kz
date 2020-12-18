<template>
  <div class='vimeo-video'></div>
</template>

<script>

import Player from '@vimeo/player';

export default {
  props: {
    videoId: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => ({quality: '720p'})
    }
  },
  data() {
    return {
      player: null,
    }
  },
  methods: {
    load_video(videoId, options) {
      if (videoId != '') {
        options.id = parseInt(videoId);
        this.player = new Player(this.$el, options)
        this.player.loadVideo()
          .then((id) => {
            this.$emit('ready', id);
          })
          .catch((error) => {
            switch (error.name) {
              case 'TypeError':
                  var message = 'the id was not a number';
                  this.$emit('error', message, error);
                  break;

              case 'PasswordError':
                  message = 'the video is password-protected and the viewer needs to enter the password first';
                  this.$emit('error', message, error);
                  break;

              case 'PrivacyError':
                  message = 'the video is password-protected or private';
                  this.$emit('error', message, error);
                  break;

              default:
                  message = 'some other error occurred';
                  this.$emit('error', message, error);
                  break;
            }
          });
      } else {
        this.$emit('error', 'video id is requrired', null);
      }
    }
  },
  mounted() {
    this.load_video(this.videoId, this.options);
  }
}
</script>