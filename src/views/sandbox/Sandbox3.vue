<template>
  <v-container>
    <v-row>
      <v-btn
        v-for="(sandbox, index) in sandboxes"
        :key="index"
        :to="{ name: sandbox }"
      >
        {{ sandbox }}
      </v-btn>
    </v-row>

    Sandbox3

    <form-title addTitle="" @changeTitle="changeTitle"> </form-title>

    <form-start-and-finish menuLabel="Start time" @saveTime="saveStartTime" :addStartTime="startTime"></form-start-and-finish>

    <form-energy-level></form-energy-level>
  </v-container>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import FormTitle from "@/components/FormTitle.vue";
import FormStartAndFinish from "@/components/FormStartAndFinish.vue";
import FormEnergyLevel from "@/components/FormEnergyLevel.vue";

@Component({
  components: {
    FormTitle,
    FormStartAndFinish,
    FormEnergyLevel,
  },
})
export default class Sandbox3 extends Vue {
  sandboxes: string[] = ["Sandbox1", "Sandbox2", "Sandbox3"];

  startTime = "14:19"

  changeTitle(title: string) {
    console.log(title);
  }

  saveStartTime(time: string) {
    console.log(time);
  }
}
</script>
