<template>
  <v-row class="ma-0">
    <v-textarea
      v-model="newNote"
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

  note = this.addNote;

  get newNote() { return this.addNote }
  set newNote(value) { this.note = value }

  changeNote() {
    this.$emit("changeNote", this.note);
    console.log("change");
  }
}
</script>
