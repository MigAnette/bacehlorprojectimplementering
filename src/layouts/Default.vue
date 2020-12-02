<template>
  <v-app>
    <v-bottom-navigation fixed grow>
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
    {route: 'Home', value: 'forside', icon: 'mdi-home', id: 1},
    {route: 'Calender', value: 'kalender', icon: 'mdi-calendar-month', id: 2},
    {route: 'Profile', value: 'profil', icon: 'mdi-account', id: 3},
  ]
}
</script>
