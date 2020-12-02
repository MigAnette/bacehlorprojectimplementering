<template>
  <div>
      <v-row> <v-btn v-for="(sandbox, index) in sandboxes" :key="index" :to="{ name: sandbox }"> {{ sandbox }} </v-btn> </v-row>
      Sandbox2</div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({
})

export default class Sandbox2 extends Vue {
  sandboxes: string[] = ["Sandbox1", "Sandbox2", "Sandbox3"];
}
</script>
