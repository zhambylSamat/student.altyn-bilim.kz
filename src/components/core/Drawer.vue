<template>

  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="300"
  >
    <v-img
      :src="image"
      height="100%"
    >
      <v-layout
        column
      >
        <v-list-item>
          <v-avatar color='indigo' size='36' class='mr-2'>
            <span class='white--text headline' v-if='currentUser.last_name != undefined'>{{ currentUser.last_name.substring(0,1) }}</span>
          </v-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ currentUser.last_name }} {{ currentUser.first_name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider/>

        <v-list-item
          v-for="(link, i) in links"
          :key="i"
        >
          <v-list-item
            link v-if='link.is_link'
            :to="link.is_link ? link.to : ''"
            active-class='light-blue--text text--lighten-4'
            avatar>
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group v-else active-class='light-blue--text text--lighten-1'>

            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ link.text }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="(value, index) in link.childs"
              :key='index'
              link :to="link.to+value.to"
              active-class='light-blue--text text--lighten-4'
              avatar>
              <v-list-item-icon>
                <v-icon>{{ value.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ value.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list-group>

        </v-list-item>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapGetters } from 'vuex';

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    logo: 'favicon.ico',
    image: require('@/assets/img/content/utils/drawer-bg.jpg'),
    links: [
      {
        to: '/lesson',
        is_link: true,
        icon: 'mdi-presentation-play',
        text: 'Current groups'
      },
    ]
  }),
  computed: {
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    items () {
      return this.$t('Layout.View.items')
    },
    ...mapGetters(["currentUser"])
  },

  methods: {
    ...mapMutations(['setDrawer', 'toggleDrawer'])
  }
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }
  }
</style>
