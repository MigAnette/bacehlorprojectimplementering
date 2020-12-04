<template>
  <v-container>
    <component :is="layout"></component>
  </v-container>
</template>

<script lang="ts">
const defaultLayout = 'default';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'App',

  computed: {
    layout() {
      return `${this.$route.meta.layout || defaultLayout}-layout`;
    }
  }
})

export default class App extends Vue{
}
</script>
