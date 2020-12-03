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

    <form-title addTitle="" changeTitle=""> </form-title>

    <form-start-and-finish addStartTime="13:00"></form-start-and-finish>
  </v-container>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import FormTitle from "@/components/FormTitle.vue";
import FormStartAndFinish from "@/components/FormStartAndFinish.vue";

@Component({
  components: {
    FormTitle,
    FormStartAndFinish,
  },
})
export default class Sandbox3 extends Vue {
  sandboxes: string[] = ["Sandbox1", "Sandbox2", "Sandbox3"];

  changeTitle(title: string) {
    console.log(title);
  }
}
</script>
