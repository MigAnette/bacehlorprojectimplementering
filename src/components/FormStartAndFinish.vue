<template>
  <v-row>
    <v-menu
      ref="menu"
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="time"
          :label="menuLabel"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="menu2"
        v-model="time"
        full-width
        @click:minute="saveTime"
        format="24hr"
      ></v-time-picker>
    </v-menu>
  </v-row>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class FormStartAndFinish extends Vue {
  @Prop({})
  menuLabel!: string;

  @Prop({})
  startTime!: boolean;

  @Prop({})
  finishTime!: boolean;
 
  @Prop({})
  addStartTime!: number;

  menu2 = false;

  time = this.addStartTime;

  saveTime() {
    // $refs.menu.save(time)
    this.$emit('saveTime', this.time);
  }
}
</script>
 