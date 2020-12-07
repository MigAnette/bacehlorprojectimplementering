<template>
  <v-row>
    <v-select :items="items" label="Vælg påmindelse" outlined @change="changeReminder"></v-select>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class FormReminderSelector extends Vue {
  @Prop({
    required: true,
  })
  reminders!: string[];

  items = this.reminders;

  changeReminder(item: string) {
    this.$emit("changeReminder", item);
  }
}
</script>
