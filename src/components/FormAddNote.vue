<template>
  <v-row>
    <v-textarea
      v-model="note"
      label="Tilføj note"
      auto-grow
      outlined
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
    required: true,
  })
  addNote!: string;

  note = this.addNote;

  changeNote() {
    this.$emit("changeNote", this.note);
    console.log("change");
  }
}
</script>
