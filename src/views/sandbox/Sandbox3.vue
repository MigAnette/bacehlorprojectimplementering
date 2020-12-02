<template>
  <div>  <v-row> <v-btn v-for="(sandbox, index) in sandboxes" :key="index" :to="{ name: sandbox }"> {{ sandbox }} </v-btn> </v-row>
      
      Sandbox3</div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component({
})

export default class Sandbox3 extends Vue {
  sandboxes: string[] = ["Sandbox1", "Sandbox2", "Sandbox3"];
}
</script>
