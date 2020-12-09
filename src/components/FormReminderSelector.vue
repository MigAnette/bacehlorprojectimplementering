<template>
  <v-row class="ma-0">
    <v-select :items="items" label="Vælg påmindelse" outlined @change="changeReminder"></v-select>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class FormReminderSelector extends Vue {
  
  items: string[] = ["I dag", "I morgen", "Næste uge", 'Tilpas'];

  changeReminder(item: string) {
    this.$emit("changeReminder", item);
  }
}
</script>
