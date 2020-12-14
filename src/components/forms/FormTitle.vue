<template>
<v-row class="ma-0">
    <v-text-field v-model="newTitle" :label="label" @input="changeTitle"></v-text-field>
</v-row>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({

})
export default class FormTitle extends Vue {
  @Prop({
    
  })
  addTitle!: string;

  @Prop({

  })
  label!: string;
  
  title = this.addTitle;

  get newTitle() { return this.addTitle }
  set newTitle(value) { this.title = value } 
  
  public changeTitle() {
    this.$emit("changeTitle", this.title);
  }
}
</script>
