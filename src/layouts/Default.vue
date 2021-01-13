<template>
  <v-app>
    <v-bottom-navigation app fixed grow>
      <v-btn v-for="mainlink in mainLinks" :key="mainlink.id" :to="{name: mainlink.route}" :value="mainlink.value">
        <span> {{ mainlink.value }} </span>
        <v-icon> {{ mainlink.icon }} </v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'DefaultLayout',
})

export default class DefaultLayout extends Vue {
  mainLinks: {route: string; value: string; icon: string; id: number}[] = [
    {route: 'Home', value: 'Hjem', icon: 'mdi-home', id: 1},
    {route: 'Calender', value: 'Kalender', icon: 'mdi-calendar-month', id: 2},
    {route: 'Goal', value: 'Mål', icon: 'mdi-trophy', id: 3},
    {route: 'Profile', value: 'Profil', icon: 'mdi-account', id: 4},
  ]
}
</script>
