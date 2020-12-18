<template>
  <v-container>
    <v-row>
      <v-col cols='12' md='4' sm='6' xs='12'>
        <VideoList :render_videos='renderVideos' />
      </v-col>
      <v-col cols='12' md='8' sm='6' xs='12'>
        <VideoContent ref='video_content'/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import VideoList from "@/models/lesson/lesson_components/video_list.vue";
import VideoContent from "@/models/lesson/lesson_components/video_content.vue";

export default {
  components: {
    VideoList,
    VideoContent
  },
  data() {
    return {
      videoComponentKey: 1
    }
  },
  methods: {
    renderVideos(topic, videos) {
      this.videoComponentKey++;
      this.$refs.video_content.setDatas(topic, videos, this.videoComponentKey);
    }
  }
}
</script>
