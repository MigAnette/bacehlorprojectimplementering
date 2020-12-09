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

    <form-start-and-finish addTime="10:24" menuLabel="Start time" @saveTime="saveStartTime" :addStartTime="startTime"></form-start-and-finish>

    <form-energy-level :changedEnergyLevel="1" changedEnergyOutcome="positive" @energyLevel="sendEnergyLevel"></form-energy-level>

    <form-add-step @changeSteps="changeSteps" :taskSteps="steps"></form-add-step>
  </v-container>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import FormTitle from "@/components/FormTitle.vue";
import FormStartAndFinish from "@/components/FormStartAndFinish.vue";
import FormEnergyLevel from "@/components/FormEnergyLevel.vue";
import FormAddStep from '@/components/FormAddStep.vue';

@Component({
  components: {
    FormTitle,
    FormStartAndFinish,
    FormEnergyLevel,
    FormAddStep,
  },
})
export default class Sandbox3 extends Vue {
  sandboxes: string[] = ["Sandbox1", "Sandbox2", "Sandbox3"];

  steps: { title: string; done: boolean }[] = [];

  startTime = "14:19"

  changeTitle(title: string) {
    console.log(title);
  }

  saveStartTime(time: string) {
    console.log(time);
  }

  sendEnergyLevel(value: {energyLevel: number; energyOutcome: string}) {
    console.log(`${value.energyLevel} ${value.energyOutcome}`);
  }

  changeSteps(steps: { title: string; done: boolean }) {
    console.log(steps);
  }
}
</script>
