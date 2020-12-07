<template>
  <v-row>
    <v-text-field v-model="title" label="Regular" @input="changeTitle"></v-text-field>
  </v-row>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({

})
export default class FormTitle extends Vue {
  @Prop({
    required: true,
  })
  addTitle!: string;

  title = this.addTitle;
  public changeTitle() {
    this.$emit("changeTitle", this.title);
  }
}
</script>
