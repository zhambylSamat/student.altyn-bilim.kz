<template>
  <v-app class="lesson">
    <router-view></router-view>
  </v-app>
</template>

<script>

import { mapState } from "vuex";

export default {
  name: "lesson",
  components: {},
  computed: {
    ...mapState({
      errs: state => state.lessonProgress.errors,
      warns: state => state.lessonProgress.warnings,
      success: state => state.lessonProgress.success,
    })
  }
};
</script>
