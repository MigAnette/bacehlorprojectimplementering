<template>
  <v-row class="ma-0">
    <v-textarea
      v-model="note"
      label="Tilføj note"
      auto-grow
      rows="1"
      row-height="15"
      @input="changeNote"
    ></v-textarea>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class FormAddNote extends Vue {
  @Prop({
    
  })
  addNote!: string;

  note = this.addNote || '' ? this.addNote : '';

  changeNote() {
    this.$emit("changeNote", this.note);
    console.log("change");
  }
}
</script>
