import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import app from '@/store/modules/app/module.js';
import auth from "@/store/auth.module.js";
import lesson from '@/store/lesson.module.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    auth,
    lesson
  },
  plugins: [createPersistedState()]
});
