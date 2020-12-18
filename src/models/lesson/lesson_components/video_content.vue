<template>
  <v-card>
    <div v-if="videos == null || topic == null" class='text-center py-3'>
      Керек тақырыптағы видеоны таңда
    </div>
    <div v-else>
      <v-card-title>
        {{ topic.title }}
      </v-card-title>
      <v-divider></v-divider>
      <v-progress-linear v-if="loading.on_fetch_videos" indeterminate color="info"></v-progress-linear>
      <template>
        <v-row>
          <v-col cols='12' class='text-center'>
            <vimeo-video v-for="(val, i) in videos" :key="i+'|'+videoComponentKey" :videoId="getIdFromUrl(val.link)" @ready="onReady" @error="onError"/>
            <!-- <vimeo-player v-for="(val, i) in videos" :key='i' :video-id="getIdFromUrl(val.link)" @ready="onReady" @error="onError" @loaded="onLoaded" :options="options"></vimeo-player> -->
          </v-col>
        </v-row>
      </template>
    </div>
  </v-card>
</template>

<script>

export default {
  data() {
    return {
      videos: null,
      topic: null,
      loading: {
        on_fetch_videos: false
      },
      videoComponentKey: 0
    }
  },
  methods: {
    setDatas(topic, videos, videoComponentKey) {
      this.topic = topic;
      this.videos = videos;
      this.loading.on_fetch_videos = true;
      this.videoComponentKey = videoComponentKey
    },
    getIdFromUrl(link) {
      var tmp = link.split('/');
      return tmp[tmp.length - 1];
    },
    onReady() {
      this.loading.on_fetch_videos = false;
    },
    onError() {
      this.loading.on_fetch_videos = false;
    }
  }
}
</script>