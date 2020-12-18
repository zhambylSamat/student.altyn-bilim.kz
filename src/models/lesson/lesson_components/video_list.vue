<template>
  <div>
    <v-progress-linear v-if="loading.on_fetch_video_list" indeterminate color="info"></v-progress-linear>
    <template v-else>
      <v-card v-for="(val_s, i) in getVideoList" :key='i+"|"+componentKey' class='my-2'>
        <v-card-title class='subtitle-1'>
          {{ val_s.subject.title }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style='padding: 0 !important;'>
          <v-list dense class='py-0' v-for="(val_t, j) in val_s.topics" :key='j'>
            <v-list-item class='px-0'>
              <v-list-item-content class='py-0 px-3'>
                <v-row v-if='val_t.video != null' style='cursor:pointer;' :class='{"green accent-1" : is_selected_play_button(val_t.topic.pk)}' @click="play(val_t)">
                  <v-col cols='9' class='mt-2'>
                    <span>{{ val_t.topic.title }}</span>
                  </v-col>
                  <v-col cols='3'>
                    <v-btn outlined :disabled='is_selected_play_button(val_t.topic.pk)' color='success'><v-icon>mdi-play-circle-outline</v-icon></v-btn>
                  </v-col>
                </v-row>
                <v-row v-else>
                  <v-col cols='9' class='mt-2'>
                    <span class='grey--text text--darken-1'>{{ val_t.topic.title }}</span>
                    <template v-if="val_t.message !== undefined && val_t.message != ''">
                      <br>
                      <span class='red--text text--accent-2'>{{ val_t.message }}</span>
                    </template>
                  </v-col>
                  <v-col cols='3' v-if='val_t.has_video'>
                    <v-btn outlined color='success' disabled><v-icon>mdi-play-circle-outline</v-icon></v-btn>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import { GET_VIDEO_LIST } from "@/store/actions.type.js";

export default {
  props: ['render_videos'],
  data() {
    return {
      loading: {
        on_fetch_video_list: false,
      },
      selected_play_button: {},
      componentKey: 1
    }
  },
  methods: {
    fetchVideoList() {
      this.loading.on_fetch_video_list = true;
      this.$store.dispatch(GET_VIDEO_LIST)
        .then(() => {
          this.loading.on_fetch_video_list = false;
          var last_subject_key = this.getVideoList.length - 1;
          var last_topic_key = this.getVideoList[last_subject_key]['topics'].length - 1;
          while (this.getVideoList[last_subject_key]['topics'][last_topic_key]['video'] == null) {
            last_topic_key--;
          }
          var last_topic = this.getVideoList[last_subject_key]['topics'][last_topic_key];
          this.play(last_topic);
        })
        .catch(() => { this.loading.on_fetch_video_list = false; });
    },
    is_selected_play_button(topic_pk) {
      if (this.selected_play_button[topic_pk] !== undefined) {
        return this.selected_play_button[topic_pk];
      }
      return false;
    },
    selectTopicElem(topic_pk) {
      for (var key in this.selected_play_button) {
        this.selected_play_button[key] = false;
      }
      this.selected_play_button[topic_pk] = true;
      this.componentKey++;
    },
    play(data) {
      if (!this.is_selected_play_button(data.topic.pk)) {
        this.selectTopicElem(data.topic.pk);
        this.render_videos(data.topic, data.video);
      }
    }
  },
  computed: {
    ...mapGetters(['getVideoList']),
  },
  created() {
    this.fetchVideoList();
  }
}
</script>
